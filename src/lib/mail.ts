import nodemailer from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";

export type Inquiry = {
  name: string;
  email: string;
  phone: string;
  eventDate: string;
  place: string;
  kind: string;
  audience: string;
  length: string;
  message: string;
};

const extraFields = [
  ["phone", "Telefon"],
  ["eventDate", "Datum des Anlasses"],
  ["place", "Ort"],
  ["kind", "Art des Anlasses"],
  ["audience", "Erwartete Publikumsgrösse"],
  ["length", "Gewünschte Länge"],
] as const;

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function envSnapshot() {
  return {
    host: process.env.SMTP_HOST?.trim() || null,
    port: process.env.SMTP_PORT?.trim() || null,
    user: process.env.SMTP_USER?.trim() || null,
    from: process.env.SMTP_FROM?.trim() || null,
    to: process.env.SMTP_TO?.trim() || null,
    pass: Boolean(process.env.SMTP_PASS),
  };
}

function describeError(error: unknown) {
  if (!(error instanceof Error)) return { error: String(error) };
  const smtp = error as Error & {
    code?: string;
    command?: string;
    response?: string;
    responseCode?: number;
    syscall?: string;
    address?: string;
    port?: number;
    errno?: number;
  };
  return {
    name: smtp.name,
    message: smtp.message,
    code: smtp.code ?? null,
    command: smtp.command ?? null,
    response: smtp.response ?? null,
    responseCode: smtp.responseCode ?? null,
    syscall: smtp.syscall ?? null,
    address: smtp.address ?? null,
    port: smtp.port ?? null,
    errno: smtp.errno ?? null,
  };
}

function smtpOptions(): SMTPTransport.Options | null {
  const host = process.env.SMTP_HOST?.trim();
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) return null;

  const port = Number(process.env.SMTP_PORT || "587");

  return {
    host,
    port,
    secure: process.env.SMTP_SECURE === "true" || port === 465,
    requireTLS: port === 587,
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
    auth: { user, pass },
  };
}

function fromAddress() {
  const user = process.env.SMTP_USER?.trim() ?? "info@tafimichel.ch";
  const from = process.env.SMTP_FROM?.trim();
  if (!from) return `"Tafi Michel" <${user}>`;
  if (from.includes("<")) return from;
  return `"Tafi Michel" <${from}>`;
}

function toAddress() {
  return process.env.SMTP_TO?.trim() || process.env.SMTP_USER?.trim() || "";
}

export async function sendInquiryMail(inquiry: Inquiry): Promise<boolean> {
  const options = smtpOptions();
  const to = toAddress();
  const snapshot = envSnapshot();
  if (!options || !to) {
    const missing = [
      !snapshot.host && "SMTP_HOST",
      !snapshot.user && "SMTP_USER",
      !snapshot.pass && "SMTP_PASS",
      !to && "SMTP_TO",
    ].filter(Boolean);
    console.error("[mail] SMTP is not configured", { missing, ...snapshot });
    return false;
  }

  console.info("[mail] sending", {
    ...snapshot,
    from: fromAddress(),
    to,
    secure: options.secure,
    requireTLS: options.requireTLS,
  });

  const extras = extraFields.flatMap(([key, label]) => {
    const value = inquiry[key];
    return value ? [{ label, value }] : [];
  });

  const extraHtml = extras
    .map(
      (row) =>
        `<tr><td style="padding:6px 12px 6px 0;color:#666;white-space:nowrap;">${escapeHtml(row.label)}</td><td style="padding:6px 0;">${escapeHtml(row.value)}</td></tr>`,
    )
    .join("");
  const extraText = extras.map((row) => `${row.label}: ${row.value}`).join("\n");

  try {
    const transporter = nodemailer.createTransport(options);
    const info = await transporter.sendMail({
      from: fromAddress(),
      to,
      replyTo: inquiry.email,
      subject: `Anfrage von ${inquiry.name}`,
      text: [
        `Name: ${inquiry.name}`,
        `E-Mail: ${inquiry.email}`,
        extraText,
        "",
        "Nachricht:",
        inquiry.message,
      ]
        .filter(Boolean)
        .join("\n"),
      html: `<!DOCTYPE html>
<html><body style="font-family:system-ui,sans-serif;line-height:1.5;color:#111;">
  <h2 style="margin:0 0 16px;">Neue Anfrage</h2>
  <table style="border-collapse:collapse;font-size:14px;">
    <tr><td style="padding:6px 12px 6px 0;color:#666;">Name</td><td style="padding:6px 0;">${escapeHtml(inquiry.name)}</td></tr>
    <tr><td style="padding:6px 12px 6px 0;color:#666;">E-Mail</td><td style="padding:6px 0;">${escapeHtml(inquiry.email)}</td></tr>
    ${extraHtml}
  </table>
  <p style="margin:20px 0 6px;color:#666;font-size:13px;">Nachricht</p>
  <div style="background:#f5f5f5;padding:12px 14px;border-radius:8px;white-space:pre-wrap;">${escapeHtml(inquiry.message)}</div>
</body></html>`,
    });
    console.info("[mail] sent", {
      messageId: info.messageId,
      response: info.response,
      accepted: info.accepted,
      rejected: info.rejected,
    });
    return true;
  } catch (error) {
    console.error("[mail] SMTP send failed", {
      ...snapshot,
      from: fromAddress(),
      to,
      ...describeError(error),
    });
    return false;
  }
}
