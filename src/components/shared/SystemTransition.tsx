import { AnimatePresence, motion } from "framer-motion";

interface Props {
  active: boolean;
  label?: string;
}

export function SystemTransition({ active, label = "ЗАГРУЗКА МОДУЛЯ" }: Props) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 200,
            background: "var(--bg)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <motion.div
            initial={{ scaleY: 0, opacity: 0.9 }}
            animate={{ scaleY: [0, 1, 1, 0] }}
            transition={{ duration: 0.55, times: [0, 0.35, 0.7, 1], ease: "easeInOut" }}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: "48%",
              height: 2,
              background: "linear-gradient(90deg, transparent, var(--pink), var(--teal), transparent)",
              boxShadow: "0 0 24px 2px var(--teal)",
              transformOrigin: "center",
            }}
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ duration: 0.55, times: [0, 0.3, 0.7, 1] }}
            className="mono"
            style={{
              fontSize: 11,
              letterSpacing: 3,
              color: "var(--teal)",
              position: "absolute",
              bottom: "38%",
            }}
          >
            {label}...
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
