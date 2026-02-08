"use client";
import { memo } from "react";

interface ActionButtonProps {
  label: string;
  color?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const ActionButton = ({
  label,
  color = "",
  onClick,
  disabled = false,
}: ActionButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
      px-4 py-2 font-bold text-lg sm:text-xl border-2 border-ink rounded-xl shadow-soft-sm lowercase tracking-wide
      active:translate-y-px active:shadow-none transition-all font-sansita
      ${disabled ? "opacity-50 grayscale" : color}
    `}
    >
      {label}
    </button>
  );
};

export default memo(ActionButton);
