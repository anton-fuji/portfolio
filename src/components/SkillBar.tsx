import type { FC } from "react";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

interface SkillBarProps {
  name: string;
  level: number;
  color?: string;
  delay?: number;
}

const SkillBar: FC<SkillBarProps> = ({
  name,
  level,
  color = "bg-blue-500",
  delay = 0,
}) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setWidth(level);
    }, delay);
    return () => clearTimeout(timer);
  }, [level, delay]);

  return (
    <div className="mb-6">
      <div className="mb-1 flex items-center justify-between">
        <span className="font-medium text-gray-300 text-sm">{name}</span>
        <span className="font-medium text-gray-300 text-sm">{width}%</span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-gray-700">
        <div
          className={twMerge(
            "h-full rounded-full transition-all duration-1000 ease-out",
            color,
          )}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
};

export default SkillBar;
