import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SystemButton } from "../shared/SystemButton";
import { config } from "../../data/config";

interface Props {
  onNext: () => void;
}

export function PersonalMessages({ onNext }: Props) {
  const [step, setStep] = useState(0);
  const messages = [config.message1, config.message2];
  const isLast = step === messages.length;

  return (
    <div className="screen-inner">
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div key="intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <p className="sys-line">В системе обнаружено ещё одно сообщение.</p>
            <p className="sys-line" style={{ marginTop: 8 }}>Оно не связано с заданием.</p>
            <p className="body-text" style={{ marginTop: 16 }}>Его необходимо передать лично.</p>
          </motion.div>
        )}

        {step > 0 && step <= messages.length && (
          <motion.div
            key={`msg-${step}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="card"
            style={{ borderColor: "var(--pink)", boxShadow: "0 0 30px -10px var(--pink)" }}
          >
            <div className="mono" style={{ color: "var(--pink)", fontSize: 12, marginBottom: 14 }}>
              FROM: {messages[step - 1].from}
            </div>
            {messages[step - 1].text.map((line, i) => (
              <p key={i} className="body-text" style={{ marginBottom: 8 }}>
                {line}
              </p>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <SystemButton onClick={() => (isLast ? onNext() : setStep((s) => s + 1))}>
        {isLast ? "ПРОДОЛЖИТЬ →" : "ЧИТАТЬ ДАЛЬШЕ →"}
      </SystemButton>
    </div>
  );
}
