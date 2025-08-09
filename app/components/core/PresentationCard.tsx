import { SVGProps } from "react";
import { CustomButton } from "@/app/components/core/CustomButton/CustomButton";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

interface PresentationCardProps {
  Icon: React.ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  linkText: string;
  href?: string;
  iconColor?: string | null;
  iconBgColor?: string | null;
}

export default function PresentationCard({
  Icon,
  title,
  description,
  linkText,
  href,
  iconColor = "#7478f8",
  iconBgColor = "#f1f1f8",
}: PresentationCardProps) {
  return (
    <article
      aria-labelledby={`card-${title.replace(/\s+/g, "-")}`}
      className="
        bg-white rounded-2xl flex flex-col items-center gap-8 p-6 justify-between h-full
        transition-transform transition-shadow duration-300 ease-in-out
        hover:-translate-y-1 hover:shadow-lg
        sm:p-6
      "
    >
      <div className="flex flex-col items-center gap-4 text-center">
        <Icon
          className="w-16 h-16 p-4 rounded-[42px]"
          style={{
            color: iconColor ?? undefined,
            backgroundColor: iconBgColor ?? undefined,
          }}
          aria-hidden="true"
        />
        <h3
          id={`card-${title.replace(/\s+/g, "-")}`}
          className="text-xl sm:text-lg font-semibold text-gray-900 whitespace-pre-wrap my-2"
        >
          {title}
        </h3>
        <p className="text-gray-500 text-base sm:text-sm max-w-xl whitespace-pre-wrap leading-relaxed">
          {description}
        </p>
      </div>
      {href && (
        <Link href={href} passHref>
          <CustomButton
            iconStart={false}
            title={linkText}
            href={href}
            Icon={ArrowUpRightIcon}
            aria-label={`Learn more about ${title}`}
          />
        </Link>
      )}
    </article>
  );
}
