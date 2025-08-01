import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import SectionBase from "../SectionBase/SectionBase";
import PresentationCard from "./PresentationCard/PresentationCard";
import styles from "./SectionWhoWeServe.module.css"

export default function SectionWhoWeServe() {
    return <SectionBase
        title={"Who We"}
        highlightedTitle={"Serve"}
        description={"We partner with visionary individuals, innovative companies."}
        isStriped>
        <div className={styles.grid}>
            <PresentationCard
                Icon={ArrowUpRightIcon}
                title={"Lorem ipsum is placeholder"}
                description={"Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups."}
                linkText={"Learn more"}
                href={"#"} />
            <PresentationCard
                Icon={ArrowUpRightIcon}
                title={"Lorem ipsum is placeholder"}
                description={"Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups."}
                linkText={"Learn more"}
                href={"#"} />
            <PresentationCard
                Icon={ArrowUpRightIcon}
                title={"Lorem ipsum is placeholder"}
                description={"Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups."}
                linkText={"Learn more"}
                href={"#"} />
            <PresentationCard
                Icon={ArrowUpRightIcon}
                title={"Lorem ipsum is placeholder"}
                description={"Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups."}
                linkText={"Learn more"}
                href={"#"} />
        </div>
    </SectionBase>
}