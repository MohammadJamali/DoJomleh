import { CheckIcon } from '@heroicons/react/24/outline';
import Card from '../../core/Cards/Card';
import CardGrid from '../../core/Cards/CardGrid';
import SectionBase from "./SectionBase";
import { Dictionary } from '@/lib/dictionary-types';
import { randomInt } from 'crypto';
import { CustomButton } from '../../core/CustomButton/CustomButton';
import { PiDotsThreeBold } from 'react-icons/pi';

export default function SectionRecentContents({ localization }: { localization: Dictionary }) {
    return <SectionBase
        sectionId='recent-summeries'
        title={localization.blogs.title}
        description={localization.blogs.description}>
        <CardGrid>{
            localization.blogs.posts.map((post, i) => <Card
                key={post.id}
                title={post.title}
                description={post.description}
                showFooterTexture={randomInt(3) == 2}
                bannerImage={
                    post.image
                        ? post.image
                        : undefined
                }
                date={post.date ? new Date(post.date) : undefined}
                href={{
                        pathname: `/${localization.lang}/explore`,
                        query: { summaryId: post.id },
                }}
                features={
                    post.features
                        ? post.features.map((feature) => ({
                            Icon: CheckIcon,
                            title: feature
                        }))
                        : undefined
                }
            />)
        }</CardGrid>

        <div className='flex mt-18 w-full justify-center'>
            <CustomButton
                href="explore"
                iconBackgroundColor={0xfff}
                Icon={PiDotsThreeBold}
                title={localization.blogs.cta}
                iconStart={localization.rtl}
                borderColor={0x0}
                borderStyle="solid"
                borderWidth={1} />
        </div>
    </SectionBase>
}