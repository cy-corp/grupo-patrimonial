"use client";

import { useState } from "react";
import { Check, FileText, Trash } from "@phosphor-icons/react";
import { upload } from "@vercel/blob/client";
import {
  ARQUIVO_MAX_BYTES,
  COMPROVANTES,
  documentosDaCotacao,
  type ArquivoEnviado,
  type ComprovanteId,
  type DocSlot,
  type DocSlotId,
  type Draft,
} from "@/lib/rendal/financiamento";
import { cn } from "@/lib/utils";

const choiceClass =
  "flex min-h-12 cursor-pointer items-center rounded-2xl px-3 text-sm font-semibold ring-1 transition-colors duration-300";

function nomeSeguro(name: string) {
  const clean = name.normalize("NFD").replace(/\p{M}/gu, "").replace(/[^a-zA-Z0-9._-]/g, "_").slice(-80);
  return clean || "arquivo";
}

function nomeVisivel(name: string) {
  const clean = name.replace(/\s+/g, " ").trim() || "arquivo";
  if (clean.length <= 28) return clean;
  return `${clean.slice(0, 24)}…`;
}

async function prepararArquivo(file: File) {
  if (!file.type.startsWith("image/") || file.type === "image/heic" || file.type === "image/heif" || file.size < 1_500_000) {
    return file;
  }
  try {
    const bitmap = await createImageBitmap(file);
    const max = 2000;
    const scale = Math.min(1, max / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(bitmap.width * scale));
    canvas.height = Math.max(1, Math.round(bitmap.height * scale));
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;
    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close();
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.82));
    if (!blob || blob.size >= file.size) return file;
    const base = file.name.replace(/\.\w+$/, "") || "foto";
    return new File([blob], `${base}.jpg`, { type: "image/jpeg" });
  } catch {
    return file;
  }
}

export function DocumentosStep({
  draft,
  erros,
  onComprovante,
  onArquivos,
}: {
  draft: Draft;
  erros: Record<string, string>;
  onComprovante: (qual: "renda" | "renda-conjuge", value: ComprovanteId) => void;
  onArquivos: (id: DocSlotId, arquivos: ArquivoEnviado[]) => void;
}) {
  const slots = documentosDaCotacao(draft);
  const enviados = slots.filter((slot) => (draft.arquivos[slot.id]?.length ?? 0) > 0).length;
  const [busy, setBusy] = useState<DocSlotId | null>(null);
  const [progresso, setProgresso] = useState(0);
  const [falha, setFalha] = useState<Partial<Record<DocSlotId, string>>>({});

  async function enviar(slot: DocSlot, lista: FileList | null) {
    if (!lista?.length) return;
    const id = slot.id;
    const atuais = draft.arquivos[id] ?? [];
    const vagas = slot.max - atuais.length;
    if (vagas <= 0) {
      setFalha((current) => ({ ...current, [id]: slot.max === 1 ? "Este item aceita só 1 arquivo." : `Este item aceita no máximo ${slot.max} arquivos.` }));
      return;
    }
    const files = Array.from(lista).slice(0, vagas);
    setBusy(id);
    setProgresso(0);
    setFalha((current) => ({ ...current, [id]: "" }));
    let next = [...atuais];
    try {
      for (const [i, file] of files.entries()) {
        const pronto = await prepararArquivo(file);
        if (pronto.size > ARQUIVO_MAX_BYTES) {
          setFalha((current) => ({ ...current, [id]: `${pronto.name} passa de 10 MB.` }));
          break;
        }
        const blob = await upload(`financiamento/${id}/${nomeSeguro(pronto.name)}`, pronto, {
          access: "private",
          handleUploadUrl: "/api/financiamento/upload",
          contentType: pronto.type || "application/pdf",
          multipart: pronto.size > 4 * 1024 * 1024,
          onUploadProgress: (event) => setProgresso(((i + event.percentage / 100) / files.length) * 100),
        });
        next = [...next, { pathname: blob.pathname, name: nomeVisivel(pronto.name), size: pronto.size }];
        onArquivos(id, next);
      }
    } catch (error) {
      const detalhe = error instanceof Error ? error.message : "";
      setFalha((current) => ({
        ...current,
        [id]: detalhe && !detalhe.startsWith("Vercel Blob")
          ? detalhe
          : "Não consegui enviar. Tente outra foto ou um PDF de até 10 MB.",
      }));
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="mt-6 flex min-w-0 flex-col gap-3">
      <p className="text-sm text-[#1F1F1F]/60">
        {enviados} de {slots.length} itens com arquivo. Foto ou PDF, até 10 MB.
      </p>
      {slots.map((slot) => {
        const arquivos = draft.arquivos[slot.id] ?? [];
        const erro = erros[`arquivo.${slot.id}`] || falha[slot.id] || "";
        const escolha = slot.escolha === "renda" ? draft.comprovanteRenda : slot.escolha === "renda-conjuge" ? draft.comprovanteRendaConjuge : "";
        const erroEscolha = slot.escolha === "renda" ? erros.comprovanteRenda : slot.escolha === "renda-conjuge" ? erros.comprovanteRendaConjuge : "";
        return (
          <div key={slot.id} className="min-w-0 overflow-hidden rounded-2xl bg-[#F8F1E3]/70 p-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-[#1F1F1F]">{slot.label}</p>
                <p className="mt-0.5 text-sm leading-5 text-[#1F1F1F]/55">{slot.hint}</p>
              </div>
              {arquivos.length ? <Check weight="bold" className="mt-0.5 size-4 shrink-0 text-[#0F5B63]" aria-hidden /> : null}
            </div>
            {slot.escolha ? (
              <div className="mt-3 grid gap-2">
                {COMPROVANTES.map((item) => (
                  <label key={item.id} className={cn(choiceClass, escolha === item.id ? "bg-[#0F5B63] text-white ring-[#0F5B63]" : "bg-white text-[#1F1F1F] ring-[#1F1F1F]/12")}>
                    <input
                      type="radio"
                      name={slot.escolha}
                      checked={escolha === item.id}
                      onChange={() => onComprovante(slot.escolha!, item.id)}
                      className="sr-only"
                    />
                    {item.label}
                  </label>
                ))}
                {erroEscolha ? <p className="text-sm text-[#B4432F]">{erroEscolha}</p> : null}
              </div>
            ) : null}
            <ul className="mt-3 flex min-w-0 flex-col gap-2">
              {arquivos.map((arquivo) => (
                <li
                  key={arquivo.pathname}
                  className="grid min-w-0 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 overflow-hidden rounded-xl bg-white px-3 py-2 text-sm"
                >
                  <FileText className="size-4 shrink-0 text-[#0F5B63]" aria-hidden />
                  <span className="min-w-0 truncate font-semibold" title={arquivo.name}>
                    {nomeVisivel(arquivo.name)}
                  </span>
                  <button
                    type="button"
                    onClick={() => onArquivos(slot.id, arquivos.filter((item) => item.pathname !== arquivo.pathname))}
                    className="inline-flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full text-[#1F1F1F]/55"
                    aria-label={`Remover ${arquivo.name}`}
                  >
                    <Trash weight="bold" className="size-4" aria-hidden />
                  </button>
                </li>
              ))}
            </ul>
            {arquivos.length < slot.max ? (
              <label className="mt-3 flex min-h-12 cursor-pointer items-center justify-center rounded-full bg-white px-4 text-sm font-semibold text-[#0F5B63] ring-1 ring-[#0F5B63]/20">
                {busy === slot.id
                  ? `Enviando ${Math.round(progresso)}%`
                  : slot.max === 1
                    ? "Tirar foto ou escolher arquivo"
                    : arquivos.length
                      ? `Adicionar (${arquivos.length}/${slot.max})`
                      : slot.max === 3
                        ? "Escolher os 3 arquivos"
                        : `Escolher até ${slot.max} arquivos`}
                <input
                  type="file"
                  accept="image/*,application/pdf,.heic,.heif"
                  multiple={slot.max > 1}
                  disabled={busy !== null}
                  className="sr-only"
                  onChange={(event) => {
                    void enviar(slot, event.target.files);
                    event.target.value = "";
                  }}
                />
              </label>
            ) : null}
            {erro ? <p className="mt-2 text-sm text-[#B4432F]">{erro}</p> : null}
          </div>
        );
      })}
    </div>
  );
}
