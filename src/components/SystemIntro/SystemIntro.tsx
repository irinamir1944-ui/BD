import { useState } from "react";
import { motion } from "framer-motion";
import { Typewriter } from "../shared/Typewriter";
import { SystemButton } from "../shared/SystemButton";
import { config } from "../../data/config";

interface Props {
  onNext: () => void;
}

export function SystemIntro({ onNext }: Props) {
  const [stage, setStage] = useState(0);

  return (
    <div className="screen-inner">
      <div className="eyebrow mono">SYSTEM // BOOT</div>

      <div className="sys-line" style={{ minHeight: 140 }}>
        {stage === 0 && (
          <Typewriter
            lines={["ВНИМАНИЕ"]}
            className="mono"
            onDone={() => setTimeout(() => setStage(1), 500)}
          />
        )}
        {stage >= 1 && (
          <>
            <div className="mono" style={{ marginBottom: 14 }}>
              ВНИМАНИЕ
            </div>
            {stage === 1 && (
              <Typewriter
                lines={[`Система обнаружила: ${config.recipientName} празднует ${config.age}-летие.`]}
                className="mono"
                onDone={() => setTimeout(() => setStage(2), 600)}
              />
            )}
          </>
        )}
      </div>

      {stage >= 2 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="card mono"
          style={{ fontSize: 13, lineHeight: 2 }}
        >
          <div>STATUS: <span className="sys-value">ONLINE</span></div>
          <div>ПРОФИЛЬ: <span className="sys-value">{config.recipientName.toUpperCase()}</span></div>
          <div>AGE: <span className="sys-value">{config.age}</span></div>
          <div>PROTOCOL: <span className="sys-value">ACTIVE</span></div>
        </motion.div>
      )}

      {stage >= 2 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p className="body-text" style={{ marginBottom: 6 }}>
            В связи с этим автоматически запущена процедура:
          </p>
          <p className="title" style={{ fontSize: 20, color: "var(--pink)" }}>
            {config.nickname.toUpperCase()} {config.age}.0
          </p>
        </motion.div>
      )}

      {stage >= 2 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
          <p className="body-text">
            Для определения дальнейшего пункта назначения необходимо собрать данные.
          </p>
        </motion.div>
      )}

      {stage >= 2 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="btn-row"
        >
          <SystemButton onClick={onNext}>ПОНЯТЬ, ЧТО ПРОИСХОДИТ →</SystemButton>
        </motion.div>
      )}
    </div>
  );
}
