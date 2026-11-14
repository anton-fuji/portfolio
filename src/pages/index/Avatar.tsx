import { useEffect, useRef, type FC } from "react";

// アイコン（anton-fuji.png）を SVG で描き直したもの。目だけを別パーツにしてカーソルを追わせる。
const EYES = [
  { x1: 282, y1: 582, x2: 249, y2: 700 },
  { x1: 628, y1: 688, x2: 592, y2: 805 },
] as const;

const MAX_EYE_SHIFT = 28;

const Avatar: FC<{ className?: string }> = ({ className }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const eyeRefs = useRef<(SVGLineElement | null)[]>([]);

  useEffect(() => {
    const svg = svgRef.current;
    if (
      !svg ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !window.matchMedia("(pointer: fine)").matches
    ) {
      return;
    }

    let frame = 0;
    let pointerX = 0;
    let pointerY = 0;

    const update = () => {
      frame = 0;
      const rect = svg.getBoundingClientRect();
      const scale = rect.width / 1254;
      EYES.forEach((eye, index) => {
        const element = eyeRefs.current[index];
        if (!element) return;
        const centerX = rect.left + ((eye.x1 + eye.x2) / 2) * scale;
        const centerY = rect.top + ((eye.y1 + eye.y2) / 2) * scale;
        const dx = pointerX - centerX;
        const dy = pointerY - centerY;
        const distance = Math.hypot(dx, dy) || 1;
        const reach = Math.min(1, distance / 400) * MAX_EYE_SHIFT;
        element.style.transform = `translate(${(dx / distance) * reach}px, ${(dy / distance) * reach}px)`;
      });
    };

    const onPointerMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (!frame) frame = requestAnimationFrame(update);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 1254 1254"
      role="img"
      aria-label="Kazuki Fujimoto のアイコン"
      className={className}
    >
      <rect width="1254" height="1254" className="fill-ink" />
      <g className="fill-face">
        <path d="M150 985 C110 1060 70 1120 0 1160 L0 1254 L440 1254 C440 1180 470 1120 520 1090 Z" />
        <path
          className="fill-shade"
          d="M140 980 C190 1080 260 1160 330 1180 C400 1190 460 1150 520 1090 L470 1080 Z"
        />
        <path d="M85 515 C40 505 5 525 0 545 L0 690 C20 730 45 760 65 775 Z" />
        <path d="M820 750 C860 740 895 760 890 810 C880 880 820 950 700 970 Z" />
        <path d="M480 160 C700 160 840 300 865 520 C885 680 845 800 790 880 C700 1000 560 1090 410 1105 C280 1112 175 1045 120 960 C70 880 55 760 65 640 C75 400 230 160 480 160 Z" />
      </g>
      <g className="fill-none stroke-shade" strokeWidth="22" strokeLinecap="round">
        <path d="M38 565 C60 590 62 640 55 705" />
        <path d="M845 812 C800 820 790 870 745 915" />
      </g>
      <g className="fill-blush">
        <ellipse cx="158" cy="762" rx="50" ry="38" />
        <ellipse cx="636" cy="900" rx="50" ry="37" />
      </g>
      {EYES.map((eye, index) => (
        <line
          key={eye.x1}
          ref={(element) => {
            eyeRefs.current[index] = element;
          }}
          {...eye}
          className="stroke-ink transition-transform duration-300 ease-out"
          strokeWidth="70"
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
};

export default Avatar;
