"use client";
import { useState } from "react";

interface RippleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function RippleButton({ children, className = "", ...props }: RippleButtonProps) {
  const [ripples, setRipples] = useState<
    { x: number; y: number; size: number; key: number }[]
  >([]);

  const createRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    const newRipple = { x, y, size, key: Date.now() };
    setRipples((prev) => [...prev, newRipple]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.key !== newRipple.key));
    }, 600);
  };

  return (
    <button
      {...props}
      onClick={(e) => {
        createRipple(e);
        props.onClick?.(e);
      }}
      className={`relative overflow-hidden ${className}`}
    >
      {children}
      {ripples.map((r) => (
        <span
          key={r.key}
          className="absolute bg-gray-400 opacity-30 rounded-full animate-ripple"
          style={{
            top: r.y,
            left: r.x,
            width: r.size,
            height: r.size,
          }}
        />
      ))}
    </button>
  );
}
