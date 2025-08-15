import { JSX } from "react";
import FinisherHeader from "../../core/FinisherHeader";

interface SectionBaseProps {
  title: string;
  highlightedTitle?: string;
  backgroundColor?: string;
  description: string;
  fullHeight?: boolean;
  isStriped?: boolean;
  children?: React.ReactNode;
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  sectionId?: string;
  ariaLabel?: string;
  animated?: boolean;
}

export default function SectionBase({
  title,
  highlightedTitle,
  description,
  fullHeight = false,
  isStriped = false,
  children,
  headingLevel = 2,
  sectionId,
  ariaLabel,
  animated,
  backgroundColor,
}: SectionBaseProps) {
  backgroundColor = isStriped ? "#f7f7f9" : backgroundColor;
  const HeadingTag = `h${headingLevel}` as keyof JSX.IntrinsicElements;

  const sectionTag =
    <section
      id={sectionId}
      aria-label={ariaLabel || title}
      aria-labelledby={`${title.replace(/\s+/g, "-").toLowerCase()}-heading`}
      style={{
        backgroundColor,
        height: fullHeight ? "100vh" : undefined,
      }}
      className="pt-[10vh] pb-24"
    >
      <header className="flex flex-col items-center gap-8">
        <HeadingTag
          id={`${title.replace(/\s+/g, "-").toLowerCase()}-heading`}
          className="text-center text-[3rem] max-w-[850px] whitespace-pre-wrap"
        >
          {title}
          {highlightedTitle && (
            <>
              <br />
              <span className="text-[#6C63FF] font-bold">{highlightedTitle}</span>
            </>
          )}
        </HeadingTag>

        <p className="text-center text-[#737377] text-base max-w-[600px] whitespace-pre-wrap">
          {description}
        </p>
      </header>

      {children && <div className="mt-8">{children}</div>}

    </section>;

  if (animated) return (<FinisherHeader
    options={{
      count: 6,
      size: { min: 1100, max: 1300, pulse: 0 },
      colors: { background: "#9138e5", particles: ["#6bd6ff", "#ffcb57", "#ff333d"] },
      blending: "overlay",
      skew: -2,
      shapes: ["c"],
    }}>
    {sectionTag}
  </FinisherHeader>);

  return (sectionTag);
}
