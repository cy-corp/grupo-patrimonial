"use client";

import { useState } from "react";
import { submitContact } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function Contato() {
  const [status, setStatus] = useState<{ success: boolean; message: string } | null>(null);
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPending(true);
    setStatus(null);

    const formData = new FormData(e.currentTarget);
    const result = await submitContact(formData);
    setStatus(result);
    setIsPending(false);

    if (result.success) {
      e.currentTarget.reset();
    }
  }

  return (
    <div className="flex flex-col flex-1 items-center py-24 px-4">
      <h1 className="font-heading text-4xl font-bold uppercase tracking-tight text-primary md:text-5xl">Fale com um Especialista</h1>
      <p className="mt-4 text-center max-w-2xl text-lg text-muted-foreground">Temos a solução ideal para proteger e valorizar o seu patrimônio.</p>

      <form onSubmit={handleSubmit} className="mt-12 w-full max-w-lg space-y-6 bg-card p-8 rounded-2xl shadow-sm border">
        <div className="space-y-2">
          <Label htmlFor="name">Nome Completo</Label>
          <Input id="name" name="name" required />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Mensagem</Label>
          <Textarea id="message" name="message" rows={5} required />
        </div>

        <Button type="submit" className="w-full text-lg h-12" disabled={isPending}>
          {isPending ? "Enviando..." : "Enviar Mensagem"}
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
