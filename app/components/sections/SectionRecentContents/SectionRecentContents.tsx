import { CheckIcon, SparklesIcon } from '@heroicons/react/24/outline';
import Card from '../../core/Cards/Card';
import CardGrid from '../../core/Cards/CardGrid/CardGrid';
import SectionBase from "../SectionBase/SectionBase";
import { Dictionary } from '@/lib/dictionary-types';
import { randomInt } from 'crypto';

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
                href="#"
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
    </SectionBase>
}