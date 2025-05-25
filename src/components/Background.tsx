import { useEffect, useRef } from "react";
import NET from "vanta/dist/vanta.net.min";
import * as THREE from "three";

const Background = () => {
  const vantaRef = useRef<HTMLDivElement | null>(null);
  const effectRef = useRef<any>(null);

  useEffect(() => {
    if (!effectRef.current && vantaRef.current) {
      effectRef.current = (NET as any)({
        el: vantaRef.current,
        THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        color: 0xffffff,
        points: 10.0,
        backgroundColor: 0x0a0a0a,
        backgroundAlpha: 1.0,
        maxDistance: 22.0,
        spacing: 18.0,
        showDots: true,
      });
    }

    return () => {
      if (effectRef.current) {
        effectRef.current.destroy();
        effectRef.current = null;
      }
    };
  }, []);

  return <div ref={vantaRef} className="absolute inset-0 -z-10" />;
};

export default Background;
