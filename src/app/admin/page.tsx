"use client";

import { useState } from "react";
import { uploadImage } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminUpload() {
  const [status, setStatus] = useState<{ success: boolean; message?: string; url?: string } | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPending(true);
    setStatus(null);

    const formData = new FormData(e.currentTarget);
    const result = await uploadImage(formData);
    setStatus(result);
    setIsPending(false);

    if (result.success && result.url) {
      setImageUrls((prev) => [result.url as string, ...prev]);
      // Reset only the file input
      const fileInput = document.getElementById("file") as HTMLInputElement;
      if (fileInput) fileInput.value = "";
    }
  }

  return (
    <div className="flex flex-col flex-1 items-center py-24 px-4 bg-muted/30">
      <div className="w-full max-w-md bg-card p-8 rounded-2xl shadow-sm border">
        <h1 className="font-heading text-2xl font-bold uppercase tracking-tight text-center mb-6">Painel Administrativo</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="password">Senha de Acesso</Label>
            <Input id="password" name="password" type="password" required />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="file">Upload de Imagem</Label>
            <Input id="file" name="file" type="file" accept="image/*" required />
          </div>

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Enviando..." : "Enviar Imagem"}
          </Button>

          {status && (
            <p className={`text-center font-medium text-sm ${status.success ? "text-green-600" : "text-destructive"}`}>
              {status.message || (status.success && "Upload concluído!")}
            </p>
          )}
        </form>

        {imageUrls.length > 0 && (
          <div className="mt-8">
            <h3 className="font-semibold mb-4 border-b pb-2">Imagens Recentes:</h3>
            <ul className="space-y-3 text-sm break-all">
              {imageUrls.map((url, i) => (
                <li key={i} className="flex flex-col gap-1 p-3 bg-muted rounded-md relative text-muted-foreground group">
                  <a href={url} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                    {url}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
