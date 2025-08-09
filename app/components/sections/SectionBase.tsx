import { JSX } from "react";

interface SectionBaseProps {
  title: string;
  highlightedTitle?: string;
  description: string;
  fullHeight?: boolean;
  isStriped?: boolean;
  children?: React.ReactNode;
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  sectionId?: string;
  ariaLabel?: string;
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
}: SectionBaseProps) {
  const backgroundColor = isStriped ? "#f7f7f9" : "#fff";
  const HeadingTag = `h${headingLevel}` as keyof JSX.IntrinsicElements;

  return (
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
    </section>
  );
}
