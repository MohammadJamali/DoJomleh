import styles from "./Card.module.css";
import Image from "next/image";
import Link from "next/link";
import { CSSProperties, SVGProps } from "react";
import { CustomButton, CustomButtonProps } from "../CustomButton/CustomButton";

interface Feature {
    Icon: React.ComponentType<SVGProps<SVGSVGElement>>;
    title: string;
}

interface CardProps {
    Icon?: React.ComponentType<SVGProps<SVGSVGElement>>;
    iconBackgroundColor?: number;
    iconColor?: number;
    iconWidth?: number;
    iconHeight?: number;
    iconPadding?: number;
    showFooterTexture?: boolean;
    backgroundColor?: number;
    bannerImage?: string;
    href?: string;
    profilePicture?: string;
    title: string;
    description: string;
    features?: Feature[];
    footerButton?: CustomButtonProps;
    date?: Date;
    width?: number,
    height?: number,
    minWidth?: number,
    minHeight?: number,
    maxWidth?: number,
    maxHeight?: number,
    headerHeight?: number,
    headerPadding?: number,
    headerContentPadding?: number,
}

export default function Card({
    Icon,
    iconColor,
    iconBackgroundColor,
    iconWidth = 32,
    iconHeight = 32,
    iconPadding = 4,
    showFooterTexture = false,
    backgroundColor = 0xffffff,
    bannerImage,
    href,
    profilePicture,
    title,
    description,
    features = [],
    footerButton,
    date,
    width,
    height,
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,
    headerHeight,
    headerPadding = 16,
    headerContentPadding,
}: CardProps) {
    headerHeight ??= bannerImage ? 200 : undefined;
    if (headerContentPadding === undefined) {
        if (headerPadding) {
            headerContentPadding ??= bannerImage ? 16 : 8;
        } else {
            headerContentPadding ??= 24;
        }
    }

    const cardContent = (
        <>
            {showFooterTexture && (
                <>
                    <div className={styles.halfCircle} aria-hidden="true" />
                    <div className={styles.halfCircleTop} aria-hidden="true" />
                </>
            )}

            <div className={styles.card}>
                <div style={{
                    padding: headerPadding,
                    paddingBottom: 0,
                }}>
                    <div style={{
                        backgroundImage: `url(${bannerImage})`,
                        borderTopRightRadius: 16,
                        borderTopLeftRadius: 16,
                        borderBottomLeftRadius: headerPadding ? 16 : 0,
                        borderBottomRightRadius: headerPadding ? 16 : 0,
                        height: headerHeight,
                        padding: headerContentPadding,
                        paddingBottom: 0,
                    }}>
                        <div className={styles.headerContainer}>
                            {profilePicture ? (
                                <Image
                                    style={{
                                        backgroundColor: iconBackgroundColor !== undefined
                                        ? iconBackgroundColor.toString(16)
                                        : undefined
                                    }}
                                    src={profilePicture}
                                    alt="Profile"
                                    width={40}
                                    height={40}
                                    className={styles.avatar}
                                />
                            ) : Icon ? (
                                <Icon
                                    style={{ 
                                        backgroundColor: iconBackgroundColor !== undefined 
                                        ? iconBackgroundColor.toString(16)
                                        : undefined ,
                                        color: iconColor 
                                        ? iconColor.toString(16)
                                        : undefined,
                                        width: iconWidth,
                                        height: iconHeight,
                                        padding: iconPadding,
                                    }}
                                    className={styles.icon} />
                            ) : null}

                            {date && (
                                <div className={styles.time}>
                                    <p className={styles.age}>
                                        {date.toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: '2-digit',
                                        })}
                                    </p>
                                    <p className={styles.year}>{date.getFullYear()}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className={styles.body}>
                    <h2 className={styles.cardTitle}>{title}</h2>
                    <p className={styles.cardLabel}>{description}</p>

                    {features.length > 0 && (
                        <ul className={styles.features}>
                            {features.map((feature, i) => (
                                <li key={i} className={styles.featureItem}>
                                    <feature.Icon className={styles.featureIcon} />
                                    <span>{feature.title}</span>
                                </li>
                            ))}
                        </ul>
                    )}

                    {footerButton && (
                        <div className={styles.footer}>
                            <CustomButton
                                Icon={footerButton.Icon}
                                title={footerButton.title}
                                label={footerButton.label}
                                iconStart
                            />
                        </div>
                    )}
                </div>
            </div>
        </>
    );

    let cardContainerStyle: CSSProperties = {
        backgroundColor: `#${backgroundColor.toString(16)}`,
        width: width,
        height: height,
        minWidth: minWidth,
        minHeight: minHeight,
        maxWidth: maxWidth,
        maxHeight: maxHeight
    }

    return href ? (
        <Link
            href={href}
            aria-label={title}
            className={`${styles.cardContainer} ${styles.activeCard}`}
            style={cardContainerStyle}
        >
            {cardContent}
        </Link>
    ) : (
        <div
            aria-label={title}
            className={styles.cardContainer}
            style={cardContainerStyle}
        >
            {cardContent}
        </div>
    );
}