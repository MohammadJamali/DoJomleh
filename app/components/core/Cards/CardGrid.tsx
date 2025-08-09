import { ReactNode, CSSProperties } from "react";

interface CardGridProps {
  children?: ReactNode;
  ariaLabel?: string;
  minColumnWidth?: string | number;
  maxWidth?: string | number;
  gap?: string | number;
}

export default function CardGrid({
  children,
  ariaLabel = "Card grid",
  minColumnWidth = "200px",
  maxWidth = "1200px",
  gap = "2rem",
}: CardGridProps) {
  // Convert numeric values to px strings if needed
  const minColWidth =
    typeof minColumnWidth === "number" ? `${minColumnWidth}px` : minColumnWidth;
  const maxW = typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth;
  const gapVal = typeof gap === "number" ? `${gap}px` : gap;

  // Inline style for CSS grid with auto-fit and minmax using minColWidth
  const style: CSSProperties = {
    display: "grid",
    gridTemplateColumns: `repeat(auto-fit, minmax(${minColWidth}, 1fr))`,
    gap: gapVal,
    width: "100%",
    maxWidth: maxW,
    marginLeft: "auto",
    marginRight: "auto",
    paddingLeft: gapVal,
    paddingRight: gapVal,
    boxSizing: "border-box",
    justifyItems: "center",
    alignItems: "start",
  };

  return (
    <section aria-label={ariaLabel} role="grid" style={style} className="print:grid-cols-2 print:gap-4 print:max-w-full print:p-0">
      {children}
    </section>
  );
}
