import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SystemButton } from "../shared/SystemButton";

interface Props {
  onNext: () => void;
}

const ELEMENTS = [
  {
    id: "fire",
    emoji: "🔥",
    name: "ОГОНЬ",
    text: "Готовить что-нибудь невероятное",
    rejection: "ОГОНЬ: СТИХИЯ ЗАНЯТА ДРУГИМ ПРОФИЛЕМ.",
  },
  {
    id: "air",
    emoji: "🌬",
    name: "ВОЗДУХ",
    text: "Йога, баланс и внутреннее спокойствие",
    rejection: "ВОЗДУХ: СТИХИЯ ЗАНЯТА ДРУГИМ ПРОФИЛЕМ.",
  },
  { id: "water", emoji: "🌊", name: "ВОДА", text: "Пока неизвестно" },
  {
    id: "earth",
    emoji: "🌿",
    name: "ЗЕМЛЯ",
    text: "Помыть всю квартиру",
    rejection: "ЗЕМЛЯ: СТИХИЯ ЗАНЯТА ДРУГИМ ПРОФИЛЕМ.",
  },
];

export function ElementChoice({ onNext }: Props) {
  const [waterSelected, setWaterSelected] = useState(false);
  const [shakeId, setShakeId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleClick = (id: string) => {
    if (id === "water") {
      setWaterSelected(true);
      setShakeId(null);
      setMessage("Совпадение подтверждено. Стихия закреплена.");
      return;
    }
    const el = ELEMENTS.find((e) => e.id === id)!;
    setWaterSelected(false);
    setMessage(el.rejection ?? null);
    setShakeId(id);
    window.setTimeout(() => setShakeId((cur) => (cur === id ? null : cur)), 420);
  };

  return (
    <div className="screen-inner">
      <div className="eyebrow mono">ЭТАП 02</div>
      <h1 className="title">ВЫБОР СТИХИИ</h1>
      <p className="body-text">
        Чтобы продолжить исследование, необходимо определить основную жизненную стихию.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {ELEMENTS.map((el) => {
          const isWater = el.id === "water";
          const isActive = isWater && waterSelected;
          return (
            <motion.button
              key={el.id}
              className={`card${shakeId === el.id ? " shake" : ""}`}
              onClick={() => handleClick(el.id)}
              whileTap={{ scale: 0.95 }}
              animate={
                isActive
                  ? { borderColor: "var(--teal)", boxShadow: "0 0 24px -6px var(--teal)" }
                  : { borderColor: "rgba(255,255,255,0.16)", boxShadow: "none" }
              }
              style={{
                textAlign: "left",
                border: "1px solid",
                color: "inherit",
                background: isActive ? "rgba(62,197,255,0.1)" : undefined,
                display: "flex",
                flexDirection: "column",
                gap: 6,
                minHeight: 120,
                opacity: !isWater && shakeId === el.id ? 0.7 : 1,
              }}
            >
              <span style={{ fontSize: 28 }}>{el.emoji}</span>
              <span className="mono" style={{ fontSize: 13, letterSpacing: 1, color: "var(--teal)" }}>
                {el.name}
              </span>
              <span style={{ fontSize: 13, opacity: 0.85, lineHeight: 1.35 }}>{el.text}</span>
            </motion.button>
          );
        })}
      </div>

      <div style={{ minHeight: 44 }}>
        <AnimatePresence mode="wait">
          {message && (
            <motion.p
              key={message}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="sys-line"
              style={{ color: waterSelected ? "var(--teal)" : "var(--pink)" }}
            >
              {message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <SystemButton onClick={onNext} disabled={!waterSelected}>
        ПРОДОЛЖИТЬ →
      </SystemButton>
    </div>
  );
}
