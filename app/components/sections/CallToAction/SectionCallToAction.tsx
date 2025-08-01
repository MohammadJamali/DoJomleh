import styles from './SectionCallToAction.module.css'
import SectionBase from "../SectionBase/SectionBase";
import { CustomButton } from '../../core/CustomButton/CustomButton';
import SectionReviewCarousel from '../ReviewCard/SectionReviewCarousel';
import { Dictionary } from '@/lib/dictionary-types';
import { ArrowUpRightIcon } from '@heroicons/react/16/solid';
import { PlayIcon } from '@heroicons/react/24/outline';

export default async function SectionCallToAction({ localization }: { localization: Dictionary }) {
    return <SectionBase
        title={localization.callToAction.body.slogan}
        highlightedTitle={localization.callToAction.body.highlightedSlogan}
        description={localization.callToAction.body.description}
        isStriped>

        <div className={styles.container}>
            <div className={styles.ctaButtons}>
                <CustomButton
                    href="/invest"
                    title={localization.callToAction.body.actions.cta}
                    color={0xfff}
                    backgroundColor={0x7478F8}
                    iconBackgroundColor={0xfff}
                    Icon={ArrowUpRightIcon}
                    iconStart={localization.rtl}
                />
                <CustomButton
                    href="#"
                    title={localization.callToAction.body.actions.more}
                    iconBackgroundColor={0xfff}
                    Icon={PlayIcon}
                    iconStart={localization.rtl}
                    borderColor={0x0}
                    borderStyle="solid"
                    borderWidth={1} />
            </div>

            <SectionReviewCarousel localization={localization} />
        </div>
    </SectionBase>
}