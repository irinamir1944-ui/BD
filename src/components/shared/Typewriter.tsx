import { useEffect, useState } from "react";
import { config } from "../../data/config";

interface Props {
  lines: string[];
  className?: string;
  onDone?: () => void;
  startDelay?: number;
  speed?: number;
}

export function Typewriter({ lines, className, onDone, startDelay = 0, speed }: Props) {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [current, setCurrent] = useState("");
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    let cancelled = false;
    if (prefersReduced) {
      setVisibleLines(lines);
      setCurrent("");
      onDone?.();
      return;
    }

    const charSpeed = speed ?? config.timing.typewriterSpeed;
    let timeouts: number[] = [];

    async function run() {
      await wait(startDelay);
      for (let i = 0; i < lines.length; i++) {
        if (cancelled) return;
        const line = lines[i];
        for (let c = 0; c <= line.length; c++) {
          if (cancelled) return;
          await wait(charSpeed);
          setCurrent(line.slice(0, c));
        }
        setVisibleLines((prev) => [...prev, line]);
        setCurrent("");
        await wait(220);
      }
      onDone?.();
    }

    function wait(ms: number) {
      return new Promise<void>((resolve) => {
        const id = window.setTimeout(resolve, ms);
        timeouts.push(id);
      });
    }

    run();
    return () => {
      cancelled = true;
      timeouts.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lines.join("|")]);

  return (
    <div className={className}>
      {visibleLines.map((l, i) => (
        <div key={i}>{l}</div>
      ))}
      {current !== "" || (!prefersReduced && visibleLines.length < lines.length) ? (
        <div>
          {current}
          <span className="blink-cursor" />
        </div>
      ) : null}
    </div>
  );
}
