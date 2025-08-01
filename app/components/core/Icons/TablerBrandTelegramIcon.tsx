import * as React from "react";

// By: tabler
// See: https://v0.app/icon/tabler/brand-telegram
// Example: <IconTablerBrandTelegram width="24px" height="24px" style={{color: "#000000"}} />

export const TablerBrandTelegramIcon = ({
  height = "1em",
  strokeWidth = "2",
  fill = "none",
  focusable = "false",
  ...props
}: Omit<React.SVGProps<SVGSVGElement>, "children">) => (
  <svg
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    height={height}
    focusable={focusable}
    {...props}
  >
    <path
      fill={fill}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
      d="m15 10l-4 4l6 6l4-16l-18 7l4 2l2 6l3-4"
    />
  </svg>
);
