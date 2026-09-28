"use client";

import Image from "next/image";
import { useState } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { SegmentedControl } from "@/components/rendal/SegmentedControl";
import { track } from "@/lib/rendal/track";
import type { Empreendimento } from "@/lib/rendal/content/empreendimentos";

export function Plants({ item }: { item: Empreendimento }) {
  const [current, setCurrent] = useState(item.plantas[0]?.id ?? "");
  const planta = item.plantas.find((entry) => entry.id === current) ?? item.plantas[0];
  if (!planta) return null;

  return (
    <div>
      <SegmentedControl
        label="Plantas"
        value={current}
        onChange={(value) => {
          setCurrent(value);
          track("planta_toggle", { planta: value });
        }}
        options={item.plantas.map((entry) => ({ value: entry.id, label: entry.label }))}
      />
      <figure className="relative mx-auto mt-6 max-h-[70svh] max-w-md overflow-hidden rounded-3xl bg-[#EDE6DA]">
        <Image
          key={planta.imagem.src}
          src={planta.imagem.src}
          alt={planta.imagem.alt}
          width={645}
          height={1024}
          sizes="(max-width: 768px) 100vw, 448px"
          className="h-auto max-h-[70svh] w-full object-contain"
        />
      </figure>
      <div className="mt-4 flex flex-wrap gap-3">
        <Dialog.Root>
          <Dialog.Trigger className="inline-flex min-h-11 cursor-pointer items-center rounded-full px-4 text-sm font-semibold text-[#0F5B63] ring-1 ring-[#0F5B63]/30">
            Tela cheia
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Backdrop className="fixed inset-0 z-[80] bg-[#0E2A2D]/80" />
            <Dialog.Popup className="fixed inset-4 z-[81] flex flex-col overflow-hidden rounded-3xl bg-[#F8F1E3] p-4 outline-none md:inset-10">
              <div className="flex items-center justify-between gap-4">
                <Dialog.Title className="text-lg font-semibold text-[#1F1F1F]">{planta.label}</Dialog.Title>
                <Dialog.Close className="inline-flex min-h-11 cursor-pointer items-center rounded-full px-4 text-sm font-semibold text-[#1F1F1F]">
                  Fechar
                </Dialog.Close>
              </div>
              <div className="mt-4 flex min-h-0 flex-1 items-center justify-center overflow-auto">
                <img
                  src={planta.imagem.src}
                  alt={planta.imagem.alt}
                  className="mx-auto h-auto max-h-full w-auto max-w-full object-contain"
                  style={{ touchAction: "pinch-zoom" }}
                />
              </div>
            </Dialog.Popup>
          </Dialog.Portal>
        </Dialog.Root>
        {item.memorialPdf ? (
          <a
            href={item.memorialPdf}
            className="inline-flex min-h-11 items-center rounded-full px-4 text-sm font-semibold text-[#1F1F1F]"
          >
            Baixar projeto em PDF
          </a>
        ) : null}
      </div>
    </div>
  );
}
