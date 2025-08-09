// import { useState, useEffect } from 'react';
// import styles from "./ReviewCard.module.css";
// import { LucideQuoteIcon } from '@/app/components/core/Icons/LucideQuoteIcon';

// interface ReviewCardProps {
//   dir: "rtl" | "ltr";
//   label: string;
//   review: any;
//   isVisible: boolean;
//   onAnimationEnd: CallableFunction;
// }

// export default function ReviewCard({ dir, label, review, isVisible, onAnimationEnd }: ReviewCardProps) {
//   const [localVisible, setLocalVisible] = useState(isVisible);

//   useEffect(() => {
//     if (!isVisible) {
//       setLocalVisible(false);
//     } else {
//       const timer = setTimeout(() => setLocalVisible(true), 50);
//       return () => clearTimeout(timer);
//     }
//   }, [isVisible]);

//   return (
//     <article
//       className={`${styles.customerReview} ${localVisible ? styles.enter : styles.exit
//         }`}
//       onAnimationEnd={() => {
//         if (!localVisible && onAnimationEnd) {
//           onAnimationEnd();
//         }
//       }}
//     >
//       <header>
//         <p className={styles.reviewLabel}>{label}</p>
//         <h2 className={styles.reviewTitle}>{review.title}</h2>
//       </header>

//       <blockquote className={`
//         ${styles.reviewQuote}
//         ${dir === "rtl" ? styles.rtlBorder : styles.ltrBorder}
//       `}>
//         {review.quote}
//       </blockquote>

//       <div className={styles.reviewAuthor}>
//         <div className={styles.authorAvatar}>
//           <img
//             src={review.avatar}
//             alt={`${review.author} portrait`}
//             width="80"
//             height="80"
//             loading="lazy"
//           />
//         </div>
//         <div className={styles.authorInfo}>
//           <h3 className={styles.authorName}>{review.author}</h3>
//           <p className={styles.authorTitle}>{review.association}</p>
//         </div>
//       </div>

//       <LucideQuoteIcon className={`
//         ${styles.quoteIcon}
//         ${dir === "rtl" ? styles.quoteIconRtl : styles.quoteIconLtr}
//       `} />
//     </article>
//   );
// }

import { useState, useEffect } from "react";
import styles from "./ReviewCard.module.css"; // Keep animations here
import { LucideQuoteIcon } from "@/app/components/core/Icons/LucideQuoteIcon";

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
        relative max-w-[600px] mx-auto p-6 bg-[#f8f8f8]
        rounded-[32px] shadow-[0_4px_32px_rgba(0,0,0,0.05)]
        font-sans overflow-hidden opacity-0 translate-x-[20px]
        ${localVisible ? styles.enter : styles.exit}
      `}
      onAnimationEnd={() => {
        if (!localVisible && onAnimationEnd) {
          onAnimationEnd();
        }
      }}
    >
      <header>
        <p className="text-indigo-600 text-sm font-bold uppercase tracking-wider mb-2 relative z-[1]">
          {label}
        </p>
        <h2 className="text-gray-900 text-2xl font-bold leading-[1.3] mb-6 relative z-[1]">
          {review.title}
        </h2>
      </header>

      <blockquote
        className={`
          text-gray-600 text-lg leading-7 italic mb-8 relative z-[1]
          ${dir === "rtl" ? "pr-4 border-r-4 border-gray-200" : "pl-4 border-l-4 border-gray-200"}
        `}
      >
        {review.quote}
      </blockquote>

      <div className="flex items-center gap-4 relative z-[1]">
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

      <LucideQuoteIcon
        className={`
          absolute text-indigo-600/10 text-[8rem] z-0
          ${dir === "rtl" ? "bottom-5 left-5" : "bottom-5 right-5"}
        `}
      />
    </article>
  );
}
