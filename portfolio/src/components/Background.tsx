import { useCallback } from "react";
import Particles from "react-tsparticles";
// import type { Engine } from "tsparticles-engine";
import { loadFull } from "tsparticles";

const Background = () => {
  const particlesInit = useCallback(async (engine: any) => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: { enable: true, zIndex: -1},
        background: { color: { value: "#0a0a0a" } },
        particles: {
          color: { value: "#ffffff" },
          links: {
            color: "#ffffff",
            distance: 120,
            enable: true,
            opacity: 0.3,
            width: 1,
          },
          move: {
            enable: true,
            speed: 1,
            outModes: { default: "bounce" },
          },
          number: {
            value: 60,
            density: { enable: true, area: 800 },
          },
          shape: { type: "circle" },
          size: { value: { min: 1, max: 4 } },
        },
      }}
    />
  );
};

export default Background;
