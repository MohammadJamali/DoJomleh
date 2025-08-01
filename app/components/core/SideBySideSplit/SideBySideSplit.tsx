import { CustomButton, CustomButtonProps } from "../CustomButton/CustomButton";
import styles from "./SideBySideSplit.module.css"

export interface SideBySideSplitProps {
    rightToLeft?: boolean;
    image: string;
    title: string;
    description: string;
    buttons?: CustomButtonProps[];
}

export default function SideBySideSplit({
    rightToLeft = false,
    image,
    title,
    description,
    buttons
}: SideBySideSplitProps) {
    let leftSideContainer = <div className={styles.leftSide}>
        <img src={image} alt={title} className={styles.image} />
    </div>
    let rightSideContainer = <div className={styles.rightSide}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        {buttons && buttons.length > 0 && (
            <div className={styles.buttons}>
                {buttons.map((buttonProps, index) => (
                    <CustomButton key={index} {...buttonProps} />
                ))}
            </div>
        )}
    </div>

    return (
        <div className={`${styles.container}`}>
            {rightToLeft ? (
                <>
                    {rightSideContainer}
                    {leftSideContainer}
                </>
            ) : (
                <>
                    {leftSideContainer}
                    {rightSideContainer}
                </>
            )}
        </div>
    );
}