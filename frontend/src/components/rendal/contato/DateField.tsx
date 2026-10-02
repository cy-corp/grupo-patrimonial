"use client";

import { useEffect, useId, useMemo, useRef, useState, type CSSProperties } from "react";
import { CalendarBlank, CaretDown, Check } from "@phosphor-icons/react";
import { Popover } from "@base-ui/react/popover";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import "react-day-picker/style.css";
import { cn } from "@/lib/utils";
import styles from "./DateField.module.css";

const inputClass =
  "h-12 w-full rounded-2xl border border-[#1F1F1F]/15 bg-white px-4 pr-12 text-base font-normal text-[#1F1F1F] outline-none transition-colors duration-300 placeholder:text-[#1F1F1F]/35 focus-visible:border-[#7A4A2B] focus-visible:outline-2 focus-visible:outline-[#7A4A2B]";

export type DateFieldKind = "birth" | "past" | "any";

type DateFieldProps = {
  value: string;
  onChange: (iso: string) => void;
  kind?: DateFieldKind;
  labelledBy?: string;
  invalid?: boolean;
  placeholder?: string;
};

type MiniOption = { value: number; label: string };

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function isoToDate(iso: string): Date | undefined {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return undefined;
  const [year, month, day] = iso.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) return undefined;
  return date;
}

function dateToIso(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatBr(iso: string) {
  const date = isoToDate(iso);
  if (!date) return "";
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${day}/${month}/${date.getFullYear()}`;
}

function maskDateBr(raw: string) {
  const digits = raw.replace(/\D/g, "").slice(0, 8);
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
}

function brToIso(br: string) {
  const match = br.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!match) return null;
  const iso = `${match[3]}-${match[2]}-${match[1]}`;
  return isoToDate(iso) ? iso : null;
}

function rangeFor(kind: DateFieldKind) {
  const today = startOfDay(new Date());
  if (kind === "birth") {
    return {
      startMonth: new Date(today.getFullYear() - 100, 0),
      endMonth: today,
      disabled: { after: today },
      defaultMonth: new Date(today.getFullYear() - 30, 0),
    };
  }
  if (kind === "past") {
    return {
      startMonth: new Date(today.getFullYear() - 100, 0),
      endMonth: today,
      disabled: { after: today },
      defaultMonth: today,
    };
  }
  return {
    startMonth: new Date(today.getFullYear() - 2, 0),
    endMonth: new Date(today.getFullYear() + 10, 11),
    disabled: undefined,
    defaultMonth: today,
  };
}

const RDP_VARS = {
  "--rdp-accent-color": "#1F1F1F",
  "--rdp-accent-background-color": "#F8F1E3",
  "--rdp-today-color": "#7A4A2B",
  "--rdp-day_button-border-radius": "0.75rem",
  "--rdp-selected-border": "2px solid #7A4A2B",
  "--rdp-day-height": "2.5rem",
  "--rdp-day-width": "2.5rem",
  "--rdp-day_button-height": "2.35rem",
  "--rdp-day_button-width": "2.35rem",
} as CSSProperties;

const MESES: MiniOption[] = Array.from({ length: 12 }, (_, index) => ({
  value: index,
  label: format(new Date(2000, index, 1), "MMMM", { locale: ptBR }),
}));

function MiniSelect({
  value,
  options,
  onChange,
  ariaLabel,
  wide,
}: {
  value: number;
  options: MiniOption[];
  onChange: (value: number) => void;
  ariaLabel: string;
  wide?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const selected = options.find((item) => item.value === value);

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const el = rootRef.current?.querySelector<HTMLButtonElement>('[aria-selected="true"]');
    el?.scrollIntoView({ block: "nearest" });
  }, [open]);

  return (
    <div ref={rootRef} className={cn("relative min-w-0", wide ? "flex-[1.4]" : "flex-1")}>
      <button
        type="button"
        aria-label={ariaLabel}
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen((current) => !current)}
        className="flex h-11 w-full cursor-pointer items-center justify-between gap-2 rounded-2xl border border-[#1F1F1F]/15 bg-white px-3 text-left text-sm font-semibold capitalize text-[#1F1F1F] outline-none transition-colors hover:border-[#1F1F1F]/30 focus-visible:border-[#7A4A2B] focus-visible:outline-2 focus-visible:outline-[#7A4A2B]"
      >
        <span className="min-w-0 truncate">{selected?.label ?? "—"}</span>
        <CaretDown weight="bold" className={cn("size-3.5 shrink-0 text-[#1F1F1F]/45 transition-transform", open && "rotate-180")} aria-hidden />
      </button>
      {open ? (
        <ul
          role="listbox"
          aria-label={ariaLabel}
          className="absolute top-[calc(100%+0.35rem)] left-0 z-20 max-h-52 w-full min-w-[7.5rem] overflow-y-auto rounded-2xl bg-white p-1.5 shadow-[0_16px_40px_rgba(31,31,31,0.14)] ring-1 ring-[#1F1F1F]/10"
        >
          {options.map((item) => {
            const active = item.value === value;
            return (
              <li key={item.value} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => {
                    onChange(item.value);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex min-h-10 w-full cursor-pointer items-center gap-2 rounded-xl px-3 text-left text-sm font-semibold capitalize outline-none",
                    active ? "bg-[#1F1F1F] text-white" : "text-[#1F1F1F] hover:bg-[#F8F1E3]",
                  )}
                >
                  <span className="min-w-0 flex-1 truncate">{item.label}</span>
                  {active ? <Check weight="bold" className="size-3.5 shrink-0" aria-hidden /> : null}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}

export function DateField({
  value,
  onChange,
  kind = "any",
  labelledBy,
  invalid,
  placeholder = "dd/mm/aaaa",
}: DateFieldProps) {
  const uid = useId();
  const range = useMemo(() => rangeFor(kind), [kind]);
  const selected = isoToDate(value);
  const [open, setOpen] = useState(false);
  const [texto, setTexto] = useState(() => formatBr(value));
  const [month, setMonth] = useState<Date>(() => selected ?? range.defaultMonth);

  const anos = useMemo(() => {
    const start = range.startMonth.getFullYear();
    const end = range.endMonth.getFullYear();
    const list: MiniOption[] = [];
    for (let year = end; year >= start; year -= 1) {
      list.push({ value: year, label: String(year) });
    }
    return list;
  }, [range.endMonth, range.startMonth]);

  useEffect(() => {
    setTexto(formatBr(value));
    const next = isoToDate(value);
    if (next) setMonth(next);
  }, [value]);

  function goTo(nextMonth: number, nextYear: number) {
    const next = new Date(nextYear, nextMonth, 1);
    if (next < range.startMonth) {
      setMonth(new Date(range.startMonth));
      return;
    }
    if (next > range.endMonth) {
      setMonth(new Date(range.endMonth.getFullYear(), range.endMonth.getMonth(), 1));
      return;
    }
    setMonth(next);
  }

  return (
    <div className="relative mt-2">
      <input
        id={labelledBy ? undefined : uid}
        aria-labelledby={labelledBy}
        aria-invalid={invalid || undefined}
        inputMode="numeric"
        autoComplete={kind === "birth" ? "bday" : "off"}
        placeholder={placeholder}
        value={texto}
        onChange={(event) => {
          const next = maskDateBr(event.target.value);
          setTexto(next);
          if (next.length === 0) {
            onChange("");
            return;
          }
          const iso = brToIso(next);
          if (iso) onChange(iso);
        }}
        onBlur={() => {
          if (!texto) {
            onChange("");
            return;
          }
          const iso = brToIso(texto);
          setTexto(iso ? formatBr(iso) : formatBr(value));
          if (iso) onChange(iso);
        }}
        className={cn(inputClass, invalid && "border-[#B4432F] focus-visible:border-[#B4432F] focus-visible:outline-[#B4432F]")}
      />

      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger
          type="button"
          aria-label="Abrir calendário"
          className="absolute top-1/2 right-1.5 inline-flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full text-[#1F1F1F]/55 transition-colors hover:text-[#7A4A2B]"
        >
          <CalendarBlank weight="duotone" className="size-5" aria-hidden />
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Positioner sideOffset={8} className="z-50 outline-none">
            <Popover.Popup className="origin-(--transform-origin) overflow-visible rounded-3xl bg-white p-3 shadow-[0_16px_40px_rgba(31,31,31,0.14)] ring-1 ring-[#1F1F1F]/10 outline-none data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0">
              <Popover.Title className="sr-only">Escolher data</Popover.Title>
              <div className="mb-3 flex gap-2">
                <MiniSelect
                  wide
                  ariaLabel="Mês"
                  value={month.getMonth()}
                  options={MESES}
                  onChange={(nextMonth) => goTo(nextMonth, month.getFullYear())}
                />
                <MiniSelect
                  ariaLabel="Ano"
                  value={month.getFullYear()}
                  options={anos}
                  onChange={(nextYear) => goTo(month.getMonth(), nextYear)}
                />
              </div>
              <DayPicker
                mode="single"
                locale={ptBR}
                selected={selected}
                month={month}
                onMonthChange={setMonth}
                hideNavigation
                startMonth={range.startMonth}
                endMonth={range.endMonth}
                disabled={range.disabled}
                onSelect={(date) => {
                  if (!date) return;
                  const iso = dateToIso(date);
                  onChange(iso);
                  setTexto(formatBr(iso));
                  setOpen(false);
                }}
                className={styles.picker}
                classNames={{ month_caption: "hidden" }}
                style={RDP_VARS}
              />
              <Popover.Close className="sr-only">Fechar</Popover.Close>
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
}
