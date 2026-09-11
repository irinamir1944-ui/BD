import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  step?: number;
  totalSteps?: number;
  background?: string;
}

export function ScreenShell({ children, step, totalSteps, background }: Props) {
  return (
    <motion.section
      className="screen"
      style={background ? { background } : undefined}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {step != null && totalSteps != null && (
        <div className="progress-pill mono">
          {String(step).padStart(2, "0")} / {String(totalSteps).padStart(2, "0")}
        </div>
      )}
      {children}
    </motion.section>
  );
}
