"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FAQ } from "@/components/contato/FAQ";
import { ContactForm } from "@/components/contato/ContactForm";
import {
  companies,
  isCompanyId,
  type CompanyId,
} from "@/lib/companies";

const ease = [0.23, 1, 0.32, 1] as const;
const MEET_MS = 560;
const CLOSE_MS = 480;
const FADE_MS = 240;
const STAGGER_S = 0.04;

type Phase = "choose" | "closing" | "form" | "opening";
type Pose = "apart" | "rest" | "shut";

function jawTransform(side: "top" | "bottom", pose: Pose) {
  const isTop = side === "top";
  if (pose === "rest") return "translateY(0%)";
  if (pose === "apart") return isTop ? "translateY(-100%)" : "translateY(100%)";
  return isTop ? "translateY(100%)" : "translateY(-100%)";
}

function Jaw({
  companyId,
  side,
  pose,
  faded,
  meetDelay,
  ready,
  onPick,
}: {
  companyId: CompanyId;
  side: "top" | "bottom";
  pose: Pose;
  faded: boolean;
  meetDelay: boolean;
  ready: boolean;
  onPick: (id: CompanyId) => void;
}) {
  const company = companies[companyId];
  const isTop = side === "top";

  return (
    <motion.button
      type="button"
      aria-label={`Falar com a ${company.name}`}
      disabled={!ready}
      onClick={() => onPick(companyId)}
      initial={{ transform: jawTransform(side, pose), opacity: 1 }}
      animate={{
        transform: jawTransform(side, pose),
        opacity: faded ? 0 : 1,
      }}
      transition={{
        transform: {
          duration: pose === "shut" ? CLOSE_MS / 1000 : MEET_MS / 1000,
          ease,
          delay: meetDelay && pose === "rest" && side === "bottom" ? STAGGER_S : 0,
        },
        opacity: { duration: FADE_MS / 1000, ease },
      }}
      className={`absolute inset-x-0 flex h-1/2 cursor-pointer flex-col items-center justify-center px-6 disabled:cursor-wait ${
        isTop ? "top-0 bg-[#F3EEE4]" : "bottom-0 bg-[#E4DDD0]"
      }`}
    >
      <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-primary md:text-xs">
        {company.role}
      </span>
      <Image
        src={companyId === "rendal" ? "/brands/rendal-logo.png" : "/brands/dcorp-logo.png"}
        alt=""
        width={1016}
        height={813}
        className="mt-4 h-12 w-auto max-w-[10rem] object-contain md:mt-5 md:h-16 md:max-w-[13rem]"
      />
      <span className="mt-4 font-display text-3xl text-graphite md:mt-5 md:text-5xl">
        {company.name}
      </span>
    </motion.button>
  );
}

function ContactExperienceInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reduce = useReducedMotion();
  const fromUrl = searchParams.get("empresa");
  const skipChooser = isCompanyId(fromUrl);

  const [phase, setPhase] = useState<Phase>(() => (skipChooser ? "form" : "choose"));
  const [companyId, setCompanyId] = useState<CompanyId | null>(() =>
    skipChooser ? fromUrl : null,
  );
  const [faded, setFaded] = useState(false);
  const [pose, setPose] = useState<Pose>(() => (reduce || skipChooser ? "rest" : "apart"));
  const [meetDelay, setMeetDelay] = useState(!skipChooser && !reduce);

  const company = companyId ? companies[companyId] : null;
  const showMouth = phase !== "form";
  const ready = phase === "choose" && pose === "rest";

  useEffect(() => {
    document.body.style.overflow = phase === "form" ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [phase]);

  useEffect(() => {
    if (!isCompanyId(fromUrl)) return;
    router.replace("/contato", { scroll: false });
  }, [fromUrl, router]);

  useEffect(() => {
    if (phase !== "choose" || pose !== "apart") return;
    if (reduce) {
      setPose("rest");
      return;
    }
    const frame = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => setPose("rest"));
    });
    return () => window.cancelAnimationFrame(frame);
  }, [phase, pose, reduce]);

  useEffect(() => {
    if (phase !== "closing") return;

    if (reduce) {
      setPhase("form");
      return;
    }

    const fadeTimer = window.setTimeout(() => setFaded(true), CLOSE_MS);
    const doneTimer = window.setTimeout(() => {
      setPhase("form");
    }, CLOSE_MS + FADE_MS);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(doneTimer);
    };
  }, [phase, reduce]);

  useEffect(() => {
    if (phase !== "opening") return;

    if (reduce) {
      setCompanyId(null);
      setPose("rest");
      setPhase("choose");
      router.replace("/contato", { scroll: false });
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => setPose("rest"));
    });
    const openTimer = window.setTimeout(() => {
      setCompanyId(null);
      setPhase("choose");
      router.replace("/contato", { scroll: false });
    }, CLOSE_MS);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(openTimer);
    };
  }, [phase, reduce, router]);

  const pick = (id: CompanyId) => {
    if (!ready) return;
    setMeetDelay(false);
    setCompanyId(id);
    setFaded(false);
    setPose("shut");
    setPhase("closing");
  };

  const backToMouth = () => {
    setMeetDelay(false);
    setFaded(false);
    setPose("shut");
    setPhase("opening");
  };

  return (
    <div className="relative min-h-dvh bg-[#F8F1E3]">
      <AnimatePresence>
        {showMouth && (
          <motion.div
            key="mouth"
            className={`fixed inset-0 z-[90] overflow-hidden bg-[#F8F1E3] ${faded ? "pointer-events-none" : ""}`}
            initial={false}
            exit={{ opacity: 0, transition: { duration: FADE_MS / 1000, ease } }}
          >
            <Jaw
              companyId="rendal"
              side="top"
              pose={pose}
              faded={faded}
              meetDelay={meetDelay}
              ready={ready}
              onPick={pick}
            />
            <Jaw
              companyId="dcorp"
              side="bottom"
              pose={pose}
              faded={faded}
              meetDelay={meetDelay}
              ready={ready}
              onPick={pick}
            />

            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-1/2 z-10 h-px bg-primary/40"
              animate={{ opacity: pose === "rest" && !faded ? 1 : 0 }}
              transition={{ duration: 0.2, ease, delay: pose === "rest" ? MEET_MS / 1000 : 0 }}
            />

            <motion.div
              className="pointer-events-none absolute left-1/2 top-1/2 z-20 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 px-6 text-center"
              animate={{ opacity: pose === "rest" && !faded ? 1 : 0 }}
              transition={{ duration: 0.28, ease, delay: pose === "rest" ? MEET_MS / 1000 + 0.04 : 0 }}
            >
              <div className="inline-flex flex-col items-center bg-[#F8F1E3] px-5 py-2.5 md:px-7 md:py-3">
                <p className="mb-1.5 font-sans text-[10px] font-bold uppercase tracking-[0.4em] text-primary">
                  Contato
                </p>
                <h1 className="font-display text-xl leading-[1.12] text-balance text-graphite md:text-3xl">
                  Com qual empresa você quer falar?
                </h1>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {company && phase !== "choose" && phase !== "opening" && (
        <div className="pt-20">
          <ContactForm company={company} onSwitch={backToMouth} />
          {phase === "form" && <FAQ />}
        </div>
      )}
    </div>
  );
}

export function ContactExperience() {
  return (
    <Suspense fallback={<div className="min-h-dvh bg-[#F8F1E3]" />}>
      <ContactExperienceInner />
    </Suspense>
  );
}
