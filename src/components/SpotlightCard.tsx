import {
  type FC,
  type MouseEvent,
  type ReactNode,
  useRef,
  useState,
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
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = divRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={twMerge(
        "relative overflow-hidden rounded-lg border border-gray-600/20 bg-black/50 p-6 shadow-xl/20 backdrop-blur-md",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          opacity,
          background: `radial-gradient(circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`,
        }}
      />
      {children}
    </div>
  );
};

export default SpotlightCard;