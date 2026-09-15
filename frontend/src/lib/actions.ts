"use server";

import { put } from "@vercel/blob";
import { sendContact, sendQuote } from "@/lib/contact/send";

export async function submitContact(formData: FormData) {
  return sendContact(formData);
}

export async function submitOrcamento(formData: FormData) {
  return sendQuote(formData);
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
  } catch {
    return { success: false, message: "Erro ao fazer upload da imagem." };
  }
}
