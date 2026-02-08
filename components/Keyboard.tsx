"use client";
import KeyButton from "@/components/KeyButton";
import { memo } from "react";

type Props = {
  onInput: (c: string) => void;
  onBackspace: () => void;
};

const Keyboard = ({ onInput, onBackspace }: Props) => {
  return (
    <div className="flex flex-col gap-2 pb-2 px-1">
      {/* Keyboard row 1 */}
      <div className="flex gap-1 w-full">
        {"qwertyuiop".split("").map((char) => (
          <KeyButton key={char} char={char} onClick={() => onInput(char)} />
        ))}
      </div>

      {/* Keyboard row 2 */}
      <div className="flex gap-1 w-full px-4">
        {"asdfghjkl".split("").map((char) => (
          <KeyButton key={char} char={char} onClick={() => onInput(char)} />
        ))}
      </div>

      {/* Keyboard row 3 */}
      <div className="flex gap-1 w-full px-1">
        {"zxcvbnm".split("").map((char) => (
          <KeyButton key={char} char={char} onClick={() => onInput(char)} />
        ))}

        {/* delete button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            onBackspace();
          }}
          className="flex-[1.5] h-12 sm:h-14 flex items-center justify-center bg-white text-ink border-2 border-ink rounded-lg active:bg-pastel-pink transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.211-.211.498-.33.796-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.796-.33z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default memo(Keyboard);
