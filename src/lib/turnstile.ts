import { headers } from "next/headers";

const SITEVERIFY = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const DEV_SECRET = "1x0000000000000000000000000000000AA";

type Siteverify = {
  success: boolean;
  "error-codes"?: string[];
};

function secretKey() {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();
  if (secret) return secret;
  return process.env.NODE_ENV === "production" ? "" : DEV_SECRET;
}

async function visitorIp() {
  const h = await headers();
  return (
    h.get("cf-connecting-ip") ??
    h.get("x-real-ip") ??
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    undefined
  );
}

export async function verifyTurnstile(token: string): Promise<boolean> {
  const secret = secretKey();
  if (!secret) {
    console.error("[turnstile] secret missing");
    return false;
  }

  if (!token) {
    console.error("[turnstile] token missing");
    return false;
  }

  try {
    const ip = await visitorIp();
    const response = await fetch(SITEVERIFY, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret,
        response: token,
        ...(ip ? { remoteip: ip } : {}),
      }),
    });
    const result = (await response.json()) as Siteverify;
    if (!result.success) {
      console.error("[turnstile] verify failed", {
        errorCodes: result["error-codes"] ?? [],
      });
      return false;
    }
    console.info("[turnstile] verify ok");
    return true;
  } catch (error) {
    console.error("[turnstile] verify error", error);
    return false;
  }
}
