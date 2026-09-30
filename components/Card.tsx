import type { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export default function Card({
  children,
  className = "",
  ...props
}: CardProps) {
  return (
    <div
      className={`rounded-card border border-gray-200 bg-white text-foreground p-6 shadow-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}