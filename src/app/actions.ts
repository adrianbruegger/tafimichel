"use server";

import { sendInquiryMail } from "@/lib/mail";

export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
};

function field(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export async function sendInquiry(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const name = field(formData, "name");
  const email = field(formData, "email");
  const message = field(formData, "message");

  if (!name) {
    return { status: "error", message: "Bitte gib deinen Namen an." };
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "Bitte gib eine gültige E-Mail-Adresse an." };
  }

  if (message.length < 4) {
    return { status: "error", message: "Bitte schreib eine Nachricht." };
  }

  console.info("[inquiry] submit", { nameLength: name.length, emailDomain: email.split("@")[1] ?? "" });

  const sent = await sendInquiryMail({
    name,
    email,
    phone: field(formData, "phone"),
    eventDate: field(formData, "eventDate"),
    place: field(formData, "place"),
    kind: field(formData, "kind"),
    audience: field(formData, "audience"),
    length: field(formData, "length"),
    message,
  });

  if (!sent) {
    console.error("[inquiry] send failed");
    return {
      status: "error",
      message:
        "Die Anfrage konnte nicht gesendet werden. Bitte versuch es später noch einmal.",
    };
  }

  console.info("[inquiry] send ok");

  return {
    status: "success",
    message: "Die Anfrage ist eingegangen. Die Antwort folgt so bald wie möglich.",
  };
}
