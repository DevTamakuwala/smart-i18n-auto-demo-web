"use client";

import { useRef, useEffect, type ReactNode } from "react";

interface GradientTextProps {
  children: ReactNode;
  colors?: string[];
  animationSpeed?: number;
  showBorder?: boolean;
  className?: string;
  pauseOnHover?: boolean;
  yoyo?: boolean;
}

export default function GradientText({
  children,
  colors = ["#5227FF", "#FF9FFC", "#B19EEF"],
  animationSpeed = 1,
  showBorder = false,
  className = "",
  pauseOnHover = false,
  yoyo = false,
}: GradientTextProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const gradientStops = colors.join(", ");
    const fullGradient = `linear-gradient(90deg, ${gradientStops}, ${gradientStops})`;
    el.style.backgroundImage = fullGradient;
    el.style.backgroundSize = "200% 100%";
    el.style.backgroundClip = "text";
    el.style.webkitBackgroundClip = "text";
    el.style.color = "transparent";

    let pos = 0;
    let direction = 1;
    let paused = false;
    let animId: number;

    function animate() {
      if (!paused) {
        pos += 0.3 * animationSpeed * direction;
        if (yoyo) {
          if (pos >= 100) direction = -1;
          if (pos <= 0) direction = 1;
        } else {
          if (pos >= 200) pos = 0;
        }
        el!.style.backgroundPosition = `${pos}% 0`;
      }
      animId = requestAnimationFrame(animate);
    }

    animId = requestAnimationFrame(animate);

    const handleEnter = () => {
      if (pauseOnHover) paused = true;
    };
    const handleLeave = () => {
      paused = false;
    };

    el.addEventListener("mouseenter", handleEnter);
    el.addEventListener("mouseleave", handleLeave);

    return () => {
      cancelAnimationFrame(animId);
      el.removeEventListener("mouseenter", handleEnter);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [colors, animationSpeed, pauseOnHover, yoyo]);

  return (
    <span
      ref={ref}
      className={`inline-block font-semibold ${
        showBorder
          ? "border border-slate-300/40 rounded-full px-3 py-1"
          : ""
      } ${className}`}
    >
      {children}
    </span>
  );
}
