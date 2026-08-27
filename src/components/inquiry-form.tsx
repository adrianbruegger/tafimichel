"use client";

import { useActionState } from "react";
import { sendInquiry, type ContactState } from "@/app/actions";
import { Arrow } from "@/components/ui";

const initial: ContactState = { status: "idle", message: "" };

const fields = [
  { id: "name", label: "Name", type: "text", autoComplete: "name", required: true, wide: false },
  { id: "email", label: "E-Mail", type: "email", autoComplete: "email", required: true, wide: false },
  { id: "phone", label: "Telefon", type: "tel", autoComplete: "tel", required: false, wide: false },
  { id: "eventDate", label: "Datum des Anlasses", type: "text", required: false, wide: false },
  { id: "place", label: "Ort", type: "text", required: false, wide: false },
  { id: "kind", label: "Art des Anlasses", type: "text", required: false, wide: false },
  { id: "audience", label: "Erwartete Publikumsgrösse", type: "text", required: false, wide: false },
  { id: "length", label: "Gewünschte Länge", type: "text", required: false, wide: false },
] as const;

export function InquiryForm() {
  const [state, action, pending] = useActionState(sendInquiry, initial);
  const done = state.status === "success";

  return (
    <form action={action} className="max-w-2xl">
      <div className="grid gap-x-10 gap-y-7 sm:grid-cols-2">
        {fields.map((field) => (
          <div key={field.id} className={field.wide ? "sm:col-span-2" : undefined}>
            <label className="label text-ash/40" htmlFor={field.id}>
              {field.label}
              {field.required ? <span className="ml-1 text-ember">*</span> : null}
            </label>
            <input
              id={field.id}
              name={field.id}
              type={field.type}
              autoComplete={"autoComplete" in field ? field.autoComplete : undefined}
              required={field.required}
              className="field mt-1"
            />
          </div>
        ))}
      </div>

      <div className="mt-9">
        <label className="label text-ash/40" htmlFor="message">
          Nachricht<span className="ml-1 text-ember">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="field mt-1 resize-none"
        />
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-6">
        <button
          type="submit"
          disabled={pending || done}
          className="btn btn-solid h-14 w-full px-8 sm:w-auto disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Wird gesendet…" : done ? "Gesendet" : "Anfrage senden"}
          {!pending && !done ? <Arrow /> : null}
        </button>
        <p className="text-xs text-ash/35">Felder mit * sind erforderlich.</p>
      </div>

      {state.status !== "idle" ? (
        <p
          className={`mt-6 border-l-2 py-1 pl-4 text-sm ${
            state.status === "error"
              ? "border-ember text-ember"
              : "border-ash/40 text-ash"
          }`}
          role={state.status === "error" ? "alert" : "status"}
        >
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
