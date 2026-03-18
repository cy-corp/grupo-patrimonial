"use server";

import { Resend } from "resend";
import { put } from "@vercel/blob";

const resend = new Resend(process.env.RESEND_API_KEY || "re_123");

export async function submitContact(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  try {
    // Placeholder implementation
    console.log("Contact submission:", { name, email, message });
    // await resend.emails.send({ ... })
    return { success: true, message: "Mensagem enviada com sucesso!" };
  } catch (error) {
    return { success: false, message: "Erro ao enviar a mensagem." };
  }
}

export async function submitOrcamento(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const service = formData.get("service") as string;
  const details = formData.get("details") as string;

  try {
    // Placeholder implementation
    console.log("Orcamento submission:", { name, email, service, details });
    // await resend.emails.send({ ... })
    return { success: true, message: "Orçamento solicitado com sucesso!" };
  } catch (error) {
    return { success: false, message: "Erro ao solicitar o orçamento." };
  }
}

export async function uploadImage(formData: FormData) {
  const password = formData.get("password") as string;
  const file = formData.get("file") as File;

  if (password !== process.env.ADMIN_PASSWORD) {
    return { success: false, message: "Senha incorreta." };
  }

  if (!file) {
    return { success: false, message: "Nenhum arquivo enviado." };
  }

  try {
    const blob = await put(file.name, file, { access: "public" });
    return { success: true, url: blob.url };
  } catch (error) {
    return { success: false, message: "Erro ao fazer upload da imagem." };
  }
}
