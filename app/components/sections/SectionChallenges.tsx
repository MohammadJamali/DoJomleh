import { getHeroIcon } from "../core/Icons/IconAsString";
import SectionBase from "./SectionBase";
import PresentationCard from "../core/PresentationCard";
import { Dictionary } from "@/lib/dictionary-types";

export default function SectionChallenges({ localization }: { localization: Dictionary }) {
  return (
    <SectionBase
      sectionId="challenges"
      title={localization.challenges.title}
      description={localization.challenges.description}
      isStriped
    >
      <div
        role="list"
        className="
          grid grid-cols-2 gap-8 w-full max-w-7xl mx-auto px-8
          md:grid-cols-2 sm:grid-cols-1 sm:px-4 px-7
        "
      >
        {localization.challenges.categories.map((val) => (
          <PresentationCard
            key={val.title}
            Icon={getHeroIcon(val.icon)}
            title={val.title}
            description={val.description}
            linkText={localization.challenges.cta}
            href={val.href || undefined}
            iconColor={val.iconColor || undefined}
            iconBgColor={val.iconBgColor || undefined}
          />
        ))}
      </div>
    </SectionBase>
  );
}
