import { motion } from "framer-motion";
import { SystemButton } from "../shared/SystemButton";

interface Props {
  onNext: () => void;
}

const STARS = "★★★★★";

const traits = [
  { label: "ГОТОВКА", value: STARS },
  { label: "ЙОГА", value: STARS },
  { label: "ЧУВСТВО СТИЛЯ", value: STARS },
  { label: "УРОВЕНЬ ЛЮБВИ К СМЕШАРИКАМ", value: "CRITICAL" },
  { label: "СПОСОБНОСТЬ БЫТЬ ЛЮБИМОЙ ПОДРУГОЙ-СОСЕДКОЙ", value: "UNMEASURABLE" },
];

export function AchievementArchive({ onNext }: Props) {
  return (
    <div className="screen-inner">
      <div className="eyebrow mono">ЭТАП 04</div>
      <h1 className="title">АРХИВ ЛИЧНЫХ ДОСТИЖЕНИЙ</h1>

      <div className="card card-alive mono" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div>
          <div style={{ fontSize: 12, color: "var(--text-dim)", marginBottom: 6 }}>КРАСОТА</div>
          <div style={{ height: 8, borderRadius: 4, background: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              style={{ height: "100%", background: "linear-gradient(90deg, var(--pink), var(--teal))" }}
            />
          </div>
        </div>

        {traits.map((t, i) => (
          <motion.div
            key={t.label}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i }}
            style={{ display: "flex", justifyContent: "space-between", gap: 10, fontSize: 13 }}
          >
            <span style={{ color: "var(--text-dim)" }}>{t.label}</span>
            <span style={{ color: "var(--teal)", whiteSpace: "nowrap" }}>{t.value}</span>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * traits.length }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginTop: 4,
            paddingTop: 12,
            borderTop: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <img
            src="/assets/images/motherlode.jpg"
            alt=""
            loading="lazy"
            style={{ width: 32, height: 32, borderRadius: 6, objectFit: "cover", flexShrink: 0 }}
          />
          <div style={{ fontSize: 11, color: "var(--text-dim)", lineHeight: 1.5 }}>
            РЕСУРСЫ ЛЮБВИ: <span style={{ color: "var(--pink)" }}>MOTHERLODE ACTIVATED</span>
          </div>
        </motion.div>
      </div>

      <p className="body-text" style={{ opacity: 0.75, fontSize: 14 }}>
        Некоторые характеристики невозможно измерить.
      </p>

      <SystemButton onClick={onNext}>ПРОДОЛЖИТЬ →</SystemButton>
    </div>
  );
}
