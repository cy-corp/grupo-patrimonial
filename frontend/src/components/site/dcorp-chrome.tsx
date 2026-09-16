"use client";

import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type DcorpChromeValue = {
  /** Mobile home: logo already handed off into the header */
  logoInHeader: boolean;
  setLogoInHeader: (value: boolean) => void;
  isMobile: boolean;
};

const DcorpChromeContext = createContext<DcorpChromeValue | null>(null);

export function DcorpChromeProvider({ children }: { children: ReactNode }) {
  const [logoInHeader, setLogoInHeaderState] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const setLogoInHeader = useCallback((value: boolean) => {
    setLogoInHeaderState(value);
  }, []);

  const value = useMemo(
    () => ({ logoInHeader, setLogoInHeader, isMobile }),
    [logoInHeader, setLogoInHeader, isMobile],
  );

  return (
    <DcorpChromeContext.Provider value={value}>
      {children}
    </DcorpChromeContext.Provider>
  );
}

export function useDcorpChrome() {
  return useContext(DcorpChromeContext);
}
