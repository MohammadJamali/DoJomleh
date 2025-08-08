import { CustomButton, CustomButtonProps } from "../CustomButton/CustomButton";
import styles from "./SideBySideSplit.module.css";

export interface SideBySideSplitProps {
    rightToLeft?: boolean;
    image: string;
    title: string;
    description: string;
    buttons?: CustomButtonProps[];
    containerId?: string;
    imageAlt?: string;
    imageWidth?: number;
    imageHeight?: number;
    loading?: "eager" | "lazy";
}

export default function SideBySideSplit({
    rightToLeft = false,
    image,
    title,
    description,
    buttons,
    containerId,
    imageAlt = "",
    imageWidth = 600,
    imageHeight = 400,
    loading = "lazy"
}: SideBySideSplitProps) {
    const LeftSideContainer = (
        <div className={styles.leftSide} itemScope itemType="https://schema.org/ImageObject">
            <img
                src={image}
                alt={imageAlt || title} // Use provided alt text or fallback to title
                className={styles.image}
                width={imageWidth}
                height={imageHeight}
                loading={loading}
                decoding="async"
                itemProp="contentUrl"
            />
            {imageAlt && <meta itemProp="caption" content={imageAlt} />}
        </div>
    );

    const RightSideContainer = (
        <div className={styles.rightSide} itemScope itemType="https://schema.org/TextDigitalDocument">
            <h3 className={styles.title} itemProp="headline">{title}</h3>
            <p className={styles.description} itemProp="description">{description}</p>
            {buttons && buttons.length > 0 && (
                <div className={styles.buttons}>
                    {buttons.map((buttonProps, index) => (
                        <CustomButton 
                            key={index} 
                            {...buttonProps} 
                            aria-label={buttonProps.title || `Action button ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );

    return (
        <section 
            id={containerId} 
            className={`${styles.container}`}
            itemScope
            itemType="https://schema.org/VisualArtwork"
        >
            {rightToLeft ? (
                <>
                    {RightSideContainer}
                    {LeftSideContainer}
                </>
            ) : (
                <>
                    {LeftSideContainer}
                    {RightSideContainer}
                </>
            )}
        </section>
    );
}