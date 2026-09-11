import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SystemButton } from "../shared/SystemButton";
import { dreamFrames } from "../../data/memories";

interface Props {
  onNext: () => void;
}

export function TravelDream({ onNext }: Props) {
  const [index, setIndex] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const frame = dreamFrames[index];
  const isLast = index === dreamFrames.length - 1;

  if (showHint) {
    return (
      <div className="screen-inner" style={{ textAlign: "center" }}>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="sys-line" style={{ marginBottom: 10 }}>
          Пункт назначения не найден.
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="sys-line"
          style={{ marginBottom: 28 }}
        >
          Но система получила одну подсказку.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.4 }}
          className="title"
          style={{ fontSize: 22, color: "var(--teal)", marginBottom: 30 }}
        >
          «Большие путешествия начинаются с маленького шага.»
        </motion.p>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}>
          <SystemButton onClick={onNext}>ПРОДОЛЖИТЬ →</SystemButton>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="screen-inner">
      <div className="eyebrow mono">DESTINATION SEARCH // OVERRIDE</div>
      <AnimatePresence mode="wait">
        <motion.div
          key={frame.id}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.5 }}
          className="vhs-frame"
          style={{ borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.18)" }}
        >
          <motion.img
            src={frame.image}
            alt={frame.tag}
            loading="lazy"
            initial={{ scale: 1 }}
            animate={{ scale: 1.08 }}
            transition={{ duration: 6, ease: "linear" }}
            style={{ width: "100%", aspectRatio: "4/5", objectFit: "cover" }}
          />
        </motion.div>
      </AnimatePresence>

      <div className="card card-alive mono" style={{ fontSize: 12, lineHeight: 1.9 }}>
        <div style={{ color: "var(--pink)", marginBottom: frame.data || frame.note ? 8 : 0 }}>{frame.tag}</div>
        {frame.data?.map((d) => (
          <div key={d.label} style={{ display: "flex", justifyContent: "space-between", color: "var(--text-dim)" }}>
            <span>{d.label}:</span>
            <span style={{ color: "var(--teal)" }}>{d.value}</span>
          </div>
        ))}
        {frame.note && (
          <div style={{ marginTop: 8, color: "var(--text-dim)", fontStyle: "italic" }}>{frame.note}</div>
        )}
      </div>

      <SystemButton
        onClick={() => (isLast ? setShowHint(true) : setIndex((i) => i + 1))}
      >
        {isLast ? "ПРОДОЛЖИТЬ →" : "СЛЕДУЮЩИЙ КАДР →"}
      </SystemButton>
    </div>
  );
}
