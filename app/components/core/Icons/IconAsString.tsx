import * as HeroIcons from "@heroicons/react/24/outline";
import { SVGProps } from "react";

type HeroIconName = keyof typeof HeroIcons;

export const getHeroIcon = (iconName: string): React.ComponentType<SVGProps<SVGSVGElement>> => {
  return HeroIcons[iconName as HeroIconName] || HeroIcons.ArrowUpRightIcon;
};