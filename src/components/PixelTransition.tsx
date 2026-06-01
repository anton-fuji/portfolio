import type { CSSProperties, FC, ReactNode } from "react";
import { useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";

type PixelTransitionProps = {
  firstContent: ReactNode;
  secondContent: ReactNode;
  secondImageSrc?: string;
  className?: string;
  pixelGridClassName?: string;
  gridSize?: number;
  pixelColor?: string;
};

type PixelStyle = CSSProperties & {
  "--pixel-bg": string;
  "--pixel-color": string;
  "--pixel-delay": string;
  "--pixel-image-size": string;
  "--pixel-position": string;
};

const PixelTransition: FC<PixelTransitionProps> = ({
  firstContent,
  secondContent,
  secondImageSrc,
  className,
  pixelGridClassName,
  gridSize = 10,
  pixelColor = "#0a0a0a",
}) => {
  const [active, setActive] = useState(false);

  const pixels = useMemo(
    () =>
      Array.from({ length: gridSize * gridSize }, (_, index) => {
        const x = index % gridSize;
        const y = Math.floor(index / gridSize);
        const center = (gridSize - 1) / 2;
        const distance = Math.hypot(x - center, y - center);

        return {
          id: `${x}-${y}`,
          x,
          y,
          delay: `${distance * 24}ms`,
        };
      }),
    [gridSize],
  );

  return (
    <div
      className={twMerge(
        "pixel-transition group relative h-full w-full overflow-hidden",
        className,
      )}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
    >
      <div className="absolute inset-0">{firstContent}</div>

      <div
        className={twMerge(
          "absolute inset-0 transition-opacity duration-300",
          active ? "opacity-100 delay-300" : "opacity-0",
        )}
      >
        {secondContent}
      </div>

      <div
        className={twMerge(
          "pointer-events-none absolute inset-0 z-20 grid",
          pixelGridClassName,
        )}
        style={{
          gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${gridSize}, minmax(0, 1fr))`,
        }}
      >
        {pixels.map((pixel) => (
          <span
            key={pixel.id}
            className={twMerge(
              "pixel-transition__pixel",
              secondImageSrc && "pixel-transition__pixel--image",
              active && "pixel-transition__pixel--active",
            )}
            style={
              {
                "--pixel-bg": secondImageSrc ? `url(${secondImageSrc})` : "none",
                "--pixel-color": pixelColor,
                "--pixel-delay": pixel.delay,
                "--pixel-image-size": `${gridSize * 100}% ${gridSize * 100}%`,
                "--pixel-position": `${(pixel.x / (gridSize - 1)) * 100}% ${
                  (pixel.y / (gridSize - 1)) * 100
                }%`,
              } as PixelStyle
            }
          />
        ))}
      </div>
    </div>
  );
};

export default PixelTransition;