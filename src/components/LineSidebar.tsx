import {
  type CSSProperties,
  type PointerEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

type Falloff = "linear" | "smooth" | "sharp";

export interface LineSidebarProps {
  items?: string[];
  accentColor?: string;
  textColor?: string;
  markerColor?: string;
  showIndex?: boolean;
  showMarker?: boolean;
  proximityRadius?: number;
  maxShift?: number;
  falloff?: Falloff;
  markerLength?: number;
  markerGap?: number;
  tickScale?: number;
  scaleTick?: boolean;
  itemGap?: number;
  fontSize?: number;
  smoothing?: number;
  defaultActive?: number | null;
  onItemClick?: (index: number, label: string) => void;
  className?: string;
}

const FALLOFF_CURVES: Record<Falloff, (p: number) => number> = {
  linear: (p) => p,
  smooth: (p) => p * p * (3 - 2 * p),
  sharp: (p) => p * p * p,
};

const DEFAULT_ITEMS = [
  "Overview",
  "Components",
  "Animations",
  "Backgrounds",
  "Showcase",
  "Playground",
  "Templates",
  "Changelog",
  "Community",
  "Resources",
  "Documentation",
  "Support",
];

const LineSidebar = ({
  items = DEFAULT_ITEMS,
  accentColor = "#A855F7",
  textColor = "#c4c4c4",
  markerColor = "#6c6c6c",
  showIndex = true,
  showMarker = true,
  proximityRadius = 100,
  maxShift = 30,
  falloff = "smooth",
  markerLength = 60,
  markerGap = 0,
  tickScale = 0.5,
  scaleTick = true,
  itemGap = 20,
  fontSize = 1.1,
  smoothing = 100,
  defaultActive = null,
  onItemClick,
  className = "",
}: LineSidebarProps) => {
  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const targetsRef = useRef<number[]>([]);
  const currentRef = useRef<number[]>([]);
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef(0);
  const activeRef = useRef<number | null>(defaultActive);
  const smoothingRef = useRef(smoothing);
  const touchTargetRef = useRef<number | null>(null);
  const touchPointerIdRef = useRef<number | null>(null);
  const isDraggingRef = useRef(false);
  const suppressClickRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(defaultActive);

  smoothingRef.current = smoothing;

  const runFrame = useCallback((now: number) => {
    const dt = Math.min((now - lastRef.current) / 1000, 0.05);
    lastRef.current = now;
    const tau = Math.max(smoothingRef.current, 1) / 1000;
    const k = 1 - Math.exp(-dt / tau);

    let moving = false;
    const items = itemRefs.current;
    for (let i = 0; i < items.length; i++) {
      const el = items[i];
      if (!el) {
        continue;
      }
      const activeEffect =
        !isDraggingRef.current && activeRef.current === i ? 1 : 0;
      const target = Math.max(targetsRef.current[i] || 0, activeEffect);
      const cur = currentRef.current[i] || 0;
      const next = cur + (target - cur) * k;
      const settled = Math.abs(target - next) < 0.0015;
      const value = settled ? target : next;
      currentRef.current[i] = value;
      el.style.setProperty("--effect", value.toFixed(4));
      if (!settled) {
        moving = true;
      }
    }

    rafRef.current = moving ? requestAnimationFrame(runFrame) : null;
  }, []);

  const startLoop = useCallback(() => {
    if (rafRef.current != null) {
      return;
    }
    lastRef.current = performance.now();
    rafRef.current = requestAnimationFrame(runFrame);
  }, [runFrame]);

  const updateTargets = useCallback(
    (clientY: number, lockClosest = false) => {
      const list = listRef.current;
      if (!list) {
        return null;
      }
      const rect = list.getBoundingClientRect();
      const pointerY = clientY - rect.top;
      const ease = FALLOFF_CURVES[falloff] ?? FALLOFF_CURVES.linear;
      const items = itemRefs.current;
      const nextTargets: number[] = [];
      let closestIndex: number | null = null;
      let closestDistance = Number.POSITIVE_INFINITY;
      let strongestEffect = -1;

      for (let i = 0; i < items.length; i++) {
        const el = items[i];
        if (!el) {
          nextTargets[i] = 0;
          continue;
        }
        const center = el.offsetTop + el.offsetHeight / 2;
        const distance = Math.abs(pointerY - center);
        const effect = ease(Math.max(0, 1 - distance / proximityRadius));
        nextTargets[i] = effect;

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = i;
        }
        if (effect > strongestEffect) {
          strongestEffect = effect;
        }
      }

      if (lockClosest && closestIndex != null) {
        nextTargets[closestIndex] = 1;
      }

      targetsRef.current = nextTargets;
      touchTargetRef.current =
        closestIndex != null && (lockClosest || strongestEffect > 0)
          ? closestIndex
          : null;
      return touchTargetRef.current;
    },
    [falloff, proximityRadius],
  );

  const handlePointerDown = useCallback(
    (event: PointerEvent<HTMLUListElement>) => {
      if (
        event.pointerType === "mouse" &&
        event.button !== 0
      ) {
        return;
      }

      touchPointerIdRef.current = event.pointerId;
      isDraggingRef.current = true;
      suppressClickRef.current = false;
      event.currentTarget.setPointerCapture(event.pointerId);
      updateTargets(event.clientY, true);
      startLoop();
    },
    [startLoop, updateTargets],
  );

  const handlePointerMove = useCallback(
    (event: PointerEvent<HTMLUListElement>) => {
      if (
        touchPointerIdRef.current != null &&
        event.pointerId !== touchPointerIdRef.current
      ) {
        return;
      }

      updateTargets(event.clientY, touchPointerIdRef.current != null);
      startLoop();
    },
    [startLoop, updateTargets],
  );

  const handlePointerLeave = useCallback(() => {
    if (touchPointerIdRef.current != null) {
      return;
    }
    targetsRef.current = targetsRef.current.map(() => 0);
    startLoop();
  }, [startLoop]);

  const handleClick = useCallback(
    (index: number, label: string) => {
      setActiveIndex(index);
      onItemClick?.(index, label);
    },
    [onItemClick],
  );

  const handlePointerUp = useCallback(
    (event: PointerEvent<HTMLUListElement>) => {
      if (
        touchPointerIdRef.current == null ||
        event.pointerId !== touchPointerIdRef.current
      ) {
        return;
      }

      const targetIndex = touchTargetRef.current;
      touchPointerIdRef.current = null;
      isDraggingRef.current = false;
      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }

      if (targetIndex == null) {
        return;
      }

      suppressClickRef.current = true;
      const label = items[targetIndex];
      if (label) {
        event.preventDefault();
        handleClick(targetIndex, label);
      }
    },
    [handleClick, items],
  );

  const handlePointerCancel = useCallback(() => {
    touchPointerIdRef.current = null;
    isDraggingRef.current = false;
    touchTargetRef.current = null;
    targetsRef.current = targetsRef.current.map(() => 0);
    startLoop();
  }, [startLoop]);

  useEffect(() => {
    activeRef.current = activeIndex;
    startLoop();
  }, [activeIndex, startLoop]);

  useEffect(
    () => () => {
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
      }
    },
    [],
  );

  const tickClass = showMarker
    ? `after:absolute after:left-[calc(-1*var(--marker-length)-var(--marker-gap))] after:top-[calc(100%+var(--item-gap)/2)] after:h-px after:opacity-50 after:content-[''] last:after:content-none after:[background-color:var(--marker-color)] after:[width:calc(var(--marker-length)*var(--tick-scale))] ${
        scaleTick
          ? "after:origin-left after:[transform:translateY(-50%)_scaleX(calc(0.7+var(--effect,0)*0.6))]"
          : "after:-translate-y-1/2"
      }`
    : "";

  return (
    <nav
      className={`relative flex justify-start${showMarker ? " [padding-left:calc(var(--marker-length)+var(--marker-gap))]" : ""}${className ? ` ${className}` : ""}`}
      style={
        {
          "--accent-color": accentColor,
          "--text-color": textColor,
          "--marker-color": markerColor,
          "--marker-length": `${markerLength}px`,
          "--marker-gap": `${markerGap}px`,
          "--tick-scale": tickScale,
          "--max-shift": `${maxShift}px`,
          "--item-gap": `${itemGap}px`,
          "--font-size": `${fontSize}rem`,
          "--smoothing": `${smoothing}ms`,
        } as CSSProperties
      }
    >
      <ul
        ref={listRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onPointerLeave={handlePointerLeave}
        className="m-0 flex list-none flex-col py-4 [gap:var(--item-gap)] [touch-action:none]"
      >
        {items.map((label, index) => (
          <li
            key={label}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            className={`relative ${tickClass}`}
          >
            <button
              type="button"
              aria-current={activeIndex === index ? "true" : undefined}
              onClick={() => {
                if (suppressClickRef.current) {
                  suppressClickRef.current = false;
                  return;
                }
                handleClick(index, label);
              }}
              className="relative cursor-pointer border-0 bg-transparent p-0 text-left [font:inherit] before:absolute before:-inset-x-12 before:-inset-y-[6px] before:content-['']"
            >
              {showMarker && (
                <span
                  aria-hidden="true"
                  className="absolute left-[calc(-1*var(--marker-length)-var(--marker-gap))] top-1/2 h-px w-[length:var(--marker-length)] origin-left [background-color:color-mix(in_srgb,var(--accent-color)_calc(var(--effect,0)*100%),var(--marker-color))] [transform:translateY(-50%)_scaleX(calc(0.7+var(--effect,0)*0.5))]"
                />
              )}
              <span className="relative inline-flex items-baseline leading-[1.2] [color:color-mix(in_srgb,var(--accent-color)_calc(var(--effect,0)*100%),var(--text-color))] [font-size:var(--font-size)] [transform:translateX(calc(var(--effect,0)*var(--max-shift)))]">
                {showIndex && (
                  <span className="mr-[0.6rem] font-mono text-[0.85em] [opacity:calc(0.55+var(--effect,0)*0.45)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                )}
                <span>{label}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default LineSidebar;
