'use client';

import styles from './SectionStatistics.module.css'
import SectionBase from '../SectionBase/SectionBase'
import SideBySideSplit from '../../core/SideBySideSplit/SideBySideSplit'
import { CustomButtonProps } from '../../core/CustomButton/CustomButton'
import Card from '../../core/Cards/Card'
import { Dictionary } from '@/lib/dictionary-types'

import {
  ArrowUpRightIcon,
} from "@heroicons/react/24/outline";
import { getHeroIcon } from '../../core/Icons/IconAsString';

export default function SectionStatistics({ localization }: { localization: Dictionary }) {
  return (
    <SectionBase
      sectionId='statistics'
      title={localization.statistics.title}
      description={localization.statistics.description}
      isStriped
    >
      <div className={styles.container}>
        <div className={styles.grid}>{
          localization.statistics.stats.map((stat, i) => <Card
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
          />)
        }</div>

        <SideBySideSplit
          containerId={"summary-request"}
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
  )
}
