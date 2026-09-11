import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SystemButton } from "../shared/SystemButton";
import { AudioPlayer } from "../shared/AudioPlayer";
import { config } from "../../data/config";

const CASE_FIELDS: [string, string][] = [
  ["PROFILE", config.recipientName.toUpperCase()],
  ["STATUS", "ADVENTURE INITIALIZED"],
  ["FRIENDS", "2"],
  ["SMESHARIKI", "CRITICAL"],
  ["COOKING", "EXCEPTIONAL"],
  ["YOGA", "ACTIVE"],
  ["STYLE", "UNMEASURABLE"],
  ["OCEAN", "DETECTED"],
  ["ADVENTURES", "STARTED"],
  ["BIG TRIP", "IN DEVELOPMENT..."],
];

type Stage = "ps" | "case" | "song";

export function FinalMessage() {
  const [stage, setStage] = useState<Stage>("ps");

  return (
    <div className="screen-inner" style={{ textAlign: "center" }}>
      <AnimatePresence mode="wait">
        {stage === "ps" && (
          <motion.div key="ps" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="eyebrow mono" style={{ marginBottom: 8 }}>{config.postscript.title}</div>
            <p className="body-text" style={{ fontStyle: "italic", marginBottom: 18, opacity: 0.9 }}>
              {config.postscript.lead}
            </p>
            <div style={{ textAlign: "left", marginBottom: 24 }}>
              {config.postscript.body.map((line, i) =>
                line === "" ? (
                  <div key={i} style={{ height: 10 }} />
                ) : (
                  <p key={i} className="body-text" style={{ marginBottom: 4 }}>
                    {line}
                  </p>
                )
              )}
            </div>
            <p className="body-text" style={{ whiteSpace: "pre-line", opacity: 0.85, marginBottom: 26 }}>
              {config.postscript.signoff}
            </p>
            <SystemButton onClick={() => setStage("case")}>ЗАВЕРШИТЬ →</SystemButton>
          </motion.div>
        )}

        {stage === "case" && (
          <motion.div key="case" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="card mono" style={{ textAlign: "left", marginBottom: 24 }}>
              <div style={{ color: "var(--pink)", fontSize: 13, marginBottom: 14, letterSpacing: 2 }}>
                CASE FILE // {config.age}
              </div>
              {CASE_FIELDS.map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 6 }}>
                  <span style={{ color: "var(--text-dim)" }}>{k}:</span>
                  <span style={{ color: "var(--teal)" }}>{v}</span>
                </div>
              ))}
              <div style={{ marginTop: 20, textAlign: "center", opacity: 0.7, fontSize: 12 }}>
                Продолжение следует.
              </div>
            </div>
            <SystemButton onClick={() => setStage("song")}>ЕЩЁ ОДНА ВЕЩЬ →</SystemButton>
          </motion.div>
        )}

        {stage === "song" && (
          <motion.div key="song" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="eyebrow mono" style={{ marginBottom: 18 }}>ЕЩЁ ОДНА ВЕЩЬ</div>
            <AudioPlayer src={config.songPath} title="Песня для тебя" credit={config.songCredit} />
            <p className="body-text" style={{ marginTop: 26, opacity: 0.8 }}>
              С днём рождения. Мы тебя очень любим. 🌊
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
