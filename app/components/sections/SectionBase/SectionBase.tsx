
import styles from './SectionBase.module.css'

interface SectionBaseProps {
    title: string;
    fullHeight?: boolean;
    highlightedTitle?: string;
    description: string;
    isStriped?: boolean;
    children?: React.ReactNode;
}

export default function SectionBase({
    title,
    highlightedTitle,
    description,
    isStriped = false,
    fullHeight = false,
    children,
}: SectionBaseProps) {
    let backgroundColor = isStriped ? 0xf7f7f9 : 0xfff;

    return (<div
        className={styles.container}
        style={{
            backgroundColor: `#${backgroundColor.toString(16)}`,
            height: fullHeight ? "100vh" : undefined
        }}>
        <div className={styles.header}>
            <h1 className={styles.slogan}>{title}
                {highlightedTitle && <>
                    <br />
                    <span className={styles.purple}>{highlightedTitle}</span>
                </>}
            </h1>

            <p className={styles.description}>
                {description}
            </p>
        </div>

        {children && <div className={styles.innerContent}>{children}</div>}
    </div>);
}