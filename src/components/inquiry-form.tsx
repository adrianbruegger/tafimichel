"use client";

import { useActionState } from "react";
import { sendInquiry, type ContactState } from "@/app/actions";

const initial: ContactState = { status: "idle", message: "" };

const fields = [
  { id: "name", label: "Name", type: "text", autoComplete: "name", required: true },
  { id: "email", label: "E-Mail", type: "email", autoComplete: "email", required: true },
  { id: "phone", label: "Telefon", type: "tel", autoComplete: "tel", required: false },
  { id: "eventDate", label: "Datum des Anlasses", type: "text", required: false },
  { id: "place", label: "Ort", type: "text", required: false },
  { id: "kind", label: "Art des Anlasses", type: "text", required: false },
  { id: "audience", label: "Erwartete Publikumsgrösse", type: "text", required: false },
  { id: "length", label: "Gewünschte Länge des Auftritts", type: "text", required: false },
] as const;

export function InquiryForm() {
  const [state, action, pending] = useActionState(sendInquiry, initial);

  return (
    <form action={action} className="max-w-2xl">
      {fields.map((field) => (
        <div key={field.id} className="mb-8">
          <label className="label text-mist" htmlFor={field.id}>
            {field.label}
            {field.required ? "" : " (optional)"}
          </label>
          <input
            id={field.id}
            name={field.id}
            type={field.type}
            autoComplete={"autoComplete" in field ? field.autoComplete : undefined}
            required={field.required}
            className="field"
          />
        </div>
      ))}
      <label className="label text-mist" htmlFor="message">
        Nachricht
      </label>
      <textarea
        id="message"
        name="message"
        required
        rows={5}
        className="field resize-none"
      />
      <button
        type="submit"
        disabled={pending || state.status === "success"}
        className="mt-10 flex h-14 w-full items-center justify-center bg-ash text-sm font-medium uppercase tracking-[0.16em] text-veld transition-colors hover:bg-ember hover:text-ash disabled:cursor-not-allowed disabled:opacity-70"
      >
        {pending ? "Wird gesendet…" : state.status === "success" ? "Gesendet" : "Anfrage senden"}
      </button>
      {state.status !== "idle" ? (
        <p
          className={`mt-5 text-sm ${state.status === "error" ? "text-ember" : "text-ash"}`}
          role={state.status === "error" ? "alert" : "status"}
        >
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
