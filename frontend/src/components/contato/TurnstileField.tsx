"use client";

import { Turnstile } from "@marsidev/react-turnstile";
import { useEffect, useState } from "react";

const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

export function TurnstileField({
  resetSignal,
}: {
  resetSignal: number;
}) {
  const [token, setToken] = useState("");

  useEffect(() => {
    setToken("");
  }, [resetSignal]);

  if (!siteKey) return null;

  return (
    <div className="flex justify-center">
      <input type="hidden" name="turnstileToken" value={token} />
      <Turnstile
        key={resetSignal}
        siteKey={siteKey}
        options={{ theme: "light", size: "flexible" }}
        onSuccess={setToken}
        onExpire={() => setToken("")}
        onError={() => setToken("")}
      />
    </div>
  );
}
