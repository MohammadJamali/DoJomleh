import { ArrowUpRightIcon } from "@heroicons/react/16/solid";
import SectionBase from "./SectionBase";
import { Dictionary } from "@/lib/dictionary-types";
import CardGrid from "../../core/Cards/CardGrid";
import Card from "../../core/Cards/Card";

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