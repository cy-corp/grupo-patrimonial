"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, type FormEvent } from "react";
import { contact, services, type ServiceId } from "@/lib/content";
import { ServiceDiagram } from "./service-diagram";

const ease = [0.22, 1, 0.36, 1] as const;
const number = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 1 });
const UFS = ["MG", "SP", "Outro"] as const;

// Controle de 0 a 100 em escala logarítmica: de 200 m² a 2.000 ha.
function areaM2(t: number) {
  return 200 * Math.pow(100000, t / 100);
}

function round(value: number) {
  const magnitude = Math.pow(10, Math.floor(Math.log10(value)) - 1);
  return Math.round(value / magnitude) * magnitude;
}

function formatArea(m2: number) {
  if (m2 < 10000) return `${number.format(round(m2))} m²`;
  return `${number.format(round(m2 / 10000))} ha`;
}

function scaleBar(m2: number) {
  const meters = round(Math.sqrt(m2) / 3);
  return meters >= 1000 ? `${number.format(meters / 1000)} km` : `${number.format(meters)} m`;
}

const STEPS = ["Serviço", "Área", "Local", "Contato"] as const;
const PARCEL = "M-70 34 L-52 -46 L22 -62 L74 -22 L60 44 L-24 56 Z";
const VERTICES = [
  [-70, 34],
  [-52, -46],
  [22, -62],
  [74, -22],
  [60, 44],
  [-24, 56],
] as const;

type Answers = {
  service: ServiceId | "indefinido" | null;
  area: number;
  city: string;
  uf: (typeof UFS)[number];
  name: string;
  phone: string;
  notes: string;
};

function serviceTitle(id: Answers["service"]) {
  if (!id) return "";
  if (id === "indefinido") return "A definir";
  return services.find((s) => s.id === id)?.title ?? "";
}

// A prancha técnica que se preenche conforme a pessoa responde.
function Sheet({ answers, step, sent }: { answers: Answers; step: number; sent: boolean }) {
  const m2 = areaM2(answers.area);
  const scale = 0.5 + (answers.area / 100) * 0.6;
  const rows = [
    ["Serviço", serviceTitle(answers.service)],
    ["Área aproximada", step >= 1 ? formatArea(m2) : ""],
    ["Local", answers.city ? `${answers.city}${answers.uf === "Outro" ? "" : ` · ${answers.uf}`}` : ""],
    ["Requerente", answers.name],
  ] as const;

  return (
    <div className="relative bg-white p-3 shadow-[0_30px_60px_-30px_rgba(0,60,80,0.45)] sm:p-4">
      <svg viewBox="0 0 400 520" className="block w-full" fill="none" role="img" aria-label="Prancha do pedido de orçamento">
        <rect x="6" y="6" width="388" height="508" className="stroke-brand" strokeWidth={1.5} />
        <rect x="14" y="14" width="372" height="330" className="stroke-brand/40" strokeWidth={0.75} />
        {Array.from({ length: 9 }, (_, i) => (
          <path key={i} d={`M${54 + i * 37} 14 V344 M14 ${51 + i * 37} H386`} className="stroke-brand/[0.08]" strokeWidth={0.75} />
        ))}
        <path d="M352 34 L359 58 L352 53 L345 58 Z" className="fill-brand" />
        <text x="352" y="72" textAnchor="middle" className="fill-brand text-[10px] font-bold">
          N
        </text>

        <g transform="translate(200 182)">
          <motion.g animate={{ scale }} transition={{ type: "spring", stiffness: 90, damping: 18 }}>
            <motion.path
              d={PARCEL}
              className="fill-brand/[0.07] stroke-brand"
              strokeWidth={1.6}
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, ease }}
            />
            {answers.service === "desmembramento" && (
              <motion.path
                d="M-14 -54 L18 50"
                className="stroke-orange"
                strokeWidth={1.8}
                strokeDasharray="6 5"
                vectorEffect="non-scaling-stroke"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, ease }}
              />
            )}
            {answers.service === "retificacao" && (
              <path d="M-62 40 L-56 -38 L18 -52 L64 -16 L54 40 L-18 60 Z" className="stroke-graphite/40" strokeWidth={1} strokeDasharray="3 4" vectorEffect="non-scaling-stroke" />
            )}
            {answers.service === "levantamento" && (
              <>
                <path d="M-40 14 C-30 -20 6 -34 40 -18 C46 4 30 26 0 28 C-22 28 -36 24 -40 14 Z" className="stroke-brand/50" strokeWidth={1} vectorEffect="non-scaling-stroke" />
                <path d="M-18 8 C-12 -6 6 -12 20 -4 C22 6 12 14 0 14 C-10 14 -16 12 -18 8 Z" className="stroke-brand/70" strokeWidth={1} vectorEffect="non-scaling-stroke" />
              </>
            )}
            {answers.service === "projetos" && (
              <path d="M-60 -6 L66 10 M-16 -54 L-28 55 M30 -56 L22 50" className="stroke-brand/50" strokeWidth={1} vectorEffect="non-scaling-stroke" />
            )}
            {VERTICES.map(([x, y], i) => (
              <motion.circle
                key={i}
                cx={x}
                cy={y}
                r={3.2}
                className="fill-white stroke-orange"
                strokeWidth={1.6}
                vectorEffect="non-scaling-stroke"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25 * i, type: "spring", stiffness: 260, damping: 16 }}
              />
            ))}
          </motion.g>
          {step >= 1 && (
            <text textAnchor="middle" y={6} className="fill-brand text-[17px] font-bold">
              {formatArea(m2)}
            </text>
          )}
        </g>

        <path d="M30 322 H110 M30 318 V326 M70 319 V325 M110 318 V326" className="stroke-brand" strokeWidth={1.2} />
        <text x="30" y="312" className="fill-brand text-[9px] font-semibold">
          0
        </text>
        <text x="110" y="312" textAnchor="end" className="fill-brand text-[9px] font-semibold">
          {step >= 1 ? scaleBar(m2) : ""}
        </text>

        <path d="M14 352 H386 M14 392 H386 M14 432 H386 M14 472 H386 M14 352 V506 M386 352 V506 M14 506 H386" className="stroke-brand/40" strokeWidth={0.75} />
        {rows.map(([label, value], i) => (
          <g key={label} transform={`translate(24 ${352 + i * 40})`}>
            <text y="15" className="fill-graphite/60 text-[8.5px] font-semibold">
              {label.toUpperCase()}
            </text>
            <text y="32" className="fill-graphite text-[13px] font-bold">
              {value.length > 38 ? `${value.slice(0, 37)}…` : value}
            </text>
            {!value && <path d="M0 30 H200" className="stroke-brand/25" strokeWidth={0.75} strokeDasharray="2 4" />}
          </g>
        ))}
        <text x="376" y="500" textAnchor="end" className="fill-graphite/60 text-[8.5px] font-semibold">
          FOLHA 01/01 · i3GEO
        </text>
      </svg>

      <AnimatePresence>
        {sent && (
          <motion.div
            initial={{ scale: 2.4, opacity: 0, rotate: -24 }}
            animate={{ scale: 1, opacity: 1, rotate: -12 }}
            transition={{ type: "spring", stiffness: 240, damping: 14 }}
            className="pointer-events-none absolute left-1/2 top-[34%] -translate-x-1/2 border-[3px] border-orange px-5 py-2 text-center text-orange"
          >
            <p className="text-xl font-bold tracking-[0.12em] sm:text-2xl">PEDIDO REGISTRADO</p>
            <p className="text-[10px] font-semibold tracking-[0.2em]">i3GEO · {new Date().toLocaleDateString("pt-BR")}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const field =
  "mt-2 w-full border-0 border-b-2 border-white/30 bg-transparent px-0 py-3 text-xl font-semibold text-white outline-none transition-colors placeholder:font-normal placeholder:text-white/40 focus:border-orange";

export function QuoteExperience() {
  const [step, setStep] = useState(0);
  const [sent, setSent] = useState(false);
  const [answers, setAnswers] = useState<Answers>({
    service: null,
    area: 45,
    city: "",
    uf: "MG",
    name: "",
    phone: "",
    notes: "",
  });
  const set = <K extends keyof Answers>(key: K, value: Answers[K]) => setAnswers((a) => ({ ...a, [key]: value }));

  useEffect(() => {
    const onService = (e: Event) => {
      setAnswers((a) => ({ ...a, service: (e as CustomEvent<ServiceId>).detail }));
      setStep(1);
      setSent(false);
    };
    window.addEventListener("i3geo:service", onService);
    return () => window.removeEventListener("i3geo:service", onService);
  }, []);

  function submit(event: FormEvent) {
    event.preventDefault();
    if (step < STEPS.length - 1) {
      setStep(step + 1);
      return;
    }
    setSent(true);
    if (contact.whatsapp) {
      const text = [
        "Olá, gostaria de um orçamento.",
        `Serviço: ${serviceTitle(answers.service)}`,
        `Área aproximada: ${formatArea(areaM2(answers.area))}`,
        `Local: ${answers.city} ${answers.uf === "Outro" ? "" : answers.uf}`,
        `Nome: ${answers.name}`,
        answers.notes && `Observações: ${answers.notes}`,
      ]
        .filter(Boolean)
        .join("\n");
      window.open(`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
    }
  }

  return (
    <section id="contato" className="scroll-mt-20 overflow-hidden bg-[#03121A] py-24 text-white sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 sm:px-10 lg:grid-cols-12 lg:px-16">
        <div className="lg:col-span-7">
          <h2 className="text-balance text-4xl font-bold leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl">
            Desenhe o seu pedido de orçamento.
          </h2>

          <ol className="mt-10 flex gap-2" aria-label="Etapas">
            {STEPS.map((label, i) => (
              <li key={label} className="flex-1">
                <span className={`block h-1 transition-colors duration-500 ${i <= step ? "bg-orange" : "bg-white/20"}`} />
                <span className={`mt-2 block text-xs font-semibold ${i === step ? "text-white" : "text-white/50"}`}>{label}</span>
              </li>
            ))}
          </ol>

          {sent ? (
            <div className="mt-12" role="status">
              <h3 className="text-3xl font-bold tracking-tight text-[#A9E3F0]">Pedido registrado, {answers.name.split(" ")[0]}.</h3>
              <p className="mt-4 max-w-md text-lg leading-relaxed text-white/80">
                {contact.whatsapp
                  ? "Abrimos o WhatsApp com o resumo do seu pedido. É só enviar a mensagem."
                  : "A prancha ao lado resume o que você pediu."}
              </p>
              <button
                type="button"
                onClick={() => {
                  setSent(false);
                  setStep(0);
                }}
                className="mt-8 border-b-2 border-orange pb-1 text-sm font-semibold"
              >
                Fazer outro pedido
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="mt-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.3, ease }}
                  className="min-h-[19rem]"
                >
                  {step === 0 && (
                    <fieldset>
                      <legend className="text-2xl font-bold tracking-tight">O que você precisa?</legend>
                      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                        {[...services.map((s) => ({ id: s.id as Answers["service"], title: s.title })), { id: "indefinido" as const, title: "Ainda não sei" }].map(
                          (option) => {
                            const selected = answers.service === option.id;
                            return (
                              <button
                                key={option.id}
                                type="button"
                                aria-pressed={selected}
                                onClick={() => set("service", option.id)}
                                className={`flex flex-col items-start gap-3 border p-4 text-left text-sm font-semibold leading-tight transition-colors ${
                                  selected ? "border-orange bg-white text-graphite" : "border-white/25 text-white hover:border-white/60"
                                }`}
                              >
                                {option.id && option.id !== "indefinido" ? (
                                  <span className={`block w-16 ${selected ? "" : "[&_path]:stroke-white/80 [&_text]:fill-white"}`}>
                                    <ServiceDiagram key={String(selected)} id={option.id} className="w-full" />
                                  </span>
                                ) : (
                                  <span className="flex h-12 w-16 items-center text-3xl font-bold text-orange">?</span>
                                )}
                                {option.title}
                              </button>
                            );
                          },
                        )}
                      </div>
                    </fieldset>
                  )}

                  {step === 1 && (
                    <div>
                      <label htmlFor="quote-area" className="text-2xl font-bold tracking-tight">
                        Qual o tamanho aproximado da área?
                      </label>
                      <p className="mt-8 text-6xl font-bold tracking-tight text-[#A9E3F0] tabular-nums sm:text-7xl">
                        {formatArea(areaM2(answers.area))}
                      </p>
                      <input
                        id="quote-area"
                        type="range"
                        min={0}
                        max={100}
                        value={answers.area}
                        onChange={(e) => set("area", Number(e.target.value))}
                        className="mt-8 w-full accent-[#FF6A13]"
                      />
                      <p className="mt-2 flex justify-between text-xs font-semibold text-white/60">
                        <span>Lote urbano</span>
                        <span>Fazenda</span>
                      </p>
                      <p className="mt-4 text-sm text-white/70">Não precisa ser exato. A medida certa é o nosso trabalho.</p>
                    </div>
                  )}

                  {step === 2 && (
                    <div>
                      <label htmlFor="quote-city" className="text-2xl font-bold tracking-tight">
                        Onde fica a área?
                      </label>
                      <input
                        id="quote-city"
                        required
                        autoComplete="address-level2"
                        value={answers.city}
                        onChange={(e) => set("city", e.target.value)}
                        placeholder="Município"
                        className={field}
                      />
                      <div className="mt-8 flex gap-2" role="radiogroup" aria-label="Estado">
                        {UFS.map((uf) => (
                          <button
                            key={uf}
                            type="button"
                            role="radio"
                            aria-checked={answers.uf === uf}
                            onClick={() => set("uf", uf)}
                            className={`border px-5 py-2.5 text-sm font-semibold transition-colors ${
                              answers.uf === uf ? "border-orange bg-orange text-graphite" : "border-white/30 hover:border-white/70"
                            }`}
                          >
                            {uf}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="grid gap-6">
                      <p className="text-2xl font-bold tracking-tight">Como falamos com você?</p>
                      <label className="text-sm font-semibold text-white/70">
                        Nome
                        <input
                          required
                          autoComplete="name"
                          value={answers.name}
                          onChange={(e) => set("name", e.target.value)}
                          placeholder="Seu nome"
                          className={field}
                        />
                      </label>
                      <label className="text-sm font-semibold text-white/70">
                        WhatsApp
                        <input
                          required
                          type="tel"
                          inputMode="tel"
                          autoComplete="tel"
                          value={answers.phone}
                          onChange={(e) => set("phone", e.target.value)}
                          placeholder="(00) 00000-0000"
                          className={field}
                        />
                      </label>
                      <label className="text-sm font-semibold text-white/70">
                        Quer contar mais alguma coisa? (opcional)
                        <input value={answers.notes} onChange={(e) => set("notes", e.target.value)} className={field} />
                      </label>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="mt-10 flex items-center gap-6">
                <button
                  type="submit"
                  disabled={step === 0 && !answers.service}
                  className="bg-orange px-7 py-4 text-base font-bold text-graphite transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {step === STEPS.length - 1 ? "Enviar pedido" : "Continuar"}
                </button>
                {step > 0 && (
                  <button type="button" onClick={() => setStep(step - 1)} className="text-sm font-semibold text-white/75 hover:text-white">
                    Voltar
                  </button>
                )}
              </div>
            </form>
          )}
        </div>

        <motion.div
          className="mx-auto w-full max-w-xs lg:col-span-5 lg:max-w-[24rem]"
          initial={{ rotate: 0, y: 40, opacity: 0 }}
          whileInView={{ rotate: 2, y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease }}
        >
          <Sheet answers={answers} step={step} sent={sent} />
        </motion.div>
      </div>
    </section>
  );
}
