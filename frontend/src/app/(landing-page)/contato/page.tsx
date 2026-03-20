"use client";

import { useState } from "react";
import { submitContact } from "@/lib/actions";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ArrowRight, Phone, Mail, Building2, Globe, Landmark } from "lucide-react";
import { Select } from "@/components/ui/select";

const offices = [
  {
    city: "São Paulo",
    region: "Brasil",
    address: "Av. Brigadeiro Faria Lima, 4500",
    phone: "+55 11 3000 0000",
    email: "sp@grupopatrimonial.com",
    icon: <Building2 className="w-8 h-8" />
  },
  {
    city: "Dubai",
    region: "UAE",
    address: "Business Bay, Tower 1",
    phone: "+971 4 000 0000",
    email: "dxb@grupopatrimonial.com",
    icon: <Globe className="w-8 h-8" />
  },
  {
    city: "London",
    region: "UK",
    address: "Mayfair, W1K",
    phone: "+44 20 0000 0000",
    email: "uk@grupopatrimonial.com",
    icon: <Landmark className="w-8 h-8" />
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

    const result = await submitContact(formData);
    setStatus(result);
    setIsPending(false);

    if (result.success) {
      e.currentTarget.reset();
      setSubject("");
    }
  }

  return (
    <main className="min-h-screen bg-[#F8F9FA] overflow-x-hidden">
      {/* Cinematic Dark Hero */}
      <section className="relative h-screen flex items-center justify-center bg-[#0F172A] overflow-hidden">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.2 }}
          transition={{ duration: 2 }}
          className="absolute inset-0"
        >
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop"
            alt="Office"
            className="w-full h-full object-cover grayscale"
          />
        </motion.div>

        <div className="relative z-10 text-center max-w-4xl px-6">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <span className="text-primary font-bold tracking-[0.6em] uppercase text-[10px] block mb-8">Conecte-se</span>
            <h1 className="font-headline text-6xl md:text-9xl text-white font-light tracking-tighter leading-none mb-12 italic">
              Abertos ao <span className="font-bold not-italic text-primary">Diálogo</span>.
            </h1>
            <p className="text-white/40 text-[10px] font-bold tracking-[0.3em] uppercase max-w-lg mx-auto leading-relaxed border-t border-white/10 pt-8 mt-8">
              Atendimento exclusivo para Family Offices e Investidores Globais através de nossas unidades estratégicas.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Asymmetric Contact Layout */}
      <section className="py-48 px-6 container mx-auto">
        <div className="flex flex-col lg:flex-row gap-32 items-start">

          {/* Left Side: Offices info with a novel look */}
          <div className="lg:w-2/5 space-y-20">
            <div>
              <h2 className="text-primary font-bold tracking-[0.4em] uppercase text-[10px] mb-12">Presença Global</h2>
              <h3 className="font-headline text-5xl md:text-7xl text-[#0F172A] leading-tight tracking-tighter mb-12 italic">
                Onde o capital <br /> <span className="font-bold not-italic">se movimenta</span>.
              </h3>
            </div>

            <div className="space-y-16">
              {offices.map((office, idx) => (
                <motion.div
                  key={office.city}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2 }}
                  className="group flex gap-8 items-start relative pb-12 border-b border-slate-100 last:border-0"
                >
                  <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center text-slate-300 group-hover:bg-primary/10 group-hover:text-primary transition-all duration-700 flex-shrink-0">
                    {office.icon}
                  </div>
                  <div>
                    <h4 className="text-2xl font-headline font-bold text-[#0F172A] flex items-center gap-3">
                      {office.city}
                      <span className="text-primary text-[10px] font-bold uppercase tracking-widest bg-primary/5 px-2 py-0.5 rounded">{office.region}</span>
                    </h4>
                    <p className="text-[#0F172A]/40 text-sm font-light mt-4 mb-6 leading-relaxed">
                      {office.address}
                    </p>
                    <div className="flex flex-col gap-2">
                      <a href={`tel:${office.phone}`} className="flex items-center gap-3 text-[10px] font-bold text-[#0F172A]/70 uppercase tracking-widest hover:text-primary transition-colors">
                        <Phone className="w-3.5 h-3.5" />
                        {office.phone}
                      </a>
                      <a href={`mailto:${office.email}`} className="flex items-center gap-3 text-[10px] font-bold text-[#0F172A]/70 uppercase tracking-widest hover:text-primary transition-colors">
                        <Mail className="w-3.5 h-3.5" />
                        {office.email}
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Side: The Vault Form */}
          <div className="lg:w-3/5 relative">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-12 md:p-24 shadow-[0_60px_150px_rgba(0,0,0,0.05)] border border-slate-100 relative overflow-hidden"
            >

              <AnimatePresence mode="wait">
                {status?.success ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center justify-center py-20 text-center"
                  >
                    <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-10">
                      <CheckCircle2 className="w-12 h-12 text-primary" />
                    </div>
                    <h3 className="text-3xl font-headline font-bold text-[#0F172A] mb-4">MENSAGEM REGISTRADA</h3>
                    <p className="text-slate-400 font-light max-w-sm mb-12">
                      Sua solicitação foi enviada ao conselho executivo. Retornaremos em até 24h úteis.
                    </p>
                    <button
                      onClick={() => setStatus(null)}
                      className="text-primary text-[10px] font-bold uppercase tracking-[0.5em] hover:opacity-70 transition-opacity"
                    >
                      Realizar nova consulta
                    </button>
                  </motion.div>
                ) : (
                  <form key="form" onSubmit={handleSubmit} className="space-y-16">
                    <div className="space-y-12">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="space-y-3">
                          <Label htmlFor="name" className="text-[10px] font-bold text-[#0F172A]/30 uppercase tracking-[0.3em]">TITULAR</Label>
                          <Input
                            id="name"
                            name="name"
                            required
                            placeholder="Nome completo"
                            className="bg-transparent border-0 border-b border-slate-200 rounded-none h-14 px-0 focus-visible:ring-0 focus-visible:border-primary text-xl font-light tracking-wide transition-all placeholder:text-slate-200"
                          />
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="email" className="text-[10px] font-bold text-[#0F172A]/30 uppercase tracking-[0.3em]">REPOSITÓRIO DIGITAL</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            required
                            placeholder="E-mail principal"
                            className="bg-transparent border-0 border-b border-slate-200 rounded-none h-14 px-0 focus-visible:ring-0 focus-visible:border-primary text-xl font-light tracking-wide transition-all placeholder:text-slate-200"
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-[10px] font-bold text-[#0F172A]/30 uppercase tracking-[0.3em]">NATUREZA DA SOLICITAÇÃO</Label>
                        <Select
                          options={subjectOptions}
                          value={subject}
                          onChange={setSubject}
                          placeholder="Escolha o segmento de interesse"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="message" className="text-[10px] font-bold text-[#0F172A]/30 uppercase tracking-[0.3em]">MEMORANDO</Label>
                        <Textarea
                          id="message"
                          name="message"
                          rows={6}
                          required
                          placeholder="Descreva brevemente o contexto da sua necessidade patrimonial."
                          className="bg-transparent border-0 border-b border-slate-200 rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary text-xl font-light tracking-wide resize-none transition-all placeholder:text-slate-200"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isPending}
                      className="w-full bg-[#0F172A] text-white py-8 px-12 text-[11px] font-bold uppercase tracking-[0.6em] rounded-none hover:bg-primary transition-all flex items-center justify-center gap-6 group shadow-2xl relative overflow-hidden cursor-pointer"
                    >
                      <span className="relative z-10">{isPending ? "PROCESSANDO..." : "ENVIAR"}</span>
                      <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-3 transition-transform" />
                    </button>

                    {status && !status.success && (
                      <p className="text-center text-xs text-red-500 font-bold uppercase tracking-widest mt-8">
                        {status.message}
                      </p>
                    )}
                  </form>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Visual Balance Element */}
            <div className="absolute -z-10 -bottom-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-[100px]"></div>
          </div>
        </div>
      </section>

      {/* Trust & Discreetness Footer */}
      {/* <section className="py-48 bg-[#F8F9FA] text-center container mx-auto px-6 border-t border-slate-200">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-[#0F172A]/20 font-headline text-2xl md:text-3xl font-light max-w-4xl mx-auto italic mb-12">
            "A discrição é a nossa maior virtude, a excelência o nosso único padrão."
          </p>
          <div className="flex justify-center gap-12 grayscale opacity-30 group">
            <Landmark className="w-12 h-12 hover:text-primary hover:opacity-100 transition-all pointer-events-none" />
            <Building2 className="w-12 h-12 hover:text-primary hover:opacity-100 transition-all pointer-events-none" />
            <Globe className="w-12 h-12 hover:text-primary hover:opacity-100 transition-all pointer-events-none" />
          </div>
        </motion.div>
      </section> */}
    </main>
  );
}
