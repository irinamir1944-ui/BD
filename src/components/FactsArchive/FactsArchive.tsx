import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SystemButton } from "../shared/SystemButton";
import { facts } from "../../data/facts";

interface Props {
  onNext: () => void;
}

export function FactsArchive({ onNext }: Props) {
  const [index, setIndex] = useState(0);
  const fact = facts[index];
  const isLast = index === facts.length - 1;
  const isSmesharikiFact = fact.id === "003";
  const isHorseFact = fact.id === "004";

  return (
    <div className="screen-inner">
      <div className="eyebrow mono">ЭТАП 03</div>
      <h1 className="title" style={{ fontSize: 20 }}>
        НАМ СООБЩИЛИ НЕСКОЛЬКО ФАКТОВ О НЕЙ
      </h1>

      <div style={{ minHeight: 220, position: "relative" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={fact.id}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.4 }}
            className="card"
            style={{ display: "flex", flexDirection: "column", gap: 14, alignItems: "center", textAlign: "center" }}
          >
            <span className="mono" style={{ color: "var(--pink)", fontSize: 12, letterSpacing: 2 }}>
              ФАКТ №{fact.id}
            </span>
            {isSmesharikiFact && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="float"
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  background: "radial-gradient(circle at 35% 30%, var(--sand), var(--pink))",
                  boxShadow: "0 0 30px -4px var(--pink)",
                }}
              />
            )}
            <p className="body-text">
              {fact.text.map((l, i) => (
                <span key={i}>
                  {l}
                  {i < fact.text.length - 1 && <br />}
                </span>
              ))}
            </p>
            {isHorseFact && (
              <motion.img
                src="/assets/images/fact-horse.png"
                alt="Лошадь с розой"
                initial={{ scale: 0, rotate: -20, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.35 }}
                style={{ width: "78%", maxWidth: 220, marginTop: -4 }}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <SystemButton
        onClick={() => (isLast ? onNext() : setIndex((i) => i + 1))}
      >
        {isLast ? "ПРОДОЛЖИТЬ →" : "СЛЕДУЮЩИЙ ФАКТ →"}
      </SystemButton>
    </div>
  );
}
