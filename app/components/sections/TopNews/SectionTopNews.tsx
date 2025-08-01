import { ArrowUpRightIcon } from "@heroicons/react/16/solid";
import { CustomButton } from "../../core/CustomButton/CustomButton";
import styles from "./SectionTopNews.module.css"

interface SectionTopNewsProps {
    title: string;
    description: string;
    linkText: string;
    href: string;
    image: string;
}

export default function SectionTopNews({
    title,
    description,
    linkText,
    href,
    image,
}: SectionTopNewsProps) {
    return <div className={styles.container}>
        <img src={image} className={styles.image}/>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        <CustomButton
            iconStart={false}
            title={linkText}
            href={href}
            color={0xfff}
            backgroundColor={0x7478F8}
            iconBackgroundColor={0xfff}
            Icon={ArrowUpRightIcon} />
    </div>
}