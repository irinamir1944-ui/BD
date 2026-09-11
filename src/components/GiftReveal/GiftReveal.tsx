import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SystemButton } from "../shared/SystemButton";
import { config } from "../../data/config";

interface Props {
  onNext: () => void;
}

const STEPS = [
  { text: config.recipientName.toUpperCase(), size: 30 },
  { text: "С ДНЁМ РОЖДЕНИЯ ❤️", size: 26 },
  { text: `ТЕБЕ ${config.age}.`, size: 26 },
  { text: "И мы решили, что обычный подарок — это слишком просто.", size: 18 },
  { text: "🏄‍♀️", size: 48 },
  { text: "ТЫ ИДЁШЬ НА СЕРФИНГ.", size: 26 },
];

export function GiftReveal({ onNext }: Props) {
  const [step, setStep] = useState(0);
  const [showFull, setShowFull] = useState(false);
  const isLast = step === STEPS.length - 1;

  return (
    <div
      className="screen-inner"
      style={{
        textAlign: "center",
        minHeight: "60vh",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
        gap: 24,
      }}
    >
      {!showFull ? (
        <>
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.5 }}
              className="title"
              style={{ fontSize: STEPS[step].size, color: "var(--teal)" }}
            >
              {STEPS[step].text}
            </motion.div>
          </AnimatePresence>
          <SystemButton
            onClick={() => (isLast ? setShowFull(true) : setStep((s) => s + 1))}
          >
            {isLast ? "ПОКАЗАТЬ ПОДАРОК →" : "ДАЛЬШЕ →"}
          </SystemButton>
        </>
      ) : (
        <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}>
          <div className="eyebrow mono" style={{ marginBottom: 10 }}>ТВОЙ ПОДАРОК</div>
          <h1 className="title" style={{ fontSize: 32, color: "var(--sand)", marginBottom: 6 }}>
            {config.giftTitle}
          </h1>
          <div className="mono" style={{ color: "var(--teal)", fontSize: 16, letterSpacing: 2, marginBottom: 24 }}>
            {config.giftCity}
          </div>
          <div className="mono" style={{ fontSize: 13, color: "var(--text-dim)", marginBottom: 30 }}>
            ОТ<br />
            <span style={{ color: "var(--pink)" }}>
              {config.gifterName1} + {config.gifterName2}
            </span>
          </div>
          <p className="body-text" style={{ opacity: 0.85, marginBottom: 30, fontStyle: "italic" }}>
            Потому что иногда большие приключения начинаются с маленькой волны.
          </p>
          <SystemButton onClick={onNext}>СМОТРЕТЬ СЕРТИФИКАТ →</SystemButton>
        </motion.div>
      )}
    </div>
  );
}
