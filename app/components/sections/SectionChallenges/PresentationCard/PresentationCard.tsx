import { SVGProps } from "react";
import styles from "./PresentationCard.module.css";
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
        <article className={styles.container} aria-labelledby={`card-${title.replace(/\s+/g, '-')}`}>
            <div className={styles.headerContainer}>
                <Icon
                    className={styles.icon}
                    style={{
                        color: iconColor ?? undefined,
                        backgroundColor: iconBgColor ?? undefined,
                    }}
                    aria-hidden="true"
                />
                <h3 id={`card-${title.replace(/\s+/g, '-')}`} className={styles.title}>
                    {title}
                </h3>
                <p className={styles.description}>{description}</p>
            </div>
            {
                href &&
                <Link href={href} passHref>
                    <CustomButton
                        iconStart={false}
                        title={linkText}
                        href={href}
                        Icon={ArrowUpRightIcon}
                        aria-label={`Learn more about ${title}`}
                    />
                </Link>
            }
        </article>
    );
}