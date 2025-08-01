import { ArrowUpRightIcon } from "@heroicons/react/16/solid";
import Card from "../../core/Cards/Card";
import CardGrid from "../../core/Cards/CardGrid/CardGrid";
import SectionBase from "../SectionBase/SectionBase";

export default function SectionNews() {
    return <SectionBase
        title="Latest News & Insights"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        isStriped
    >
        <CardGrid>
            <Card
                bannerImage="https://picsum.photos/id/30/300/200"
                title="Lorem ipsum"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
                href="#"
                footerButton={{
                    Icon: ArrowUpRightIcon,
                    title:'Learn More',
                    iconOutline: true,
                    iconStart: false,
                    iconHeight:12,
                    iconWidth:12,
                    iconPadding:8,
                }}
            />

            <Card
                bannerImage="https://picsum.photos/id/33/300/200"
                title="Lorem ipsum"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
                href="#"
                footerButton={{
                    Icon: ArrowUpRightIcon,
                    title:'Learn More',
                    iconOutline: true,
                    iconStart: false,
                    iconHeight:12,
                    iconWidth:12,
                    iconPadding:8,
                }}
            />
            <Card
                bannerImage="https://picsum.photos/id/32/300/200"
                title="Lorem ipsum"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
                href="#"
                footerButton={{
                    Icon: ArrowUpRightIcon,
                    title:'Learn More',
                    iconOutline: true,
                    iconStart: false,
                    iconHeight:12,
                    iconWidth:12,
                    iconPadding:8,
                }}
            />
        </CardGrid>
    </SectionBase>
}