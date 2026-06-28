import {
  type FC,
  type MouseEvent,
  type ReactNode,
  useRef,
} from "react";
import { twMerge } from "tailwind-merge";

export type SpotlightCardProps = {
  children: ReactNode;
  className?: string;
  /** CSS color used for the radial spotlight that follows the cursor */
  spotlightColor?: string;
};

const SpotlightCard: FC<SpotlightCardProps> = ({
  children,
  className,
  spotlightColor = "rgba(255, 255, 255, 0.25)",
}) => {
  const divRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = divRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--spotlight-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--spotlight-y", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      className={twMerge(
        "group relative overflow-hidden rounded-lg border border-gray-600/20 bg-black/50 p-6 shadow-xl/20 backdrop-blur-md",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), ${spotlightColor}, transparent 80%)`,
        }}
      />
      {children}
    </div>
  );
};

export default SpotlightCard;
