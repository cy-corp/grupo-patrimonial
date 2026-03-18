"use client";

import { useState } from "react";
import { submitOrcamento } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function Orcamento() {
  const [status, setStatus] = useState<{ success: boolean; message: string } | null>(null);
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPending(true);
    setStatus(null);

    const formData = new FormData(e.currentTarget);
    const result = await submitOrcamento(formData);
    setStatus(result);
    setIsPending(false);

    if (result.success) {
      e.currentTarget.reset();
    }
  }

  return (
    <div className="flex flex-col flex-1 items-center py-24 px-4">
      <h1 className="font-heading text-4xl font-bold uppercase tracking-tight text-primary md:text-5xl">Solicite um Orçamento</h1>
      <p className="mt-4 text-center max-w-2xl text-lg text-muted-foreground">Preencha os dados abaixo e entraremos em contato com uma proposta detalhada.</p>

      <form onSubmit={handleSubmit} className="mt-12 w-full max-w-lg space-y-6 bg-card p-8 rounded-2xl shadow-sm border">
        <div className="space-y-2">
          <Label htmlFor="name">Nome / Empresa</Label>
          <Input id="name" name="name" required />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="service">Serviço Desejado</Label>
          <Input id="service" name="service" placeholder="Ex: Incorporação, Gestão Patrimonial..." required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="details">Detalhes do Projeto</Label>
          <Textarea id="details" name="details" rows={5} required />
        </div>

        <Button type="submit" className="w-full text-lg h-12" disabled={isPending}>
          {isPending ? "Enviando..." : "Solicitar Orçamento"}
        </Button>

        {status && (
          <p className={`text-center font-medium ${status.success ? "text-green-600" : "text-destructive"}`}>
            {status.message}
          </p>
        )}
      </form>
    </div>
  );
}
