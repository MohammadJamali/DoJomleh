'use client';

import SectionBase from './SectionBase'
import SideBySideSplit from '../../core/SideBySideSplit'
import Card from '../../core/Cards/Card'
import { CustomButtonProps } from '../../core/CustomButton/CustomButton'
import { Dictionary } from '@/lib/dictionary-types'

import {
  ArrowUpRightIcon,
} from "@heroicons/react/24/outline";
import { getHeroIcon } from '../../core/IconAsString';

interface SectionStatisticsProps {
  localization: Dictionary;
}

export default function SectionStatistics({ localization }: SectionStatisticsProps) {
  return (
    <SectionBase
      sectionId='statistics'
      title={localization.statistics.title}
      description={localization.statistics.description}
      isStriped
    >
      <div className="flex flex-col gap-[8rem] justify-center">
        <div
          className="
          grid justify-items-center justify-center 
          gap-8 w-full sm:max-w-3xl xl:max-w-7xl mx-auto px-8
          xl:grid-cols-4 sm:grid-cols-2 xs:grid-cols-1"
          style={{ boxSizing: 'border-box' }}
        >
          {localization.statistics.stats.map((stat, i) => (
            <Card
              key={i}
              Icon={getHeroIcon(stat.icon)}
              iconColor="#6C63FF"
              iconBackgroundColor="#f7f7f9"
              backgroundColor="#FFF"
              iconHeight={64}
              iconWidth={64}
              iconPadding={16}
              title={stat.title}
              description={stat.label}
              width={230}
              height={230}
              headerPadding={0}
            />
          ))}
        </div>

        <SideBySideSplit
          containerId="summary-request"
          rightToLeft={localization.rtl}
          image="images/app.jpg"
          title={localization.statistics.motivation.title}
          description={localization.statistics.motivation.description}
          buttons={[{
            href: "#",
            title: localization.statistics.motivation.cta,
            color: 0xfff,
            backgroundColor: 0x7478F8,
            iconBackgroundColor: 0xfff,
            Icon: ArrowUpRightIcon,
            iconStart: localization.rtl,
            borderColor: 0x0,
            borderStyle: "solid",
            borderWidth: 1
          } as CustomButtonProps]}
        />
      </div>
    </SectionBase>
  );
}
