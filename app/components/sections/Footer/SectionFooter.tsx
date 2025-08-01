import styles from "./SectionFooter.module.css"
import { CustomButton } from "../../core/CustomButton/CustomButton"
import { CompanyLogo } from "../../core/HeaderNavigation/components/CompanyLogo"
import { Dictionary } from "@/lib/dictionary-types"
import { LucideTwitterIcon } from "../../core/Icons/LucideTwitterIcon"
import { LucideYoutubeIcon } from "../../core/Icons/LucideYoutubeIcon"
import { LucideInstagramIcon } from "../../core/Icons/LucideInstagramIcon"
import { TablerBrandTelegramIcon } from "../../core/Icons/TablerBrandTelegramIcon"
import { ArrowUpRightIcon } from "@heroicons/react/24/outline"

interface SectionFooterProp {
    localization: Dictionary
}

export default function SectionFooter({localization}: SectionFooterProp) {
    return <div className={styles.footerRootContainer}>
        <div className={styles.footerDataContainer}>
            <div className={styles.contactUsContainer}>
                <div className={styles.contactUsTitleContainer}>
                    <CompanyLogo localization={localization}/>
                    
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                </div>
                <div className={styles.contactUsButtonsContainer}>
                    <span>
                        Stay Connected:
                    </span>
                    <div className={styles.contactUs}>
                        <LucideTwitterIcon  />
                        <TablerBrandTelegramIcon />
                        <LucideYoutubeIcon />
                        <LucideInstagramIcon />
                    </div>
                </div>
            </div>
            <div className={styles.relatedLinksContainer}>
                <ul className={styles.relatedLinks}>
                    <li>About</li>
                    <li>History</li>
                    <li>Our People</li>
                    <li>Investors</li>
                </ul>
                <ul className={styles.relatedLinks}>
                    <li>Other</li>
                    <li>Manage Your Account</li>
                    <li>Walltst</li>
                </ul>
                <ul className={styles.relatedLinks}>
                    <li>Insights</li>
                    <li>Macro Insights</li>
                    <li>Investment Insights</li>
                    <li>Portfolio</li>
                </ul>
            </div>
            <div className={styles.linksContainer}>
                <CustomButton href="#" title="Download App" Icon={ArrowUpRightIcon} iconStart={false} />
                <CustomButton href="#" title="Invest In Us" Icon={ArrowUpRightIcon} iconStart={false}  />
                <CustomButton href="#" title="Media Center"  Icon={ArrowUpRightIcon} iconStart={false} />
            </div>
        </div>
        <span className={styles.footerDevider}></span>
        <div className={styles.footerLinksContainer}>
            <p>
                © 2025 SmartNeutrons All rights reserved.
            </p>
            <ul className={styles.footerLinks}>
                <li>Privacy Policy</li>
                <li>Terms of Use </li>
                <li>Site Map</li>
            </ul>
        </div>
    </div>
}