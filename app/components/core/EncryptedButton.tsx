"use client";

import { useRef, useState } from "react";
import { FiLock } from "react-icons/fi";

type EncryptButtonProps = {
  onClick?: () => Promise<void>; // callback to await
};

const TARGET_TEXT = "Encrypt data";
const CYCLES_PER_LETTER = 2;
const SHUFFLE_TIME = 50;
const CHARS = "!@#$%^&*():{};|,.<>/?".split("");

export const EncryptButton = ({ onClick }: EncryptButtonProps) => {
  const intervalRef = useRef<number>(0);
  const [text, setText] = useState(TARGET_TEXT);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  // Scramble effect
  const scramble = () => {
    let pos = 0;
    intervalRef.current = window.setInterval(() => {
      const scrambled = TARGET_TEXT.split("")
        .map((char, index) =>
          pos / CYCLES_PER_LETTER > index
            ? char
            : CHARS[Math.floor(Math.random() * CHARS.length)]
        )
        .join("");
      setText(scrambled);
      pos++;
      if (pos >= TARGET_TEXT.length * CYCLES_PER_LETTER) stopScramble();
    }, SHUFFLE_TIME);
  };

  const stopScramble = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setText(TARGET_TEXT);
  };

  // Handle click with progress
  const handleClick = async () => {
    if (!onClick) return;
    setIsLoading(true);
    setProgress(0);

    const start = performance.now();
    const duration = 2000; // simulate 2s progress

    const animateProgress = (time: number) => {
      const elapsed = time - start;
      const pct = Math.min(elapsed / duration, 1);
      setProgress(pct);
      if (pct < 1) requestAnimationFrame(animateProgress);
    };
    requestAnimationFrame(animateProgress);

    await onClick();

    setProgress(1);
    setTimeout(() => setIsLoading(false), 300);
  };

  return (
    <button
      onMouseEnter={scramble}
      onMouseLeave={stopScramble}
      onClick={handleClick}
      className="relative flex items-center gap-2 rounded-lg border border-neutral-500 bg-neutral-700 px-4 py-2 font-mono font-medium uppercase text-neutral-300 hover:text-indigo-300 transition-colors overflow-hidden"
    >
      <FiLock className="z-10" />
      <span className="z-10">{text}</span>

      {/* Scan animation */}
      <span className="absolute inset-0 z-0 bg-gradient-to-t from-indigo-400/0 from-40% via-indigo-400/30 via-50% to-indigo-400/0 animate-scan pointer-events-none"></span>

      {/* Circular progress */}
      {isLoading && (
        <svg
          className="absolute right-2 w-5 h-5 z-10"
          viewBox="0 0 36 36"
        >
          <circle
            className="text-indigo-500"
            strokeWidth="3"
            stroke="currentColor"
            fill="none"
            r="16"
            cx="18"
            cy="18"
            strokeDasharray={`${progress * 100} 100`}
            strokeDashoffset="25"
            strokeLinecap="round"
          />
        </svg>
      )}
    </button>
  );
};