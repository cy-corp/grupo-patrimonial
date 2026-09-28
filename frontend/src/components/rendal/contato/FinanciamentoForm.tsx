"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, CaretDown, Check, Clock, PencilSimple, ShieldCheck, WhatsappLogo } from "@phosphor-icons/react";
import { Combobox } from "@base-ui/react/combobox";
import { submitContact } from "@/lib/actions";
import { HoneypotField } from "@/components/contato/HoneypotField";
import { TurnstileField } from "@/components/contato/TurnstileField";
import { ContasBancariasField } from "@/components/rendal/contato/ContasBancariasField";
import { DocumentosStep } from "@/components/rendal/contato/DocumentosStep";
import { empreendimentos } from "@/lib/rendal/content/empreendimentos";
import {
  documentosDaCotacao,
  draftVazio,
  errosEtapa,
  ESTADOS_CIVIS,
  etapasVisiveis,
  FINANCIAMENTO_DISCLAIMER,
  FINANCIAMENTO_SUBJECT,
  formatDataBr,
  labelEstadoCivil,
  labelRegime,
  labelTipologia,
  maskCep,
  maskCpf,
  maskMoney,
  maskPhone,
  maskRg,
  pessoaVazia,
  PRAZOS,
  precisaConjuge,
  primeiraEtapaInvalida,
  REGIMES,
  sanitizeDraft,
  TIPOLOGIAS,
  UFS,
  type Draft,
  type EtapaId,
  type Pessoa,
  type Uf,
} from "@/lib/rendal/financiamento";
import { rendalWhatsapp } from "@/lib/rendal/site";
import { track } from "@/lib/rendal/track";
import { EASE } from "@/lib/rendal/tokens";
import { cn } from "@/lib/utils";

const DRAFT_KEY = "rendal:financiamento:v2";
const DRAFT_TTL_MS = 7 * 24 * 60 * 60 * 1000;
const UF_POR_CIDADE: Record<string, Uf> = { Capetinga: "MG" };

const COPY: Record<EtapaId, { title: string; text: string }> = {
  imovel: { title: "Qual imóvel você quer financiar?", text: "Cidade, valor e o prazo que você tem em mente." },
  valores: { title: "Entrada, FGTS e saldo devedor", text: "Se não tiver entrada, coloque zero." },
  voce: { title: "Seus dados", text: "Do jeito que a ficha do banco pede." },
  endereco: { title: "Onde você mora", text: "O CEP preenche a rua. O número fica com você." },
  identidade: { title: "RG e filiação", text: "A ficha pede isso mesmo quando o documento enviado é a CNH." },
  civil: { title: "Estado civil", text: "Casado e união estável seguem para os dados do cônjuge." },
  conjuge: { title: "Dados do cônjuge", text: "Os documentos do cônjuge entram sempre, compondo renda ou não." },
  documentos: { title: "Envie os documentos", text: "Holerites e extratos pedem 3 arquivos. Os outros itens têm limite." },
  banco: { title: "Banco e prazo do contrato", text: "A conta ajuda a cotar. O contrato fechado muda a urgência." },
  revisao: { title: "Confira e envie", text: "Se precisar editar, clique no item." },
};

const inputClass =
  "mt-2 h-12 w-full rounded-2xl border border-[#1F1F1F]/15 bg-white px-4 text-base font-normal text-[#1F1F1F] outline-none transition-colors duration-300 placeholder:text-[#1F1F1F]/35 focus-visible:border-[#0F5B63] focus-visible:outline-2 focus-visible:outline-[#0F5B63]";

function Field({
  label,
  error,
  hint,
  optional,
  plain,
  labelId,
  children,
}: {
  label: string;
  error?: string;
  hint?: string;
  optional?: boolean;
  plain?: boolean;
  labelId?: string;
  children: ReactNode;
}) {
  const text = (
    <>
      {label}
      {optional ? <span className="font-normal text-[#1F1F1F]/55"> (opcional)</span> : null}
    </>
  );
  const body = (
    <>
      {plain ? <span id={labelId} className="block">{text}</span> : text}
      {children}
      {error ? <span className="mt-1.5 block font-normal text-[#B4432F]">{error}</span> : hint ? <span className="mt-1.5 block font-normal text-[#1F1F1F]/55">{hint}</span> : null}
    </>
  );
  const className = "block text-sm font-semibold text-[#1F1F1F]";
  return plain ? <div className={className}>{body}</div> : <label className={className}>{body}</label>;
}

type Opcao = { value: string; label: string };

function OptionCombobox({
  value,
  options,
  onChange,
  placeholder,
  empty,
  labelledBy,
  invalid,
  customValue,
  customPlaceholder,
}: {
  value: string;
  options: readonly Opcao[];
  onChange: (value: string) => void;
  placeholder: string;
  empty: string;
  labelledBy: string;
  invalid?: boolean;
  customValue?: string;
  customPlaceholder?: string;
}) {
  const conhecido = options.some((item) => item.value === value);
  const [livre, setLivre] = useState(() => Boolean(customValue) && value !== "" && !conhecido);
  const [aberto, setAberto] = useState(false);
  const [texto, setTexto] = useState(() => {
    if (Boolean(customValue) && value !== "" && !conhecido) return value;
    return options.find((item) => item.value === value)?.label ?? "";
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const livreRef = useRef(livre);
  livreRef.current = livre;
  const selected = livre ? null : options.find((item) => item.value === value) ?? null;

  useEffect(() => {
    if (aberto) return;
    setTexto(livre ? value : selected?.label ?? "");
  }, [aberto, livre, selected, value]);

  useEffect(() => {
    if (livre) inputRef.current?.focus();
  }, [livre]);

  const items = useMemo(() => {
    const termo = texto.trim().toLocaleLowerCase("pt-BR");
    const atual = (livre ? value : selected?.label ?? "").toLocaleLowerCase("pt-BR");
    if (!termo || termo === atual) return options;
    return options.filter((item) => item.label.toLocaleLowerCase("pt-BR").includes(termo));
  }, [livre, options, selected, texto, value]);

  return (
    <Combobox.Root
      items={items}
      value={selected}
      inputValue={texto}
      open={aberto}
      onOpenChange={setAberto}
      autoHighlight={false}
      filter={null}
      onValueChange={(next) => {
        if (!next) return;
        if (customValue && next.value === customValue) {
          setLivre(true);
          setTexto("");
          onChange("");
          return;
        }
        setLivre(false);
        setTexto(next.label);
        onChange(next.value);
      }}
      onInputValueChange={(next, details) => {
        if (details.reason !== "input-change" && details.reason !== "input-paste") return;
        setTexto(next);
        if (!livreRef.current) return;
        onChange(next.slice(0, 80));
      }}
      itemToStringLabel={(item) => item?.label ?? ""}
      isItemEqualToValue={(a, b) => a.value === b.value}
    >
      <div className="relative mt-2">
        <Combobox.Input
          ref={inputRef}
          aria-labelledby={labelledBy}
          aria-invalid={invalid || undefined}
          placeholder={livre ? customPlaceholder || placeholder : placeholder}
          onKeyDown={(event) => {
            if (event.key === "Enter") event.preventDefault();
          }}
          className={cn(inputClass, "mt-0 pr-12", invalid && "border-[#B4432F] focus-visible:border-[#B4432F] focus-visible:outline-[#B4432F]")}
        />
        <Combobox.Trigger
          aria-label="Abrir lista"
          className="absolute top-1/2 right-1.5 inline-flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full text-[#1F1F1F]/55"
        >
          <CaretDown weight="bold" className="size-4" aria-hidden />
        </Combobox.Trigger>
      </div>
      <Combobox.Portal>
        <Combobox.Positioner sideOffset={8} className="z-50 w-(--anchor-width) outline-none">
          <Combobox.Popup className="max-h-72 overflow-y-auto rounded-2xl bg-white p-1.5 shadow-[0_16px_40px_rgba(31,31,31,0.12)] ring-1 ring-[#1F1F1F]/10 outline-none">
            {items.length === 0 ? (
              <p className="px-3 py-3 text-sm text-[#1F1F1F]/55">{empty}</p>
            ) : (
              <Combobox.List>
                {(item: Opcao) => (
                  <Combobox.Item
                    key={item.value || item.label}
                    value={item}
                    className="flex min-h-11 cursor-pointer items-center gap-3 rounded-xl px-3 text-sm font-semibold text-[#1F1F1F] outline-none data-highlighted:bg-[#F8F1E3]"
                  >
                    <span className="min-w-0 flex-1 truncate">{item.label}</span>
                    <Combobox.ItemIndicator className="text-[#0F5B63]">
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
  );
}

const UF_OPCOES: Opcao[] = [{ value: "", label: "Escolher" }, ...UFS.map((uf) => ({ value: uf, label: uf }))];

const EMPREENDIMENTO_OPCOES: Opcao[] = [
  { value: "", label: "Ainda não escolhi" },
  ...empreendimentos.map((item) => ({ value: item.nome, label: item.nome })),
  { value: "__outro", label: "Outro" },
];

function UfSelect({ value, onChange, error }: { value: string; onChange: (value: Uf | "") => void; error?: string }) {
  const labelId = "financiamento-uf";
  return (
    <Field label="UF" error={error} plain labelId={labelId}>
      <OptionCombobox
        labelledBy={labelId}
        value={value}
        options={UF_OPCOES}
        placeholder="UF"
        empty="Nenhuma UF com essas letras."
        invalid={Boolean(error)}
        onChange={(next) => onChange(next as Uf | "")}
      />
    </Field>
  );
}

function Choice({
  checked,
  onSelect,
  label,
}: {
  checked: boolean;
  onSelect: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={checked}
      className={cn(
        "min-h-12 cursor-pointer rounded-2xl px-3 text-sm font-semibold ring-1 transition-[color,background-color,box-shadow,ring-color] duration-500",
        checked ? "bg-[#0F5B63] text-white ring-[#0F5B63]" : "bg-white text-[#1F1F1F] ring-[#1F1F1F]/12",
      )}
      style={{ transitionTimingFunction: EASE }}
    >
      {label}
    </button>
  );
}

const TIPO_MOVE = `transform 560ms ${EASE}, width 560ms ${EASE}, height 560ms ${EASE}, opacity 420ms ${EASE}`;

function TipoGrid({ value, onChange }: { value: string; onChange: (id: Draft["tipologia"]) => void }) {
  const gridRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const shown = useRef(false);

  useLayoutEffect(() => {
    const grid = gridRef.current;
    const pill = pillRef.current;
    if (!grid || !pill) return;
    const button = value ? grid.querySelector<HTMLButtonElement>(`[data-tipo="${value}"]`) : null;

    const place = (visible: boolean) => {
      if (!button) {
        pill.style.opacity = "0";
        return;
      }
      pill.style.transform = `translate(${button.offsetLeft}px, ${button.offsetTop}px)`;
      pill.style.width = `${button.offsetWidth}px`;
      pill.style.height = `${button.offsetHeight}px`;
      pill.style.opacity = visible ? "1" : "0";
    };

    const freeze = (fn: () => void) => {
      pill.style.transition = "none";
      fn();
      void pill.offsetWidth;
      pill.style.transition = TIPO_MOVE;
    };

    if (!button) {
      freeze(() => place(false));
      shown.current = false;
    } else if (!shown.current) {
      freeze(() => place(false));
      requestAnimationFrame(() => {
        pill.style.opacity = "1";
      });
      shown.current = true;
    } else {
      place(true);
    }

    const observer = new ResizeObserver(() => freeze(() => place(shown.current)));
    observer.observe(grid);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={gridRef} className="relative grid grid-cols-2 gap-2">
      <span
        ref={pillRef}
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 z-0 rounded-2xl bg-[#0F5B63] opacity-0 will-change-transform motion-reduce:!transition-none"
        style={{ transition: TIPO_MOVE }}
      />
      {TIPOLOGIAS.map((item) => {
        const checked = value === item.id;
        return (
          <button
            key={item.id}
            type="button"
            data-tipo={item.id}
            aria-pressed={checked}
            onClick={() => onChange(item.id)}
            className={cn(
              "relative z-10 min-h-12 cursor-pointer rounded-2xl bg-transparent px-3 text-sm font-semibold ring-1 transition-[color,box-shadow] duration-500",
              checked ? "text-white ring-transparent" : "text-[#1F1F1F] ring-[#1F1F1F]/12",
            )}
            style={{ transitionTimingFunction: EASE }}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}

function inicial(slug?: string): Draft {
  const item = empreendimentos.find((emp) => emp.slug === slug);
  const draft = draftVazio();
  if (!item) return draft;
  return {
    ...draft,
    tipologia: "apartamento",
    cidade: item.cidade,
    uf: UF_POR_CIDADE[item.cidade] ?? "",
    empreendimento: item.nome,
  };
}

export function FinanciamentoForm({ empreendimento }: { empreendimento?: string }) {
  const esconderTipologia = empreendimentos.some((item) => item.slug === empreendimento);
  const [draft, setDraft] = useState<Draft>(() => inicial(empreendimento));
  const [etapaId, setEtapaId] = useState<EtapaId>("imovel");
  const [direction, setDirection] = useState<1 | -1>(1);
  const [tried, setTried] = useState(false);
  const [restored, setRestored] = useState(false);
  const [cepErro, setCepErro] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [resetSignal, setResetSignal] = useState(0);
  const [voltarDaEdicao, setVoltarDaEdicao] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const hydratedRef = useRef(false);
  const stepChangedRef = useRef(false);

  const etapas = useMemo(() => etapasVisiveis(draft.estadoCivil), [draft.estadoCivil]);
  const index = Math.max(0, etapas.findIndex((etapa) => etapa.id === etapaId));
  const etapa = etapas[index] ?? etapas[0];
  const erros = tried ? errosEtapa(etapa.id, draft, { tipologiaObrigatoria: !esconderTipologia }) : {};
  const copy = COPY[etapa.id];

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(DRAFT_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as { at: number; etapaId: EtapaId; draft: unknown };
        if (Date.now() - saved.at < DRAFT_TTL_MS) {
          const next = sanitizeDraft(saved.draft);
          if (esconderTipologia) {
            next.tipologia = "apartamento";
            next.empreendimento = inicial(empreendimento).empreendimento || next.empreendimento;
          }
          setDraft(next);
          setEtapaId(saved.etapaId || "imovel");
          setRestored(true);
        }
      }
    } catch { }
    hydratedRef.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!etapas.some((item) => item.id === etapaId)) setEtapaId("civil");
  }, [etapas, etapaId]);

  useEffect(() => {
    if (!hydratedRef.current || status === "ok") return;
    try {
      window.localStorage.setItem(DRAFT_KEY, JSON.stringify({ at: Date.now(), etapaId, draft }));
    } catch { }
  }, [draft, etapaId, status]);

  useEffect(() => {
    if (!stepChangedRef.current) return;
    const section = sectionRef.current;
    if (section && section.getBoundingClientRect().top < 0) section.scrollIntoView({ block: "start" });
    headingRef.current?.focus({ preventScroll: true });
    track("financiamento_step", { step: String(index + 1), nome: etapa.label });
  }, [etapa.id, etapa.label, index]);

  function update(partial: Partial<Draft>) {
    setDraft((current) => ({ ...current, ...partial }));
  }

  function updatePessoa(qual: "voce" | "conjuge", partial: Partial<Pessoa>) {
    setDraft((current) => ({ ...current, [qual]: { ...current[qual], ...partial } }));
  }

  function goTo(id: EtapaId, fromReview = false) {
    stepChangedRef.current = true;
    const nextIndex = etapas.findIndex((item) => item.id === id);
    setDirection(nextIndex >= index ? 1 : -1);
    setTried(false);
    if (id === "revisao") setVoltarDaEdicao(false);
    else if (fromReview) setVoltarDaEdicao(true);
    setEtapaId(id);
  }

  function continuar() {
    const atuais = errosEtapa(etapa.id, draft, { tipologiaObrigatoria: !esconderTipologia });
    if (Object.keys(atuais).length) {
      setTried(true);
      return;
    }
    if (voltarDaEdicao) {
      goTo("revisao");
      return;
    }
    const next = etapas[index + 1];
    if (next) goTo(next.id);
  }

  async function buscarCep(valor: string) {
    const digits = valor.replace(/\D/g, "");
    if (digits.length !== 8) return;
    setCepErro("");
    try {
      const response = await fetch(`https://viacep.com.br/ws/${digits}/json/`);
      const data = (await response.json()) as { erro?: boolean; logradouro?: string; bairro?: string; localidade?: string; uf?: string };
      if (data.erro) {
        setCepErro("CEP não encontrado.");
        return;
      }
      const uf = UFS.includes(data.uf as Uf) ? (data.uf as Uf) : "";
      setDraft((current) => ({
        ...current,
        logradouro: data.logradouro || current.logradouro,
        bairro: data.bairro || current.bairro,
        cidadeEndereco: data.localidade || current.cidadeEndereco,
        ufEndereco: uf || current.ufEndereco,
      }));
    } catch {
      setCepErro("Não consegui buscar o CEP. Preencha o endereço.");
    }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const invalida = primeiraEtapaInvalida(draft, { tipologiaObrigatoria: !esconderTipologia });
    if (invalida) {
      goTo(invalida);
      setTried(true);
      return;
    }
    const data = new FormData(event.currentTarget);
    data.set("company", "rendal");
    data.set("subject", FINANCIAMENTO_SUBJECT);
    data.set("name", draft.voce.nome);
    data.set("email", draft.voce.email);
    data.set("phone", draft.voce.tel);
    data.set("message", "Cotação de crédito imobiliário");
    data.set("dossier", JSON.stringify(draft));
    setStatus("sending");
    setErrorMessage("");
    const result = await submitContact(data);
    if (result.success) {
      track("financiamento_submit", { empreendimento: draft.empreendimento || "—" });
      setStatus("ok");
      try { window.localStorage.removeItem(DRAFT_KEY); } catch { }
      requestAnimationFrame(() => sectionRef.current?.scrollIntoView({ block: "start" }));
      return;
    }
    setStatus("error");
    setErrorMessage(result.message ?? "Não foi possível enviar agora.");
    setResetSignal((value) => value + 1);
  }

  const whatsappFallback = rendalWhatsapp(
    ["Olá! Quero uma cotação de crédito.", draft.voce.nome && `Nome: ${draft.voce.nome}`, draft.empreendimento && `Imóvel: ${draft.empreendimento}`, draft.valorImovel && `Valor: ${draft.valorImovel}`].filter(Boolean).join("\n"),
  );

  if (status === "ok") {
    const first = draft.voce.nome.trim().split(/\s+/)[0] ?? "";
    return (
      <section ref={sectionRef} id="financiamento" className="scroll-mt-28 overflow-clip rounded-3xl bg-white p-5 ring-1 ring-[#1F1F1F]/10 sm:p-8">
        <span className="inline-flex size-14 items-center justify-center rounded-full bg-[#0F5B63] text-white" aria-hidden>
          <Check weight="bold" className="size-7" />
        </span>
        <h2 className="mt-5 text-2xl font-semibold tracking-tight text-[#1F1F1F] sm:text-3xl">
          {first ? `Pronto, ${first}!` : "Pronto!"} A cotação está com a equipe.
        </h2>
        <p className="mt-2 max-w-xl text-base leading-7 text-[#1F1F1F]/70">O retorno chega em até um dia útil, pelo WhatsApp e pelo e-mail.</p>
        <p className="mt-6 flex gap-2 rounded-2xl bg-[#F8F1E3] p-4 text-sm leading-6 text-[#1F1F1F]/80">
          <ShieldCheck weight="duotone" className="mt-0.5 size-5 shrink-0 text-[#0F5B63]" aria-hidden />
          {FINANCIAMENTO_DISCLAIMER}
        </p>
        <a
          href={whatsappFallback}
          className="mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#0F5B63] px-5 text-base font-semibold text-white"
        >
          <WhatsappLogo weight="fill" className="size-5" aria-hidden />
          Falar agora
        </a>
      </section>
    );
  }

  const pessoa = etapa.id === "conjuge" ? draft.conjuge : draft.voce;
  const prefix = etapa.id === "conjuge" ? "conjuge." : "";
  const qual = etapa.id === "conjuge" ? "conjuge" : "voce";

  return (
    <section ref={sectionRef} id="financiamento" aria-labelledby="financiamento-titulo" className="scroll-mt-28 overflow-clip rounded-3xl bg-white ring-1 ring-[#1F1F1F]/10">
      <div className="grid lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="p-5 sm:p-8">
          <header>
            <p className="inline-flex items-center gap-1.5 rounded-full bg-[#F8F1E3] px-3 py-1 text-xs font-semibold text-[#0F5B63]">
              <Clock weight="bold" className="size-3.5" aria-hidden />
              Cotação de crédito
            </p>
            <h2 id="financiamento-titulo" className="mt-4 text-2xl font-semibold tracking-tight text-balance text-[#1F1F1F] sm:text-3xl">
              Vamos iniciar seu financiamento
            </h2>
            <p className={cn("mt-2 max-w-xl text-base leading-7 text-[#1F1F1F]/70", index > 0 && "max-sm:hidden")}>
              Um passo por vez. Dá para parar e continuar neste aparelho.
            </p>
          </header>

          {restored && index > 0 ? (
            <p className="mt-6 flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-[#F8F1E3] px-4 py-3 text-sm">
              <span>Guardamos suas respostas. Continue de onde parou.</span>
              <button
                type="button"
                className="min-h-11 cursor-pointer font-semibold text-[#0F5B63]"
                onClick={() => {
                  setDraft(inicial(empreendimento));
                  setEtapaId("imovel");
                  setRestored(false);
                  try { window.localStorage.removeItem(DRAFT_KEY); } catch { }
                }}
              >
                Recomeçar
              </button>
            </p>
          ) : null}

          <div className="mt-8">
            <p className="text-sm font-semibold text-[#1F1F1F]">
              Etapa {index + 1} de {etapas.length}
              <span className="font-normal text-[#1F1F1F]/55"> · {etapa.label}</span>
            </p>
            <div
              className="mt-3 grid gap-1.5"
              style={{ gridTemplateColumns: `repeat(${etapas.length}, minmax(0, 1fr))` }}
              role="progressbar"
              aria-valuemin={1}
              aria-valuemax={etapas.length}
              aria-valuenow={index + 1}
              aria-label="Progresso da cotação"
            >
              {etapas.map((item, itemIndex) => (
                <span key={item.id} className="h-1.5 overflow-hidden rounded-full bg-[#EDE6DA]">
                  <span
                    className="block h-full origin-left rounded-full bg-[#0F5B63] transition-transform duration-500"
                    style={{ transform: `scaleX(${itemIndex <= index ? 1 : 0})`, transitionTimingFunction: EASE }}
                  />
                </span>
              ))}
            </div>
          </div>

          <form onSubmit={onSubmit} noValidate className="relative mt-6">
            <HoneypotField />
            <div key={etapa.id} className="rendal-step" style={{ ["--step-from" as string]: `${direction * 16}px` }}>
              <h3 ref={headingRef} tabIndex={-1} className="text-xl font-semibold tracking-tight text-[#1F1F1F] outline-none">
                {copy.title}
              </h3>
              <p className="mt-1 text-sm leading-6 text-[#1F1F1F]/60">{copy.text}</p>

              {etapa.id === "imovel" ? (
                <div className="mt-6 flex flex-col gap-4">
                  {esconderTipologia ? null : (
                    <>
                      <TipoGrid value={draft.tipologia} onChange={(tipologia) => update({ tipologia })} />
                      {erros.tipologia ? <p className="text-sm text-[#B4432F]">{erros.tipologia}</p> : null}
                    </>
                  )}
                  <Field label="Empreendimento" optional plain labelId="financiamento-empreendimento">
                    <OptionCombobox
                      labelledBy="financiamento-empreendimento"
                      value={draft.empreendimento}
                      options={EMPREENDIMENTO_OPCOES}
                      placeholder="Buscar empreendimento"
                      customValue="__outro"
                      customPlaceholder="Digite o nome do imóvel"
                      empty="Nenhum empreendimento com esse nome."
                      onChange={(next) => {
                        const item = empreendimentos.find((emp) => emp.nome === next);
                        update(item
                          ? { empreendimento: next, tipologia: "apartamento", cidade: item.cidade, uf: UF_POR_CIDADE[item.cidade] ?? "" }
                          : { empreendimento: next });
                      }}
                    />
                  </Field>
                  <Field label="Cidade do imóvel" error={erros.cidade}>
                    <input className={inputClass} value={draft.cidade} onChange={(event) => update({ cidade: event.target.value })} />
                  </Field>
                  <UfSelect value={draft.uf} error={erros.uf} onChange={(uf) => update({ uf })} />
                  <Field label="Valor do imóvel" error={erros.valorImovel}>
                    <input inputMode="numeric" className={inputClass} value={draft.valorImovel} placeholder="R$ 0" onChange={(event) => update({ valorImovel: maskMoney(event.target.value) })} />
                  </Field>
                  <div>
                    <p className="text-sm font-semibold text-[#1F1F1F]">Prazo desejado</p>
                    <div className="mt-2 grid grid-cols-3 gap-2">
                      {PRAZOS.map((anos) => (
                        <Choice key={anos} label={`${anos} anos`} checked={draft.prazo === String(anos)} onSelect={() => update({ prazo: String(anos) })} />
                      ))}
                    </div>
                    {erros.prazo ? <p className="mt-1.5 text-sm text-[#B4432F]">{erros.prazo}</p> : null}
                  </div>
                </div>
              ) : null}

              {etapa.id === "valores" ? (
                <div className="mt-6 flex flex-col gap-4">
                  <Field label="Valor de entrada" error={erros.entrada} hint="Zero, se não houver.">
                    <input inputMode="numeric" className={inputClass} value={draft.entrada} placeholder="R$ 0" onChange={(event) => update({ entrada: maskMoney(event.target.value) })} />
                  </Field>
                  <div>
                    <p className="text-sm font-semibold text-[#1F1F1F]">Vai usar FGTS?</p>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      <Choice label="Sim" checked={draft.fgts === "sim"} onSelect={() => update({ fgts: "sim" })} />
                      <Choice label="Não" checked={draft.fgts === "nao"} onSelect={() => update({ fgts: "nao", fgtsValor: "" })} />
                    </div>
                    {erros.fgts ? <p className="mt-1.5 text-sm text-[#B4432F]">{erros.fgts}</p> : null}
                  </div>
                  {draft.fgts === "sim" ? (
                    <Field label="Valor do FGTS" error={erros.fgtsValor}>
                      <input inputMode="numeric" className={inputClass} value={draft.fgtsValor} placeholder="R$ 0" onChange={(event) => update({ fgtsValor: maskMoney(event.target.value) })} />
                    </Field>
                  ) : null}
                  <div>
                    <p className="text-sm font-semibold text-[#1F1F1F]">Tem saldo devedor do imóvel adquirido?</p>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      <Choice label="Sim" checked={draft.saldoDevedor === "sim"} onSelect={() => update({ saldoDevedor: "sim" })} />
                      <Choice label="Não" checked={draft.saldoDevedor === "nao"} onSelect={() => update({ saldoDevedor: "nao", saldoValor: "" })} />
                    </div>
                    {erros.saldoDevedor ? <p className="mt-1.5 text-sm text-[#B4432F]">{erros.saldoDevedor}</p> : null}
                  </div>
                  {draft.saldoDevedor === "sim" ? (
                    <Field label="Valor do saldo devedor" error={erros.saldoValor}>
                      <input inputMode="numeric" className={inputClass} value={draft.saldoValor} placeholder="R$ 0" onChange={(event) => update({ saldoValor: maskMoney(event.target.value) })} />
                    </Field>
                  ) : null}
                </div>
              ) : null}

              {etapa.id === "voce" || etapa.id === "conjuge" ? (
                <div className="mt-6 flex flex-col gap-4">
                  <Field label="Nome completo" error={erros[`${prefix}nome`]}>
                    <input autoComplete="name" className={inputClass} value={pessoa.nome} onChange={(event) => updatePessoa(qual, { nome: event.target.value })} />
                  </Field>
                  <Field label="CPF" error={erros[`${prefix}cpf`]}>
                    <input inputMode="numeric" autoComplete="off" className={inputClass} value={pessoa.cpf} onChange={(event) => updatePessoa(qual, { cpf: maskCpf(event.target.value) })} />
                  </Field>
                  <Field label="Data de nascimento" error={erros[`${prefix}nascimento`]}>
                    <input type="date" className={inputClass} value={pessoa.nascimento} onChange={(event) => updatePessoa(qual, { nascimento: event.target.value })} />
                  </Field>
                  <Field label="Telefone" error={erros[`${prefix}tel`]}>
                    <input inputMode="tel" autoComplete="tel-national" className={inputClass} value={pessoa.tel} placeholder="(00) 00000-0000" onChange={(event) => updatePessoa(qual, { tel: maskPhone(event.target.value) })} />
                  </Field>
                  <Field label="E-mail" error={erros[`${prefix}email`]}>
                    <input type="email" inputMode="email" autoComplete="email" className={inputClass} value={pessoa.email} onChange={(event) => updatePessoa(qual, { email: event.target.value })} />
                  </Field>
                  <Field label="Profissão" error={erros[`${prefix}profissao`]}>
                    <input className={inputClass} value={pessoa.profissao} onChange={(event) => updatePessoa(qual, { profissao: event.target.value })} />
                  </Field>
                  <Field label="Renda mensal" error={erros[`${prefix}renda`]} hint="Valor bruto, antes dos descontos.">
                    <input inputMode="numeric" className={inputClass} value={pessoa.renda} placeholder="R$ 0" onChange={(event) => updatePessoa(qual, { renda: maskMoney(event.target.value) })} />
                  </Field>
                  {etapa.id === "conjuge" ? (
                    <>
                      <Field label="RG com dígito" error={erros["conjuge.rg"]}>
                        <input inputMode="text" autoComplete="off" className={inputClass} value={pessoa.rg} placeholder="00.000.000-0" onChange={(event) => updatePessoa("conjuge", { rg: maskRg(event.target.value) })} />
                      </Field>
                      <Field label="Data de emissão do RG" error={erros["conjuge.rgEmissao"]}>
                        <input type="date" className={inputClass} value={pessoa.rgEmissao} onChange={(event) => updatePessoa("conjuge", { rgEmissao: event.target.value })} />
                      </Field>
                      <Field label="Órgão expedidor" error={erros["conjuge.rgOrgao"]}>
                        <input className={inputClass} value={pessoa.rgOrgao} placeholder="SSP/MG" onChange={(event) => updatePessoa("conjuge", { rgOrgao: event.target.value })} />
                      </Field>
                      <Field label="Nome do pai" error={erros["conjuge.pai"]}>
                        <input className={inputClass} value={pessoa.pai} onChange={(event) => updatePessoa("conjuge", { pai: event.target.value })} />
                      </Field>
                      <Field label="Nome da mãe" error={erros["conjuge.mae"]}>
                        <input className={inputClass} value={pessoa.mae} onChange={(event) => updatePessoa("conjuge", { mae: event.target.value })} />
                      </Field>
                    </>
                  ) : null}
                </div>
              ) : null}

              {etapa.id === "endereco" ? (
                <div className="mt-6 flex flex-col gap-4">
                  <Field label="CEP" error={erros.cep || cepErro}>
                    <input inputMode="numeric" autoComplete="postal-code" className={inputClass} value={draft.cep} placeholder="00000-000" onChange={(event) => { const cep = maskCep(event.target.value); update({ cep }); if (cep.replace(/\D/g, "").length === 8) void buscarCep(cep); }} />
                  </Field>
                  <Field label="Rua" error={erros.logradouro}>
                    <input autoComplete="address-line1" className={inputClass} value={draft.logradouro} onChange={(event) => update({ logradouro: event.target.value })} />
                  </Field>
                  <div className="grid grid-cols-[7rem_minmax(0,1fr)] gap-3">
                    <Field label="Número" error={erros.numero}>
                      <input className={inputClass} value={draft.numero} onChange={(event) => update({ numero: event.target.value })} />
                    </Field>
                    <Field label="Complemento" optional>
                      <input className={inputClass} value={draft.complemento} onChange={(event) => update({ complemento: event.target.value })} />
                    </Field>
                  </div>
                  <Field label="Bairro" error={erros.bairro}>
                    <input className={inputClass} value={draft.bairro} onChange={(event) => update({ bairro: event.target.value })} />
                  </Field>
                  <Field label="Cidade" error={erros.cidadeEndereco}>
                    <input className={inputClass} value={draft.cidadeEndereco} onChange={(event) => update({ cidadeEndereco: event.target.value })} />
                  </Field>
                  <UfSelect value={draft.ufEndereco} error={erros.ufEndereco} onChange={(ufEndereco) => update({ ufEndereco })} />
                </div>
              ) : null}

              {etapa.id === "identidade" ? (
                <div className="mt-6 flex flex-col gap-4">
                  <Field label="RG com dígito" error={erros.rg}>
                    <input inputMode="text" autoComplete="off" className={inputClass} value={draft.voce.rg} placeholder="00.000.000-0" onChange={(event) => updatePessoa("voce", { rg: maskRg(event.target.value) })} />
                  </Field>
                  <Field label="Data de emissão" error={erros.rgEmissao}>
                    <input type="date" className={inputClass} value={draft.voce.rgEmissao} onChange={(event) => updatePessoa("voce", { rgEmissao: event.target.value })} />
                  </Field>
                  <Field label="Órgão expedidor" error={erros.rgOrgao}>
                    <input className={inputClass} value={draft.voce.rgOrgao} placeholder="SSP/MG" onChange={(event) => updatePessoa("voce", { rgOrgao: event.target.value })} />
                  </Field>
                  <Field label="Nome do pai" error={erros.pai}>
                    <input className={inputClass} value={draft.voce.pai} onChange={(event) => updatePessoa("voce", { pai: event.target.value })} />
                  </Field>
                  <Field label="Nome da mãe" error={erros.mae}>
                    <input className={inputClass} value={draft.voce.mae} onChange={(event) => updatePessoa("voce", { mae: event.target.value })} />
                  </Field>
                </div>
              ) : null}

              {etapa.id === "civil" ? (
                <div className="mt-6 flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-2">
                    {ESTADOS_CIVIS.map((item) => (
                      <Choice
                        key={item.id}
                        label={item.label}
                        checked={draft.estadoCivil === item.id}
                        onSelect={() => update({ estadoCivil: item.id, ...(precisaConjuge(item.id) ? {} : { regime: "", dataCasamento: "", compoeRenda: "", conjuge: pessoaVazia(), comprovanteRendaConjuge: "" }) })}
                      />
                    ))}
                  </div>
                  {erros.estadoCivil ? <p className="text-sm text-[#B4432F]">{erros.estadoCivil}</p> : null}
                  {draft.estadoCivil === "casado" ? (
                    <div className="grid gap-2">
                      <p className="text-sm font-semibold text-[#1F1F1F]">Regime de casamento</p>
                      {REGIMES.map((item) => (
                        <Choice key={item.id} label={item.label} checked={draft.regime === item.id} onSelect={() => update({ regime: item.id })} />
                      ))}
                      {erros.regime ? <p className="text-sm text-[#B4432F]">{erros.regime}</p> : null}
                    </div>
                  ) : null}
                  {precisaConjuge(draft.estadoCivil) ? (
                    <>
                      <Field label={draft.estadoCivil === "uniao" ? "Data da união" : "Data do casamento"} error={erros.dataCasamento}>
                        <input type="date" className={inputClass} value={draft.dataCasamento} onChange={(event) => update({ dataCasamento: event.target.value })} />
                      </Field>
                      <div>
                        <p className="text-sm font-semibold text-[#1F1F1F]">O cônjuge vai compor renda?</p>
                        <div className="mt-2 grid grid-cols-2 gap-2">
                          <Choice label="Sim" checked={draft.compoeRenda === "sim"} onSelect={() => update({ compoeRenda: "sim" })} />
                          <Choice label="Não" checked={draft.compoeRenda === "nao"} onSelect={() => update({ compoeRenda: "nao" })} />
                        </div>
                        {erros.compoeRenda ? <p className="mt-1.5 text-sm text-[#B4432F]">{erros.compoeRenda}</p> : null}
                      </div>
                    </>
                  ) : null}
                </div>
              ) : null}

              {etapa.id === "documentos" ? (
                <DocumentosStep
                  draft={draft}
                  erros={erros}
                  onComprovante={(qualComprovante, value) => update(qualComprovante === "renda" ? { comprovanteRenda: value } : { comprovanteRendaConjuge: value })}
                  onArquivos={(id, arquivos) => update({ arquivos: { ...draft.arquivos, [id]: arquivos } })}
                />
              ) : null}

              {etapa.id === "banco" ? (
                <div className="mt-6 flex flex-col gap-4">
                  <div>
                    <p className="text-sm font-semibold text-[#1F1F1F]">Já tem contrato de compra e venda?</p>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      <Choice label="Sim" checked={draft.contrato === "sim"} onSelect={() => update({ contrato: "sim" })} />
                      <Choice label="Não" checked={draft.contrato === "nao"} onSelect={() => update({ contrato: "nao", prazoContrato: "", multa: "" })} />
                    </div>
                    {erros.contrato ? <p className="mt-1.5 text-sm text-[#B4432F]">{erros.contrato}</p> : null}
                  </div>
                  {draft.contrato === "sim" ? (
                    <>
                      <Field label="Data limite de pagamento" error={erros.prazoContrato}>
                        <input type="date" className={inputClass} value={draft.prazoContrato} onChange={(event) => update({ prazoContrato: event.target.value })} />
                      </Field>
                      <div>
                        <p className="text-sm font-semibold text-[#1F1F1F]">Tem multa?</p>
                        <div className="mt-2 grid grid-cols-2 gap-2">
                          <Choice label="Sim" checked={draft.multa === "sim"} onSelect={() => update({ multa: "sim" })} />
                          <Choice label="Não" checked={draft.multa === "nao"} onSelect={() => update({ multa: "nao" })} />
                        </div>
                        {erros.multa ? <p className="mt-1.5 text-sm text-[#B4432F]">{erros.multa}</p> : null}
                      </div>
                    </>
                  ) : null}
                  <ContasBancariasField value={draft.contas} tried={tried} onChange={(contas) => update({ contas })} />
                  {Object.entries(erros).filter(([key]) => key.startsWith("conta.")).length ? (
                    <p className="text-sm text-[#B4432F]">Complete agência, conta e o banco de cada item adicionado.</p>
                  ) : null}
                  <Field label="Observação" optional>
                    <textarea rows={3} maxLength={1500} className={cn(inputClass, "h-auto py-3")} value={draft.obs} onChange={(event) => update({ obs: event.target.value })} />
                  </Field>
                </div>
              ) : null}

              {etapa.id === "revisao" ? (
                <div className="mt-6 flex flex-col gap-3">
                  <Revisao draft={draft} onEdit={(id) => goTo(id, true)} />
                  <p className="flex gap-2 rounded-2xl bg-[#F8F1E3] p-4 text-sm leading-6 text-[#1F1F1F]/80">
                    <ShieldCheck weight="duotone" className="mt-0.5 size-5 shrink-0 text-[#0F5B63]" aria-hidden />
                    {FINANCIAMENTO_DISCLAIMER}
                  </p>
                  <TurnstileField resetSignal={resetSignal} />
                </div>
              ) : null}
            </div>

            <div className={cn("mt-6 flex items-center gap-3", etapa.id === "revisao" && "sticky bottom-0 -mx-5 border-t border-[#1F1F1F]/8 bg-white/95 px-5 py-4 backdrop-blur sm:static sm:mx-0 sm:border-0 sm:bg-transparent sm:p-0")}>
              {index > 0 || voltarDaEdicao ? (
                <button type="button" onClick={() => (voltarDaEdicao ? goTo("revisao") : goTo(etapas[index - 1].id))} className="inline-flex size-12 shrink-0 cursor-pointer items-center justify-center rounded-full text-[#1F1F1F] ring-1 ring-[#1F1F1F]/15" aria-label="Voltar">
                  <ArrowLeft weight="bold" className="size-4" aria-hidden />
                </button>
              ) : null}
              {etapa.id === "revisao" ? (
                <button type="submit" disabled={status === "sending"} className="ml-auto inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-full bg-[#0F5B63] px-6 text-base font-semibold text-white disabled:cursor-wait disabled:opacity-70">
                  {status === "sending" ? "Enviando…" : "Enviar cotação"}
                  {status === "sending" ? null : <ArrowRight weight="bold" className="size-4" aria-hidden />}
                </button>
              ) : (
                <button type="button" onClick={continuar} className="ml-auto inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-full bg-[#0F5B63] px-6 text-base font-semibold text-white">
                  Continuar
                  <ArrowRight weight="bold" className="size-4" aria-hidden />
                </button>
              )}
            </div>
            {status === "error" ? (
              <p className="mt-4 rounded-2xl bg-[#FBEDEA] p-4 text-sm leading-6 text-[#7A2E22]" role="status">
                {errorMessage || "Não foi possível enviar agora."}{" "}
                <a href={whatsappFallback} className="font-semibold underline">Mande pelo WhatsApp</a>.
              </p>
            ) : null}
            {etapa.id === "revisao" ? (
              <p className="mt-4 text-xs leading-5 text-[#1F1F1F]/55">
                Ao enviar, você concorda com o uso destes dados e documentos só para a cotação.{" "}
                <a href="/politica-de-privacidade" className="font-semibold text-[#0F5B63] underline-offset-2 hover:underline">Política de privacidade</a>.
              </p>
            ) : null}
          </form>
        </div>
        <aside className="hidden border-l border-[#1F1F1F]/8 bg-[#F8F1E3]/60 p-8 lg:block" aria-label="Documentos da cotação">
          <div className="sticky top-28">
            <h3 className="text-sm font-semibold text-[#1F1F1F]/55">Documentos</h3>
            <ul className="mt-3 flex flex-col gap-2 text-sm">
              {documentosDaCotacao(draft).map((slot) => {
                const ok = (draft.arquivos[slot.id]?.length ?? 0) >= slot.min;
                return (
                  <li key={slot.id} className="flex items-start gap-2">
                    <Check weight="bold" className={cn("mt-0.5 size-4 shrink-0", ok ? "text-[#0F5B63]" : "text-[#1F1F1F]/25")} aria-hidden />
                    <span className={ok ? "font-semibold text-[#1F1F1F]" : "text-[#1F1F1F]/60"}>{slot.label}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}

function Revisao({ draft, onEdit }: { draft: Draft; onEdit: (id: EtapaId) => void }) {
  const blocos: { id: EtapaId; titulo: string; linhas: string[] }[] = [
    { id: "imovel", titulo: "Imóvel", linhas: [labelTipologia(draft.tipologia), `${draft.cidade}/${draft.uf}`, draft.valorImovel, draft.prazo ? `${draft.prazo} anos` : ""].filter(Boolean) },
    { id: "valores", titulo: "Valores", linhas: [`Entrada ${draft.entrada}`, draft.fgts === "sim" ? `FGTS ${draft.fgtsValor}` : "Sem FGTS", draft.saldoDevedor === "sim" ? `Saldo devedor ${draft.saldoValor}` : "Sem saldo devedor"] },
    { id: "voce", titulo: "Você", linhas: [draft.voce.nome, draft.voce.cpf, draft.voce.renda] },
    { id: "endereco", titulo: "Endereço", linhas: [`${draft.logradouro}, ${draft.numero}`, `${draft.cidadeEndereco}/${draft.ufEndereco}`, draft.cep] },
    { id: "identidade", titulo: "Identidade", linhas: [draft.voce.rg, draft.voce.rgOrgao, formatDataBr(draft.voce.rgEmissao)] },
    { id: "civil", titulo: "Estado civil", linhas: [labelEstadoCivil(draft.estadoCivil), labelRegime(draft.regime), formatDataBr(draft.dataCasamento)].filter(Boolean) },
  ];
  if (precisaConjuge(draft.estadoCivil)) {
    blocos.push({ id: "conjuge", titulo: "Cônjuge", linhas: [draft.conjuge.nome, draft.conjuge.cpf, draft.compoeRenda === "sim" ? "Compõe renda" : "Não compõe renda"] });
  }
  blocos.push({
    id: "documentos",
    titulo: "Documentos",
    linhas: documentosDaCotacao(draft).map((slot) => `${slot.label}: ${draft.arquivos[slot.id]?.length ?? 0}`),
  });
  blocos.push({
    id: "banco",
    titulo: "Banco e contrato",
    linhas: [
      draft.contrato === "sim" ? `Contrato até ${formatDataBr(draft.prazoContrato)}` : "Sem contrato",
      draft.contas.length ? `${draft.contas.length} conta${draft.contas.length > 1 ? "s" : ""}` : "Sem conta",
    ],
  });
  return (
    <ul className="flex flex-col gap-2">
      {blocos.map((bloco) => (
        <li key={bloco.id}>
          <button type="button" onClick={() => onEdit(bloco.id)} className="flex w-full cursor-pointer items-center gap-3 rounded-2xl bg-[#F8F1E3]/80 px-4 py-3 text-left">
            <span className="min-w-0 flex-1">
              <span className="text-xs font-semibold tracking-wide text-[#0F5B63] uppercase">{bloco.titulo}</span>
              <span className="mt-1 block text-sm leading-6 text-[#1F1F1F]">{bloco.linhas.join(" · ")}</span>
            </span>
            <PencilSimple weight="bold" className="size-4 shrink-0 text-[#0F5B63]" aria-hidden />
            <span className="sr-only">Editar {bloco.titulo}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}
