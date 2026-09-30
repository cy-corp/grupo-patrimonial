"use client";

import { useMemo, useState } from "react";
import { CaretDown, Check, Plus, Trash } from "@phosphor-icons/react";
import { Combobox } from "@base-ui/react/combobox";
import {
  bancoByCode,
  buscarBancos,
  erroConta,
  labelBanco,
  type Banco,
  type ContaBancaria,
} from "@/lib/rendal/bancos";
import { cn } from "@/lib/utils";

const inputClass =
  "mt-2 h-12 w-full rounded-2xl border border-[#1F1F1F]/15 bg-white px-4 text-base font-normal text-[#1F1F1F] outline-none transition-colors duration-300 placeholder:text-[#1F1F1F]/35 focus-visible:border-[#7A4A2B] focus-visible:outline-2 focus-visible:outline-[#7A4A2B]";

const MAX = 4;

function newId() {
  return crypto.randomUUID().slice(0, 12);
}

function BancoCombobox({
  id,
  code,
  onChange,
  error,
}: {
  id: string;
  code: string;
  onChange: (code: string) => void;
  error: string;
}) {
  const [query, setQuery] = useState("");
  const selected = bancoByCode(code) ?? null;
  const items = useMemo(() => buscarBancos(query), [query]);

  return (
    <div>
      <span id={`${id}-banco`} className="block text-sm font-semibold text-[#1F1F1F]">
        Banco
      </span>
      <Combobox.Root
        items={items}
        value={selected}
        onValueChange={(next) => onChange(next?.code ?? "")}
        onInputValueChange={setQuery}
        itemToStringLabel={(banco) => (banco ? `${banco.code} · ${banco.name}` : "")}
        isItemEqualToValue={(a, b) => a.code === b.code}
        autoHighlight
      >
        <div className="relative mt-2">
          <Combobox.Input
            aria-labelledby={`${id}-banco`}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${id}-banco-erro` : undefined}
            placeholder="Nome ou código, como 341"
            className={cn(inputClass, "mt-0 pr-12", error && "border-[#B4432F] focus-visible:border-[#B4432F] focus-visible:outline-[#B4432F]")}
          />
          <Combobox.Trigger
            aria-label="Abrir lista de bancos"
            className="absolute top-1/2 right-1.5 inline-flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full text-[#1F1F1F]/55"
          >
            <CaretDown weight="bold" className="size-4" aria-hidden />
          </Combobox.Trigger>
        </div>
        <Combobox.Portal>
          <Combobox.Positioner sideOffset={8} className="z-50 w-(--anchor-width) outline-none">
            <Combobox.Popup className="max-h-72 overflow-y-auto rounded-2xl bg-white p-1.5 shadow-[0_16px_40px_rgba(31,31,31,0.12)] ring-1 ring-[#1F1F1F]/10 outline-none">
              {items.length === 0 ? (
                <p className="px-3 py-3 text-sm text-[#1F1F1F]/55">Nenhum banco com esse nome ou código.</p>
              ) : (
                <Combobox.List>
                  {(banco: Banco) => (
                    <Combobox.Item
                      key={banco.code}
                      value={banco}
                      className="flex min-h-11 cursor-pointer items-center gap-3 rounded-xl px-3 text-sm font-semibold text-[#1F1F1F] outline-none data-highlighted:bg-[#F8F1E3]"
                    >
                      <span className="w-9 shrink-0 tabular-nums text-[#1F1F1F]/55">{banco.code}</span>
                      <span className="min-w-0 flex-1 truncate">{banco.name}</span>
                      <Combobox.ItemIndicator className="text-[#7A4A2B]">
                        <Check weight="bold" className="size-4" aria-hidden />
                      </Combobox.ItemIndicator>
                    </Combobox.Item>
                  )}
                </Combobox.List>
              )}
            </Combobox.Popup>
          </Combobox.Positioner>
        </Combobox.Portal>
      </Combobox.Root>
      {error ? (
        <p id={`${id}-banco-erro`} className="mt-1.5 text-sm text-[#B4432F]">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function DigitField({
  id,
  label,
  value,
  onChange,
  error,
  inputMode = "numeric",
  maxLength,
  autoComplete,
  className,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error: string;
  inputMode?: "numeric" | "text";
  maxLength: number;
  autoComplete?: string;
  className?: string;
}) {
  return (
    <label className={cn("block text-sm font-semibold text-[#1F1F1F]", className)}>
      {label}
      <input
        id={id}
        inputMode={inputMode}
        autoComplete={autoComplete}
        maxLength={maxLength}
        value={value}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-erro` : undefined}
        onChange={(event) => onChange(event.target.value)}
        className={cn(inputClass, error && "border-[#B4432F] focus-visible:border-[#B4432F] focus-visible:outline-[#B4432F]")}
      />
      {error ? (
        <span id={`${id}-erro`} className="mt-1.5 block text-sm font-normal text-[#B4432F]">
          {error}
        </span>
      ) : null}
    </label>
  );
}

export function ContasBancariasField({
  value,
  onChange,
  tried,
}: {
  value: ContaBancaria[];
  onChange: (next: ContaBancaria[]) => void;
  tried: boolean;
}) {
  function patch(id: string, partial: Partial<ContaBancaria>) {
    onChange(value.map((conta) => (conta.id === id ? { ...conta, ...partial } : conta)));
  }

  return (
    <fieldset className="flex flex-col gap-3">
      <legend className="text-sm font-semibold text-[#1F1F1F]">
        Conta bancária <span className="font-normal text-[#1F1F1F]/55">(opcional)</span>
      </legend>
      <p className="text-sm leading-6 text-[#1F1F1F]/55">
        O número na frente é o código do banco. O dígito fica separado, pode ser letra (como X) e pode ficar em branco.
      </p>

      {value.map((conta, index) => {
        const errors = erroConta(conta);
        const show = tried;
        return (
          <div key={conta.id} className="flex flex-col gap-3 rounded-2xl bg-[#F8F1E3]/70 p-3">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-[#1F1F1F]/55">
                {labelBanco(conta.code) || `Conta ${index + 1}`}
              </p>
              <button
                type="button"
                onClick={() => onChange(value.filter((item) => item.id !== conta.id))}
                className="inline-flex min-h-11 cursor-pointer items-center gap-1.5 rounded-full px-2 text-sm font-semibold text-[#1F1F1F]/70"
                aria-label={`Remover ${labelBanco(conta.code) || `conta ${index + 1}`}`}
              >
                <Trash weight="bold" className="size-4" aria-hidden />
                Remover
              </button>
            </div>
            <BancoCombobox
              id={conta.id}
              code={conta.code}
              error={show ? errors.code : ""}
              onChange={(code) => patch(conta.id, { code })}
            />
            <DigitField
              id={`${conta.id}-agencia`}
              label="Agência"
              value={conta.agencia}
              autoComplete="off"
              maxLength={4}
              error={show ? errors.agencia : ""}
              onChange={(agencia) => patch(conta.id, { agencia: agencia.replace(/\D/g, "").slice(0, 4) })}
            />
            <div className="grid grid-cols-[minmax(0,1fr)_5.5rem] gap-3">
              <DigitField
                id={`${conta.id}-conta`}
                label="Conta"
                value={conta.conta}
                autoComplete="off"
                maxLength={13}
                error={show ? errors.conta : ""}
                onChange={(numero) => patch(conta.id, { conta: numero.replace(/\D/g, "").slice(0, 13) })}
              />
              <DigitField
                id={`${conta.id}-digito`}
                label="Dígito"
                value={conta.digito}
                inputMode="text"
                autoComplete="off"
                maxLength={2}
                error={show ? errors.digito : ""}
                onChange={(digito) => patch(conta.id, { digito: digito.replace(/[^0-9A-Za-z]/g, "").slice(0, 2) })}
              />
            </div>
          </div>
        );
      })}

      {value.length < MAX ? (
        <button
          type="button"
          onClick={() =>
            onChange([...value, { id: newId(), code: "", agencia: "", conta: "", digito: "" }])
          }
          className="inline-flex min-h-11 cursor-pointer items-center gap-2 self-start text-sm font-semibold text-[#7A4A2B]"
        >
          <Plus weight="bold" className="size-4" aria-hidden />
          {value.length === 0 ? "Adicionar conta" : "Adicionar outra conta"}
        </button>
      ) : (
        <p className="text-sm text-[#1F1F1F]/55">Até {MAX} contas neste envio.</p>
      )}
    </fieldset>
  );
}
