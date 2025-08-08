import { Dictionary } from '@/lib/dictionary-types';
import { FaChartSimple, FaHeart, FaClock } from 'react-icons/fa6';
import { IoIosWarning } from 'react-icons/io';
import { IoSparklesSharp } from 'react-icons/io5';
import { MenuLinks } from './components/Menu/interfaces';


export default function getNavigationLinks({ localization }: { localization: Dictionary }) {
  return [
    {
      name: localization.header.navbar.summeries.label,
      subLinks: [
        {
          name: localization.header.navbar.summeries.menus.top.label,
          description: localization.header.navbar.summeries.menus.top.description,
          link: "#most-viewed",
          color: "bg-red-300 dark:bg-red-700",
          icon: <FaHeart size={20} />
        },
        {
          name: localization.header.navbar.summeries.menus.recent.label,
          description: localization.header.navbar.summeries.menus.recent.description,
          link: "#recent-summeries",
          color: "bg-blue-300 dark:bg-blue-700",
          icon: <FaClock size={20} />,
        },
      ],
    },
    {
      name: localization.header.navbar.features.label,
      subLinks: [
        {
          name: localization.header.navbar.features.menus.challenges.label,
          description: localization.header.navbar.features.menus.challenges.description,
          link: "#challenges",
          color: "bg-yellow-300 dark:bg-yellow-700",
          icon: <IoIosWarning size={20} />
        },
        {
          name: localization.header.navbar.features.menus.statistics.label,
          description: localization.header.navbar.features.menus.statistics.description,
          link: "#statistics",
          color: "bg-green-300 dark:bg-green-700",
          icon: <FaChartSimple size={20} />,
        },
        {
          name: localization.header.navbar.features.menus.summeryRequest.label,
          description: localization.header.navbar.features.menus.summeryRequest.description,
          link: "#summary-request",
          color: "bg-blue-300 dark:bg-blue-700",
          icon: <IoSparklesSharp size={20} />,
        },
      ],
    },
    {
      name: localization.header.navbar.download.label,
      link: "#download"
    }
    //   extraLinks: [
    //     {
    //       name: "Company details",
    //       link: "/company-details",
    //     },
    //     {
    //       name: "Company structure",
    //       link: "/company-structure",
    //     },
    //     {
    //       name: "Company blog",
    //       link: "/company-blog",
    //     },
    //     {
    //       name: "Company social media",
    //       link: "/company-social-media",
    //     },
    //   ],
    // },
  ] as MenuLinks[];
}