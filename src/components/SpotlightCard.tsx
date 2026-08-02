import {
  useEffect,
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
  const rectRef = useRef<DOMRect | null>(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    },
    [],
  );

  const updateRect = () => {
    rectRef.current = divRef.current?.getBoundingClientRect() ?? null;
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = divRef.current;
    if (!el) return;

    if (!rectRef.current) {
      updateRect();
    }
    if (!rectRef.current) return;

    pointerRef.current = { x: e.clientX, y: e.clientY };
    if (frameRef.current !== null) return;

    frameRef.current = window.requestAnimationFrame(() => {
      const rect = rectRef.current;
      const card = divRef.current;
      if (rect && card) {
        card.style.setProperty(
          "--spotlight-x",
          `${pointerRef.current.x - rect.left}px`,
        );
        card.style.setProperty(
          "--spotlight-y",
          `${pointerRef.current.y - rect.top}px`,
        );
      }
      frameRef.current = null;
    });
  };

  return (
    <div
      ref={divRef}
      onMouseEnter={updateRect}
      onMouseLeave={() => {
        rectRef.current = null;
      }}
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
