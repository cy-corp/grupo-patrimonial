"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
} from "framer-motion";
import { CheckCircle2, ChevronDown, Clock3, Layers, MapPin } from "lucide-react";
import { HoneypotField } from "@/components/contato/HoneypotField";
import { TurnstileField } from "@/components/contato/TurnstileField";
import { WhatsAppIcon } from "@/components/whatsapp-button";
import { GoldButton } from "@/components/ui/gold-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitContact } from "@/lib/actions";
import { SUBJECTS_BY_COMPANY } from "@/lib/contact/constants";
import { companies, formatCnpj, whatsappHref } from "@/lib/companies";
import { cn } from "@/lib/utils";

const EASE = [0.23, 1, 0.32, 1] as const;
const WA_GREEN = "#25D366";
const company = companies.dcorp;
const SUBJECTS = SUBJECTS_BY_COMPANY.dcorp;

type Intent = "orcamento" | "parceria";

const INTENTS: {
  id: Intent;
  label: string;
  subject: string;
  placeholder: string;
}[] = [
  {
    id: "orcamento",
    label: "Orçamento",
    subject: "Solicitar orçamento",
    placeholder:
      "Tipo de obra, localização, sistema de interesse e prazo desejado.",
  },
  {
    id: "parceria",
    label: "Parceria",
    subject: "Parceria tecnológica",
    placeholder:
      "Perfil da construtora/incorporadora e o que precisa implantar.",
  },
];

const fieldClass =
  "h-12 rounded-none border-0 border-b border-[#D9D9D9] bg-transparent px-0 font-sans text-base text-[#1F1F1F] shadow-none placeholder:text-[#4D4D4D]/45 focus-visible:border-[#C9A96A] focus-visible:ring-0";

const fieldVariants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: EASE },
  },
} as const;

/** Painel visual — cantos em L via clip-path (scoop TL + BR). */
function ContactVisualPanel({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const clipId = `dcorp-contact-shape-${useId().replace(/:/g, "")}`;

  return (
    <motion.aside
      className={cn("relative", className)}
      initial={reduceMotion ? false : { opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, ease: EASE, delay: 0.14 }}
    >
      <svg width={0} height={0} className="absolute" aria-hidden>
        <defs>
          <clipPath id={clipId} clipPathUnits="objectBoundingBox">
            {/*
              Efeito L: scoop côncavo no top-left e bottom-right;
              cantos opostos com raio curto (quase reto).
            */}
            <path d="M0.2 0 H0.96 Q1 0 1 0.04 V0.8 A0.2 0.2 0 0 1 0.8 1 H0.04 Q0 1 0 0.96 V0.2 A0.2 0.2 0 0 1 0.2 0 Z" />
          </clipPath>
        </defs>
      </svg>

      <div
        className={cn(
          "relative overflow-hidden bg-[#1F1F1F]",
          compact ? "aspect-[3/4] max-h-[30rem]" : "absolute inset-0",
        )}
        style={{
          clipPath: `url(#${clipId})`,
          WebkitClipPath: `url(#${clipId})`,
        }}
      >
        <Image
          src="/dcorp/contact/01-contato.jpg"
          alt="Equipe DCORP posicionando painel pré-moldado em obra"
          fill
          sizes="(max-width: 1024px) 100vw, 55vw"
          className="object-cover object-center"
          priority
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(31,31,31,0.08) 0%, rgba(31,31,31,0.18) 42%, rgba(31,31,31,0.78) 100%)",
          }}
          aria-hidden
        />

        <div
          className={cn(
            "pointer-events-none absolute inset-0 flex flex-col justify-between",
            compact ? "p-5" : "p-7 md:p-9 lg:p-10",
          )}
        >
          <div className="flex justify-start pt-[12%]">
            <div className="inline-flex max-w-[min(100%,18rem)] items-start gap-2 rounded-md border border-white/25 bg-white/12 px-3 py-2 shadow-[0_8px_24px_rgba(31,31,31,0.18)] backdrop-blur-md">
              <MapPin
                className="mt-0.5 size-3.5 shrink-0 text-[#C9A96A]"
                strokeWidth={1.75}
                aria-hidden
              />
              <div className="min-w-0">
                <p className="font-sans text-[11px] font-semibold leading-tight text-white">
                  DCORP · Execução
                </p>
                <p className="mt-0.5 font-sans text-[10px] leading-tight text-white/70">
                  Campinas-SP
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <p
              className={cn(
                "max-w-[16ch] text-balance font-sans font-bold leading-[1.15] text-white",
                compact
                  ? "text-xl"
                  : "text-2xl md:text-3xl lg:text-[2.05rem]",
              )}
            >
              Engenharia e execução com método.
            </p>

            <div className="flex max-w-[22rem] gap-1.5">
              <div className="flex min-w-0 flex-1 items-start gap-2 rounded-lg border border-white/20 bg-white/10 px-2 py-1.5 backdrop-blur-md">
                <Layers
                  className="mt-0.5 size-3 shrink-0 text-white/90"
                  strokeWidth={1.5}
                  aria-hidden
                />
                <p className="font-sans text-[9px] leading-snug text-white/90">
                  Sistemas industrializados para obra própria e terceiros.
                </p>
              </div>
              <div className="flex min-w-0 flex-1 items-start gap-2 rounded-lg border border-white/20 bg-white/10 px-2 py-1.5 backdrop-blur-md">
                <Clock3
                  className="mt-0.5 size-3 shrink-0 text-white/90"
                  strokeWidth={1.5}
                  aria-hidden
                />
                <p className="font-sans text-[9px] leading-snug text-white/90">
                  Prazo, fiscalização e método em campo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.aside>
  );
}

function SubjectDropdown({
  value,
  onChange,
  options,
  labelId,
}: {
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
  labelId: string;
}) {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative z-30">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-labelledby={labelId}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex h-12 w-full cursor-pointer items-center justify-between border-0 border-b border-[#D9D9D9] bg-transparent px-0 text-left font-sans text-base text-[#1F1F1F] transition-colors duration-150 ease-out",
          open && "border-[#C9A96A]",
        )}
      >
        <span>{value}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2, ease: EASE }}
          className="text-[#4D4D4D]"
        >
          <ChevronDown className="size-4" aria-hidden />
        </motion.span>
      </button>

      <AnimatePresence>
        {open ? (
          <motion.ul
            id={listId}
            role="listbox"
            aria-labelledby={labelId}
            initial={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: -6, scaleY: 0.96 }
            }
            animate={
              reduceMotion
                ? { opacity: 1 }
                : { opacity: 1, y: 0, scaleY: 1 }
            }
            exit={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: -4, scaleY: 0.98 }
            }
            transition={{ duration: 0.22, ease: EASE }}
            style={{ transformOrigin: "top center" }}
            className="absolute left-0 right-0 top-[calc(100%+0.5rem)] overflow-hidden border border-[#D9D9D9] bg-white shadow-[0_16px_40px_rgba(31,31,31,0.08)]"
          >
            {options.map((option, index) => {
              const selected = option === value;
              return (
                <motion.li
                  key={option}
                  role="option"
                  aria-selected={selected}
                  initial={reduceMotion ? false : { opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.2,
                    ease: EASE,
                    delay: reduceMotion ? 0 : 0.03 * index,
                  }}
                >
                  <button
                    type="button"
                    onClick={() => {
                      onChange(option);
                      setOpen(false);
                    }}
                    className={cn(
                      "flex w-full cursor-pointer items-center justify-between px-4 py-3 text-left font-sans text-sm transition-colors duration-150 ease-out",
                      selected
                        ? "bg-[#F7F7F7] font-semibold text-[#1F1F1F]"
                        : "text-[#4D4D4D] hover:bg-[#F7F7F7] hover:text-[#1F1F1F]",
                    )}
                  >
                    {option}
                    {selected ? (
                      <span className="text-[#C9A96A]" aria-hidden>
                        —
                      </span>
                    ) : null}
                  </button>
                </motion.li>
              );
            })}
          </motion.ul>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export function DcorpContactPage() {
  const reduceMotion = useReducedMotion();
  const formId = useId();
  const subjectLabelId = `${formId}-subject-label`;
  const [intent, setIntent] = useState<Intent>("orcamento");
  const [subject, setSubject] = useState<string>(INTENTS[0].subject);
  const [phone, setPhone] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [status, setStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [turnstileReset, setTurnstileReset] = useState(0);

  const active = INTENTS.find((item) => item.id === intent) ?? INTENTS[0];
  const waHref = whatsappHref(
    company,
    "Olá, gostaria de falar com a DCORP.",
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash === "#parceiro") {
      setIntent("parceria");
      setSubject("Parceria tecnológica");
    }
  }, []);

  const selectIntent = (next: Intent) => {
    const match = INTENTS.find((item) => item.id === next) ?? INTENTS[0];
    setIntent(next);
    setSubject(match.subject);
  };

  const selectSubject = (next: string) => {
    setSubject(next);
    if (next === "Solicitar orçamento") setIntent("orcamento");
    if (next === "Parceria tecnológica") setIntent("parceria");
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 11) value = value.slice(0, 11);

    if (value.length > 10) {
      value = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, "($1) $2-$3");
    } else if (value.length > 5) {
      value = value.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, "($1) $2-$3");
    } else if (value.length > 2) {
      value = value.replace(/^(\d{2})(\d{0,5}).*/, "($1) $2");
    } else if (value.length > 0) {
      value = value.replace(/^(\d{0,2}).*/, "($1");
    }

    setPhone(value);
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPending(true);
    setStatus(null);

    const formData = new FormData(e.currentTarget);
    formData.set("phone", phone);
    formData.set("company", company.id);
    formData.set("subject", subject);

    const result = await submitContact(formData);
    setStatus(result);
    setIsPending(false);

    if (result.success) {
      e.currentTarget.reset();
      setPhone("");
    } else {
      setTurnstileReset((value) => value + 1);
    }
  }

  const entrance = reduceMotion
    ? undefined
    : {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
      };

  return (
    <main className="bg-white">
      <div className="mx-auto max-w-[88rem] px-5 pb-14 pt-24 md:px-8 md:pb-16 md:pt-28 lg:px-10 lg:pb-20 lg:pt-28">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.25fr)] lg:gap-x-12 xl:gap-x-16">
          {/* Linha 1: título + form | imagem — altura só até o botão */}
          <div className="min-w-0 lg:col-start-1 lg:row-start-1 lg:pt-10 xl:pt-12">
            <motion.header
              className="shrink-0"
              {...entrance}
              transition={{ duration: 0.55, ease: EASE, delay: 0.08 }}
            >
              <h1 className="max-w-[13ch] text-balance font-sans text-[1.75rem] font-bold leading-[1.15] tracking-[-0.03em] text-[#1F1F1F] md:text-[2rem] md:leading-[1.12] lg:text-[2.15rem] lg:leading-[1.1]">
                Fale com a DCORP.
              </h1>
            </motion.header>

            <div className="relative mt-8 lg:hidden">
              <ContactVisualPanel compact />
            </div>

            <motion.div
              id="contato-form"
              className="mt-8 scroll-mt-28 pb-5 lg:mt-9"
              {...entrance}
              transition={{ duration: 0.55, ease: EASE, delay: 0.14 }}
            >
            <AnimatePresence mode="wait" initial={false}>
              {status?.success ? (
                <motion.div
                  key="success"
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduceMotion ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="flex flex-col items-start py-8"
                >
                  <CheckCircle2
                    className="size-10 text-[#C9A96A]"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                  <h2 className="mt-6 font-sans text-2xl font-semibold text-[#1F1F1F]">
                    Mensagem recebida.
                  </h2>
                  <p className="mt-3 max-w-md text-pretty font-sans text-base leading-relaxed text-[#4D4D4D]">
                    Registramos sua solicitação para a DCORP. A equipe técnica
                    analisa as informações e retorna em até um dia útil.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus(null)}
                    className="t-learn mt-8 inline-flex cursor-pointer items-center gap-2 font-sans text-[12px] font-semibold text-[#1F1F1F]"
                  >
                    Nova mensagem
                    <span className="t-learn-chevron" aria-hidden="true">
                      →
                    </span>
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  method="post"
                  onSubmit={handleSubmit}
                  initial={reduceMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={reduceMotion ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.25, ease: EASE }}
                  className="flex flex-col"
                >
                  <div id="parceiro" className="scroll-mt-28">
                    <LayoutGroup id={`${formId}-intent`}>
                      <div
                        role="tablist"
                        aria-label="Tipo de contato"
                        className="relative grid grid-cols-2 gap-1 rounded-md bg-[#F7F7F7] p-1"
                      >
                        {INTENTS.map((item) => {
                          const selected = item.id === intent;
                          return (
                            <button
                              key={item.id}
                              type="button"
                              role="tab"
                              aria-selected={selected}
                              onClick={() => selectIntent(item.id)}
                              className={cn(
                                "relative z-[1] cursor-pointer rounded-md px-3 py-2.5 font-sans text-sm font-semibold transition-colors duration-150 ease-out",
                                selected
                                  ? "text-[#1F1F1F]"
                                  : "text-[#4D4D4D] hover:text-[#1F1F1F]",
                              )}
                            >
                              {selected && !reduceMotion ? (
                                <motion.span
                                  layoutId="dcorp-contact-intent"
                                  className="absolute inset-0 -z-[1] rounded-md bg-white shadow-sm"
                                  transition={{
                                    type: "spring",
                                    stiffness: 420,
                                    damping: 36,
                                  }}
                                />
                              ) : selected ? (
                                <span className="absolute inset-0 -z-[1] rounded-md bg-white shadow-sm" />
                              ) : null}
                              {item.label}
                            </button>
                          );
                        })}
                      </div>
                    </LayoutGroup>
                  </div>

                  <motion.div
                    className="mt-8 space-y-5"
                    initial={reduceMotion ? false : "hidden"}
                    animate="show"
                    variants={{
                      hidden: {},
                      show: {
                        transition: {
                          staggerChildren: 0.06,
                          delayChildren: 0.08,
                        },
                      },
                    }}
                  >
                    <input type="hidden" name="company" value={company.id} />
                    <input type="hidden" name="subject" value={subject} />
                    <HoneypotField />

                    <motion.div
                      className="grid gap-5 sm:grid-cols-2"
                      variants={reduceMotion ? undefined : fieldVariants}
                    >
                      <div className="space-y-2">
                        <Label
                          htmlFor={`${formId}-name`}
                          className="font-sans text-[11px] font-semibold uppercase tracking-wide text-[#4D4D4D]"
                        >
                          Nome *
                        </Label>
                        <Input
                          id={`${formId}-name`}
                          name="name"
                          required
                          maxLength={120}
                          autoComplete="name"
                          placeholder="Seu nome"
                          className={fieldClass}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor={`${formId}-email`}
                          className="font-sans text-[11px] font-semibold uppercase tracking-wide text-[#4D4D4D]"
                        >
                          E-mail *
                        </Label>
                        <Input
                          id={`${formId}-email`}
                          name="email"
                          type="email"
                          required
                          maxLength={254}
                          autoComplete="email"
                          placeholder="seu@email.com"
                          className={fieldClass}
                        />
                      </div>
                    </motion.div>

                    <motion.div
                      className="space-y-2"
                      variants={reduceMotion ? undefined : fieldVariants}
                    >
                      <Label
                        htmlFor={`${formId}-phone`}
                        className="font-sans text-[11px] font-semibold uppercase tracking-wide text-[#4D4D4D]"
                      >
                        Telefone *
                      </Label>
                      <Input
                        id={`${formId}-phone`}
                        name="phone"
                        type="tel"
                        required
                        value={phone}
                        onChange={handlePhoneChange}
                        autoComplete="tel"
                        placeholder="(00) 00000-0000"
                        className={fieldClass}
                      />
                    </motion.div>

                    <motion.div
                      className="space-y-2"
                      variants={reduceMotion ? undefined : fieldVariants}
                    >
                      <Label
                        id={subjectLabelId}
                        className="font-sans text-[11px] font-semibold uppercase tracking-wide text-[#4D4D4D]"
                      >
                        Assunto *
                      </Label>
                      <SubjectDropdown
                        value={subject}
                        onChange={selectSubject}
                        options={SUBJECTS}
                        labelId={subjectLabelId}
                      />
                    </motion.div>

                    <motion.div
                      className="space-y-2"
                      variants={reduceMotion ? undefined : fieldVariants}
                    >
                      <Label
                        htmlFor={`${formId}-message`}
                        className="font-sans text-[11px] font-semibold uppercase tracking-wide text-[#4D4D4D]"
                      >
                        Mensagem
                      </Label>
                      <Textarea
                        id={`${formId}-message`}
                        name="message"
                        rows={4}
                        maxLength={4000}
                        placeholder={active.placeholder}
                        className="min-h-[7.5rem] resize-y rounded-none border border-[#D9D9D9] bg-transparent px-3 py-3 font-sans text-base text-[#1F1F1F] shadow-none placeholder:text-[#4D4D4D]/45 focus-visible:border-[#C9A96A] focus-visible:ring-0"
                      />
                    </motion.div>

                    <motion.div
                      variants={reduceMotion ? undefined : fieldVariants}
                    >
                      <TurnstileField resetSignal={turnstileReset} />
                    </motion.div>

                    {status && !status.success ? (
                      <p
                        role="alert"
                        className="font-sans text-sm font-medium text-red-700"
                      >
                        {status.message}
                      </p>
                    ) : null}

                    <motion.div
                      className="space-y-3 pt-1"
                      variants={reduceMotion ? undefined : fieldVariants}
                    >
                      <label className="flex cursor-pointer items-start gap-3">
                        <input
                          type="checkbox"
                          name="privacy"
                          required
                          className="mt-1 size-4 shrink-0 cursor-pointer accent-[#C9A96A]"
                        />
                        <span className="text-pretty font-sans text-sm leading-relaxed text-[#4D4D4D]">
                          Autorizo o contato da DCORP e o tratamento dos meus
                          dados conforme a{" "}
                          <Link
                            href="/politica-de-privacidade"
                            className="font-semibold text-[#1F1F1F] underline decoration-[#C9A96A] underline-offset-4 transition-colors hover:text-[#C9A96A]"
                          >
                            Política de Privacidade
                          </Link>
                          .
                        </span>
                      </label>
                    </motion.div>

                    <motion.div
                      className="pt-2"
                      variants={reduceMotion ? undefined : fieldVariants}
                    >
                      <GoldButton
                        type="submit"
                        disabled={isPending}
                        className="h-11 w-full cursor-pointer px-8 text-[12px]"
                      >
                        {isPending ? "Enviando…" : "Enviar mensagem"}
                      </GoldButton>
                      <p className="mt-3 text-pretty font-sans text-sm leading-relaxed text-[#4D4D4D]">
                        Nossa equipe técnica analisa as informações e retorna em
                        até um dia útil.
                      </p>
                    </motion.div>
                  </motion.div>
                </motion.form>
              )}
            </AnimatePresence>
            </motion.div>
          </div>

          <div className="relative hidden min-h-0 lg:col-start-2 lg:row-start-1 lg:block">
            <ContactVisualPanel className="absolute inset-0" />
          </div>

          <motion.dl
            className="mt-2 flex flex-wrap gap-x-6 gap-y-4 border-t border-[#D9D9D9] pt-5 lg:col-start-1 lg:row-start-2 lg:mt-0"
            {...entrance}
            transition={{ duration: 0.55, ease: EASE, delay: 0.2 }}
          >
              <div>
                <dt className="font-sans text-[10px] font-semibold uppercase tracking-wide text-[#C9A96A]">
                  Telefone
                </dt>
                <dd className="mt-0.5">
                  <a
                    href={company.phoneHref}
                    className="cursor-pointer font-sans text-sm font-medium text-[#1F1F1F] transition-colors duration-150 ease-out hover:text-[#C9A96A]"
                  >
                    {company.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="flex items-center gap-1.5 font-sans text-[10px] font-semibold uppercase tracking-wide text-[#C9A96A]">
                  <WhatsAppIcon className="size-3" aria-hidden />
                  WhatsApp
                </dt>
                <dd className="mt-0.5">
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex cursor-pointer items-center gap-2 font-sans text-sm font-medium transition-opacity duration-150 ease-out hover:opacity-80"
                    style={{ color: WA_GREEN }}
                  >
                    Ir para o WhatsApp
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-sans text-[10px] font-semibold uppercase tracking-wide text-[#C9A96A]">
                  E-mail
                </dt>
                <dd className="mt-0.5">
                  <a
                    href={`mailto:${company.email}`}
                    className="cursor-pointer font-sans text-sm font-medium text-[#1F1F1F] transition-colors duration-150 ease-out hover:text-[#C9A96A]"
                  >
                    {company.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-sans text-[10px] font-semibold uppercase tracking-wide text-[#C9A96A]">
                  CNPJ
                </dt>
                <dd className="mt-0.5 font-sans text-sm font-medium text-[#1F1F1F]">
                  {formatCnpj(company.cnpj)}
                </dd>
              </div>
              <div className="min-w-0 basis-full sm:basis-auto">
                <dt className="font-sans text-[10px] font-semibold uppercase tracking-wide text-[#C9A96A]">
                  Endereço
                </dt>
                <dd className="mt-0.5 max-w-xs text-pretty font-sans text-xs leading-relaxed text-[#4D4D4D]">
                  {company.address}
                </dd>
              </div>
          </motion.dl>
        </div>
      </div>
    </main>
  );
}
