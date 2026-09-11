import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  onClick: () => void;
  variant?: "primary" | "ghost";
  disabled?: boolean;
}

export function SystemButton({ children, onClick, variant = "primary", disabled }: Props) {
  return (
    <motion.button
      className={`btn ${variant === "primary" ? "btn-primary" : "btn-ghost"}`}
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: 0.96 }}
      style={disabled ? { opacity: 0.4, pointerEvents: "none" } : undefined}
    >
      {children}
    </motion.button>
  );
}
