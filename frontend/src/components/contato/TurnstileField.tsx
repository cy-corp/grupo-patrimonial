"use client";

import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

export type TurnstileHandle = {
  waitForToken: () => Promise<string>;
};

export const TurnstileField = forwardRef<
  TurnstileHandle,
  {
    resetSignal: number;
    variant?: "visible" | "invisible";
  }
>(function TurnstileField({ resetSignal, variant = "visible" }, ref) {
  const widgetRef = useRef<TurnstileInstance>(null);
  const [token, setToken] = useState("");

  useEffect(() => {
    setToken("");
  }, [resetSignal]);

  useImperativeHandle(
    ref,
    () => ({
      async waitForToken() {
        if (!siteKey) return "";
        if (token) return token;
        const next = await widgetRef.current?.getResponsePromise(20_000);
        return next || "";
      },
    }),
    [token],
  );

  if (!siteKey) return null;

  return (
    <div className="flex justify-center">
      <input type="hidden" name="turnstileToken" value={token} />
      <Turnstile
        ref={widgetRef}
        key={resetSignal}
        siteKey={siteKey}
        options={
          variant === "invisible"
            ? {
                theme: "light",
                size: "invisible",
                appearance: "interaction-only",
                refreshExpired: "auto",
                refreshTimeout: "auto",
                language: "pt-BR",
                action: "financiamento",
                responseField: false,
              }
            : { theme: "light", size: "flexible", responseField: false }
        }
        onSuccess={setToken}
        onExpire={() => setToken("")}
        onError={() => setToken("")}
      />
    </div>
  );
});
