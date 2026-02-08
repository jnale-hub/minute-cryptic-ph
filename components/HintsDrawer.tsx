"use client";
import { motion } from "framer-motion";
import { useEffect, useId, useRef } from "react";

type HintState = {
  showIndicator: boolean;
  showFodder: boolean;
  showDefinition: boolean;
};

interface HintOptionProps {
  label: string;
  desc?: string;
  active?: boolean;
  onClick?: () => void;
  color?: string;
}

function HintOption({ label, desc = "", active = false, onClick, color = "bg-gray-200" }: HintOptionProps) {
  return (
    <button
      onClick={onClick}
      disabled={active}
      className={`
      w-full p-3 border-2 border-ink rounded-xl shadow-soft-sm text-left flex justify-between items-center gap-3
      transition-all active:scale-[0.98]
      ${active ? "bg-gray-50 border-gray-300shadow-none" : "bg-white hover:bg-gray-50"}
    `}
    >
      <div className="flex-row items-center gap-3">
        <div className=" relative inline-block">
          <div className={`absolute inset-x-0 top-1/2 -translate-y-1/2 h-5 bg-${color}`}></div>
          <div className="relative font-bold text-lg lowercase font-sansita z-10">{label}</div>
        </div>
        <div className="text-xs font-normal opacity-70">{desc}</div>
      </div>
      {active ? <span className="text-green-500 font-bold">✓</span> : <span className="text-sm font-bold text-ink">Show</span>}
    </button>
  );
}

interface Props {
  onClose: () => void;
  hints: HintState;
  toggleHint: (type: "indicator" | "fodder" | "definition") => void;
  revealLetter: () => void;
}

export default function HintsDrawer({ onClose, hints, toggleHint, revealLetter }: Props) {
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const titleId = useId();

  useEffect(() => {
    const root = drawerRef.current;
    if (!root) return;

    // focus the close button when opened
    const focusTimeout = setTimeout(() => {
      if (closeBtnRef.current) closeBtnRef.current.focus();
    }, 0);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === "Tab") {
        const focusable = root.querySelectorAll<HTMLElement>(
          'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      clearTimeout(focusTimeout);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        onClick={onClose}
        className="fixed inset-0 z-40 bg-transparent"
      />
      <motion.div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-ink rounded-t-3xl z-50 p-6 pb-10 shadow-[0_-4px_30px_rgba(0,0,0,0.1)] max-w-lg mx-auto"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 id={titleId} className="font-bold text-xl">Hints</h3>
          <button ref={closeBtnRef} onClick={onClose} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">✕</button>
        </div>

        <div className="grid grid-cols-1 gap-2">
          <HintOption
            label="Show Indicator"
            desc="Highlight the wordplay indicator"
            color="pastel-pink"
            active={hints.showIndicator}
            onClick={() => toggleHint("indicator")}
          />
          <HintOption
            label="Show Fodder"
            desc="Highlight the letters used in the wordplay"
            color="pastel-yellow"
            active={hints.showFodder}
            onClick={() => toggleHint("fodder")}
          />
          <HintOption
            label="Show Definition"
            desc="Highlight the definition / answer hint"
            color="pastel-blue"
            active={hints.showDefinition}
            onClick={() => toggleHint("definition")}
          />
          <button
            onClick={() => {
              revealLetter();
              onClose();
            }}
            className="w-full py-3 font-bold border-2 border-ink rounded-xl shadow-soft-sm bg-gray-50 text-ink active:scale-95 transition-transform flex justify-between px-4 items-center mt-2"
          >
            <span>Reveal One Letter</span>
            <span className="text-[10px] font-bold bg-ink text-white px-2 py-0.5 rounded-full">FREE</span>
          </button>
        </div>
      </motion.div>
    </>
  );
}
