import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { CSSProperties } from "react";

interface Props {
  src: string;
  alt: string;
  style?: CSSProperties;
  className?: string;
}

export function ParallaxImage({ src, alt, style, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-14, 14]);

  return (
    <div ref={ref} style={{ overflow: "hidden", ...style }} className={className}>
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        style={{
          width: "100%",
          height: "112%",
          objectFit: "cover",
          y,
          display: "block",
          marginTop: "-6%",
        }}
      />
    </div>
  );
}
