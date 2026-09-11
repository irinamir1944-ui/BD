import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SystemButton } from "../shared/SystemButton";

interface Props {
  onNext: () => void;
}

type Stage = "intro" | "searching" | "error";

const SEARCH_LINES = ["SEARCHING...", "ANALYZING...", "CALCULATING..."];

export function DestinationSearch({ onNext }: Props) {
  const [stage, setStage] = useState<Stage>("intro");
  const [lineIndex, setLineIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (stage !== "searching") return;
    const lineTimer = setInterval(() => {
      setLineIndex((i) => (i + 1 < SEARCH_LINES.length ? i + 1 : i));
    }, 900);
    const progTimer = setInterval(() => {
      setProgress((p) => Math.min(100, p + 4));
    }, 90);
    const done = setTimeout(() => setStage("error"), 2900);
    return () => {
      clearInterval(lineTimer);
      clearInterval(progTimer);
      clearTimeout(done);
    };
  }, [stage]);

  return (
    <div className="screen-inner">
      <AnimatePresence mode="wait">
        {stage === "intro" && (
          <motion.div key="intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <h1 className="title" style={{ fontSize: 20, marginBottom: 14 }}>
              ВСЕ НЕОБХОДИМЫЕ ДАННЫЕ СОБРАНЫ.
            </h1>
            <div className="card card-alive" style={{ marginBottom: 24 }}>
              <p className="body-text">Мы знаем, кто ты.</p>
              <p className="body-text">Мы знаем, что ты любишь.</p>
              <p className="body-text" style={{ marginBottom: 12 }}>Мы знаем, что делает тебя счастливой.</p>
              <p className="body-text" style={{ opacity: 0.85 }}>
                Теперь система может определить, куда тебе действительно нужно отправиться.
              </p>
            </div>
            <SystemButton onClick={() => setStage("searching")}>ЗАПУСТИТЬ ПОИСК →</SystemButton>
          </motion.div>
        )}

        {stage === "searching" && (
          <motion.div key="searching" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="card">
            <div className="eyebrow mono" style={{ marginBottom: 14 }}>DESTINATION SEARCH</div>
            <div className="mono" style={{ fontSize: 15, color: "var(--teal)", marginBottom: 18 }}>
              {SEARCH_LINES[lineIndex]}
            </div>
            <div style={{ height: 6, borderRadius: 3, background: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
              <motion.div
                animate={{ width: `${progress}%` }}
                style={{ height: "100%", background: "linear-gradient(90deg, var(--teal), var(--pink))" }}
              />
            </div>
          </motion.div>
        )}

        {stage === "error" && (
          <motion.div
            key="error"
            className="glitch-burst card"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ textAlign: "center" }}
          >
            <div className="mono chroma" style={{ fontSize: 22, color: "var(--pink)", marginBottom: 14 }}>
              ERROR
            </div>
            <p className="body-text" style={{ marginBottom: 8 }}>ПУНКТ НАЗНАЧЕНИЯ ЗАСЕКРЕЧЕН.</p>
            <p className="sys-line" style={{ marginBottom: 24 }}>
              Похоже, система вычисляет не место, а нечто другое.
            </p>
            <SystemButton onClick={onNext}>ЧТО ЭТО ЗНАЧИТ? →</SystemButton>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
