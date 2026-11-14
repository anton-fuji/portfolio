import type React from "react";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    VANTA: any;
    THREE: any;
  }
}

const BackgroundGlobe: React.FC = () => {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);

  useEffect(() => {
    // WebGL の地球儀は重いため、モバイル・省データ・動きを減らす設定では読み込まない。
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } })
      .connection;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !window.matchMedia("(min-width: 1024px) and (pointer: fine)").matches ||
      connection?.saveData
    ) {
      return;
    }

    let cancelled = false;
    let idleHandle: number | undefined;
    let timeoutHandle: ReturnType<typeof setTimeout> | undefined;

    const loadScripts = async () => {
      if (cancelled) return;
      try {
        if (!window.THREE) {
          await new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js";
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
          });
        }

        if (!window.VANTA) {
          await new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src = "https://cdn.jsdelivr.net/npm/vanta@0.5.24/dist/vanta.globe.min.js";
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
          });
        }

        if (cancelled) return;

        if (vantaEffect.current) {
          vantaEffect.current.destroy();
          vantaEffect.current = null;
        }

        if (vantaRef.current && window.VANTA) {
          vantaEffect.current = window.VANTA.GLOBE({
            el: vantaRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            scale: 1.0,
            scaleMobile: 1.0,
            // 黒基調に合わせ、アイコンの影色 (#dcd5cf) を暗く落としたグレーで描く。
            color: 0x1a1918,
            color2: 0x45423f,
            size: 1.2,
            backgroundColor: 0x0a0a0a,
            points: 12.0,
            maxDistance: 25.0,
            spacing: 18.0,
          });
          vantaRef.current.style.opacity = "1";
        }
      } catch (error) {
        console.error("Failed to load Vanta scripts:", error);
      }
    };

    // 初期表示を優先し、最初のユーザー操作の後、ブラウザが空いた時点で開始する。
    const interactionEvents = ["pointermove", "pointerdown", "wheel", "keydown", "scroll"];
    const removeInteractionListeners = () => {
      for (const type of interactionEvents) window.removeEventListener(type, schedule);
    };
    const schedule = () => {
      removeInteractionListeners();
      if (typeof window.requestIdleCallback === "function") {
        idleHandle = window.requestIdleCallback(() => void loadScripts(), { timeout: 1000 });
      } else {
        timeoutHandle = setTimeout(() => void loadScripts(), 200);
      }
    };

    for (const type of interactionEvents) {
      window.addEventListener(type, schedule, { once: true, passive: true });
    }

    return () => {
      cancelled = true;
      removeInteractionListeners();
      if (idleHandle !== undefined) window.cancelIdleCallback(idleHandle);
      if (timeoutHandle !== undefined) clearTimeout(timeoutHandle);
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={vantaRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -10,
        pointerEvents: "none",
        opacity: 0,
        transition: "opacity 1.2s ease-out",
      }}
    />
  );
};

export default BackgroundGlobe;
