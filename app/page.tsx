"use client";
import ActionButton from "@/components/ActionButton";
import AnswerGrid from "@/components/AnswerGrid";
import ClueDisplay from "@/components/ClueDisplay";
import HintsDrawer from "@/components/HintsDrawer";
import Keyboard from "@/components/Keyboard";
import { CLUES } from "@/data/clues";
import { useCrypticGame } from "@/hooks/useCrypticGame";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function MinuteCrypticRefined() {
  const [clueIndex, setClueIndex] = useState(0);
  const activeClue = CLUES[clueIndex];

  const {
    guess,
    handleInput,
    handleBackspace,
    checkAnswer,
    revealLetter,
    toggleHint,
    hints,
    status,
    shake,
    revealed,
  } = useCrypticGame(activeClue);
  const [isHintOpen, setIsHintOpen] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (isHintOpen) return;
      if (e.key === "Backspace") handleBackspace();
      if (/^[a-zA-Z]$/.test(e.key)) handleInput(e.key);
      if (e.key === "Enter") checkAnswer();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleInput, handleBackspace, checkAnswer, isHintOpen]);

  return (
    <main className="min-h-screen bg-pastel-bg flex flex-col overflow-hidden relative">
      {/* Main scrollable content area */}
      <div className="grow flex flex-col items-center p-4 overflow-y-auto pb-4">
        <header className="w-full max-w-lg flex justify-between items-center py-4 mb-2">
          <div className="bg-ink text-white px-4 py-1.5 font-bold text-lg border-2 border-transparent shadow-soft rounded-2xl -rotate-1 font-mulish">
            Minute Cryptic
          </div>
          <button
            onClick={() => setClueIndex((prev) => (prev + 1) % CLUES.length)}
            className="bg-white px-3 py-1.5 text-xs font-bold border-2 border-ink rounded-xl shadow-soft-sm active:translate-y-px active:shadow-none"
          >
            Next →
          </button>
        </header>

        <div className="w-full max-w-lg">
          <ClueDisplay clue={activeClue} activeHints={hints} />
        </div>

        <div
          ref={gridRef}
          className="flex flex-col items-center w-full max-w-lg"
        >
          {/* Answer grid */}
          <AnswerGrid
            guess={guess}
            status={status}
            shake={shake}
            revealed={revealed}
          />

          <div className="flex justify-center gap-3 w-full px-2">
            <ActionButton
              label="Hints"
              color="bg-pastel-yellow"
              onClick={() => setIsHintOpen(true)}
              disabled={status === "won"}
            />
            <ActionButton
              label="Check"
              color="bg-pastel-pink"
              onClick={checkAnswer}
              disabled={status === "won"}
            />
          </div>
        </div>

        <AnimatePresence>
          {status === "won" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-lg bg-white border-2 border-ink p-4 shadow-soft rounded-2xl mt-6"
            >
              <div className="relative inline-block">
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-5 bg-pastel-pink"></div>
                <div className="relative font-sansita font-bold text-xl mb-1">
                  explanation
                </div>
              </div>
              <p className="text-sm leading-relaxed text-ink">
                {activeClue.fullExplanation}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Fixed bottom keyboard area */}
      <div className="w-full bg-pastel-bg pb-safe px-1 pt-2 z-10 max-w-2xl mx-auto border-t-2 border-transparent">
        <Keyboard onInput={handleInput} onBackspace={handleBackspace} />
      </div>

      <AnimatePresence>
        {isHintOpen && (
          <HintsDrawer
            onClose={() => setIsHintOpen(false)}
            hints={hints}
            toggleHint={toggleHint}
            revealLetter={revealLetter}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
