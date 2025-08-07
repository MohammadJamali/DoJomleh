import { JSX } from 'react';
import styles from './SectionBase.module.css';

interface SectionBaseProps {
    title: string;
    highlightedTitle?: string;
    description: string;
    fullHeight?: boolean;
    isStriped?: boolean;
    children?: React.ReactNode;
    headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
    sectionId?: string;
    ariaLabel?: string;
}

export default function SectionBase({
    title,
    highlightedTitle,
    description,
    fullHeight = false,
    isStriped = false,
    children,
    headingLevel = 2, // Default to <h2> for better hierarchy
    sectionId,
    ariaLabel,
}: SectionBaseProps) {
    const backgroundColor = isStriped ? '#f7f7f9' : '#ffffff';
    const HeadingTag = `h${headingLevel}` as keyof JSX.IntrinsicElements;

    return (
        <section
            id={sectionId}
            aria-label={ariaLabel || title}
            className={styles.container}
            style={{
                backgroundColor,
                height: fullHeight ? '100vh' : undefined,
            }}
            aria-labelledby={`${title.replace(/\s+/g, '-').toLowerCase()}-heading`}
        >
            <header className={styles.header}>
                <HeadingTag
                    className={styles.slogan}
                    id={`${title.replace(/\s+/g, '-').toLowerCase()}-heading`}
                >
                    {title}
                    {highlightedTitle && (
                        <>
                            <br />
                            <span className={styles.purple}>{highlightedTitle}</span>
                        </>
                    )}
                </HeadingTag>

                <p className={styles.description}>{description}</p>
            </header>

            {children && <div className={styles.innerContent}>{children}</div>}
        </section>
    );
}
