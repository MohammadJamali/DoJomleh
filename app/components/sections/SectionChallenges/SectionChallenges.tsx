import { getHeroIcon } from "../../core/Icons/IconAsString";
import SectionBase from "../SectionBase";
import PresentationCard from "./PresentationCard/PresentationCard";
import styles from "./SectionChallenges.module.css";
import { Dictionary } from "@/lib/dictionary-types";

export default function SectionChallenges({ localization }: { localization: Dictionary }) {
    return <SectionBase
        sectionId="challenges"
        title={localization.challenges.title}
        description={localization.challenges.description}
        isStriped>
        <div className={styles.grid} role="list">{
            localization.challenges.categories.map((val) => (
                <PresentationCard
                    key={val.title}
                    Icon={getHeroIcon(val.icon)}
                    title={val.title}
                    description={val.description}
                    linkText={localization.challenges.cta}
                    href={val.href || undefined}
                    iconColor={val.iconColor || undefined}
                    iconBgColor={val.iconBgColor || undefined}/>
            ))
        }</div>
    </SectionBase>;
}