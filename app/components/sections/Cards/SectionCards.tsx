import { CheckIcon, FaceSmileIcon } from '@heroicons/react/24/outline';
import Card from '../../core/Cards/Card';
import CardGrid from '../../core/Cards/CardGrid/CardGrid';
import SectionBase from "../SectionBase/SectionBase";

export default function SectionCards() {
    return (<SectionBase
        title="Latest News & Insights"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    ><CardGrid>
            <Card
                Icon={CheckIcon}
                bannerImage="https://picsum.photos/id/1/300/200"
                title="Lorem ipsum"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit" />

            <Card
                Icon={CheckIcon}
                title="Lorem ipsum"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
                showFooterTexture={true}
                date={new Date()}
                href="#"
                footerButton={{
                    Icon: FaceSmileIcon,
                    title: 'Lorem ipsum',
                    label: 'Lorem ipsum dolor sit amet',
                }}
                features={[
                    {
                        Icon: CheckIcon,
                        title: 'Lorem ipsumas'
                    },

                    {
                        Icon: FaceSmileIcon,
                        title: 'Lorem ipsum'
                    },

                    {
                        Icon: CheckIcon,
                        title: 'Lorem ipsum'
                    },

                    {
                        Icon: FaceSmileIcon,
                        title: 'Lorem ipsum'
                    }
                ]}
            />

            <Card
                Icon={CheckIcon}
                title="Lorem ipsum"
                bannerImage="https://picsum.photos/id/2/300/200"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit" />
        </CardGrid>
    </SectionBase>
    )
}