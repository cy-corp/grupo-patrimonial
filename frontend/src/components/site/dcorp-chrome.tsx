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
  isMobile: boolean;
  /**
   * Home past the soft hero threshold.
   * Drives header glass + mobile logo handoff together from one scroll signal.
   */
  pastHero: boolean;
  setPastHero: (value: boolean) => void;
};

const DcorpChromeContext = createContext<DcorpChromeValue | null>(null);

export function DcorpChromeProvider({ children }: { children: ReactNode }) {
  const [pastHero, setPastHeroState] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const setPastHero = useCallback((value: boolean) => {
    setPastHeroState(value);
  }, []);

  const value = useMemo(
    () => ({
      isMobile,
      pastHero,
      setPastHero,
    }),
    [isMobile, pastHero, setPastHero],
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
