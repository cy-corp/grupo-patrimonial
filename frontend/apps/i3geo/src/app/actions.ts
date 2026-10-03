"use server";

import { Resend } from "resend";
import { GENERIC_CONTACT_ERROR } from "@/lib/contact/constants";
import { resendConfigured } from "@/lib/contact/mail-config";
import { enforceLeadRateLimit } from "@/lib/contact/rate-limit";
import { requestIp, verifyTurnstile } from "@/lib/contact/turnstile";
import { contact, services } from "@/lib/content";

// Mesmo caminho da Rendal e da DCorp: honeypot, Turnstile, limite de envios e Resend.
// Caixa de destino e remetente vêm do ambiente: CONTACT_EMAIL_I3GEO e RESEND_FROM_I3GEO.

const LIMITS = { name: 120, email: 254, city: 120, notes: 2000, area: 40 } as const;

type Result = { success: boolean; message: string };

function text(formData: FormData, key: string, max: number) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function escape(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function table(rows: [string, string][]) {
  return rows
    .filter(([, value]) => value)
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 16px 8px 0;color:#4D4D4D;font-size:13px;vertical-align:top;white-space:nowrap">${escape(label)}</td><td style="padding:8px 0;color:#2F2F2F;font-size:15px;font-weight:600">${escape(value)}</td></tr>`,
    )
    .join("");
}

function layout(title: string, body: string) {
  return `<div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;padding:32px 24px;color:#2F2F2F"><p style="margin:0 0 24px;font-size:22px;font-weight:700;color:#005C74">i3Geo</p><h1 style="margin:0 0 20px;font-size:20px;line-height:1.3;color:#2F2F2F">${escape(title)}</h1>${body}</div>`;
}

export async function submitQuote(formData: FormData): Promise<Result> {
  // Campo invisível: se veio preenchido, é robô. Responde como se tivesse dado certo.
  if (text(formData, "website", 200)) return { success: true, message: "Pedido enviado." };

  const serviceId = text(formData, "service", 40);
  const service = services.find((s) => s.id === serviceId)?.title ?? "A definir";
  const area = text(formData, "area", LIMITS.area);
  const city = text(formData, "city", LIMITS.city);
  const uf = text(formData, "uf", 10);
  const name = text(formData, "name", LIMITS.name);
  const phone = text(formData, "phone", 30);
  const email = text(formData, "email", LIMITS.email).toLowerCase();
  const notes = text(formData, "notes", LIMITS.notes);

  const digits = phone.replace(/\D/g, "");
  if (name.length < 2 || !city || digits.length < 10 || digits.length > 13) {
    return { success: false, message: "Confira o nome, o município e o telefone." };
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return { success: false, message: "Confira o e-mail informado." };
  }

  const inbox = process.env.CONTACT_EMAIL_I3GEO?.trim() ?? "";
  const from = process.env.RESEND_FROM_I3GEO?.trim() || "i3Geo <noreply@i3geo.com.br>";
  if (!resendConfigured() || !inbox) return { success: false, message: GENERIC_CONTACT_ERROR };

  const ip = await requestIp();
  const turnstile = await verifyTurnstile(text(formData, "turnstileToken", 4000), ip);
  if (!turnstile.ok) return { success: false, message: turnstile.message };

  const limited = await enforceLeadRateLimit("quote", ip, email || digits);
  if (!limited.ok) return { success: false, message: limited.message };

  const place = uf && uf !== "Outro" ? `${city} · ${uf}` : city;
  const rows: [string, string][] = [
    ["Serviço", service],
    ["Área aproximada", area],
    ["Local", place],
    ["Nome", name],
    ["Telefone", phone],
    ["E-mail", email],
    ["Observações", notes],
  ];
  const plain = rows
    .filter(([, value]) => value)
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n");

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const internal = await resend.emails.send({
      from,
      to: inbox,
      replyTo: email || undefined,
      subject: `[i3Geo] Orçamento: ${service} · ${name}`,
      text: plain,
      html: layout("Novo pedido de orçamento", `<table style="border-collapse:collapse">${table(rows)}</table>`),
    });
    if (internal.error) return { success: false, message: GENERIC_CONTACT_ERROR };

    if (email) {
      const first = name.split(" ")[0];
      const confirmation = await resend.emails.send({
        from,
        to: email,
        subject: "Recebemos o seu pedido de orçamento · i3Geo",
        text: `Olá, ${first}.\n\nRecebemos o seu pedido de orçamento e vamos retornar em breve.\n\n${plain}\n\nSe preferir, fale conosco pelo WhatsApp ${contact.phone}.\n\ni3Geo`,
        html: layout(
          `Recebemos o seu pedido, ${first}.`,
          `<p style="margin:0 0 20px;font-size:15px;line-height:1.6">Vamos analisar o seu caso e retornar em breve. Este é o resumo do que você enviou:</p><table style="border-collapse:collapse">${table(rows.slice(0, 3))}</table><p style="margin:24px 0 0;font-size:15px;line-height:1.6">Se preferir, fale conosco pelo WhatsApp ${escape(contact.phone)}.</p>`,
        ),
      });
      if (confirmation.error) console.error("i3geo.quote.confirmation_failed", confirmation.error.name);
    }

    return { success: true, message: "Pedido enviado." };
  } catch {
    return { success: false, message: GENERIC_CONTACT_ERROR };
  }
}
