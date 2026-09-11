import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { SystemButton } from "../shared/SystemButton";
import { config } from "../../data/config";

interface Props {
  onNext: () => void;
}

type Stage = "idle" | "scanning" | "matched" | "revealed";

const RING_COUNT = 7;

function FingerprintIcon({ progress }: { progress: number }) {
  const rings = Array.from({ length: RING_COUNT });
  return (
    <svg viewBox="0 0 120 120" width="128" height="128" style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id="fpGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--pink)" />
          <stop offset="100%" stopColor="var(--teal)" />
        </linearGradient>
        <clipPath id="fpClip">
          <rect x="10" y="10" width="100" height="100" />
        </clipPath>
      </defs>
      <g clipPath="url(#fpClip)">
        {rings.map((_, i) => {
          const active = progress / 100 >= (i + 1) / RING_COUNT;
          return (
            <ellipse
              key={i}
              cx="60"
              cy="66"
              rx={14 + i * 6.4}
              ry={22 + i * 7.2}
              fill="none"
              stroke={active ? "url(#fpGrad)" : "rgba(255,255,255,0.18)"}
              strokeWidth={2.4}
              strokeLinecap="round"
              strokeDasharray={i % 2 === 0 ? "0" : "60 14"}
              opacity={active ? 1 : 0.6}
            />
          );
        })}
        {progress > 0 && progress < 100 && (
          <motion.rect
            x="0"
            width="120"
            height="10"
            fill="var(--teal)"
            opacity={0.55}
            initial={{ y: 5 }}
            animate={{ y: 115 }}
            transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
            style={{ filter: "blur(2px)" }}
          />
        )}
      </g>
    </svg>
  );
}

export function Identification({ onNext }: Props) {
  const [stage, setStage] = useState<Stage>("idle");
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (stage !== "scanning") return;
    timerRef.current = window.setInterval(() => {
      setProgress((p) => {
        const next = p + 3.2;
        if (next >= 100) {
          window.clearInterval(timerRef.current!);
          setTimeout(() => setStage("matched"), 250);
          return 100;
        }
        return next;
      });
    }, 55);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [stage]);

  return (
    <div className="screen-inner">
      <div className="eyebrow mono">ЭТАП 01</div>
      <h1 className="title">ИДЕНТИФИКАЦИЯ ПРОФИЛЯ</h1>
      <p className="body-text">
        Приложите палец к сканеру, чтобы система могла подтвердить личность.
      </p>

      <div
        className="card card-alive"
        style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, padding: "28px 20px" }}
      >
        <motion.button
          onClick={() => stage === "idle" && setStage("scanning")}
          whileTap={{ scale: 0.94 }}
          disabled={stage !== "idle"}
          aria-label="Отсканировать отпечаток"
          style={{
            background: "transparent",
            border: "none",
            padding: 0,
            filter:
              stage === "matched" || stage === "revealed"
                ? "drop-shadow(0 0 18px var(--teal))"
                : "drop-shadow(0 0 12px rgba(255,79,195,0.4))",
          }}
        >
          <FingerprintIcon progress={progress} />
        </motion.button>

        {stage === "idle" && (
          <p className="sys-line" style={{ textAlign: "center" }}>
            Нажмите на отпечаток, чтобы начать сканирование.
          </p>
        )}

        {stage === "scanning" && (
          <>
            <div
              className="mono"
              style={{ fontSize: 28, color: "var(--teal)", letterSpacing: 1 }}
            >
              {Math.min(100, Math.round(progress))}%
            </div>
            <p className="sys-line">СКАНИРОВАНИЕ...</p>
          </>
        )}

        {(stage === "matched" || stage === "revealed") && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ textAlign: "center" }}
          >
            <div className="mono" style={{ fontSize: 15, color: "var(--pink)", marginBottom: 4 }}>
              СОВПАДЕНИЕ: 99.9%
            </div>
            <p className="sys-line">Личность подтверждена.</p>
          </motion.div>
        )}
      </div>

      {stage === "matched" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <SystemButton onClick={() => setStage("revealed")}>ОТКРЫТЬ ДЕЛО →</SystemButton>
        </motion.div>
      )}

      {stage === "revealed" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card"
          style={{ display: "flex", gap: 14, alignItems: "center" }}
        >
          <img
            src="/assets/images/profile-photo.jpg"
            alt=""
            style={{ width: 64, height: 64, borderRadius: 12, objectFit: "cover", flexShrink: 0 }}
          />
          <div>
            <div className="mono" style={{ fontSize: 11, color: "var(--text-dim)" }}>
              ПРОФИЛЬ
            </div>
            <div className="title" style={{ fontSize: 18 }}>
              {config.recipientName.toUpperCase()}
            </div>
            <div className="mono" style={{ fontSize: 11, color: "var(--teal)", marginTop: 2 }}>
              PROTOCOL: {config.nickname.toUpperCase()} {config.age}.0
            </div>
          </div>
        </motion.div>
      )}

      {stage === "revealed" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <SystemButton onClick={onNext}>ПРОДОЛЖИТЬ →</SystemButton>
        </motion.div>
      )}
    </div>
  );
}
