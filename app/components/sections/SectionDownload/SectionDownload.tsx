import { CustomButton } from "../../core/CustomButton/CustomButton";
import styles from "./SectionDownload.module.css";
import Head from "next/head";
import { FaApple, FaAndroid } from "react-icons/fa";

interface SectionDownloadProps {
    title: string;
    description: string;
    downloadiOS: string;
    downloadAndroid: string;
    hrefIOS: string; // Separate href for iOS
    hrefAndroid: string; // Separate href for Android
    image: string;
    imageAlt: string;
}

export default function SectionDownload({
    title,
    description,
    downloadiOS,
    downloadAndroid,
    hrefIOS,
    hrefAndroid,
    image,
    imageAlt,
}: SectionDownloadProps) {
    return (
        <section 
            id={"download"}
            className={styles.container}
            aria-labelledby={`download-heading`}
        >
            {/* SEO Metadata for this section */}
            <Head>
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content={image} />
            </Head>

            {/* Optimized image with alt text */}
            <img 
                src={image} 
                className={styles.image} 
                alt={imageAlt}
                loading="lazy" // Lazy loading for better performance
                width="500" // Explicit dimensions help with CLS
                height="300"
            />

            {/* Semantic heading with ID for accessibility */}
            <h3 id={`download-heading`} className={styles.title}>
                {title}
            </h3>

            {/* Descriptive paragraph */}
            <p className={styles.description}>{description}</p>

            {/* Download buttons with proper hrefs */}
            <div className={styles.download}>
                <CustomButton
                    iconStart={false}
                    title={downloadiOS}
                    href={hrefIOS}
                    color={0xfff}
                    backgroundColor={0x7478F8}
                    iconBackgroundColor={0xfff}
                    Icon={FaApple}
                    aria-label={`Download ${title} for iOS`}
                />

                <CustomButton
                    iconStart={false}
                    title={downloadAndroid}
                    href={hrefAndroid}
                    color={0xfff}
                    backgroundColor={0x7478F8}
                    iconBackgroundColor={0xfff}
                    Icon={FaAndroid}
                    aria-label={`Download ${title} for Android`}
                />
            </div>
        </section>
    );
}