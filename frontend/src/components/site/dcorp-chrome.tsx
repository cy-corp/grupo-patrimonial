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
  /** Dev HUD — enable with ?debug=handoff */
  debugHandoff: boolean;
  handoffDebug: {
    scrollY: number;
    lineTop: number | null;
    note: string;
  };
  setHandoffDebug: (value: {
    scrollY: number;
    lineTop: number | null;
    note: string;
  }) => void;
};

const DcorpChromeContext = createContext<DcorpChromeValue | null>(null);

export function DcorpChromeProvider({ children }: { children: ReactNode }) {
  const [pastHero, setPastHeroState] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [debugHandoff, setDebugHandoff] = useState(false);
  const [handoffDebug, setHandoffDebugState] = useState({
    scrollY: 0,
    lineTop: null as number | null,
    note: "idle",
  });

  useLayoutEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);

    const params = new URLSearchParams(window.location.search);
    setDebugHandoff(params.get("debug") === "handoff");

    return () => mq.removeEventListener("change", sync);
  }, []);

  const setPastHero = useCallback((value: boolean) => {
    setPastHeroState(value);
  }, []);

  const setHandoffDebug = useCallback(
    (value: { scrollY: number; lineTop: number | null; note: string }) => {
      setHandoffDebugState(value);
    },
    [],
  );

  const value = useMemo(
    () => ({
      isMobile,
      pastHero,
      setPastHero,
      debugHandoff,
      handoffDebug,
      setHandoffDebug,
    }),
    [
      isMobile,
      pastHero,
      setPastHero,
      debugHandoff,
      handoffDebug,
      setHandoffDebug,
    ],
  );

  return (
    <DcorpChromeContext.Provider value={value}>
      {children}
      {debugHandoff ? (
        <div
          className="pointer-events-none fixed bottom-3 left-3 z-[9999] max-w-[16rem] rounded-md bg-black/80 px-3 py-2 font-mono text-[10px] leading-relaxed text-white"
          aria-hidden
        >
          <div>scrollY {handoffDebug.scrollY.toFixed(0)}</div>
          <div>
            lineTop{" "}
            {handoffDebug.lineTop == null
              ? "—"
              : handoffDebug.lineTop.toFixed(0)}
          </div>
          <div>pastHero {pastHero ? "1" : "0"}</div>
          <div>mobile {isMobile ? "1" : "0"}</div>
          <div className="text-[#C9A96A]">{handoffDebug.note}</div>
        </div>
      ) : null}
    </DcorpChromeContext.Provider>
  );
}

export function useDcorpChrome() {
  return useContext(DcorpChromeContext);
}
