"use client";

import { useState } from "react";
import { submitContact } from "@/lib/actions";
import { GoldButton } from "@/components/ui/gold-button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ArrowRight, MapPin, Copy, Check } from "lucide-react";
import type { Company } from "@/lib/companies";
import { formatCnpj } from "@/lib/companies";

const subjectByCompany = {
  rendal: ["Terreno ou parceria", "Investimento", "Produto imobiliário", "Outros"],
  dcorp: ["Engenharia e construção", "Projeto e engenharia", "Administração da construção", "Outros"],
};

export function ContactForm({
  company,
  onSwitch,
}: {
  company: Company;
  onSwitch: () => void;
}) {
  const [status, setStatus] = useState<{ success: boolean; message: string } | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [phone, setPhone] = useState("");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`${company.address} · ${formatCnpj(company.cnpj)}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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

    const result = await submitContact(formData);
    setStatus(result);
    setIsPending(false);

    if (result.success) {
      e.currentTarget.reset();
      setPhone("");
    }
  }

  return (
    <section id="form-contato" className="relative overflow-hidden bg-[#F8F1E3] px-6 py-24 md:px-24 md:py-48">
      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-start gap-x-16 gap-y-12 lg:grid-cols-12 md:gap-x-24 md:gap-y-16">
        <div className="order-1 space-y-6 lg:col-span-5">
          <span className="mb-4 block font-sans text-xs font-bold uppercase tracking-[0.4em] text-primary">
            {company.legalName}
          </span>
          <h2 className="font-heading text-4xl font-black uppercase leading-none tracking-tighter text-[#0F172A] md:text-6xl">
            Envie para a {company.name}
          </h2>
          <button
            type="button"
            onClick={onSwitch}
            className="cursor-pointer font-sans text-[10px] font-black uppercase tracking-[0.22em] text-primary hover:opacity-70"
          >
            Falar com a outra empresa
          </button>
        </div>

        <div className="order-2 lg:col-span-7 lg:row-span-2">
          <div className="rounded-3xl border border-primary/5 bg-white p-6 shadow-[0_40px_100px_rgba(0,0,0,0.05)] md:p-20">
            <AnimatePresence mode="wait" initial={false}>
              {status?.success ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-20 text-center md:py-24"
                >
                  <div className="mb-8 flex size-20 items-center justify-center rounded-full bg-primary/10 md:mb-10 md:size-24">
                    <CheckCircle2 className="size-10 text-primary md:size-12" />
                  </div>
                  <h3 className="mb-4 font-heading text-2xl font-black uppercase tracking-tighter text-[#0F172A] md:text-3xl">
                    Mensagem na {company.name}
                  </h3>
                  <p className="mb-10 max-w-sm font-sans text-xs font-bold uppercase tracking-widest text-[#0F172A]/40 md:mb-12 md:text-sm">
                    Sua solicitação foi registrada para esta unidade.
                  </p>
                  <button
                    onClick={() => setStatus(null)}
                    className="cursor-pointer font-sans text-[10px] font-black uppercase tracking-[0.5em] text-primary hover:opacity-70"
                  >
                    + Nova solicitação
                  </button>
                </motion.div>
              ) : (
                <form key="form" onSubmit={handleSubmit} className="space-y-10 md:space-y-12">
                  <input type="hidden" name="company" value={company.id} />
                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
                    <div className="space-y-3">
                      <Label htmlFor="name" className="pl-1 font-heading text-[11px] font-black uppercase tracking-[0.2em] text-[#0F172A] opacity-80">Nome Completo *</Label>
                      <Input
                        id="name"
                        name="name"
                        required
                        placeholder="Seu nome"
                        className="h-14 rounded-none border-0 border-b border-[#0F172A]/10 bg-transparent px-1 font-sans text-lg font-medium tracking-tight placeholder:text-[#0F172A]/30 focus-visible:border-primary focus-visible:ring-0 md:text-xl"
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="email" className="pl-1 font-heading text-[11px] font-black uppercase tracking-[0.2em] text-[#0F172A] opacity-80">E-mail *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="seu@email.com"
                        className="h-14 rounded-none border-0 border-b border-[#0F172A]/10 bg-transparent px-1 font-sans text-lg font-medium tracking-tight placeholder:text-[#0F172A]/30 focus-visible:border-primary focus-visible:ring-0 md:text-xl"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
                    <div className="space-y-3">
                      <Label htmlFor="phone" className="pl-1 font-heading text-[11px] font-black uppercase tracking-[0.2em] text-[#0F172A] opacity-80">Telefone *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={phone}
                        onChange={handlePhoneChange}
                        placeholder="(00) 00000-0000"
                        className="h-14 rounded-none border-0 border-b border-[#0F172A]/10 bg-transparent px-1 font-sans text-lg font-medium tracking-tight placeholder:text-[#0F172A]/30 focus-visible:border-primary focus-visible:ring-0 md:text-xl"
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="subject" className="pl-1 font-heading text-[11px] font-black uppercase tracking-[0.2em] text-[#0F172A] opacity-80">Assunto *</Label>
                      <select
                        id="subject"
                        name="subject"
                        required
                        defaultValue=""
                        className="h-14 w-full border-0 border-b border-[#0F172A]/10 bg-transparent font-sans text-lg font-medium text-[#0F172A] focus:border-primary focus:ring-0 md:text-xl"
                      >
                        <option value="" disabled>
                          Escolha o assunto
                        </option>
                        {subjectByCompany[company.id].map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="message" className="pl-1 font-heading text-[11px] font-black uppercase tracking-[0.2em] text-[#0F172A] opacity-80">Mensagem</Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={6}
                      placeholder="Descreva sua solicitação."
                      className="rounded-2xl border border-[#0F172A]/10 bg-transparent p-6 font-sans text-base font-medium tracking-tight placeholder:text-[#0F172A]/30 focus-visible:border-primary focus-visible:ring-0 md:text-lg"
                    />
                  </div>

                  <div className="flex justify-center">
                    <GoldButton
                      type="submit"
                      disabled={isPending}
                      className="flex w-full items-center justify-center gap-6 rounded-2xl py-6 text-xs font-bold uppercase tracking-[0.4em] md:w-2/3"
                    >
                      {isPending ? "Processando..." : (
                        <>
                          Enviar para {company.name}
                          <ArrowRight className="size-5" />
                        </>
                      )}
                    </GoldButton>
                  </div>
                </form>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="order-3 space-y-8 lg:col-span-5 md:space-y-12 lg:-mt-16">
          <div
            onClick={handleCopy}
            className="group flex cursor-pointer items-center justify-between rounded-r-xl border-l-4 border-primary bg-white/50 p-6 shadow-lg shadow-primary/5"
          >
            <div className="flex items-start gap-4">
              <MapPin className="mt-1 size-6 shrink-0 text-primary" />
              <div>
                <span className="mb-1 block font-heading text-[10px] font-black uppercase tracking-widest text-primary">
                  {company.legalName}
                </span>
                <p className="font-sans text-xs font-bold leading-relaxed tracking-tight text-[#0F172A] uppercase">
                  {company.address}
                </p>
                <p className="mt-2 font-sans text-[10px] font-bold uppercase tracking-widest text-[#0F172A]/50">
                  {formatCnpj(company.cnpj)}
                </p>
              </div>
            </div>
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/5">
              {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
            </div>
          </div>

          <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-primary/10 shadow-2xl">
            <iframe
              src={company.mapsEmbed}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Mapa ${company.name}`}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
