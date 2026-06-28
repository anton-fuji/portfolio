import type { FC } from "react";
import { useEffect, useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";

type RevealDirection = "start" | "end";

type DecryptedTextProps = {
  text: string;
  speed?: number;
  maxIterations?: number;
  characters?: string;
  revealDirection?: RevealDirection;
  className?: string;
  encryptedClassName?: string;
};

const DEFAULT_CHARACTERS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

const getPlaceholderChar = (index: number, characters: string): string =>
  characters[index % characters.length] ?? "";

const buildDisplayText = (
  text: string,
  iteration: number,
  maxIterations: number,
  characters: string,
  revealDirection: RevealDirection,
): string => {
  const revealCount = Math.min(
    text.length,
    Math.floor((iteration / maxIterations) * text.length),
  );

  return [...text]
    .map((char, index) => {
      if (char === " ") return " ";

      const shouldReveal =
        revealDirection === "start"
          ? index < revealCount
          : index >= text.length - revealCount;

      if (shouldReveal || iteration >= maxIterations) return char;

      return getPlaceholderChar(index + iteration, characters);
    })
    .join("");
};

const DecryptedText: FC<DecryptedTextProps> = ({
  text,
  speed = 42,
  maxIterations = 18,
  characters = DEFAULT_CHARACTERS,
  revealDirection = "start",
  className,
  encryptedClassName,
}) => {
  const initialText = useMemo(
    () => buildDisplayText(text, 0, maxIterations, characters, revealDirection),
    [text, maxIterations, characters, revealDirection],
  );
  const [displayText, setDisplayText] = useState(initialText);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayText(text);
      return;
    }

    setDisplayText(initialText);

    let iteration = 0;
    const intervalId = window.setInterval(() => {
      iteration += 1;

      setDisplayText(
        buildDisplayText(
          text,
          iteration,
          maxIterations,
          characters,
          revealDirection,
        ),
      );

      if (iteration >= maxIterations) {
        window.clearInterval(intervalId);
      }
    }, speed);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [text, speed, maxIterations, characters, revealDirection, initialText]);

  return (
    <span className={twMerge("inline-block", className)}>
      <span className="sr-only">{text}</span>
      <span
        className={twMerge(
          "inline-block whitespace-nowrap tabular-nums",
          displayText === text ? undefined : encryptedClassName,
        )}
        aria-hidden="true"
      >
        {displayText}
      </span>
    </span>
  );
};

export default DecryptedText;
