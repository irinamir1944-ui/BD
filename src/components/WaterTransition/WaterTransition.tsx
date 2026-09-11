import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

interface Props {
  onDone: () => void;
}

type Stage = "drops" | "warp" | "rising" | "wave" | "dissolve";

const STAGE_DURATIONS: Record<Stage, number> = {
  drops: 1400,
  warp: 1100,
  rising: 3000,
  wave: 900,
  dissolve: 700,
};

const STAGE_ORDER: Stage[] = ["drops", "warp", "rising", "wave", "dissolve"];

export function WaterTransition({ onDone }: Props) {
  const [stage, setStage] = useState<Stage>("drops");
  const [fillPercent, setFillPercent] = useState(0);
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const drops = useMemo(
    () =>
      Array.from({ length: prefersReduced ? 0 : 12 }).map(() => ({
        left: 8 + Math.random() * 84,
        delay: Math.random() * 1.1,
        duration: 0.7 + Math.random() * 0.5,
      })),
    [prefersReduced]
  );

  const bubbles = useMemo(
    () =>
      Array.from({ length: prefersReduced ? 0 : 18 }).map(() => ({
        left: Math.random() * 100,
        size: 6 + Math.random() * 16,
        duration: 3 + Math.random() * 3,
        delay: Math.random() * 3,
      })),
    [prefersReduced]
  );

  // advance through discrete stages
  useEffect(() => {
    if (prefersReduced) {
      const t = setTimeout(onDone, 900);
      return () => clearTimeout(t);
    }
    const idx = STAGE_ORDER.indexOf(stage);
    const t = setTimeout(() => {
      if (idx + 1 < STAGE_ORDER.length) {
        setStage(STAGE_ORDER[idx + 1]);
      } else {
        onDone();
      }
    }, STAGE_DURATIONS[stage]);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage]);

  // animate the water fill during the "rising" and "wave" stages
  useEffect(() => {
    if (prefersReduced) return;
    if (stage !== "rising" && stage !== "wave") return;
    const start = performance.now();
    const duration = stage === "rising" ? STAGE_DURATIONS.rising : STAGE_DURATIONS.wave;
    const startPercent = stage === "rising" ? 0 : 78;
    const endPercent = stage === "rising" ? 78 : 100;
    let raf: number;
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      setFillPercent(startPercent + (endPercent - startPercent) * p);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [stage, prefersReduced]);

  const waterHeight = fillPercent;
  const warpIntensity = stage === "warp" ? 1 : stage === "drops" ? 0.15 : 0;

  return (
    <div
      className="screen"
      style={{
        background:
          stage === "dissolve"
            ? "var(--ocean-deep)"
            : `linear-gradient(to bottom, var(--bg) ${100 - waterHeight - 15}%, var(--ocean-deep) 100%)`,
        justifyContent: "flex-end",
        transition: stage === "dissolve" ? "background 0.7s ease" : undefined,
      }}
    >
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden>
        <filter id="waterWarp">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.04" numOctaves={2} seed={7} result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale={warpIntensity * 26} xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      {/* falling drops */}
      {(stage === "drops" || stage === "warp") && (
        <div style={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 4 }}>
          {drops.map((d, i) => (
            <motion.span
              key={i}
              initial={{ top: "-5%", opacity: 0 }}
              animate={{ top: "62%", opacity: [0, 1, 1, 0] }}
              transition={{ duration: d.duration, delay: d.delay, ease: "easeIn" }}
              style={{
                position: "absolute",
                left: `${d.left}%`,
                width: 3,
                height: 14,
                borderRadius: "40% 40% 60% 60%",
                background: "linear-gradient(to bottom, transparent, var(--teal))",
              }}
            />
          ))}
        </div>
      )}

      {/* central status panel that "swims" during warp */}
      {(stage === "drops" || stage === "warp") && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="card mono"
          style={{
            position: "relative",
            zIndex: 5,
            textAlign: "center",
            marginBottom: "26vh",
            filter: warpIntensity > 0 ? "url(#waterWarp)" : undefined,
          }}
        >
          <div style={{ fontSize: 11, letterSpacing: 2, color: "var(--text-dim)" }}>
            ЦЕЛОСТНОСТЬ ИНТЕРФЕЙСА
          </div>
          <div
            style={{
              fontSize: 22,
              color: stage === "warp" ? "var(--pink)" : "var(--teal)",
              marginTop: 4,
            }}
          >
            {stage === "warp" ? "41%" : "98%"}
          </div>
          {stage === "warp" && (
            <div style={{ fontSize: 10, color: "var(--pink)", marginTop: 6, letterSpacing: 1 }}>
              ОБНАРУЖЕНА ЖИДКОСТЬ В СИСТЕМЕ
            </div>
          )}
        </motion.div>
      )}

      {/* rising water + bubbles */}
      {(stage === "rising" || stage === "wave" || stage === "dissolve") && (
        <>
          <div style={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
            {bubbles.map((b, i) => (
              <span
                key={i}
                className="bubble"
                style={{
                  left: `${b.left}%`,
                  width: b.size,
                  height: b.size,
                  animationDuration: `${b.duration}s`,
                  animationDelay: `${b.delay}s`,
                }}
              />
            ))}
          </div>

          <motion.div
            aria-hidden
            style={{
              position: "fixed",
              left: 0,
              right: 0,
              bottom: 0,
              height: `${waterHeight}%`,
              background:
                "linear-gradient(to bottom, rgba(255,79,195,0.25), var(--ocean) 35%, var(--ocean-deep) 100%)",
              zIndex: 3,
            }}
          >
            <svg
              className="wave-svg"
              viewBox="0 0 200 20"
              preserveAspectRatio="none"
              style={{ position: "absolute", top: -18, left: 0, width: "200%", height: 40 }}
            >
              <path
                d="M0 10 Q 12.5 0 25 10 T 50 10 T 75 10 T 100 10 T 125 10 T 150 10 T 175 10 T 200 10 V20 H0 Z"
                fill="var(--ocean)"
                opacity="0.85"
              />
            </svg>
          </motion.div>

          {stage === "wave" && (
            <motion.svg
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 0.9, ease: "easeIn" }}
              viewBox="0 0 400 800"
              preserveAspectRatio="none"
              style={{
                position: "fixed",
                inset: 0,
                width: "100%",
                height: "100%",
                zIndex: 6,
                pointerEvents: "none",
              }}
            >
              <path
                d="M0,800 L0,420 Q60,300 130,400 Q200,520 260,380 Q320,260 400,410 L400,800 Z"
                fill="var(--teal)"
                opacity="0.55"
              />
              <path
                d="M0,800 L0,470 Q70,360 140,450 Q210,560 270,430 Q330,320 400,460 L400,800 Z"
                fill="#ffffff"
                opacity="0.35"
              />
            </motion.svg>
          )}
        </>
      )}

      {stage === "dissolve" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mono"
          style={{
            position: "relative",
            zIndex: 7,
            textAlign: "center",
            marginBottom: "20vh",
            fontSize: 13,
            letterSpacing: 3,
            color: "var(--text)",
          }}
        >
          СИСТЕМА РАСТВОРЕНА
        </motion.div>
      )}
    </div>
  );
}
