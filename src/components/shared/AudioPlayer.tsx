import { useRef, useState } from "react";
import { motion } from "framer-motion";

interface Props {
  src: string;
  title: string;
  credit?: string;
}

export function AudioPlayer({ src, title, credit }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [missing, setMissing] = useState(false);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      audio.play().catch(() => setMissing(true));
    }
  };

  if (missing) {
    return (
      <div className="card" style={{ textAlign: "center" }}>
        <p className="sys-line">Аудиофайл ещё не загружен.</p>
      </div>
    );
  }

  return (
    <div className="card" style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <audio
        ref={audioRef}
        src={src}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onError={() => setMissing(true)}
      />
      <motion.button
        onClick={toggle}
        whileTap={{ scale: 0.92 }}
        aria-label={playing ? "Пауза" : "Включить песню"}
        style={{
          flexShrink: 0,
          width: 52,
          height: 52,
          borderRadius: "50%",
          border: "none",
          background: "linear-gradient(120deg, var(--pink), var(--purple) 55%, var(--teal))",
          color: "#100716",
          fontSize: 18,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 8px 24px -8px rgba(255,79,195,0.6)",
        }}
      >
        {playing ? "❚❚" : "▶"}
      </motion.button>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 700 }}>{title}</div>
        {credit && (
          <div className="mono" style={{ fontSize: 10, color: "var(--text-dim)", marginTop: 2 }}>
            {credit}
          </div>
        )}
        <div style={{ display: "flex", gap: 3, marginTop: 10, height: 18, alignItems: "flex-end" }}>
          {Array.from({ length: 14 }).map((_, i) => (
            <span
              key={i}
              style={{
                width: 3,
                borderRadius: 2,
                background: "linear-gradient(180deg, var(--teal), var(--pink))",
                height: playing ? undefined : 4,
                animation: playing ? `eqBar 0.${6 + (i % 5)}s ease-in-out infinite alternate` : undefined,
                animationDelay: `${i * 0.05}s`,
                opacity: playing ? 1 : 0.4,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
