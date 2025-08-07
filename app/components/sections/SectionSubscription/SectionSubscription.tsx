import { BellIcon, InboxArrowDownIcon } from "@heroicons/react/24/outline";
import styles from "./SectionSubscription.module.css";
import { Dictionary } from "@/lib/dictionary-types";

export default function SectionSubscription({ localization }: { localization: Dictionary }) {
    return <section
        id='subscription'
        className={styles.container}
        aria-labelledby="subscription-heading"
        dir={localization.rtl ? "rtl" : "ltr"}>
        <div
            className={styles.tooltip}
            role="status"
            aria-label={localization.subscription.title}>
            <InboxArrowDownIcon
                className={styles.tooltipIcon}
                aria-hidden="true" />
            <span>{localization.subscription.title}</span>
        </div>

        <h2
            id="subscription-heading"
            className={styles.title}>
            {localization.subscription.description}
        </h2>

        <div className={styles.inputWrapper} style={{
            paddingLeft: localization.rtl ? 8 : 16,
            paddingRight: localization.rtl ? 16 : 8,
        }}>
            <input
                type="email"
                placeholder={localization.subscription.enterEmail}
                aria-label={localization.subscription.enterEmail}
                required
                className={styles.emailInput} />
            <BellIcon
                className={styles.submitButton}
                aria-label={localization.subscription.submit}
                aria-hidden="true" />
        </div>
    </section>;
}