"use server";

export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
};

export async function sendInquiry(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name) {
    return { status: "error", message: "Bitte gib deinen Namen an." };
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "Bitte gib eine gültige E-Mail-Adresse an." };
  }

  if (message.length < 4) {
    return { status: "error", message: "Bitte schreib eine Nachricht." };
  }

  return {
    status: "success",
    message: "Die Anfrage ist eingegangen. Die Antwort folgt so bald wie möglich.",
  };
}
