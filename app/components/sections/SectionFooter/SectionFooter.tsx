import styles from "./SectionFooter.module.css";
import { CustomButton } from "../../core/CustomButton/CustomButton";
import { CompanyLogo } from "../../core/HeaderNavigation/components/CompanyLogo";
import { Dictionary } from "@/lib/dictionary-types";
import { LucideTwitterIcon } from "../../core/Icons/LucideTwitterIcon";
import { LucideYoutubeIcon } from "../../core/Icons/LucideYoutubeIcon";
import { LucideInstagramIcon } from "../../core/Icons/LucideInstagramIcon";
import { TablerBrandTelegramIcon } from "../../core/Icons/TablerBrandTelegramIcon";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function SectionFooter({ localization }: { localization: Dictionary }) {
    return (
        <footer className={styles.footerRootContainer} role="contentinfo">
            <div className={styles.footerDataContainer}>
                <div className={styles.contactUsContainer}>
                    <div className={styles.contactUsTitleContainer}>
                        <CompanyLogo localization={localization} />
                        <p itemProp="description">
                            {localization.footer.contact.description}
                        </p>
                    </div>
                    <div className={styles.contactUsButtonsContainer}>
                        <span className="visually-hidden">
                            {localization.footer.contact.stayConnected}
                        </span>
                        <div className={styles.contactUs} aria-label="Social media links">
                            <a
                                href="https://x.com/dojomleh"
                                aria-label="Twitter profile"
                                rel="noopener noreferrer"                            >
                                <LucideTwitterIcon />
                            </a>
                            <a
                                href="https://t.me/dojomleh"
                                aria-label="Telegram channel"
                                rel="noopener noreferrer"                            >
                                <TablerBrandTelegramIcon />
                            </a>
                            <a
                                href="https://www.youtube.com/@dojomleh"
                                aria-label="YouTube channel"
                                rel="noopener noreferrer"                            >
                                <LucideYoutubeIcon />
                            </a>
                            <a
                                href="https://www.instagram.com/dojomleh/"
                                aria-label="Instagram profile"
                                rel="noopener noreferrer"                            >
                                <LucideInstagramIcon />
                            </a>
                        </div>
                    </div>
                </div>

                <div className={styles.linksContainer}>
                    {localization.footer.buttons.map((button) => (
                        <CustomButton
                            key={button.name}
                            href={button.href}
                            title={button.name}
                            Icon={ArrowUpRightIcon}
                            iconStart={false}
                            spacebetween
                            aria-label={button.name}
                        />
                    ))}
                </div>
            </div>

            <span className={styles.footerDevider} aria-hidden="true"></span>

            <div className={styles.footerLinksContainer}>
                <p itemProp="copyrightNotice">
                    {localization.footer.copywrite}
                </p>
                <ul className={styles.footerLinks}>
                    <li>
                        <Link
                            href="/privacy-policy"
                            aria-label="Privacy policy"
                            itemProp="url">
                            {localization.footer.privacyPolicy}
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/terms-of-use"
                            aria-label="Terms of use"
                            itemProp="url">
                            {localization.footer.termsOfUse}
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/sitemap"
                            aria-label="Site map"
                            itemProp="url">
                            {localization.footer.siteMap}
                        </Link>
                    </li>
                </ul>
            </div>
        </footer>
    );
}