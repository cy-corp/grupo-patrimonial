"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { submitContact } from "@/lib/actions";
import { HoneypotField } from "@/components/contato/HoneypotField";
import { TurnstileField } from "@/components/contato/TurnstileField";
import { track } from "@/lib/rendal/track";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/rendal/tokens";

const fieldClass =
  "mt-2 h-12 w-full rounded-2xl border border-[#1F1F1F]/15 bg-white px-4 text-base text-[#1F1F1F] outline-none focus-visible:border-[#0F5B63] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0F5B63]";

export function Field({
  label,
  name,
  type = "text",
  required = false,
  autoComplete,
  inputMode,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  inputMode?: "text" | "tel" | "email";
  placeholder?: string;
}) {
  return (
    <label className="block text-sm font-semibold text-[#1F1F1F]">
      {label}
      <input
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        inputMode={inputMode}
        placeholder={placeholder}
        className={fieldClass}
      />
    </label>
  );
}

export function LeadForm({
  subject,
  perfil,
  submitLabel = "Enviar",
  success = "Recebemos. Retornamos em até 1 dia útil.",
  emailOptional = false,
  phoneOptional = false,
  compact = false,
  extra,
  hidden,
  eventName = "contato_submit",
  id,
}: {
  subject: string;
  perfil?: string;
  submitLabel?: string;
  success?: string;
  emailOptional?: boolean;
  phoneOptional?: boolean;
  compact?: boolean;
  extra?: ReactNode;
  hidden?: Record<string, string>;
  eventName?: string;
  id?: string;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [message, setMessage] = useState("");
  const [resetSignal, setResetSignal] = useState(0);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const lines = [`Perfil: ${perfil ?? "contato"}`, `Assunto: ${subject}`];
    for (const [key, value] of data.entries()) {
      if (typeof value !== "string" || !value.trim()) continue;
      if (["company", "subject", "turnstileToken", "website", "emailOptional", "phoneOptional", "name", "email", "phone", "contato", "message"].includes(key)) {
        continue;
      }
      lines.push(`${key}: ${value.trim()}`);
    }
    const note = String(data.get("message") ?? "").trim();
    if (note) lines.push(note);
    data.set("message", lines.join("\n"));
    data.set("company", "rendal");
    data.set("subject", subject);
    setStatus("sending");
    const result = await submitContact(data);
    if (result.success) {
      setStatus("ok");
      setMessage(success);
      track(eventName, perfil ? { perfil } : undefined);
      form.reset();
      setResetSignal((value) => value + 1);
      return;
    }
    setStatus("error");
    setMessage(result.message);
  }

  if (status === "ok") {
    return (
      <div role="status" aria-live="polite" className="rounded-3xl bg-white p-6 ring-1 ring-[#1F1F1F]/10">
        <p className="flex items-center gap-3 text-lg font-semibold text-[#1F1F1F]">
          <span className="inline-flex size-8 items-center justify-center rounded-full bg-[#0F5B63] text-white" aria-hidden>
            ✓
          </span>
          {message}
        </p>
      </div>
    );
  }

  return (
    <form id={id} onSubmit={onSubmit} className="relative flex flex-col gap-4" noValidate={false}>
      <HoneypotField />
      <input type="hidden" name="company" value="rendal" />
      <input type="hidden" name="subject" value={subject} />
      {emailOptional ? <input type="hidden" name="emailOptional" value="1" /> : null}
      {phoneOptional ? <input type="hidden" name="phoneOptional" value="1" /> : null}
      {hidden
        ? Object.entries(hidden).map(([key, value]) => (
            <input key={key} type="hidden" name={key} value={value} />
          ))
        : null}
      {compact ? (
        <label className="block text-sm font-semibold text-[#1F1F1F]">
          WhatsApp ou e-mail
          <input name="contato" required inputMode="text" autoComplete="on" className={fieldClass} />
        </label>
      ) : (
        <>
          <Field label="Nome" name="name" required autoComplete="name" />
          <Field label="WhatsApp" name="phone" type="tel" required={!phoneOptional} autoComplete="tel" inputMode="tel" />
          <Field
            label={emailOptional ? "E-mail (opcional)" : "E-mail"}
            name="email"
            type="email"
            required={!emailOptional}
            autoComplete="email"
            inputMode="email"
          />
        </>
      )}
      {extra}
      {!compact ? (
        <label className="block text-sm font-semibold text-[#1F1F1F]">
          Mensagem (opcional)
          <textarea name="message" rows={4} className={cn(fieldClass, "h-auto py-3")} />
        </label>
      ) : null}
      <p className="text-sm leading-6 text-[#1F1F1F]/65">
        Ao enviar, você concorda com o uso dos dados para retorno deste contato.{" "}
        <a href="/politica-de-privacidade" className="font-semibold text-[#0F5B63] underline-offset-2 hover:underline">
          Política de privacidade
        </a>
        .
      </p>
      <TurnstileField resetSignal={resetSignal} />
      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex h-12 min-h-11 cursor-pointer items-center justify-center rounded-full bg-[#0F5B63] px-6 text-base font-semibold text-white transition-colors duration-700 hover:bg-[#0A474E] disabled:opacity-60"
        style={{ transitionTimingFunction: EASE }}
      >
        {status === "sending" ? "Enviando…" : submitLabel}
      </button>
      <p role="status" aria-live="polite" className="text-sm text-[#1F1F1F]">
        {status === "error" ? message : ""}
      </p>
    </form>
  );
}
