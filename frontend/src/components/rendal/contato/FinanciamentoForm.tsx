"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Bank,
  Briefcase,
  CaretDown,
  Check,
  Clock,
  DotsThree,
  FileText,
  PencilSimple,
  Plus,
  ShieldCheck,
  Storefront,
  WhatsappLogo,
} from "@phosphor-icons/react";
import { Combobox } from "@base-ui/react/combobox";
import { submitContact } from "@/lib/actions";
import { HoneypotField } from "@/components/contato/HoneypotField";
import { TurnstileField } from "@/components/contato/TurnstileField";
import { empreendimentos } from "@/lib/rendal/content/empreendimentos";
import {
  checklistFinanciamento,
  checklistText,
  FAIXAS_RENDA,
  FINANCIAMENTO_DISCLAIMER,
  FINANCIAMENTO_SUBJECT,
  isFgts,
  isTipoRenda,
  labelFgts,
  labelTipoRenda,
  OPCOES_FGTS,
  TIPOS_RENDA,
  type ChecklistItem,
  type FgtsId,
  type TipoRendaId,
} from "@/lib/rendal/financiamento";
import { rendalWhatsapp } from "@/lib/rendal/site";
import { track } from "@/lib/rendal/track";
import { EASE } from "@/lib/rendal/tokens";
import { cn } from "@/lib/utils";

type Draft = {
  tipoRenda: TipoRendaId | "";
  faixa: string;
  fgts: FgtsId | "";
  name: string;
  phone: string;
  email: string;
  empreendimento: string;
  obs: string;
};

const EMPTY: Draft = {
  tipoRenda: "",
  faixa: "",
  fgts: "",
  name: "",
  phone: "",
  email: "",
  empreendimento: "",
  obs: "",
};

const STEPS = ["Renda", "Valor", "FGTS", "Contato"] as const;
const LAST = STEPS.length - 1;
const DRAFT_KEY = "rendal:financiamento:v1";
const DRAFT_TTL_MS = 7 * 24 * 60 * 60 * 1000;

const RENDA_ICON: Record<TipoRendaId, typeof Bank> = {
  clt: Briefcase,
  autonomo: Storefront,
  servidor: Bank,
  outro: DotsThree,
};

const EMAIL_RE = /^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/i;

function maskPhone(value: string) {
  const d = value.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

function contactErrors(draft: Draft) {
  const phone = draft.phone.replace(/\D/g, "");
  const email = draft.email.trim();
  return {
    name: draft.name.trim().length < 2 ? "Como podemos te chamar?" : "",
    phone: phone.length < 10 ? "Confira o número com DDD." : "",
    email: email && !EMAIL_RE.test(email) ? "Esse e-mail parece incompleto." : "",
  };
}

function readDraft(): { draft: Draft; step: number } | null {
  try {
    const raw = window.localStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    const saved = JSON.parse(raw) as { at: number; step: number; draft: Partial<Draft> };
    if (Date.now() - saved.at > DRAFT_TTL_MS) return null;
    const draft = { ...EMPTY, ...saved.draft };
    if (!isTipoRenda(draft.tipoRenda)) draft.tipoRenda = "";
    if (!isFgts(draft.fgts)) draft.fgts = "";
    if (!FAIXAS_RENDA.some((item) => item === draft.faixa)) draft.faixa = "";
    const hasAnswer = draft.tipoRenda || draft.faixa || draft.fgts || draft.name || draft.phone;
    if (!hasAnswer) return null;
    return { draft, step: Math.min(Math.max(saved.step, 0), LAST) };
  } catch {
    return null;
  }
}

export function FinanciamentoForm({ empreendimento }: { empreendimento?: string }) {
  const initialEmp = empreendimentos.find((item) => item.slug === empreendimento)?.nome ?? "";
  const [draft, setDraft] = useState<Draft>({ ...EMPTY, empreendimento: initialEmp });
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [returnTo, setReturnTo] = useState<number | null>(null);
  const [restored, setRestored] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [tried, setTried] = useState(false);
  const [showObs, setShowObs] = useState(false);
  const [docsOpen, setDocsOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [resetSignal, setResetSignal] = useState(0);
  const [sent, setSent] = useState<{ first: string; checklist: ChecklistItem[] } | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const hydratedRef = useRef(false);
  const stepChangedRef = useRef(false);
  const startedRef = useRef(false);

  const checklist = useMemo(
    () => checklistFinanciamento({ tipoRenda: draft.tipoRenda, fgts: draft.fgts }),
    [draft.tipoRenda, draft.fgts],
  );
  const errors = contactErrors(draft);

  useEffect(() => {
    const saved = readDraft();
    if (saved) {
      setDraft({ ...saved.draft, empreendimento: initialEmp || saved.draft.empreendimento });
      setStep(saved.step);
      setShowObs(Boolean(saved.draft.obs));
      setRestored(true);
    }
    hydratedRef.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!hydratedRef.current || status === "ok") return;
    try {
      window.localStorage.setItem(DRAFT_KEY, JSON.stringify({ at: Date.now(), step, draft }));
    } catch { }
  }, [draft, step, status]);

  useEffect(() => {
    if (!stepChangedRef.current) return;
    const section = sectionRef.current;
    if (section && section.getBoundingClientRect().top < 0) {
      section.scrollIntoView({ block: "start" });
    }
    headingRef.current?.focus({ preventScroll: true });
    track("financiamento_step", { step: String(step + 1), nome: STEPS[step] });
  }, [step]);

  function update<K extends keyof Draft>(key: K, value: Draft[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
    if (!startedRef.current) {
      startedRef.current = true;
      track("financiamento_start");
    }
  }

  function goTo(next: number) {
    stepChangedRef.current = true;
    setDirection(next > step ? 1 : -1);
    setStep(next);
  }

  function advance() {
    if (returnTo !== null) {
      goTo(returnTo);
      setReturnTo(null);
      return;
    }
    goTo(Math.min(step + 1, LAST));
  }

  function edit(target: number) {
    setReturnTo(step);
    goTo(target);
  }

  function restart() {
    setDraft({ ...EMPTY, empreendimento: initialEmp });
    setTouched({});
    setTried(false);
    setShowObs(false);
    setRestored(false);
    setReturnTo(null);
    goTo(0);
    try {
      window.localStorage.removeItem(DRAFT_KEY);
    } catch { }
  }

  const answered = [Boolean(draft.tipoRenda), Boolean(draft.faixa), Boolean(draft.fgts)];

  function summaryLines() {
    return [
      `Tipo de renda: ${labelTipoRenda(draft.tipoRenda) || "—"}`,
      `Renda bruta mensal: ${draft.faixa || "—"}`,
      `FGTS: ${labelFgts(draft.fgts) || "—"}`,
      `Empreendimento: ${draft.empreendimento || "Ainda não escolhi"}`,
    ];
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTried(true);
    const invalid = (Object.keys(errors) as Array<keyof typeof errors>).find((key) => errors[key]);
    if (invalid) {
      event.currentTarget.querySelector<HTMLInputElement>(`[name="${invalid}"]`)?.focus();
      return;
    }

    const data = new FormData(event.currentTarget);
    const obs = draft.obs.trim();
    data.set("company", "rendal");
    data.set("subject", FINANCIAMENTO_SUBJECT);
    data.set("emailOptional", "1");
    data.set("tipoRenda", draft.tipoRenda);
    data.set("fgts", draft.fgts);
    data.set("empreendimento", draft.empreendimento);
    data.set(
      "message",
      [
        "Perfil: financiar (pré-aprovação)",
        ...summaryLines(),
        obs ? `\nObservação:\n${obs}` : "",
        "\nChecklist de documentos para orientar:",
        checklistText(checklist),
        `\n${FINANCIAMENTO_DISCLAIMER}`,
      ]
        .filter(Boolean)
        .join("\n"),
    );

    setStatus("sending");
    setErrorMessage("");
    const result = await submitContact(data);
    if (result.success) {
      track("financiamento_submit", {
        renda: draft.tipoRenda || "—",
        fgts: draft.fgts || "—",
        empreendimento: draft.empreendimento || "—",
      });
      setSent({ first: draft.name.trim().split(/\s+/)[0] ?? "", checklist });
      setStatus("ok");
      try {
        window.localStorage.removeItem(DRAFT_KEY);
      } catch { }
      requestAnimationFrame(() => sectionRef.current?.scrollIntoView({ block: "start" }));
      return;
    }
    setStatus("error");
    setErrorMessage(result.message);
    setResetSignal((value) => value + 1);
  }

  const whatsappFallback = rendalWhatsapp(
    [
      "Olá! Quero uma orientação de crédito.",
      draft.name.trim() ? `Nome: ${draft.name.trim()}` : "",
      ...summaryLines(),
    ]
      .filter(Boolean)
      .join("\n"),
  );

  return (
    <section
      ref={sectionRef}
      id="financiamento"
      aria-labelledby="financiamento-titulo"
      className="scroll-mt-28 overflow-clip rounded-3xl bg-white ring-1 ring-[#1F1F1F]/10"
    >
      {status === "ok" && sent ? (
        <Success first={sent.first} checklist={sent.checklist} />
      ) : (
        <div className="grid lg:grid-cols-[minmax(0,1fr)_22rem]">
          <div className="p-5 sm:p-8">
            <header>
              <p className="inline-flex items-center gap-1.5 rounded-full bg-[#F8F1E3] px-3 py-1 text-xs font-semibold text-[#0F5B63]">
                <Clock weight="bold" className="size-3.5" aria-hidden />
                Pré-aprovação · menos de 1 minuto
              </p>
              <h2
                id="financiamento-titulo"
                className="mt-4 text-2xl font-semibold tracking-tight text-balance text-[#1F1F1F] sm:text-3xl"
              >
                Descubra quanto cabe no seu nome
              </h2>
              <p className={cn("mt-2 max-w-xl text-base leading-7 text-pretty text-[#1F1F1F]/70", step > 0 && "max-sm:hidden")}>
                Quatro respostas rápidas e a equipe da Rendal retorna uma orientação de crédito, antes de você escolher a unidade.
              </p>
              <ul className={cn("mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-[#1F1F1F]/70", step > 0 && "max-sm:hidden")}>
                {["Sem consulta ao CPF", "Sem compromisso", "Retorno em até 1 dia útil"].map((item) => (
                  <li key={item} className="inline-flex items-center gap-1.5">
                    <Check weight="bold" className="size-4 text-[#0F5B63]" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </header>

            {restored && step > 0 ? (
              <p className="mt-6 flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-[#F8F1E3] px-4 py-3 text-sm text-[#1F1F1F]">
                <span>Guardamos suas respostas. Continue de onde parou.</span>
                <button
                  type="button"
                  onClick={restart}
                  className="min-h-11 cursor-pointer px-1 font-semibold text-[#0F5B63] underline-offset-2 hover:underline"
                >
                  Recomeçar
                </button>
              </p>
            ) : null}

            <Progress step={step} />

            <form onSubmit={onSubmit} noValidate className="relative mt-6">
              <HoneypotField />
              <div
                key={step}
                className="rendal-step"
                style={{ ["--step-from" as string]: `${direction * 16}px` }}
              >
                <h3
                  ref={headingRef}
                  tabIndex={-1}
                  className="text-xl font-semibold tracking-tight text-balance text-[#1F1F1F] outline-none sm:text-2xl"
                >
                  {step === 0 && "Como você recebe sua renda?"}
                  {step === 1 && "Quanto entra por mês, em média?"}
                  {step === 2 && "Pretende usar o FGTS?"}
                  {step === 3 && "Pronto! Para onde mandamos sua orientação?"}
                </h3>
                <p className="mt-1.5 text-sm leading-6 text-pretty text-[#1F1F1F]/65">
                  {step === 0 && "Isso define quais documentos você vai precisar."}
                  {step === 1 && "Valor bruto, antes dos descontos. Se vai comprar com alguém, some as rendas."}
                  {step === 2 && "Ele pode entrar na entrada ou abater parcelas. Na dúvida, a equipe explica."}
                  {step === 3 && "Usamos só para te retornar. Nada de spam."}
                </p>

                {step === 0 ? (
                  <Choices legend="Tipo de renda" className="sm:grid-cols-2">
                    {TIPOS_RENDA.map((item) => {
                      const Icon = RENDA_ICON[item.id];
                      return (
                        <Choice
                          key={item.id}
                          name="tipoRendaChoice"
                          checked={draft.tipoRenda === item.id}
                          onSelect={() => update("tipoRenda", item.id)}
                          icon={<Icon weight="duotone" className="size-7 shrink-0" aria-hidden />}
                          label={item.label}
                          hint={item.hint}
                        />
                      );
                    })}
                  </Choices>
                ) : null}

                {step === 1 ? (
                  <Choices legend="Renda bruta mensal" className="sm:grid-cols-2">
                    {FAIXAS_RENDA.map((item) => (
                      <Choice
                        key={item}
                        name="faixaChoice"
                        checked={draft.faixa === item}
                        onSelect={() => update("faixa", item)}
                        label={item}
                        muted={item === "Prefiro não dizer agora"}
                      />
                    ))}
                  </Choices>
                ) : null}

                {step === 2 ? (
                  <Choices legend="Uso do FGTS" className="grid-cols-3">
                    {OPCOES_FGTS.map((item) => (
                      <Choice
                        key={item.id}
                        name="fgtsChoice"
                        checked={draft.fgts === item.id}
                        onSelect={() => update("fgts", item.id)}
                        label={item.label}
                        center
                      />
                    ))}
                  </Choices>
                ) : null}

                {step === 3 ? (
                  <div className="mt-6 flex flex-col gap-4">
                    <Answers draft={draft} onEdit={edit} />
                    <TextField
                      label="Nome completo"
                      name="name"
                      autoComplete="name"
                      value={draft.name}
                      onChange={(value) => update("name", value)}
                      onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                      error={(touched.name || tried) && errors.name}
                      valid={!errors.name}
                    />
                    <TextField
                      label="WhatsApp"
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel-national"
                      placeholder="(00) 00000-0000"
                      value={draft.phone}
                      onChange={(value) => update("phone", maskPhone(value))}
                      onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
                      error={(touched.phone || tried) && errors.phone}
                      valid={!errors.phone}
                      hint="A orientação chega por aqui."
                    />
                    <TextField
                      label="E-mail"
                      optional
                      name="email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      value={draft.email}
                      onChange={(value) => update("email", value)}
                      onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                      error={(touched.email || tried) && errors.email}
                      valid={Boolean(draft.email.trim()) && !errors.email}
                      hint="Para receber a lista de documentos."
                    />
                    <EmpreendimentoField
                      value={draft.empreendimento}
                      onChange={(value) => update("empreendimento", value)}
                    />
                    {showObs ? (
                      <label className="block text-sm font-semibold text-[#1F1F1F]">
                        Observação <span className="font-normal text-[#1F1F1F]/55">(opcional)</span>
                        <textarea
                          value={draft.obs}
                          onChange={(event) => update("obs", event.target.value)}
                          rows={3}
                          maxLength={1500}
                          placeholder="Ex.: vou comprar com meu cônjuge, tenho um valor de entrada…"
                          className={cn(inputClass, "h-auto py-3")}
                          autoFocus={!draft.obs}
                        />
                      </label>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setShowObs(true)}
                        className="inline-flex min-h-11 cursor-pointer items-center gap-2 self-start text-sm font-semibold text-[#0F5B63]"
                      >
                        <Plus weight="bold" className="size-4" aria-hidden />
                        Adicionar observação
                      </button>
                    )}

                    <p className="flex gap-2 rounded-2xl bg-[#F8F1E3] p-4 text-sm leading-6 text-[#1F1F1F]/80">
                      <ShieldCheck weight="duotone" className="mt-0.5 size-5 shrink-0 text-[#0F5B63]" aria-hidden />
                      {FINANCIAMENTO_DISCLAIMER}
                    </p>
                    <TurnstileField resetSignal={resetSignal} />
                  </div>
                ) : null}
              </div>

              <div
                className={cn(
                  "mt-6 flex items-center gap-3",
                  step === LAST && "sticky bottom-0 -mx-5 border-t border-[#1F1F1F]/8 bg-white/95 px-5 py-4 backdrop-blur sm:static sm:mx-0 sm:border-0 sm:bg-transparent sm:p-0 sm:backdrop-blur-none",
                )}
              >
                {step > 0 ? (
                  <button
                    type="button"
                    onClick={() => goTo(step - 1)}
                    className="inline-flex size-12 shrink-0 cursor-pointer items-center justify-center rounded-full text-[#1F1F1F] ring-1 ring-[#1F1F1F]/15 transition-colors duration-300 hover:bg-[#F8F1E3] sm:w-auto sm:gap-2 sm:px-5"
                    aria-label="Voltar"
                  >
                    <ArrowLeft weight="bold" className="size-4" aria-hidden />
                    <span className="hidden text-base font-semibold sm:inline">Voltar</span>
                  </button>
                ) : null}
                {step < LAST ? (
                  answered[step] ? (
                    <button
                      type="button"
                      onClick={advance}
                      className="inline-flex h-12 flex-1 cursor-pointer items-center justify-center gap-2 rounded-full bg-[#0F5B63] px-6 text-base font-semibold text-white transition-colors duration-700 hover:bg-[#0A474E] sm:flex-none"
                      style={{ transitionTimingFunction: EASE }}
                    >
                      Continuar
                      <ArrowRight weight="bold" className="size-4" aria-hidden />
                    </button>
                  ) : (
                    <p className="text-sm text-[#1F1F1F]/55">Toque em uma opção para seguir.</p>
                  )
                ) : (
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="inline-flex h-12 flex-1 cursor-pointer items-center justify-center gap-2 rounded-full bg-[#0F5B63] px-6 text-base font-semibold text-white transition-colors duration-700 hover:bg-[#0A474E] disabled:cursor-wait disabled:opacity-70 sm:flex-none"
                    style={{ transitionTimingFunction: EASE }}
                  >
                    {status === "sending" ? (
                      <>
                        <span className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden />
                        Enviando…
                      </>
                    ) : (
                      <>
                        Receber minha orientação
                        <ArrowRight weight="bold" className="size-4" aria-hidden />
                      </>
                    )}
                  </button>
                )}
              </div>

              <div role="status" aria-live="polite">
                {status === "error" ? (
                  <div className="mt-4 rounded-2xl bg-[#FBEDEA] p-4 text-sm leading-6 text-[#7A2E22]">
                    <p className="font-semibold">{errorMessage || "Não foi possível enviar agora."}</p>
                    <p className="mt-1">
                      Suas respostas continuam aqui. Tente de novo ou{" "}
                      <a href={whatsappFallback} className="font-semibold underline underline-offset-2">
                        mande direto pelo WhatsApp
                      </a>
                      .
                    </p>
                  </div>
                ) : null}
              </div>

              {step === LAST ? (
                <p className="mt-4 text-xs leading-5 text-[#1F1F1F]/55">
                  Ao enviar, você concorda com o uso dos dados para retorno deste contato.{" "}
                  <a href="/politica-de-privacidade" className="font-semibold text-[#0F5B63] underline-offset-2 hover:underline">
                    Política de privacidade
                  </a>
                  .
                </p>
              ) : null}

              <div className={cn("mt-6 lg:hidden", step === LAST && "pb-24 sm:pb-0")}>
                <DocsToggle open={docsOpen} onToggle={() => setDocsOpen((v) => !v)} checklist={checklist} />
              </div>
            </form>
          </div>

          <aside
            aria-label="Resumo e documentos"
            className="hidden border-l border-[#1F1F1F]/8 bg-[#F8F1E3]/60 p-8 lg:block"
          >
            <div className="sticky top-28">
              <h3 className="text-sm font-semibold text-[#1F1F1F]/55">Seu perfil</h3>
              <dl className="mt-3 flex flex-col gap-2 text-sm">
                {[
                  { label: "Renda", value: labelTipoRenda(draft.tipoRenda), step: 0 },
                  { label: "Valor", value: draft.faixa, step: 1 },
                  { label: "FGTS", value: labelFgts(draft.fgts), step: 2 },
                ].map((row) => (
                  <div key={row.label} className="flex items-center justify-between gap-3">
                    <dt className="text-[#1F1F1F]/60">{row.label}</dt>
                    <dd className={cn("text-right font-semibold", row.value ? "text-[#1F1F1F]" : "text-[#1F1F1F]/30")}>
                      {row.value || "—"}
                    </dd>
                  </div>
                ))}
                {draft.empreendimento ? (
                  <div className="flex items-center justify-between gap-3">
                    <dt className="text-[#1F1F1F]/60">Imóvel</dt>
                    <dd className="text-right font-semibold text-[#1F1F1F]">{draft.empreendimento}</dd>
                  </div>
                ) : null}
              </dl>

              <div className="mt-8 flex items-baseline justify-between gap-2">
                <h3 className="text-sm font-semibold text-[#1F1F1F]/55">O que preparar</h3>
                <span className="text-xs text-[#1F1F1F]/55">{checklist.length} documentos</span>
              </div>
              <DocList checklist={checklist} className="mt-3" />
              <p className="mt-4 text-xs leading-5 text-[#1F1F1F]/55">
                Não precisa enviar nada agora. Só vá separando.
              </p>
            </div>
          </aside>
        </div>
      )}
    </section>
  );
}

const inputClass =
  "mt-2 h-12 w-full rounded-2xl border border-[#1F1F1F]/15 bg-white px-4 text-base font-normal text-[#1F1F1F] outline-none transition-colors duration-300 placeholder:text-[#1F1F1F]/35 focus-visible:border-[#0F5B63] focus-visible:outline-2 focus-visible:outline-[#0F5B63]";

const EMP_MAX = 80;

type EmpChoice = { kind: "none" } | { kind: "listed" | "custom"; nome: string };

function fold(value: string) {
  return value.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();
}

function toChoice(value: string): EmpChoice {
  const nome = value.trim();
  if (!nome) return { kind: "none" };
  return empreendimentos.some((item) => item.nome === nome)
    ? { kind: "listed", nome }
    : { kind: "custom", nome: nome.slice(0, EMP_MAX) };
}

function choiceLabel(choice: EmpChoice) {
  return choice.kind === "none" ? "" : choice.nome;
}

function sameChoice(a: EmpChoice, b: EmpChoice) {
  if (a.kind === "none" || b.kind === "none") return a.kind === b.kind;
  return a.kind === b.kind && a.nome === b.nome;
}

function empreendimentoItems(query: string): EmpChoice[] {
  const typed = query.trim().slice(0, EMP_MAX);
  const exact = empreendimentos.some((item) => fold(item.nome) === fold(typed));
  const items: EmpChoice[] = [{ kind: "none" }, ...empreendimentos.map((item) => ({ kind: "listed" as const, nome: item.nome }))];
  if (typed && !exact) items.push({ kind: "custom", nome: typed });
  return items;
}

function EmpreendimentoField({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const [query, setQuery] = useState("");
  const selected = useMemo(() => toChoice(value), [value]);
  const items = useMemo(() => empreendimentoItems(query), [query]);

  return (
    <div className="text-sm font-semibold text-[#1F1F1F]">
      <span id="fin-emp-label">
        Empreendimento <span className="font-normal text-[#1F1F1F]/55">(opcional)</span>
      </span>
      <Combobox.Root
        items={items}
        value={selected}
        onValueChange={(next) => onChange(next && next.kind !== "none" ? next.nome : "")}
        onInputValueChange={setQuery}
        itemToStringLabel={choiceLabel}
        isItemEqualToValue={sameChoice}
        autoHighlight
      >
        <div className="relative mt-2">
          <Combobox.Input
            aria-labelledby="fin-emp-label"
            placeholder="Buscar ou escrever outro nome"
            className={cn(inputClass, "mt-0 pr-12")}
          />
          <Combobox.Trigger
            aria-label="Abrir lista de empreendimentos"
            className="absolute top-1/2 right-1.5 inline-flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full text-[#1F1F1F]/55"
          >
            <CaretDown weight="bold" className="size-4" aria-hidden />
          </Combobox.Trigger>
        </div>
        <Combobox.Portal>
          <Combobox.Positioner sideOffset={8} className="z-50 w-(--anchor-width) outline-none">
            <Combobox.Popup className="max-h-72 overflow-y-auto rounded-2xl bg-white p-1.5 shadow-[0_16px_40px_rgba(31,31,31,0.12)] ring-1 ring-[#1F1F1F]/10 outline-none">
              <Combobox.List>
                {(item: EmpChoice) => (
                  <Combobox.Item
                    key={item.kind === "none" ? "none" : `${item.kind}:${item.nome}`}
                    value={item}
                    className={cn(
                      "flex min-h-11 cursor-pointer items-center gap-2 rounded-xl px-3 text-sm font-semibold text-[#1F1F1F] outline-none data-highlighted:bg-[#F8F1E3]",
                      item.kind === "custom" && "text-[#0F5B63]",
                      item.kind === "none" && "font-medium text-[#1F1F1F]/60",
                    )}
                  >
                    {item.kind === "custom" ? <Plus weight="bold" className="size-4 shrink-0" aria-hidden /> : null}
                    <span className="min-w-0 flex-1 truncate">
                      {item.kind === "none" ? "Ainda não escolhi" : item.kind === "custom" ? `Usar “${item.nome}”` : item.nome}
                    </span>
                    {item.kind === "listed" ? (
                      <Combobox.ItemIndicator className="text-[#0F5B63]">
                        <Check weight="bold" className="size-4" aria-hidden />
                      </Combobox.ItemIndicator>
                    ) : null}
                  </Combobox.Item>
                )}
              </Combobox.List>
            </Combobox.Popup>
          </Combobox.Positioner>
        </Combobox.Portal>
      </Combobox.Root>
      <p className="mt-1.5 font-normal text-[#1F1F1F]/55">Não está na lista? Escreva o nome e toque em Usar.</p>
    </div>
  );
}

function Progress({ step }: { step: number }) {
  return (
    <div className={cn("mt-8", step > 0 && "max-sm:mt-5")}>
      <div className="flex items-baseline justify-between gap-3 text-sm">
        <p className="font-semibold text-[#1F1F1F]">
          {step === LAST ? "Última etapa" : `Etapa ${step + 1} de ${STEPS.length}`}
          <span className="font-normal text-[#1F1F1F]/55"> · {STEPS[step]}</span>
        </p>
        <p className="text-[#1F1F1F]/55" aria-hidden>
          {Math.round(((step + 1) / STEPS.length) * 100)}%
        </p>
      </div>
      <div
        className="mt-3 grid grid-cols-4 gap-1.5"
        role="progressbar"
        aria-label="Progresso"
        aria-valuemin={1}
        aria-valuemax={STEPS.length}
        aria-valuenow={step + 1}
        aria-valuetext={`Etapa ${step + 1} de ${STEPS.length}`}
      >
        {STEPS.map((label, index) => (
          <span key={label} className="h-1.5 overflow-hidden rounded-full bg-[#EDE6DA]">
            <span
              className="block h-full origin-left rounded-full bg-[#0F5B63] transition-transform duration-500"
              style={{ transform: `scaleX(${index <= step ? 1 : 0})`, transitionTimingFunction: EASE }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}

function Choices({
  legend,
  className,
  children,
}: {
  legend: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <fieldset className="mt-6">
      <legend className="sr-only">{legend}</legend>
      <div className={cn("grid gap-3", className)}>{children}</div>
    </fieldset>
  );
}

function Choice({
  name,
  checked,
  onSelect,
  label,
  hint,
  icon,
  center,
  muted,
}: {
  name: string;
  checked: boolean;
  onSelect: () => void;
  label: string;
  hint?: string;
  icon?: ReactNode;
  center?: boolean;
  muted?: boolean;
}) {
  return (
    <label
      className={cn(
        "group relative flex min-h-16 cursor-pointer items-center gap-3 rounded-2xl px-4 py-3 ring-1 transition-[background-color,color,box-shadow,transform] duration-300 select-none active:scale-[0.98]",
        "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[#0F5B63]",
        checked
          ? "bg-[#0F5B63] text-white ring-[#0F5B63]"
          : "bg-white text-[#1F1F1F] ring-[#1F1F1F]/12 hover:ring-[#0F5B63]/45",
        center && "justify-center text-center",
      )}
      style={{ transitionTimingFunction: EASE }}
    >
      <input
        type="radio"
        name={name}
        checked={checked}
        onChange={onSelect}
        onClick={() => checked && onSelect()}
        className="sr-only"
      />
      {icon}
      <span className={cn("flex min-w-0 flex-col", !center && "flex-1")}>
        <span className={cn("text-base font-semibold", muted && !checked && "text-[#1F1F1F]/65")}>{label}</span>
        {hint ? (
          <span className={cn("text-sm", checked ? "text-white/75" : "text-[#1F1F1F]/55")}>{hint}</span>
        ) : null}
      </span>
      {!center ? (
        <span
          className={cn(
            "inline-flex size-6 shrink-0 items-center justify-center rounded-full transition-colors duration-300",
            checked ? "bg-white text-[#0F5B63]" : "ring-1 ring-[#1F1F1F]/20",
          )}
          aria-hidden
        >
          {checked ? <Check weight="bold" className="size-3.5" /> : null}
        </span>
      ) : null}
    </label>
  );
}

function Answers({ draft, onEdit }: { draft: Draft; onEdit: (step: number) => void }) {
  const items = [
    { value: labelTipoRenda(draft.tipoRenda), text: labelTipoRenda(draft.tipoRenda), step: 0, label: "tipo de renda" },
    { value: draft.faixa, text: draft.faixa, step: 1, label: "renda mensal" },
    { value: labelFgts(draft.fgts), text: draft.fgts ? `FGTS: ${labelFgts(draft.fgts)}` : "", step: 2, label: "FGTS" },
  ];
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Suas respostas">
      {items.map((item) => (
        <li key={item.step}>
          <button
            type="button"
            onClick={() => onEdit(item.step)}
            className="inline-flex min-h-9 cursor-pointer items-center gap-1.5 rounded-full bg-[#F8F1E3] px-3 text-sm font-semibold text-[#1F1F1F] transition-colors duration-300 hover:bg-[#EDE6DA]"
            aria-label={`Alterar ${item.label}${item.value ? `: ${item.value}` : ""}`}
          >
            {item.text || <span className="text-[#1F1F1F]/45">Responder {item.label}</span>}
            <PencilSimple weight="bold" className="size-3.5 text-[#0F5B63]" aria-hidden />
          </button>
        </li>
      ))}
    </ul>
  );
}

function TextField({
  label,
  name,
  value,
  onChange,
  onBlur,
  error,
  valid,
  hint,
  optional,
  type = "text",
  inputMode,
  autoComplete,
  placeholder,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  error: string | false;
  valid: boolean;
  hint?: string;
  optional?: boolean;
  type?: string;
  inputMode?: "text" | "tel" | "email";
  autoComplete?: string;
  placeholder?: string;
}) {
  const describedBy = error ? `${name}-erro` : hint ? `${name}-dica` : undefined;
  return (
    <div>
      <label htmlFor={`fin-${name}`} className="block text-sm font-semibold text-[#1F1F1F]">
        {label}
        {optional ? <span className="font-normal text-[#1F1F1F]/55"> (opcional)</span> : null}
      </label>
      <span className="relative block">
        <input
          id={`fin-${name}`}
          name={name}
          type={type}
          inputMode={inputMode}
          autoComplete={autoComplete}
          placeholder={placeholder}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onBlur={onBlur}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={cn(inputClass, "pr-11", error && "border-[#B4432F] focus-visible:border-[#B4432F] focus-visible:outline-[#B4432F]")}
        />
        <span
          className={cn(
            "pointer-events-none absolute top-1/2 right-4 mt-1 inline-flex size-5 -translate-y-1/2 items-center justify-center rounded-full bg-[#0F5B63] text-white transition-[opacity,transform] duration-300",
            valid && value ? "scale-100 opacity-100" : "scale-50 opacity-0",
          )}
          style={{ transitionTimingFunction: EASE }}
          aria-hidden
        >
          <Check weight="bold" className="size-3" />
        </span>
      </span>
      {error ? (
        <p id={`${name}-erro`} className="mt-1.5 text-sm text-[#B4432F]">
          {error}
        </p>
      ) : hint ? (
        <p id={`${name}-dica`} className="mt-1.5 text-sm text-[#1F1F1F]/55">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

function DocList({
  checklist,
  className,
  checkable,
}: {
  checklist: ChecklistItem[];
  className?: string;
  checkable?: { done: Set<string>; toggle: (id: string) => void };
}) {
  return (
    <ul className={cn("flex flex-col gap-2.5", className)}>
      {checklist.map((item) => {
        const done = checkable?.done.has(item.id);
        const body = (
          <>
            <span
              className={cn(
                "mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-md transition-colors duration-300",
                done ? "bg-[#0F5B63] text-white" : checkable ? "bg-white ring-1 ring-[#1F1F1F]/20" : "text-[#0F5B63]",
              )}
              aria-hidden
            >
              {checkable ? (done ? <Check weight="bold" className="size-3" /> : null) : <FileText weight="duotone" className="size-5" />}
            </span>
            <span className="flex flex-col">
              <span className={cn("text-sm font-semibold text-[#1F1F1F]", done && "text-[#1F1F1F]/50 line-through")}>
                {item.label}
              </span>
              {item.detail ? <span className="text-xs leading-5 text-[#1F1F1F]/55">{item.detail}</span> : null}
            </span>
          </>
        );
        return (
          <li key={item.id} className="rendal-doc-in">
            {checkable ? (
              <label className="flex min-h-11 cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={done}
                  onChange={() => checkable.toggle(item.id)}
                />
                {body}
              </label>
            ) : (
              <span className="flex items-start gap-3">{body}</span>
            )}
          </li>
        );
      })}
    </ul>
  );
}

function DocsToggle({
  open,
  onToggle,
  checklist,
}: {
  open: boolean;
  onToggle: () => void;
  checklist: ChecklistItem[];
}) {
  return (
    <div className="t-acc rounded-2xl bg-[#F8F1E3]/70" data-open={open}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls="fin-docs"
        className="flex min-h-12 w-full cursor-pointer items-center justify-between gap-3 px-4 text-left text-sm font-semibold text-[#1F1F1F]"
      >
        <span className="inline-flex items-center gap-2">
          <FileText weight="duotone" className="size-5 text-[#0F5B63]" aria-hidden />
          O que você vai precisar · {checklist.length} documentos
        </span>
        <span className="t-acc-chevron text-[#1F1F1F]/55" aria-hidden>
          <CaretDown weight="bold" className="size-4" />
        </span>
      </button>
      <div className="t-acc-panel" id="fin-docs" inert={!open}>
        <div className="t-acc-panel-inner">
          <div className="px-4 pt-3 pb-4">
            <DocList checklist={checklist} />
            <p className="mt-3 text-xs leading-5 text-[#1F1F1F]/55">Não precisa enviar nada agora. Só vá separando.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Success({ first, checklist }: { first: string; checklist: ChecklistItem[] }) {
  const [done, setDone] = useState<Set<string>>(() => new Set());
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
  }, []);

  function toggle(id: string) {
    setDone((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const steps = [
    { title: "Recebemos seus dados", body: "Seu pedido já está com a equipe." },
    { title: "Análise do seu perfil", body: "Cruzamos renda, FGTS e as linhas da Caixa e de outros bancos." },
    { title: "Retorno pelo WhatsApp", body: "Em até 1 dia útil, com quanto cabe no seu nome." },
  ];

  return (
    <div className="rendal-step grid gap-8 p-5 sm:p-8 lg:grid-cols-2 lg:gap-12" style={{ ["--step-from" as string]: "0px" }}>
      <div>
        <span className="rendal-pop inline-flex size-14 items-center justify-center rounded-full bg-[#0F5B63] text-white" aria-hidden>
          <Check weight="bold" className="size-7" />
        </span>
        <h2
          ref={headingRef}
          tabIndex={-1}
          id="financiamento-titulo"
          className="mt-5 text-2xl font-semibold tracking-tight text-balance text-[#1F1F1F] outline-none sm:text-3xl"
        >
          {first ? `Pronto, ${first}!` : "Pronto!"} Seu pedido está com a gente.
        </h2>
        <p className="mt-2 text-base leading-7 text-[#1F1F1F]/70">Veja o que acontece agora.</p>

        <ol className="mt-6 flex flex-col">
          {steps.map((item, index) => (
            <li key={item.title} className="relative flex gap-4 pb-6 last:pb-0">
              {index < steps.length - 1 ? (
                <span className="absolute top-8 bottom-0 left-[15px] w-px bg-[#1F1F1F]/12" aria-hidden />
              ) : null}
              <span
                className={cn(
                  "relative inline-flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold",
                  index === 0 ? "bg-[#0F5B63] text-white" : "bg-[#F8F1E3] text-[#1F1F1F]",
                )}
                aria-hidden
              >
                {index === 0 ? <Check weight="bold" className="size-4" /> : index + 1}
              </span>
              <span>
                <span className="block text-base font-semibold text-[#1F1F1F]">{item.title}</span>
                <span className="block text-sm leading-6 text-[#1F1F1F]/65">{item.body}</span>
              </span>
            </li>
          ))}
        </ol>

        <p className="mt-6 flex gap-2 rounded-2xl bg-[#F8F1E3] p-4 text-sm leading-6 text-[#1F1F1F]/80">
          <ShieldCheck weight="duotone" className="mt-0.5 size-5 shrink-0 text-[#0F5B63]" aria-hidden />
          {FINANCIAMENTO_DISCLAIMER}
        </p>
      </div>

      <div className="rounded-3xl bg-[#F8F1E3]/70 p-5 sm:p-6">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="text-lg font-semibold text-[#1F1F1F]">Enquanto isso, vá separando</h3>
          <span className="text-sm text-[#1F1F1F]/55" aria-live="polite">
            {done.size} de {checklist.length}
          </span>
        </div>
        <p className="mt-1 text-sm text-[#1F1F1F]/60">Marque o que você já tem em mãos.</p>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white">
          <span
            className="block h-full origin-left rounded-full bg-[#0F5B63] transition-transform duration-500"
            style={{ transform: `scaleX(${done.size / checklist.length})`, transitionTimingFunction: EASE }}
          />
        </div>
        <DocList checklist={checklist} className="mt-5" checkable={{ done, toggle }} />
        {done.size === checklist.length ? (
          <p className="rendal-step mt-4 text-sm font-semibold text-[#0F5B63]" style={{ ["--step-from" as string]: "0px" }}>
            Tudo pronto. Isso deixa o retorno bem mais rápido.
          </p>
        ) : null}

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={rendalWhatsapp("Olá! Acabei de pedir uma orientação de crédito pelo site.")}
            className="inline-flex h-12 flex-1 items-center whitespace-nowrap justify-center gap-2 rounded-full bg-[#0F5B63] px-5 text-base font-semibold text-white transition-colors duration-700 hover:bg-[#0A474E]"
            style={{ transitionTimingFunction: EASE }}
          >
            <WhatsappLogo weight="fill" className="size-5" aria-hidden />
            Falar agora
          </a>
          <Link
            href="/empreendimentos"
            className="inline-flex h-12 flex-1 items-center justify-center whitespace-nowrap rounded-full bg-white px-5 text-base font-semibold text-[#1F1F1F] ring-1 ring-[#1F1F1F]/10"
          >
            Ver empreendimentos
          </Link>
        </div>
      </div>
    </div>
  );
}
