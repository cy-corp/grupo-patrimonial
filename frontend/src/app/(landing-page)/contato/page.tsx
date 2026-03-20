"use client";

import { useState } from "react";
import { submitContact } from "@/lib/actions";
import { GoldButton } from "@/components/ui/gold-button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Building2, Globe, Landmark, ArrowRight, CheckCircle2 } from "lucide-react";

const offices = [
  {
    city: "SÃO PAULO",
    subtitle: "Matriz (Av. Brigadeiro Faria Lima)",
    icon: <Building2 className="w-8 h-8 text-primary/80" />,
    phone: "+55 11 3000 0000",
    email: "sp@grupopatrimonial.com",
    delay: 0.1
  },
  {
    city: "DUBAI",
    subtitle: "Investment Hub",
    icon: <Globe className="w-8 h-8 text-primary/80" />,
    phone: "+971 4 000 0000",
    email: "dxb@grupopatrimonial.com",
    delay: 0.2
  },
  {
    city: "LONDON",
    subtitle: "Real Estate Advisory",
    icon: <Landmark className="w-8 h-8 text-primary/80" />,
    phone: "+44 20 0000 0000",
    email: "uk@grupopatrimonial.com",
    delay: 0.3
  }
];

const subjectOptions = [
  "Gestão de Patrimônio",
  "Assessoria Imobiliária",
  "Engenharia & Construção",
  "Outros Assuntos"
];

export default function Contato() {
  const [status, setStatus] = useState<{ success: boolean; message: string } | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [subject, setSubject] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPending(true);
    setStatus(null);

    const formData = new FormData(e.currentTarget);
    formData.set("subject", subject);

    // Simulate server action
    const result = await submitContact(formData);
    setStatus(result);
    setIsPending(false);

    if (result.success) {
      e.currentTarget.reset();
      setSubject("");
    }
  }

  return (
    <main className="min-h-screen bg-surface">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-center px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            alt="Arquitetura de luxo"
            className="w-full h-full object-cover grayscale brightness-[0.4] dark:brightness-[0.3]"
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/60 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="w-16 h-[1px] bg-[#A1824A] dark:bg-primary"></div>
            <span className="text-[#A1824A] dark:text-primary font-headline tracking-[0.4em] uppercase text-[10px] font-bold">Estabelecendo Presença</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-headline text-6xl md:text-8xl font-light tracking-tight mb-8 text-on-surface"
          >
            Contato
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-body text-xl md:text-2xl text-on-surface-variant font-light tracking-[0.05em] leading-relaxed max-w-2xl"
          >
            Conexões Globais para um <span className="text-[#A1824A] dark:text-primary italic">Patrimônio Sólido</span>.
          </motion.p>
        </div>
      </section>

      {/* Global Offices Section */}
      <section className="py-24 px-6 md:px-24 bg-surface border-y border-outline-variant/10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {offices.map((office, index) => (
            <motion.div
              key={office.city}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: office.delay }}
              className="bg-surface-container-low/40 dark:bg-surface-container-low/20 p-10 border-l border-outline-variant/30 hover:bg-surface-container-high/60 transition-all duration-500 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                {office.icon}
              </div>
              <div className="mb-12 relative z-10">
                <div className="bg-primary/10 dark:bg-primary/5 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  {office.icon}
                </div>
                <h3 className="font-headline text-2xl text-on-surface mb-2 uppercase tracking-[0.2em] font-light">{office.city}</h3>
                <p className="text-primary/70 text-[10px] tracking-[0.2em] uppercase font-bold mb-6">{office.subtitle}</p>
              </div>

              <div className="space-y-4 text-xs font-light tracking-[0.15em] text-on-surface-variant relative z-10">
                <p className="flex items-center gap-3 group-hover:text-on-surface transition-colors">
                  <Phone className="w-3.5 h-3.5 text-primary/60" />
                  {office.phone}
                </p>
                <p className="flex items-center gap-3 group-hover:text-on-surface transition-colors">
                  <Mail className="w-3.5 h-3.5 text-primary/60" />
                  {office.email}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-32 px-6 md:px-24 bg-surface-container-lowest dark:bg-surface-container-lowest grid grid-cols-1 lg:grid-cols-2 gap-24 items-start relative overflow-hidden">
        {/* Abstract Background Element */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 dark:bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3"></div>

        <div className="space-y-16 relative z-10">
          <div>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 100 }}
              viewport={{ once: true }}
              className="h-[1px] bg-primary"
            />
            <h2 className="font-headline text-4xl md:text-5xl font-light text-on-surface mt-12 mb-8 uppercase tracking-tight leading-tight">
              Solicite uma <span className="text-primary italic">Consultoria Privada</span>
            </h2>
            <p className="text-on-surface-variant font-light tracking-[0.1em] leading-loose text-lg max-w-xl">
              Nossos consultores sêniores estão à disposição para discutir estratégias de preservação e expansão patrimonial em jurisdições globais.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative h-80 w-full rounded-2xl overflow-hidden group shadow-2xl"
          >
            <img
              alt="Luxury office"
              className="w-full h-full object-cover brightness-50 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-on-surface text-[10px] tracking-[0.5em] uppercase font-bold bg-surface/60 dark:bg-[#0e0e0e]/60 px-8 py-3 backdrop-blur-md border border-outline-variant/30">
                The Vault Experience
              </span>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="brushed-metal p-1 md:p-1.5 rounded-3xl shadow-[0_40px_100px_rgba(0,0,0,0.05)] dark:shadow-[0_40px_100px_rgba(0,0,0,0.6)]"
        >
          <div className="bg-surface/95 dark:bg-surface-container/95 backdrop-blur-xl p-8 md:p-12 rounded-[inherit] space-y-10 border border-outline-variant/40 dark:border-white/5">
            {status?.success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-20 text-center space-y-6"
              >
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10 text-primary" />
                </div>
                <h3 className="font-headline text-3xl text-on-surface uppercase tracking-widest">Mensagem Recebida</h3>
                <p className="text-on-surface-variant font-light tracking-widest max-w-sm">
                  {status.message}
                </p>
                <button
                  onClick={() => setStatus(null)}
                  className="text-primary text-[10px] uppercase font-bold tracking-[0.3em] hover:brightness-125 pt-4"
                >
                  Enviar nova mensagem
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2 group">
                    <Label htmlFor="name" className="text-[10px] font-semibold text-on-surface-variant uppercase tracking-[0.2em] block ml-1 group-focus-within:text-primary transition-colors">Nome Completo</Label>
                    <Input
                      id="name"
                      name="name"
                      required
                      placeholder="Ex: Arthur Pendragon"
                      className="bg-transparent border-0 border-b border-outline-variant/30 rounded-none h-14 px-1 focus-visible:ring-0 focus-visible:border-primary transition-all text-lg font-light tracking-wide placeholder:text-outline/50"
                    />
                  </div>

                  <div className="space-y-2 group">
                    <Label htmlFor="email" className="text-[10px] font-semibold text-on-surface-variant uppercase tracking-[0.2em] block ml-1 group-focus-within:text-primary transition-colors">E-mail</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="nome@email.com"
                      className="bg-transparent border-0 border-b border-outline-variant/30 rounded-none h-14 px-1 focus-visible:ring-0 focus-visible:border-primary transition-all text-lg font-light tracking-wide placeholder:text-outline/50"
                    />
                  </div>
                </div>

                <Select
                  label="Assunto de Interesse"
                  options={subjectOptions}
                  value={subject}
                  onChange={setSubject}
                  placeholder="Selecione o tema da consultoria"
                />

                <div className="space-y-2 group">
                  <Label htmlFor="message" className="text-[10px] font-semibold text-on-surface-variant uppercase tracking-[0.2em] block ml-1 group-focus-within:text-primary transition-colors">Mensagem</Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    placeholder="Como podemos auxiliar na gestão do seu patrimônio?"
                    className="bg-transparent border-0 border-b border-outline-variant/30 rounded-none px-1 focus-visible:ring-0 focus-visible:border-primary transition-all text-lg font-light tracking-wide resize-none placeholder:text-outline/50"
                  />
                </div>

                <GoldButton
                  type="submit"
                  disabled={isPending}
                  className="w-full py-6 text-sm font-bold uppercase tracking-[0.4em] rounded-xl flex items-center justify-center gap-4 group"
                >
                  {isPending ? "Processando..." : (
                    <>
                      Solicitar Consultoria
                      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
                    </>
                  )}
                </GoldButton>

                {status && !status.success && (
                  <p className="text-center text-sm font-medium text-destructive mt-4 tracking-widest uppercase text-[10px]">
                    {status.message}
                  </p>
                )}
              </form>
            )}
          </div>
        </motion.div>
      </section>
    </main>
  );
}
