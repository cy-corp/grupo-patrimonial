import { InvestorsHero } from "@/components/investidores/InvestorsHero";
import { BusinessModels } from "@/components/investidores/BusinessModels";
import { InvestorsCTA } from "@/components/investidores/InvestorsCTA";
import { Metadata } from "next";
import { motion } from "framer-motion";
import { ArrowRight, BarChart3, ShieldCheck, Globe, Landmark } from "lucide-react";
import Link from "next/link";

const investmentModalities = [
  {
    title: "Co-incorporação",
    description: "Participação direta no equity de novos empreendimentos residenciais e corporativos de alto padrão. Alinhamento total de interesses e transparência na gestão de custos.",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1000&auto=format&fit=crop",
    details: ["ROI Projetado: 18-24% a.a.", "Ticket Mínimo: R$ 500k", "Prazo : 24-48 meses"]
  },
  {
    title: "Fundos Exclusivos",
    description: "Estruturação de veículos de investimento segregados para famílias e players institucionais, com foco em Yield recorrente e proteção inflacionária.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000&auto=format&fit=crop",
    details: ["Liquidez: Semestral", "Segurança: Garantia Real", "Foco: Ativos Estabilizados"]
  },
  {
    title: "Permuta Estratégica",
    description: "Maximização do valor de terrenos através da troca por área construída em projetos de alta liquidez. Engenharia financeira para otimização fiscal.",
    image: "https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=1000&auto=format&fit=crop",
    details: ["Agilidade: Processo acelerado", "Valorização: +30% vs Venda Direta"]
  }
];

export default function Investidores() {
  return (
    <main className="min-h-screen bg-[#F8F9FA] overflow-x-hidden">
      {/* Epic Cinematic Hero */}
      <section className="relative h-screen flex items-center px-6 md:px-12 lg:px-24 bg-[#0F172A] overflow-hidden">
        <motion.div 
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.3 }}
          transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2000&auto=format&fit=crop" 
            alt="Capital Market" 
            className="w-full h-full object-cover grayscale brightness-125"
          />
        </motion.div>
        
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] via-[#0F172A]/80 to-transparent"></div>

        <div className="relative z-10 max-w-5xl">
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            <span className="text-primary font-bold tracking-[0.5em] uppercase text-[10px] mb-8 block">Mercado de Capitais</span>
            <h1 className="font-headline text-6xl md:text-9xl text-white font-light tracking-tighter leading-[0.9] mb-12">
              Capital que gera <br/>
              <span className="font-bold italic text-primary">Valor Perene</span>.
            </h1>
            <div className="flex flex-col md:flex-row gap-12 items-start md:items-center">
              <p className="text-white/50 text-xl font-light max-w-xl leading-relaxed">
                Operações estruturadas de investimento imobiliário focadas em preservação, liquidez e retornos compostos acima da média de mercado.
              </p>
              <div className="w-[2px] h-20 bg-primary/20 hidden md:block"></div>
              <div className="space-y-2">
                <span className="text-primary font-bold text-4xl font-headline">R$ 2.4B</span>
                <p className="text-white/30 text-[10px] uppercase tracking-widest">Sob Gestão Estratégica</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Side-by-Side Vignettes */}
      <section className="py-48 px-6 container mx-auto">
        <div className="mb-40 max-w-3xl">
          <h2 className="text-primary font-bold tracking-[0.4em] uppercase text-[10px] mb-12">Oportunidades</h2>
          <h3 className="font-headline text-5xl md:text-7xl text-[#0F172A] leading-tight tracking-tighter">
            Três Pilares de <span className="font-bold italic">Rentabilidade</span>.
          </h3>
        </div>

        <div className="space-y-64">
          {investmentModalities.map((mod, index) => (
            <div 
              key={mod.title}
              className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-24 lg:gap-40`}
            >
              <motion.div 
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="lg:w-1/2 relative group"
              >
                <div className="absolute inset-0 bg-primary/10 -translate-x-6 translate-y-6 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700"></div>
                <div className="relative overflow-hidden aspect-video shadow-[0_40px_100px_rgba(0,0,0,0.1)]">
                  <img 
                    src={mod.image} 
                    alt={mod.title} 
                    className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-2000 grayscale group-hover:grayscale-0"
                  />
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
                className="lg:w-1/2 space-y-10"
              >
                <span className="text-primary font-bold font-headline text-4xl italic opacity-20">0{index + 1}</span>
                <h4 className="font-headline text-4xl md:text-5xl text-[#0F172A] font-light leading-none">
                  {mod.title}
                </h4>
                <p className="text-[#0F172A]/50 text-lg font-light leading-relaxed max-w-lg">
                  {mod.description}
                </p>
                
                <ul className="space-y-4 pt-6 border-t border-slate-100">
                  {mod.details.map((detail: string) => (
                    <li key={detail} className="flex items-center gap-4 text-xs font-bold text-[#0F172A]/70 uppercase tracking-widest">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      {detail}
                    </li>
                  ))}
                </ul>

                <div className="pt-10">
                  <Link href="/contato" className="inline-flex items-center gap-6 group overflow-hidden">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-[0.4em] relative">
                      Solicitar Prospecto
                      <span className="absolute bottom-0 left-0 w-full h-[1px] bg-primary translate-x-[-105%] group-hover:translate-x-0 transition-transform"></span>
                    </span>
                    <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-2 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </section>

      {/* Dark Governance Section */}
      <section className="py-48 bg-[#0F172A] text-white relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-32">
            <div className="lg:w-1/2">
              <span className="text-primary font-bold tracking-[0.4em] uppercase text-[10px] block mb-12">Rigor & Ética</span>
              <h2 className="font-headline text-5xl md:text-8xl font-light tracking-tighter leading-none mb-12">
                Governança <span className="font-bold italic text-primary">Prateada</span>.
              </h2>
              <div className="space-y-12">
                <div className="flex items-start gap-10">
                  <ShieldCheck className="w-10 h-10 text-primary flex-shrink-0" />
                  <div>
                    <h5 className="text-lg font-headline font-bold mb-3">Segregação de Patrimônio</h5>
                    <p className="text-white/40 font-light leading-relaxed">Cada operação possui sua própria SPE, garantindo que os ativos do investidor permaneçam isolados e protegidos.</p>
                  </div>
                </div>
                <div className="flex items-start gap-10">
                  <BarChart3 className="w-10 h-10 text-primary flex-shrink-0" />
                  <div>
                    <h5 className="text-lg font-headline font-bold mb-3">Auditoria Permanente</h5>
                    <p className="text-white/40 font-light leading-relaxed">Relatórios mensais assinados por empresas líderes mundiais em compliance imobiliário.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               className="lg:w-1/2 relative h-[600px] w-full border-[0.5px] border-white/10"
            >
              <img 
                src="https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1200&auto=format&fit=crop" 
                className="w-full h-full object-cover opacity-50 grayscale"
                alt="Compliance"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-12 bg-[#0F172A]/80 backdrop-blur-xl border border-white/5">
                  <Globe className="w-12 h-12 text-primary mx-auto mb-6" />
                  <span className="text-4xl font-headline font-bold text-white block mb-2">GLOBAL COMPLIANCE</span>
                  <p className="text-primary text-[10px] font-bold uppercase tracking-[0.4em]">Padrão Suíço de Report</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Wealth Management CTA */}
      <section className="py-48 bg-white overflow-hidden">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="font-headline text-5xl md:text-7xl text-[#0F172A] font-light leading-tight mb-16 italic">
              Seu capital merece o <br/>
              <span className="font-bold not-italic">Zelo de um Curador</span>.
            </h3>
            <Link href="/contato" className="inline-block bg-[#0F172A] text-white py-8 px-16 text-[11px] font-bold uppercase tracking-[0.5em] rounded-xl hover:bg-primary transition-all shadow-2xl">
              Agendar Reunião Privada
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
