"use client";

type KeyButtonProps = {
  char: string;
  onClick: () => void;
  isSpecial?: boolean;
};

export default function KeyButton({ char, onClick, isSpecial }: KeyButtonProps) {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className={`
      flex-1 h-12 sm:h-14 
      flex items-center justify-center 
      font-semibold text-xl sm:text-2xl pb-1
      bg-white border-2 border-ink rounded-lg
      active:translate-y-0.5 active:shadow-none transition-all touch-manipulation
      ${isSpecial ? "bg-pastel-pink text-white border-ink flex-[1.5]" : "text-ink"}
    `}
    >
      {char}
    </button>
  );
}
