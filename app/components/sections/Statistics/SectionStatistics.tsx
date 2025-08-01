'use client';

import styles from './SectionStatistics.module.css'
import SectionBase from '../SectionBase/SectionBase'
import SideBySideSplit from '../../core/SideBySideSplit/SideBySideSplit'
import { CustomButtonProps } from '../../core/CustomButton/CustomButton'
import Card from '../../core/Cards/Card'
import { Dictionary } from '@/lib/dictionary-types'

import {
  ArrowUpRightIcon,
  SparklesIcon,
  ClockIcon,
  FaceSmileIcon,
  GlobeAltIcon
} from "@heroicons/react/24/outline";

export default function SectionStatistics({ localization }: { localization: Dictionary }) {
  return (
    <SectionBase
      title={localization.statistics.title}
      description={localization.statistics.description}
      isStriped={false}
    >
      <div className={styles.container}>
        <div className={styles.grid}>
            <Card
              Icon={SparklesIcon}
              iconColor={0x6C63FF}
              iconBackgroundColor={0xFFF}
              iconHeight={42}
              iconWidth={42}
              iconPadding={8}
              key={0}
              title={localization.statistics.stats[0].title}
              description={localization.statistics.stats[0].label}
              width={200}
              height={200}
              backgroundColor={0xf7f7f9}
            />
            <Card
              Icon={ClockIcon}
              iconColor={0x6C63FF}
              iconBackgroundColor={0xFFF}
              iconHeight={42}
              iconWidth={42}
              iconPadding={8}
              key={1}
              title={localization.statistics.stats[1].title}
              description={localization.statistics.stats[1].label}
              width={200}
              height={200}
              backgroundColor={0xf7f7f9}
            />
            <Card
              Icon={GlobeAltIcon}
              iconColor={0x6C63FF}
              iconBackgroundColor={0xFFF}
              iconHeight={42}
              iconWidth={42}
              iconPadding={8}
              key={2}
              title={localization.statistics.stats[2].title}
              description={localization.statistics.stats[2].label}
              width={200}
              height={200}
              backgroundColor={0xf7f7f9}
            />
            <Card
              Icon={FaceSmileIcon}
              iconColor={0x6C63FF}
              iconBackgroundColor={0xFFF}
              iconHeight={42}
              iconWidth={42}
              iconPadding={8}
              key={3}
              title={localization.statistics.stats[3].title}
              description={localization.statistics.stats[3].label}
              width={200}
              height={200}
              backgroundColor={0xf7f7f9}
            />
        </div>

        <SideBySideSplit
          rightToLeft={localization.rtl}
          image="https://picsum.photos/id/111/600/600"
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
