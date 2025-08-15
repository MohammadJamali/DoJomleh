import { Dictionary } from '@/lib/dictionary-types';
import { ArrowUpRightIcon } from '@heroicons/react/16/solid';
import { PlayIcon } from '@heroicons/react/24/outline';
import SectionBase from './SectionBase';
import { CustomButton } from '../../core/CustomButton/CustomButton';
import SectionReviewCarousel from '../../modules/SectionReviewCarousel';

export default async function SectionCallToAction({ localization }: { localization: Dictionary }) {
    return <SectionBase
        sectionId='call-to-action'
        title={localization.callToAction.body.title}
        highlightedTitle={localization.callToAction.body.highlightedTitle}
        description={localization.callToAction.body.description}
        isStriped
        >
        <div className="flex flex-col justify-space-between">
            <div className="flex justify-center gap-8 mb-16">
                <CustomButton
                    href="#summary-request"
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