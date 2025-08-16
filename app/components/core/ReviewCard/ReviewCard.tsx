import { useState, useEffect } from "react";
import styles from "./ReviewCard.module.css"; // Keep animations here
import { FaQuoteLeft } from "react-icons/fa";

interface ReviewCardProps {
  dir: "rtl" | "ltr";
  label: string;
  review: any;
  isVisible: boolean;
  onAnimationEnd: CallableFunction;
}

export default function ReviewCard({
  dir,
  label,
  review,
  isVisible,
  onAnimationEnd,
}: ReviewCardProps) {
  const [localVisible, setLocalVisible] = useState(isVisible);

  useEffect(() => {
    if (!isVisible) {
      setLocalVisible(false);
    } else {
      const timer = setTimeout(() => setLocalVisible(true), 50);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  return (
    <article
      className={`
        relative -z-1 justify-self-center max-w-[600px] m-6 p-6 bg-white
        rounded-[32px] shadow-[0_4px_32px_rgba(0,0,0,0.05)]
        font-sans overflow-hidden opacity-0 
        ${localVisible ? styles.enter : styles.exit}
      `}
      onAnimationEnd={() => {
        if (!localVisible && onAnimationEnd) {
          onAnimationEnd();
        }
      }}
    >
      <header>
        <p className="text-indigo-600 text-sm font-bold uppercase tracking-wider mb-2 relative">
          {label}
        </p>
        <h2 className="text-gray-900 text-2xl font-bold leading-[1.3] mb-6 relative">
          {review.title}
        </h2>
      </header>

      <blockquote
        className={`
          text-gray-600 text-lg leading-7 italic mb-8 relative
          ${dir === "rtl" ? "pr-4 border-r-4 border-gray-200" : "pl-4 border-l-4 border-gray-200"}
        `}
      >
        {review.quote}
      </blockquote>

      <div className="flex items-center gap-4 relative">
        <div className="w-20 h-20">
          <img
            src={review.avatar}
            alt={`${review.author} portrait`}
            width="80"
            height="80"
            loading="lazy"
            className="rounded-full object-cover border-2 border-gray-200"
          />
        </div>
        <div>
          <h3 className="text-gray-900 text-base font-semibold mb-1">
            {review.author}
          </h3>
          <p className="text-gray-500 text-sm font-medium">
            {review.association}
          </p>
        </div>
      </div>

      <FaQuoteLeft
        className={`
          absolute text-indigo-600/10 text-[8rem] z-0
          ${dir === "rtl" ? "bottom-5 left-5" : "bottom-5 right-5"}
        `}
      />
    </article>
  );
}
