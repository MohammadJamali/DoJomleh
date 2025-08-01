import { ArrowUpRightIcon, InboxArrowDownIcon } from "@heroicons/react/24/outline"
import styles from "./SectionSubscription.module.css"
import { Dictionary } from "@/lib/dictionary-types"

export default function SectionSubscription({ localization }: { localization: Dictionary }) {
    return <div className={styles.container}>
        <div className={styles.tooltip}>
            <InboxArrowDownIcon />
            <span>{localization.subscription.title}</span>
        </div>
        <h2 className={styles.title}>
            {localization.subscription.description}
        </h2>
        <div className={styles.input} style={{
            paddingRight: localization.rtl ? 16 : 8,
            paddingLeft: localization.rtl ? 8 : 16,
        }}>
            <input placeholder={localization.subscription.enterEmail} />
            <ArrowUpRightIcon />
        </div>
    </div>
}