import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SystemButton } from "../shared/SystemButton";
import { ParallaxImage } from "../shared/ParallaxImage";
import { memories, anomalies } from "../../data/memories";

interface Props {
  onNext: () => void;
}

export function MemoryArchive({ onNext }: Props) {
  const [open, setOpen] = useState<string | null>(null);
  const openMemory = memories.find((m) => m.id === open);

  return (
    <div className="screen-inner">
      <div className="eyebrow mono">ЭТАП 05</div>
      <h1 className="title">ОБНАРУЖЕНЫ АРХИВНЫЕ МАТЕРИАЛЫ</h1>
      <p className="body-text">
        Некоторые файлы были случайно сохранены системой за последние годы.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {memories.map((m) => (
          <motion.button
            key={m.id}
            className="vhs-frame card-alive"
            onClick={() => setOpen(m.id)}
            whileTap={{ scale: 0.95 }}
            style={{
              position: "relative",
              border: "1px solid rgba(255,255,255,0.18)",
              borderRadius: 16,
              padding: 0,
              overflow: "hidden",
              background: "var(--bg-alt)",
              textAlign: "left",
            }}
          >
            <div style={{ position: "relative", aspectRatio: "4/5" }}>
              <ParallaxImage src={m.image} alt={m.caption} style={{ position: "absolute", inset: 0 }} />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(10,7,24,0.85), transparent 55%)",
                }}
              />
              <div
                className="mono"
                style={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  width: 26,
                  height: 26,
                  borderRadius: "50%",
                  background: "rgba(20,13,41,0.6)",
                  border: "1px solid rgba(255,255,255,0.35)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 13,
                  color: "var(--text)",
                }}
              >
                ⤢
              </div>
            </div>
            <div style={{ padding: "8px 10px" }}>
              <div className="mono" style={{ fontSize: 10, color: "var(--pink)" }}>{m.title}</div>
              <div style={{ fontSize: 12, opacity: 0.85 }}>{m.caption}</div>
              <div className="mono" style={{ fontSize: 9, color: "var(--text-dim)", marginTop: 4, letterSpacing: 1 }}>
                НАЖМИТЕ, ЧТОБЫ ОТКРЫТЬ
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 4 }}>
        {anomalies.map((a) => (
          <div key={a.id} className="card vhs-frame" style={{ padding: 0, overflow: "hidden" }}>
            <div className="mono" style={{ fontSize: 11, color: "var(--pink)", padding: "10px 14px 0" }}>
              {a.label}
            </div>
            <p className="body-text" style={{ padding: "8px 14px", fontSize: 14 }}>{a.caption}</p>
            <ParallaxImage src={a.image} alt={a.caption} style={{ aspectRatio: "4/5" }} />
            <div className="mono" style={{ fontSize: 10, color: "var(--text-dim)", padding: "8px 14px" }}>
              {a.source}
            </div>
          </div>
        ))}
      </div>

      <div style={{ height: 64 }} aria-hidden />
      <div
        style={{
          position: "fixed",
          left: "50%",
          bottom: "calc(12px + env(safe-area-inset-bottom))",
          transform: "translateX(-50%)",
          width: "min(calc(100% - 40px), 420px)",
          zIndex: 40,
        }}
      >
        <SystemButton onClick={onNext}>ПРОДОЛЖИТЬ →</SystemButton>
      </div>

      <AnimatePresence>
        {openMemory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(2,4,7,0.92)",
              zIndex: 100,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: 20,
            }}
          >
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              src={openMemory.image}
              alt={openMemory.caption}
              className="vhs-frame"
              style={{ maxHeight: "70vh", borderRadius: 12, border: "1px solid rgba(255,255,255,0.2)" }}
            />
            <div className="mono" style={{ marginTop: 14, color: "var(--pink)", fontSize: 12 }}>
              {openMemory.title}
            </div>
            <div style={{ marginTop: 6, opacity: 0.85 }}>{openMemory.caption}</div>
            <div className="mono" style={{ marginTop: 18, fontSize: 11, color: "var(--text-dim)" }}>
              нажми, чтобы закрыть
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
