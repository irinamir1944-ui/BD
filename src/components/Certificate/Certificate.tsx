import { motion } from "framer-motion";
import { SystemButton } from "../shared/SystemButton";
import { config } from "../../data/config";

interface Props {
  onNext: () => void;
}

export function Certificate({ onNext }: Props) {
  const hasUrl = Boolean(config.certificateUrl);

  return (
    <div className="screen-inner" style={{ textAlign: "center" }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card card-alive"
        style={{
          border: "1px solid var(--teal)",
          background:
            "linear-gradient(160deg, rgba(0,229,204,0.08), rgba(122,42,255,0.06))",
          boxShadow: "0 0 40px -12px var(--teal)",
          padding: "32px 24px",
        }}
      >
        <div className="mono" style={{ fontSize: 11, letterSpacing: 3, color: "var(--text-dim)" }}>
          GIFT CERTIFICATE
        </div>
        <div
          style={{
            margin: "18px 0",
            height: 1,
            background:
              "linear-gradient(90deg, transparent, var(--teal), transparent)",
          }}
        />
        <div className="mono" style={{ fontSize: 12, color: "var(--text-dim)" }}>FOR</div>
        <div className="title" style={{ fontSize: 28, margin: "6px 0 18px", color: "var(--sand)" }}>
          {config.recipientName.toUpperCase()}
        </div>
        <div className="mono" style={{ fontSize: 14, letterSpacing: 1, color: "var(--teal)" }}>
          ONE SURF LESSON
        </div>
        <div style={{ fontSize: 36, margin: "14px 0" }}>🌊</div>
        <div className="mono" style={{ fontSize: 15, letterSpacing: 2 }}>{config.giftCity}</div>
        <div
          style={{
            margin: "18px 0",
            height: 1,
            background:
              "linear-gradient(90deg, transparent, var(--teal), transparent)",
          }}
        />
        <div className="mono" style={{ fontSize: 11, color: "var(--text-dim)" }}>FROM</div>
        <div className="mono" style={{ fontSize: 13, color: "var(--pink)", marginTop: 4 }}>
          {config.gifterName1} + {config.gifterName2}
        </div>
      </motion.div>

      {hasUrl ? (
        <a
          href={config.certificateUrl}
          target="_blank"
          rel="noreferrer"
          className="btn btn-primary"
          style={{ textAlign: "center", textDecoration: "none", display: "block" }}
        >
          ОТКРЫТЬ СЕРТИФИКАТ →
        </a>
      ) : (
        <p className="sys-line" style={{ textAlign: "center", opacity: 0.8 }}>
          Сертификат скоро будет здесь.
        </p>
      )}

      <SystemButton onClick={onNext} variant="ghost">
        ПРОДОЛЖИТЬ →
      </SystemButton>
    </div>
  );
}
