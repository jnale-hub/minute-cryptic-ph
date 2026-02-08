"use client";
import KeyButton from "@/components/KeyButton";
import { memo, useMemo } from "react";

type Props = {
  onInput: (c: string) => void;
  onBackspace: () => void;
};

const ROW1 = "qwertyuiop".split("");
const ROW2 = "asdfghjkl".split("");
const ROW3 = "zxcvbnm".split("");

const Keyboard = ({ onInput, onBackspace }: Props) => {
  const row1Buttons = useMemo(
    () =>
      ROW1.map((char) => (
        <KeyButton key={char} char={char} onClickAction={() => onInput(char)} />
      )),
    [onInput],
  );

  const row2Buttons = useMemo(
    () =>
      ROW2.map((char) => (
        <KeyButton key={char} char={char} onClickAction={() => onInput(char)} />
      )),
    [onInput],
  );

  const row3Buttons = useMemo(
    () =>
      ROW3.map((char) => (
        <KeyButton key={char} char={char} onClickAction={() => onInput(char)} />
      )),
    [onInput],
  );

  return (
    <div className="flex flex-col gap-2 pb-2 px-1">
      {/* Keyboard row 1 */}
      <div className="flex gap-1 w-full">{row1Buttons}</div>

      {/* Keyboard row 2 */}
      <div className="flex gap-1 w-full px-4">{row2Buttons}</div>

      {/* Keyboard row 3 */}
      <div className="flex gap-1 w-full px-1">
        {row3Buttons}

        {/* delete button */}
        <button
          type="button"
          aria-label="delete"
          onClick={(e) => {
            e.preventDefault();
            onBackspace();
          }}
          className="flex-[1.5] h-12 sm:h-14 flex items-center justify-center font-semibold text-xl sm:text-2xl pb-1 bg-white rounded-lg active:translate-y-0.5 active:shadow-none transition-all touch-manipulation"
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
