import { useCallback, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type UploadState = "idle" | "uploading" | "success" | "error";

export function useImageUpload() {
  const [state, setState] = useState<UploadState>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const upload = useCallback(
    async (
      file: File,
      slotId: string,
      slotKey: string,
      pageSlug: string,
      altText?: string,
    ): Promise<string | null> => {
      setState("uploading");
      setErrorMsg(null);

      try {
        const supabase = createClient();
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session) {
          setState("error");
          setErrorMsg("Sessão expirada. Por favor, faça login novamente.");
          return null;
        }

        const form = new FormData();
        form.append("file", file);
        form.append("slot_id", slotId);
        form.append("slot_key", slotKey);
        form.append("page_slug", pageSlug);
        if (altText) {
          form.append("alt_text", altText);
        }

        const res = await fetch("/api/upload", {
          method: "POST",
          headers: { Authorization: `Bearer ${session.access_token}` },
          body: form,
        });

        const data = await res.json();

        if (!res.ok) {
          setState("error");
          setErrorMsg(data.error || "Falha ao enviar. Tente novamente.");
          return null;
        }

        setState("success");
        return data.url;
      } catch {
        setState("error");
        setErrorMsg("Erro de rede ou servidor. Tente novamente.");
        return null;
      }
    },
    [],
  );

  return { upload, state, errorMsg };
}
