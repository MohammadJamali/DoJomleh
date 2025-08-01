"use client"

import { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard/ReviewCard";
import styles from "./SectionReviewCarousel.module.css";
import { Dictionary } from "@/lib/dictionary-types";

export default function ReviewCarousel({ localization }: { localization: Dictionary }) {
  let reviews = localization.callToAction.customerStories.stories;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [currentReview, setCurrentReview] = useState(reviews[0]);

  useEffect(() => {
    const timer = setInterval(() => {
      // Start exit animation
      setIsVisible(false);

      // After exit animation completes, switch to next review
      const switchTimer = setTimeout(() => {
        const nextIndex = (currentIndex + 1) % reviews.length;
        setCurrentIndex(nextIndex);
        setCurrentReview(reviews[nextIndex]);
        setIsVisible(true);
      }, 600); // Matches exit animation duration

      return () => clearTimeout(switchTimer);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <div className={styles.carouselContainer}>
      <ReviewCard
        key={currentIndex}
        label={localization.callToAction.customerStories.customerStory}
        dir={localization.lang === "fa" ? "rtl": "ltr"}
        review={currentReview}
        isVisible={isVisible}
        onAnimationEnd={() => {
          const nextIndex = (currentIndex + 1) % reviews.length;
          setCurrentIndex(nextIndex);
          setCurrentReview(reviews[nextIndex]);
          setIsVisible(true);
        }}
      />
    </div>
  );
}