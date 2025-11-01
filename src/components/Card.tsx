import type { FC, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export type CardProps = {
  children: ReactNode;
  className?: string;
};

const Card: FC<CardProps> = ({ children, className }) => {
  return (
    <div
      className={twMerge(
        "rounded-lg border border-gray-600/20 bg-black/50 backdrop-blur-md p-6 shadow-xl/20 opacity-80",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Card;
