import { SVGProps } from "react";
import styles from "./PresentationCard.module.css";
import { CustomButton } from "@/app/components/core/CustomButton/CustomButton";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";

interface PresentationCardProps {
    Icon: React.ComponentType<SVGProps<SVGSVGElement>>;
    title: string;
    description: string;
    linkText: string;
    href: string;
}

export default function PresentationCard({
    Icon,
    title,
    description,
    linkText,
    href,
}: PresentationCardProps) {
    return <div className={`${styles.container}`}>
        <div className={styles.headerContainer}>
            <Icon className={styles.icon} />
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.description}>{description}</p>
        </div>
        <CustomButton
            iconStart={false}
            title={linkText}
            href={href}
            Icon={ArrowUpRightIcon} />
    </div>
}