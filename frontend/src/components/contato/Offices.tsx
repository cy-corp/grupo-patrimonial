"use client";

import React from "react";
import { motion } from "framer-motion";
import { Building2, Globe, Landmark, Phone, Mail } from "lucide-react";

const offices = [
  {
    city: "São Paulo",
    region: "Brasil",
    address: "Av. Brigadeiro Faria Lima, 4500",
    phone: "+55 11 3000 0000",
    email: "sp@grupopatrimonial.com",
    icon: Building2,
    delay: 0.1
  },
  {
    city: "Dubai",
    region: "UAE",
    address: "Business Bay, Tower 1",
    phone: "+971 4 000 0000",
    email: "dxb@grupopatrimonial.com",
    icon: Globe,
    delay: 0.2
  },
  {
    city: "London",
    region: "UK",
    address: "Mayfair, W1K",
    phone: "+44 20 0000 0000",
    email: "uk@grupopatrimonial.com",
    icon: Landmark,
    delay: 0.3
  }
];

export function Offices() {
  return (
    <section className="py-32 px-6 md:px-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-primary font-sans text-xs uppercase tracking-[0.4em] block mb-4 font-bold"
          >
            Presença Global
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-heading text-3xl md:text-5xl text-[#0F172A] uppercase font-black"
          >
            Onde o capital se movimenta
          </motion.h2>
          <div className="mt-8">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: 60 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="h-[1px] bg-primary"
            ></motion.div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#0F172A]/5 overflow-hidden rounded-2xl border border-[#0F172A]/5">
          {offices.map((office, index) => (
            <motion.div
              key={office.city}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: office.delay }}
              className="group relative bg-[#F8F1E3] p-12 flex flex-col min-h-[400px] justify-between transition-all duration-700 hover:bg-white"
            >
              <div className="absolute top-10 right-10 opacity-10 group-hover:opacity-100 transition-all duration-500">
                <office.icon className="text-primary w-12 h-12 group-hover:scale-110 transition-transform" />
              </div>

              <div>
                <h3 className="font-heading text-3xl text-primary uppercase font-bold mb-1">{office.city}</h3>
                <span className="text-[10px] font-sans uppercase tracking-[0.3em] font-black text-[#0F172A]/40">{office.region}</span>
                <p className="font-sans text-[#0F172A]/60 text-sm leading-relaxed mt-6 max-w-[200px] font-medium">{office.address}</p>
              </div>

              <div className="space-y-4 pt-10 border-t border-[#0F172A]/5">
                <a href={`tel:${office.phone}`} className="flex items-center gap-3 text-[10px] font-sans font-black text-primary uppercase tracking-[0.2em] hover:opacity-70 transition-opacity">
                  <Phone className="w-3 h-3" />
                  {office.phone}
                </a>
                <a href={`mailto:${office.email}`} className="flex items-center gap-3 text-[10px] font-sans font-black text-primary uppercase tracking-[0.2em] hover:opacity-70 transition-opacity">
                  <Mail className="w-3 h-3" />
                  {office.email}
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
