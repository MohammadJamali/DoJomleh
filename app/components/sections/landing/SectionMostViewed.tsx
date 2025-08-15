import { ArrowUpRightIcon } from "@heroicons/react/16/solid";
import SectionBase from "./SectionBase";
import { Dictionary } from "@/lib/dictionary-types";
import CardGrid from "../../core/Cards/CardGrid";
import Card from "../../core/Cards/Card";
import { CustomButton } from "../../core/CustomButton/CustomButton";
import { PiDotsThreeBold } from "react-icons/pi";
import Link from "next/link";

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
                    href={{
                        pathname: `/${localization.lang}/explore`,
                        query: { summaryId: post.id },
                    }}
                    footerButton={{
                        Icon: ArrowUpRightIcon,
                        title: localization.topPosts.cta,
                        iconOutline: true,
                        iconStart: false,
                    }} />))
        }</CardGrid>

        <div className='flex mt-18 w-full justify-center'>
            <CustomButton
                href="explore"
                iconBackgroundColor={0xfff}
                Icon={PiDotsThreeBold}
                title={localization.topPosts.cta}
                iconStart={localization.rtl}
                borderColor={0x0}
                borderStyle="solid"
                borderWidth={1} />
        </div>
    </SectionBase>
}