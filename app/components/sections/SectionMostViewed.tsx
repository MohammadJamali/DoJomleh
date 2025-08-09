import { ArrowUpRightIcon } from "@heroicons/react/16/solid";
import Card from "../core/Cards/Card";
import CardGrid from "../core/Cards/CardGrid/CardGrid";
import SectionBase from "./SectionBase";
import { Dictionary } from "@/lib/dictionary-types";

export default function SectionMostViewed({ localization }: { localization: Dictionary }) {
    return <SectionBase
        sectionId="most-viewed"
        title={localization.topPosts.title}
        description={localization.topPosts.description}>
        <CardGrid>{
            localization.topPosts.posts.map((post) => (
                <Card
                    key={post.id}
                    bannerImage={post.image}
                    title={post.title}
                    description={post.description}
                    href="#"
                    footerButton={{
                        Icon: ArrowUpRightIcon,
                        title: localization.topPosts.cta,
                        iconOutline: true,
                        iconStart: false,
                    }} />))
        }</CardGrid>
    </SectionBase>
}