import {
  type CSSProperties,
  type FC,
  type ReactNode,
  useMemo,
  useRef,
} from "react";

export type GlareHoverProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Hex color of the glare sweep (e.g. "#3ea8ff") */
  glareColor?: string;
  glareOpacity?: number;
  glareAngle?: number;
  /** Glare width as a percentage of the element */
  glareSize?: number;
  transitionDuration?: number;
  playOnce?: boolean;
};

/** Convert "#rgb" / "#rrggbb" to an rgba() string; fall back to the input. */
function toRgba(color: string, opacity: number): string {
  const hex = color.replace("#", "");
  const expand = (h: string) =>
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h;
  if (!/^[\dA-Fa-f]{3}$|^[\dA-Fa-f]{6}$/.test(hex)) return color;
  const full = expand(hex);
  const r = Number.parseInt(full.slice(0, 2), 16);
  const g = Number.parseInt(full.slice(2, 4), 16);
  const b = Number.parseInt(full.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

const GlareHover: FC<GlareHoverProps> = ({
  children,
  className = "",
  style,
  glareColor = "#ffffff",
  glareOpacity = 0.5,
  glareAngle = -45,
  glareSize = 250,
  transitionDuration = 650,
  playOnce = false,
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const rgba = useMemo(
    () => toRgba(glareColor, glareOpacity),
    [glareColor, glareOpacity],
  );

  const move = (to: string) => {
    const el = overlayRef.current;
    if (!el) return;
    el.style.transition = "none";
    el.style.backgroundPosition = "-100% -100%, 0 0";
    // Force reflow so the reset position applies before the transition.
    void el.offsetHeight;
    el.style.transition = `${transitionDuration}ms ease`;
    el.style.backgroundPosition = to;
  };

  const handleEnter = () => move("100% 100%, 0 0");
  const handleLeave = () => {
    const el = overlayRef.current;
    if (!el) return;
    if (playOnce) return;
    el.style.transition = `${transitionDuration}ms ease`;
    el.style.backgroundPosition = "-100% -100%, 0 0";
  };

  const overlayStyle: CSSProperties = {
    position: "absolute",
    inset: 0,
    background: `linear-gradient(${glareAngle}deg, hsla(0,0%,0%,0) 60%, ${rgba} 70%, hsla(0,0%,0%,0) 100%)`,
    backgroundSize: `${glareSize}% ${glareSize}%, 100% 100%`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "-100% -100%, 0 0",
    pointerEvents: "none",
  };

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={style}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div ref={overlayRef} aria-hidden style={overlayStyle} />
      {children}
    </div>
  );
};

export default GlareHover;