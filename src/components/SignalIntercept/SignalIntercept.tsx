import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { SystemButton } from "../shared/SystemButton";
import { config } from "../../data/config";

interface Props {
  onNext: () => void;
}

type Stage = "error" | "incoming" | "video" | "done";

export function SignalIntercept({ onNext }: Props) {
  const [stage, setStage] = useState<Stage>("error");
  const [videoMissing, setVideoMissing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setStage("incoming"), 1800);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="screen-inner">
      {stage === "error" && (
        <motion.div
          className="glitch-burst"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ textAlign: "center" }}
        >
          <div className="mono chroma" style={{ fontSize: 22, color: "var(--pink)", marginBottom: 10 }}>
            SYSTEM ERROR
          </div>
          <div className="mono" style={{ fontSize: 13, color: "var(--text-dim)" }}>
            SIGNAL INTERRUPTED
          </div>
          <div className="mono" style={{ fontSize: 13, color: "var(--text-dim)", marginTop: 4 }}>
            UNEXPECTED TRANSMISSION DETECTED
          </div>
        </motion.div>
      )}

      {stage === "incoming" && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: "center" }}>
          <p className="sys-line" style={{ marginBottom: 8 }}>
            Протокол не предусматривал внешних сигналов.
          </p>
          <p className="body-text" style={{ marginBottom: 20 }}>
            Источник передачи не определён. Система не может заблокировать приём.
          </p>
          <div className="card mono" style={{ marginBottom: 20 }}>
            <div style={{ color: "var(--teal)", fontSize: 13 }}>INCOMING TRANSMISSION</div>
            <div style={{ color: "var(--pink)", fontSize: 15, marginTop: 6, letterSpacing: 1 }}>
              SOURCE: MADAGASCAR // UNVERIFIED
            </div>
          </div>
          <SystemButton onClick={() => setStage("video")}>ПРИНЯТЬ ПЕРЕДАЧУ →</SystemButton>
        </motion.div>
      )}

      {stage === "video" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {!videoMissing ? (
            <video
              ref={videoRef}
              src={config.videoPath}
              controls
              playsInline
              autoPlay
              onEnded={() => setStage("done")}
              onError={() => setVideoMissing(true)}
              style={{ width: "100%", borderRadius: 4, background: "#000" }}
            />
          ) : (
            <div className="card" style={{ textAlign: "center", padding: "40px 20px" }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>📼</div>
              <p className="body-text" style={{ marginBottom: 16 }}>
                Видео не удалось воспроизвести напрямую.
              </p>
              <a
                href={config.videoYoutubeUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-ghost"
                style={{ textAlign: "center", textDecoration: "none", display: "block" }}
              >
                СМОТРЕТЬ НА YOUTUBE →
              </a>
            </div>
          )}
          <div style={{ marginTop: 16 }}>
            <SystemButton onClick={() => setStage("done")} variant="ghost">
              ПРОПУСТИТЬ →
            </SystemButton>
          </div>
        </motion.div>
      )}

      {stage === "done" && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: "center" }}>
          <p className="sys-line" style={{ marginBottom: 6 }}>ПЕРЕДАЧА ПРИНЯТА.</p>
          <p className="body-text" style={{ marginBottom: 24 }}>
            Система зафиксировала: даже Мадагаскар знает, что {config.recipientName} сегодня отмечает день рождения.
            Протокол продолжает работу — источник сигнала остаётся неизвестным.
          </p>
          <SystemButton onClick={onNext}>ПРОДОЛЖИТЬ →</SystemButton>
        </motion.div>
      )}
    </div>
  );
}
