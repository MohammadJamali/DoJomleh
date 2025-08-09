"use client"

import { useEffect, useState } from "react";
import ReviewCard from "../../core/ReviewCard/ReviewCard";
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
        dir={localization.rtl ? "rtl": "ltr"}
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

// "use client";

// import { useEffect, useState } from "react";
// import ReviewCard from "../../core/ReviewCard/ReviewCard";
// import { Dictionary } from "@/lib/dictionary-types";

// export default function ReviewCarousel({ localization }: { localization: Dictionary }) {
//   const reviews = localization.callToAction.customerStories.stories;

//   const [activeCards, setActiveCards] = useState([
//     { id: 0, isVisible: true }, // start with first review visible
//   ]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       // fade out current card
//       setActiveCards((cards) =>
//         cards.map((c, i) => (i === 0 ? { ...c, isVisible: false } : c))
//       );

//       // after fade out duration, add the new card
//       setTimeout(() => {
//         setActiveCards((cards) => {
//           const currentId = cards[0].id;
//           const nextId = (currentId + 1) % reviews.length;
//           return [
//             { id: nextId, isVisible: true },
//             ...cards, // keep old one temporarily for fade out
//           ];
//         });
//       }, 600); // match animation duration

//       // remove old card after animation completes fully
//       setTimeout(() => {
//         setActiveCards((cards) => cards.filter((_, i) => i === 0));
//       }, 1200);
//     }, 5000);

//     return () => clearInterval(interval);
//   }, [reviews.length]);

//   return (
//     <div className="relative max-w-[600px] mx-auto">
//       {activeCards.map((card, index) => (
//         <div key={`${card.id}-${index}`} className="absolute inset-0">
//           <ReviewCard
//             label={localization.callToAction.customerStories.customerStory}
//             dir={localization.rtl ? "rtl" : "ltr"}
//             review={reviews[card.id]}
//             isVisible={card.isVisible}
//           />
//         </div>
//       ))}
//     </div>
//   );
// }

