"use client";
import { motion } from "framer-motion";
import { Building2, Globe, Landmark, ShieldCheck } from "lucide-react";

const leadership = [
  {
    name: "Sócio 1",
    role: "Diretor Executivo",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop",
    bio: "Ex-gestor de fundos soberanos, com foco em real estate alternativo e estruturação de portfólios complexos."
  },
  {
    name: "Sócio 2",
    role: "Diretora de Engenharia",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
    bio: "Especialista em retrofit de luxo e construções sustentáveis com certificação internacional."
  },
  {
    name: "Sócio 3",
    role: "Diretor de Estratégia",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop",
    bio: "Mestre em Direito Imobiliário pela Sorbonne, focado em segurança jurídica e sucessão patrimonial."
  },
  {
    name: "Sócio 4",
    role: "Diretora Jurídica",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop",
    bio: "Especialista em conformidade global e estruturação de SPEs para ativos de alto padrão."
  }
];

export default function QuemSomos() {
  return (
    <main className="min-h-screen bg-[#F8F9FA] overflow-x-hidden">
      {/* Cinematic Dark Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[#0F172A]">
        <motion.div 
          initial={{ scale: 1.3, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.4 }}
          transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop" 
            alt="Arquitetura de prestígio" 
            className="w-full h-full object-cover grayscale brightness-110"
          />
        </motion.div>
        
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A]/80 via-transparent to-[#0F172A] z-0"></div>
        
        <div className="relative z-10 text-center max-w-6xl px-6">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" }}
          >
            <span className="text-primary font-bold tracking-[0.8em] uppercase text-[10px] block mb-10 border-b border-primary/20 pb-4 w-fit mx-auto">Nossa Essência</span>
            <h1 className="font-headline text-5xl md:text-9xl text-white font-light tracking-tighter leading-[0.9] mb-12">
              Arquitetando um <br/>
              <span className="font-bold italic text-primary">Legado Inabalável</span>.
            </h1>
            <div className="w-24 h-[1px] bg-primary mx-auto mb-12"></div>
            <p className="text-white/40 text-sm md:text-base font-light tracking-[0.3em] max-w-2xl mx-auto uppercase leading-relaxed">
              Onde o zelar pelo patrimônio encontra a precisão técnica da engenharia moderna.
            </p>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 15, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          className="absolute bottom-16 left-1/2 -translate-x-1/2 opacity-30"
        >
          <div className="w-[1px] h-24 bg-gradient-to-b from-primary to-transparent"></div>
        </motion.div>
      </section>

      {/* Asymmetric Legacy Section */}
      <section className="py-48 px-6 container mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-24 lg:gap-40 relative">
          <div className="lg:w-1/2 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative z-10"
            >
              <h2 className="text-primary text-[10px] font-bold tracking-[0.4em] uppercase mb-12">Nossa Missão</h2>
              <h3 className="font-headline text-5xl md:text-7xl text-[#0F172A] leading-[1.1] tracking-tighter mb-12 italic">
                A solidez que o tempo <span className="font-bold not-italic">não consome</span>.
              </h3>
              <p className="text-[#0F172A]/50 text-xl font-light leading-relaxed max-w-xl mb-16 border-l-2 border-primary/10 pl-10">
                Fundado sob a premissa de que o patrimônio imobiliário é o pilar mais resiliente de uma família, o Grupo Patrimonial integra engenharia rigorosa com inteligência jurídica para garantir que cada metro quadrado seja um ativo de valor crescente.
              </p>
              
              <div className="flex flex-col gap-10">
                <div className="flex items-start gap-8 group">
                  <div className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-500">
                    <ShieldCheck className="w-5 h-5 text-slate-300 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h4 className="text-[11px] font-bold text-[#0F172A] uppercase tracking-widest mb-2">Governança Familiar</h4>
                    <p className="text-sm text-slate-400 font-light max-w-sm">Estruturamos a sucessão imobiliária com segurança jurídica absoluta.</p>
                  </div>
                </div>
                <div className="flex items-start gap-8 group">
                  <div className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-500">
                    <Globe className="w-5 h-5 text-slate-300 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h4 className="text-[11px] font-bold text-[#0F172A] uppercase tracking-widest mb-2">Visão Global</h4>
                    <p className="text-sm text-slate-400 font-light max-w-sm">Conectamos ativos brasileiros a jurisdições e padrões internacionais.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="lg:w-1/2 order-1 lg:order-2 relative">
            <motion.div 
              initial={{ opacity: 0, scale: 1.1, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5 }}
              className="relative aspect-[4/5] w-full max-w-2xl mx-auto overflow-hidden shadow-[0_60px_120px_rgba(0,0,0,0.1)]"
            >
              <img 
                src="https://images.unsplash.com/photo-1503387762-592dee58c160?q=80&w=1600&auto=format&fit=crop" 
                className="w-full h-full object-cover scale-105"
                alt="Arquitetura de prestígio"
              />
              <div className="absolute inset-0 bg-primary/5 mix-blend-multiply opacity-20"></div>
            </motion.div>
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="absolute -right-12 -bottom-12 w-80 h-80 bg-white flex flex-col justify-end p-12 shadow-[0_50px_100px_rgba(0,0,0,0.1)] hidden lg:flex overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 opacity-20 group-hover:opacity-40 transition-opacity">
                <img 
                  src="https://images.unsplash.com/photo-1522156373667-4c7234bbd804?q=80&w=400&auto=format&fit=crop" 
                  alt="Detail" 
                  className="w-full h-full object-cover"
                />
              </div>
              <Building2 className="w-12 h-12 text-primary mb-8" />
              <p className="font-headline text-2xl text-[#0F172A] leading-tight">+25 anos de solidez técnica.</p>
              <div className="mt-8 w-12 h-[1px] bg-primary"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Leadership Gallery Section */}
      <section className="py-48 bg-[#0F172A] text-white relative overflow-hidden">
        {/* Subtle Brushed Metal Background Effect */}
        <div className="absolute inset-0 opacity-[0.03] select-none pointer-events-none" 
             style={{ backgroundImage: "linear-gradient(45deg, #fff 25%, transparent 25%, transparent 50%, #fff 50%, #fff 75%, transparent 75%, transparent)" }}></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-32 gap-12">
            <div className="max-w-3xl">
              <span className="text-primary font-bold tracking-[0.5em] uppercase text-[10px] block mb-12">Liderança Executiva</span>
              <h2 className="font-headline text-5xl md:text-8xl font-light tracking-tighter leading-none">
                Mentes por trás do <span className="font-bold italic text-primary">Alto Padrão</span>.
              </h2>
            </div>
            <div className="w-40 h-[1.5px] bg-primary/30 mb-6 hidden md:block"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
            {leadership.map((member, index) => (
              <motion.div 
                key={member.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <div className="relative mb-12 overflow-hidden aspect-[3/4]">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity"></div>
                  <div className="absolute inset-0 border-[0.5px] border-white/5 opacity-0 group-hover:opacity-100 transition-opacity m-4"></div>
                </div>
                <h3 className="text-3xl font-headline font-bold text-white mb-3 group-hover:text-primary transition-colors">{member.name}</h3>
                <p className="text-primary text-[10px] uppercase tracking-[0.4em] font-bold mb-8">{member.role}</p>
                <p className="text-white/40 text-sm font-light leading-relaxed group-hover:text-white/70 transition-colors">
                  {member.bio}
                </p>
                <div className="mt-8 pt-8 border-t border-white/5 flex justify-end">
                   <Landmark className="w-5 h-5 text-white/10 group-hover:text-primary/40 transition-colors" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Epic Trust Quote */}
      <section className="py-56 bg-white relative">
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none overflow-hidden">
          <span className="font-headline text-[30vw] font-bold text-slate-900 whitespace-nowrap">PATRIMONIAL</span>
        </div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <span className="text-primary font-bold tracking-[0.6em] uppercase text-[10px] block mb-16">Nossa Promessa</span>
            <blockquote className="font-headline text-4xl md:text-7xl text-[#0F172A] font-light italic max-w-5xl mx-auto leading-tight mb-20">
              "A verdadeira solidez não está no concreto que derramamos, mas nos princípios que mantemos."
            </blockquote>
            <div className="flex flex-col items-center gap-6">
              <div className="w-16 h-[1.5px] bg-primary"></div>
              <p className="text-[#0F172A]/40 text-[10px] font-bold uppercase tracking-[0.5em]">Conselho do Grupo Patrimonial</p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          <h2 className="font-headline text-3xl md:text-5xl text-on-surface mb-8 tracking-tight">Interessado em nossa visão?</h2>
          <p className="font-body text-on-surface-variant mb-12 max-w-xl mx-auto text-lg leading-relaxed">
            Explore as oportunidades de investimento e parceria com o Grupo Patrimonial.
          </p>
          <div className="flex justify-center">
            <GoldButton className="px-12 py-5 text-sm font-bold uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-all">
              Fale com um Especialista
            </GoldButton>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
