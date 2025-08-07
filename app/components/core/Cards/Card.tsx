// import styles from "./Card.module.css";
// import Image from "next/image";
// import Link from "next/link";
// import { CSSProperties, SVGProps } from "react";
// import { CustomButton, CustomButtonProps } from "../CustomButton/CustomButton";

// export interface Feature {
//     Icon: React.ComponentType<SVGProps<SVGSVGElement>>;
//     title: string;
// }

// export interface CardProps {
//     Icon?: React.ComponentType<SVGProps<SVGSVGElement>>;
//     iconBackgroundColor?: number;
//     iconColor?: number;
//     iconWidth?: number;
//     iconHeight?: number;
//     iconPadding?: number;
//     showFooterTexture?: boolean;
//     backgroundColor?: number;
//     bannerImage?: string;
//     href?: string;
//     profilePicture?: string;
//     title: string;
//     description: string;
//     features?: Feature[];
//     footerButton?: CustomButtonProps;
//     date?: Date;
//     width?: number,
//     height?: number,
//     minWidth?: number,
//     minHeight?: number,
//     maxWidth?: number,
//     maxHeight?: number,
//     headerHeight?: number,
//     headerPadding?: number,
//     headerContentPadding?: number,
// }

// export default function Card({
//     Icon,
//     iconColor,
//     iconBackgroundColor,
//     iconWidth = 32,
//     iconHeight = 32,
//     iconPadding = 4,
//     showFooterTexture = false,
//     backgroundColor = 0xffffff,
//     bannerImage,
//     href,
//     profilePicture,
//     title,
//     description,
//     features = [],
//     footerButton,
//     date,
//     width,
//     height,
//     minWidth,
//     minHeight,
//     maxWidth,
//     maxHeight,
//     headerHeight,
//     headerPadding = 16,
//     headerContentPadding,
// }: CardProps) {
//     headerHeight ??= bannerImage ? 200 : undefined;
//     if (headerContentPadding === undefined) {
//         if (headerPadding) {
//             headerContentPadding ??= bannerImage ? 16 : 8;
//         } else {
//             headerContentPadding ??= 24;
//         }
//     }

//     const cardContent = (
//         <>
//             {showFooterTexture && (
//                 <>
//                     <div className={styles.halfCircle} aria-hidden="true" />
//                     <div className={styles.halfCircleTop} aria-hidden="true" />
//                 </>
//             )}

//             <div className={styles.card}>
//                 <div style={{
//                     padding: headerPadding,
//                     paddingBottom: 0,
//                 }}>
//                     <div style={{
//                         backgroundImage: `url(${bannerImage})`,
//                         backgroundRepeat: "no-repeat",
//                         backgroundSize: "cover",
//                         borderTopRightRadius: 16,
//                         borderTopLeftRadius: 16,
//                         borderBottomLeftRadius: headerPadding ? 16 : 0,
//                         borderBottomRightRadius: headerPadding ? 16 : 0,
//                         height: headerHeight,
//                         padding: headerContentPadding,
//                         paddingBottom: 0,
//                     }}>
//                         <div className={styles.headerContainer}>
//                             {profilePicture ? (
//                                 <Image
//                                     style={{
//                                         backgroundColor: iconBackgroundColor !== undefined
//                                         ? iconBackgroundColor.toString(16)
//                                         : undefined
//                                     }}
//                                     src={profilePicture}
//                                     alt="Profile"
//                                     width={40}
//                                     height={40}
//                                     className={styles.avatar}
//                                 />
//                             ) : Icon ? (
//                                 <Icon
//                                     style={{ 
//                                         backgroundColor: iconBackgroundColor !== undefined 
//                                         ? iconBackgroundColor.toString(16)
//                                         : undefined ,
//                                         color: iconColor 
//                                         ? iconColor.toString(16)
//                                         : undefined,
//                                         width: iconWidth,
//                                         height: iconHeight,
//                                         padding: iconPadding,
//                                     }}
//                                     className={styles.icon} />
//                             ) : null}

//                             {date && (
//                                 <div className={styles.time}>
//                                     <p className={styles.age}>
//                                         {date.toLocaleDateString('en-US', {
//                                             month: 'short',
//                                             day: '2-digit',
//                                         })}
//                                     </p>
//                                     <p className={styles.year}>{date.getFullYear()}</p>
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//                 <div className={styles.body}>
//                     <h2 className={styles.cardTitle}>{title}</h2>
//                     <p className={styles.cardLabel}>{description}</p>

//                     {features.length > 0 && (
//                         <ul className={styles.features}>
//                             {features.map((feature, i) => (
//                                 <li key={i} className={styles.featureItem}>
//                                     <feature.Icon className={styles.featureIcon} />
//                                     <span>{feature.title}</span>
//                                 </li>
//                             ))}
//                         </ul>
//                     )}

//                     {footerButton && (
//                         <div className={styles.footer}>
//                             <CustomButton
//                                 Icon={footerButton.Icon}
//                                 title={footerButton.title}
//                                 label={footerButton.label}
//                                 iconStart
//                             />
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </>
//     );

//     let cardContainerStyle: CSSProperties = {
//         backgroundColor: `#${backgroundColor.toString(16)}`,
//         width: width,
//         height: height,
//         minWidth: minWidth,
//         minHeight: minHeight,
//         maxWidth: maxWidth,
//         maxHeight: maxHeight
//     }

//     return href ? (
//         <Link
//             href={href}
//             aria-label={title}
//             className={`${styles.cardContainer} ${styles.activeCard}`}
//             style={cardContainerStyle}
//         >
//             {cardContent}
//         </Link>
//     ) : (
//         <div
//             aria-label={title}
//             className={styles.cardContainer}
//             style={cardContainerStyle}
//         >
//             {cardContent}
//         </div>
//     );
// }

import styles from "./Card.module.css";
import Image from "next/image";
import Link from "next/link";
import { CSSProperties, SVGProps } from "react";
import { CustomButton, CustomButtonProps } from "../CustomButton/CustomButton";

export interface Feature {
    Icon: React.ComponentType<SVGProps<SVGSVGElement>>;
    title: string;
    description?: string; // Added for better feature context
}

export interface CardProps {
    Icon?: React.ComponentType<SVGProps<SVGSVGElement>>;
    iconBackgroundColor?: string; // Changed from number to string for direct hex/rgb values
    iconColor?: string;
    iconWidth?: number;
    iconHeight?: number;
    iconPadding?: number;
    showFooterTexture?: boolean;
    backgroundColor?: string;
    bannerImage?: string;
    href?: string;
    profilePicture?: string;
    title: string;
    description: string;
    features?: Feature[];
    footerButton?: CustomButtonProps;
    date?: Date;
    width?: number | string;
    height?: number | string;
    minWidth?: number | string;
    minHeight?: number | string;
    maxWidth?: number | string;
    maxHeight?: number | string;
    headerHeight?: number;
    headerPadding?: number;
    headerContentPadding?: number;
    loading?: "eager" | "lazy"; // Added for image loading optimization
    priority?: boolean; // Added for critical image loading
}

export default function Card({
    Icon,
    iconColor,
    iconBackgroundColor,
    iconWidth = 32,
    iconHeight = 32,
    iconPadding = 4,
    showFooterTexture = false,
    backgroundColor = "#ffffff",
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
    loading = "lazy",
    priority = false,
}: CardProps) {
    headerHeight ??= bannerImage ? 200 : undefined;
    headerContentPadding ??= bannerImage ? (headerPadding ? 16 : 8) : 24;

    const cardContent = (
        <article className={styles.card} aria-labelledby={`${title.replace(/\s+/g, '-')}-title`}>
            {showFooterTexture && (
                <>
                    <div className={styles.halfCircle} aria-hidden="true" />
                    <div className={styles.halfCircleTop} aria-hidden="true" />
                </>
            )}

            <div className={styles.cardContentWrapper}>
                <div style={{ padding: `${headerPadding}px ${headerPadding}px 0` }}>
                    <div 
                        className={styles.cardHeader}
                        style={{
                            backgroundImage: bannerImage ? `url(${bannerImage})` : undefined,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                            borderTopRightRadius: 16,
                            borderTopLeftRadius: 16,
                            borderBottomLeftRadius: headerPadding ? 16 : 0,
                            borderBottomRightRadius: headerPadding ? 16 : 0,
                            height: headerHeight,
                            padding: headerContentPadding,
                            paddingBottom: 0,
                        }}
                        role={bannerImage ? "img" : undefined}
                        aria-label={bannerImage ? `Banner for ${title}` : undefined}
                    >
                        <div className={styles.headerContainer}>
                            {profilePicture ? (
                                <Image
                                    src={profilePicture}
                                    alt={`Profile for ${title}`}
                                    width={40}
                                    height={40}
                                    className={styles.avatar}
                                    loading={loading}
                                    priority={priority}
                                    style={{
                                        backgroundColor: iconBackgroundColor,
                                    }}
                                />
                            ) : Icon ? (
                                <Icon
                                    className={styles.icon}
                                    style={{ 
                                        backgroundColor: iconBackgroundColor ?? undefined ,
                                        color: iconColor ?? undefined,
                                        width: iconWidth,
                                        height: iconHeight,
                                        padding: iconPadding,
                                    }}
                                    aria-hidden="true"
                                />
                            ) : null}

                            {date && (
                                <time 
                                    dateTime={date.toISOString()}
                                    className={styles.time}
                                    style={{
                                        backgroundColor: bannerImage ? "#f7f7f9bb" : "#f7f7f9"
                                    }}
                                >
                                    <span className={styles.age}>
                                        {date.toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: '2-digit',
                                        })}
                                    </span>
                                    <span className={styles.year}>{date.getFullYear()}</span>
                                </time>
                            )}
                        </div>
                    </div>
                </div>

                <div className={styles.body}>
                    <h2 id={`${title.replace(/\s+/g, '-')}-title`} className={styles.cardTitle}>
                        {title}
                    </h2>
                    <p className={styles.cardLabel}>{description}</p>

                    {features.length > 0 && (
                        <ul className={styles.features}>
                            {features.map((feature, i) => (
                                <li key={i} className={styles.featureItem}>
                                    <feature.Icon 
                                        className={styles.featureIcon} 
                                        aria-hidden="true"
                                    />
                                    <div>
                                        <strong>{feature.title}</strong>
                                        {feature.description && (
                                            <p className={styles.featureDescription}>
                                                {feature.description}
                                            </p>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}

                    {footerButton && (
                        <footer className={styles.footer}>
                            <CustomButton
                                {...footerButton}
                                iconStart
                                aria-label={`${footerButton.title || footerButton.label} for ${title}`}
                            />
                        </footer>
                    )}
                </div>
            </div>
        </article>
    );

    const cardContainerStyle: CSSProperties = {
        backgroundColor,
        width,
        height,
        minWidth,
        minHeight,
        maxWidth,
        maxHeight
    };

    return href ? (
        <Link
            href={href}
            aria-label={`View details for ${title}`}
            className={`${styles.cardContainer} ${styles.activeCard}`}
            style={cardContainerStyle}
            passHref
        >
            {cardContent}
        </Link>
    ) : (
        <div
            className={styles.cardContainer}
            style={cardContainerStyle}
            role="group"
            aria-labelledby={`${title.replace(/\s+/g, '-')}-title`}
        >
            {cardContent}
        </div>
    );
}