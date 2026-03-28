"use client";

import { useState } from "react";
import { submitContact } from "@/lib/actions";
import { GoldButton } from "@/components/ui/gold-button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ArrowRight, MapPin, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const subjectOptions = [
  "Investimento Estratégico",
  "Desenvolvimento & Incorporação",
  "Asset Management Privado",
  "Engenharia de Valor",
  "Consulta Institucional",
  "Outros"
];

export function ContactForm() {
  const [status, setStatus] = useState<{ success: boolean; message: string } | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [subject, setSubject] = useState("");
  const [phone, setPhone] = useState("");
  const [copied, setCopied] = useState(false);
  const [errorField, setErrorField] = useState<string | null>(null);

  const address = "Rua Dr. João Alves dos Santos, 332, Jardim Paineiras, Campinas-SP";

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 11) value = value.slice(0, 11);

    // Mask logic: (00) 00000-0000
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
    if (!subject) {
      setErrorField("subject");
      return;
    }

    setErrorField(null);
    setIsPending(true);
    setStatus(null);

    const formData = new FormData(e.currentTarget);
    formData.set("subject", subject);
    formData.set("phone", phone);

    const result = await submitContact(formData);
    setStatus(result);
    setIsPending(false);

    if (result.success) {
      e.currentTarget.reset();
      setSubject("");
      setPhone("");
    }
  }

  return (
    <section id="form-contato" className="py-24 md:py-48 px-6 md:px-24 bg-[#F8F1E3] relative overflow-hidden">
      {/* Background Mark */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-[0.03] select-none pointer-events-none overflow-hidden text-center">
        <span className="font-heading text-[25vw] font-black text-primary whitespace-nowrap leading-none uppercase tracking-tighter italic">CONSULTORIA</span>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-x-16 md:gap-x-24 gap-y-12 md:gap-y-16 relative z-10 items-start">

        {/* Wrapper for Title (Desktop: Left Column Top) */}
        <div className="lg:col-span-5 space-y-8 md:space-y-12 order-1">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
          >
            <span className="text-primary font-sans text-xs uppercase tracking-[0.4em] block mb-8 md:mb-12 font-bold">Reserva Estratégica</span>
            <h2 className="font-heading text-4xl md:text-7xl text-[#0F172A] uppercase font-black leading-none mb-8 md:mb-12 tracking-tighter">
              Solicite uma <br />
              <span className="text-primary not-italic font-light">Consultoria</span>
            </h2>
          </motion.div>
        </div>

        {/* Form Container (Desktop: Right Column, Mobile: Below Title) */}
        <div className="lg:col-span-7 lg:row-span-2 order-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white p-6 md:p-20 shadow-[0_40px_100px_rgba(0,0,0,0.05)] rounded-3xl border border-primary/5"
          >
            <AnimatePresence mode="wait" initial={false}>
              {status?.success ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col items-center justify-center py-20 md:py-24 text-center"
                >
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary/10 flex items-center justify-center mb-8 md:mb-10">
                    <CheckCircle2 className="w-10 h-10 md:w-12 md:h-12 text-primary" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-heading font-black text-[#0F172A] uppercase mb-4 tracking-tighter">Mensagem Recebida</h3>
                  <p className="font-sans text-[#0F172A]/40 text-xs md:text-sm font-bold uppercase tracking-widest max-w-sm mb-10 md:mb-12">
                    Sua solicitação foi registrada. Entraremos em contato em breve.
                  </p>
                  <button
                    onClick={() => setStatus(null)}
                    className="text-primary text-[10px] font-sans font-black uppercase tracking-[0.5em] hover:opacity-70 transition-opacity cursor-pointer flex items-center gap-2"
                  >
                    + Criar Nova Solicitação
                  </button>
                </motion.div>
              ) : (
                <form key="form" onSubmit={handleSubmit} className="space-y-10 md:space-y-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    <div className="space-y-3">
                      <Label htmlFor="name" className="text-[11px] font-heading font-black text-[#0F172A] uppercase tracking-[0.2em] opacity-80 pl-1">Nome Completo *</Label>
                      <Input
                        id="name"
                        name="name"
                        required
                        placeholder="Seu nome"
                        className="bg-transparent border-0 border-b border-[#0F172A]/10 rounded-none h-14 px-1 focus-visible:ring-0 focus-visible:border-primary text-lg md:text-xl font-sans font-medium tracking-tight transition-all placeholder:text-[#0F172A]/30"
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="email" className="text-[11px] font-heading font-black text-[#0F172A] uppercase tracking-[0.2em] opacity-80 pl-1">E-mail *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="seu@email.com"
                        className="bg-transparent border-0 border-b border-[#0F172A]/10 rounded-none h-14 px-1 focus-visible:ring-0 focus-visible:border-primary text-lg md:text-xl font-sans font-medium tracking-tight transition-all placeholder:text-[#0F172A]/30"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 relative z-20">
                    <div className="space-y-3">
                      <Label htmlFor="phone" className="text-[11px] font-heading font-black text-[#0F172A] uppercase tracking-[0.2em] opacity-80 pl-1">Telefone *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={phone}
                        onChange={handlePhoneChange}
                        placeholder="(00) 00000-0000"
                        className="bg-transparent border-0 border-b border-[#0F172A]/10 rounded-none h-14 px-1 focus-visible:ring-0 focus-visible:border-primary text-lg md:text-xl font-sans font-medium tracking-tight transition-all placeholder:text-[#0F172A]/30"
                      />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-[11px] font-heading font-black text-[#0F172A] uppercase tracking-[0.2em] opacity-80 pl-1">Tipo da Consulta *</Label>
                      <Select
                        options={subjectOptions}
                        value={subject}
                        onChange={(val) => {
                          setSubject(val);
                          setErrorField(null);
                        }}
                        placeholder="Escolha a consulta"
                        className={cn("z-50", errorField === "subject" && "border-b border-red-500")}
                      />
                      {errorField === "subject" && <span className="text-[10px] text-red-500 uppercase font-black tracking-widest pl-1">Selecione uma opção</span>}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="message" className="text-[11px] font-heading font-black text-[#0F172A] uppercase tracking-[0.2em] opacity-80 pl-1">Mensagem</Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={6}
                      placeholder="Descreva sua solicitação."
                      className="bg-transparent border border-[#0F172A]/10 rounded-2xl p-6 focus-visible:ring-0 focus-visible:border-primary text-base md:text-lg font-sans font-medium tracking-tight resize-none transition-all placeholder:text-[#0F172A]/30"
                    />
                  </div>

                  <div className="flex justify-center">
                    <GoldButton
                      type="submit"
                      disabled={isPending}
                      className="w-full md:w-2/3 py-6 text-xs font-bold uppercase tracking-[0.4em] rounded-2xl flex items-center justify-center gap-6 group"
                    >
                      {isPending ? "Processando..." : (
                        <>
                          Enviar Solicitação
                          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-3" />
                        </>
                      )}
                    </GoldButton>
                  </div>
                </form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Address Card and Map (Desktop: Left Column Bottom, Mobile: Below Form) */}
        <div className="lg:col-span-5 space-y-8 md:space-y-12 order-3 lg:-mt-16">
          <div
            onClick={handleCopy}
            className="flex items-center justify-between group p-6 bg-white/50 backdrop-blur-sm border-l-4 border-primary rounded-r-xl cursor-pointer hover:bg-white transition-all duration-300 shadow-lg shadow-primary/5 active:scale-[0.98]"
          >
            <div className="flex items-start gap-4">
              <MapPin className="text-primary w-6 h-6 shrink-0 mt-1" />
              <div>
                <span className="block text-[10px] font-heading font-black uppercase text-primary tracking-widest mb-1">Unidade Patrimonial INC</span>
                <p className="text-[#0F172A] font-sans text-xs font-bold leading-relaxed uppercase tracking-tight group-hover:text-primary transition-colors">
                  {address}
                </p>
              </div>
            </div>
            <div className="shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-primary/5 group-hover:bg-primary group-hover:text-white transition-all">
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="aspect-square w-full rounded-2xl overflow-hidden shadow-2xl border border-primary/10 relative"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3675.253029433465!2d-47.034394024344445!3d-22.901264938478474!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c8cf131f57a249%3A0x7fb6f58f7bc87ef2!2sR.%20Dr.%20Jo%C3%A3o%20A.dos%20Santos%2C%20332%20-%20Jardim%20das%20Paineiras%2C%20Campinas%20-%20SP%2C%2013092-331!5e0!3m2!1spt-BR!2sbr!4v1711568000000!5m2!1spt-BR!2sbr&iwloc=near"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="contrast-[1.1] saturate-[1.1]"
            ></iframe>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
