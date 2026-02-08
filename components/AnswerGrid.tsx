"use client";
import { motion } from "framer-motion";
import { memo } from "react";

type Props = {
  guess: string[];
  status: "playing" | "won";
  shake: number;
  revealed?: number[];
};

const AnswerGrid = ({ guess, status, shake, revealed = [] }: Props) => {
  // Determine the active index for the pink background.
  // If there's an empty cell, use its index. If none (all filled) and the game is still playing,
  // keep the pink on the last cell instead of removing it.
  const firstEmpty = guess.findIndex((c) => c === "");
  const activeIndex =
    status === "playing" ? (firstEmpty !== -1 ? firstEmpty : guess.length - 1) : -1;

  return (
    <motion.div
      className="flex border-3 border-ink rounded-xl shadow-soft bg-white overflow-hidden mb-12"
      animate={{ x: shake % 2 === 0 ? 0 : [-10, 10, -10, 10, 0] }}
      transition={{ duration: 0.4 }}
    >
      {guess.map((char, i) => {
        const revealedSet = new Set(revealed);
        const cellBgClass =
          status === "won"
            ? "bg-pastel-mint text-ink"
            : revealedSet.has(i)
            ? "bg-pastel-yellow text-ink"
            : activeIndex === i
            ? "bg-pastel-pink text-ink"
            : "bg-white text-ink";

        return (
          <div
            key={i}
            className={`
                  font-sansita
                  relative
                  w-12 h-12
                  flex items-center justify-center 
                  text-4xl font-extrabold pb-1 
                  border-r-3 border-ink last:border-r-0
                  transition-colors duration-300
                  ${cellBgClass}
                `}
          >
          <motion.span
            initial={{ scale: 0.5, opacity: 0 }}
            animate={
              char ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }
            }
          >
            {char}
          </motion.span>

          </div>
        );
      })}
    </motion.div>
  );
};

export default memo(AnswerGrid);
