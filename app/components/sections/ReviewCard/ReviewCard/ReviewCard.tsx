import { useState, useEffect } from 'react';
import styles from "./ReviewCard.module.css";
import { LucideQuoteIcon } from '@/app/components/core/Icons/LucideQuoteIcon';

interface ReviewCardProps {
  dir: "rtl" | "ltr";
  label: string;
  review: any;
  isVisible: boolean;
  onAnimationEnd: CallableFunction;
}

export default function ReviewCard({ dir, label, review, isVisible, onAnimationEnd }: ReviewCardProps) {
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
      className={`${styles.customerReview} ${localVisible ? styles.enter : styles.exit
        }`}
      onAnimationEnd={() => {
        if (!localVisible && onAnimationEnd) {
          onAnimationEnd();
        }
      }}
    >
      <header>
        <p className={styles.reviewLabel}>{label}</p>
        <h2 className={styles.reviewTitle}>{review.title}</h2>
      </header>

      <blockquote className={`
        ${styles.reviewQuote}
        ${dir === "rtl" ? styles.rtlBorder : styles.ltrBorder}
      `}>
        {review.quote}
      </blockquote>

      <div className={styles.reviewAuthor}>
        <div className={styles.authorAvatar}>
          <img
            src={review.avatar}
            alt={`${review.author} portrait`}
            width="80"
            height="80"
            loading="lazy"
          />
        </div>
        <div className={styles.authorInfo}>
          <h3 className={styles.authorName}>{review.author}</h3>
          <p className={styles.authorTitle}>{review.association}</p>
        </div>
      </div>

      <LucideQuoteIcon className={`
        ${styles.quoteIcon}
        ${dir === "rtl" ? styles.quoteIconRtl : styles.quoteIconLtr}
      `} />
    </article>
  );
}