import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Link from 'next/link';
import { JSX } from "react";
import { Dictionary } from "@/lib/dictionary-types";

export interface MenuLinksProps {
  menuLinks: MenuLinks[];
}

export interface MenuLinks {
  name: string;
  link?: string;
  subLinks: SubLink[];
  extraLinks?: ExtraLink[];
}

export interface SubLinksBoxProps {
  subLinks: SubLink[];
  extraLinks?: ExtraLink[];
}

export interface SubLink {
  name: string;
  description: string;
  link: string;
  color?: string;
  icon: JSX.Element;
}

export interface ExtraLink {
  name: string;
  link: string;
}


interface MobileMenuProps {
  menuLinks: MenuLinks[];
  localization: Dictionary;
}

export const MobileMenu = ({ menuLinks, localization }: MobileMenuProps) => {
  const [expandedLinkId, setExpandedLinkId] = useState<number | null>(null);

  const onMenuItemClick = (index: number) => {
    if (expandedLinkId === index) {
      setExpandedLinkId(null);
    } else {
      setExpandedLinkId(index);
    }
  };

  return (
    <div className="
      absolute w-[calc(100vw-2.5em)]
      top-20 left-3.5 rounded-lg bg-white shadow-[rgba(0,_0,_0,_0.24)_0px_0px_40px] 
      shadow-slate-400">
      <div className="flex flex-col h-[calc(100%-4em)] m-8 overflow-auto">
        <ul>
          {menuLinks.map((link, index) => (
            <div className="relative group" key={link.name}>
              <li
                className="px-3 py-4 font-semibold rounded-lg cursor-pointer lg:px-4"
                onClick={() => link.subLinks ? onMenuItemClick(index) : undefined}
              >
                {link.subLinks ? (
                  // Case: Has subLinks → not a Link itself
                  <div className="flex justify-between text-gray-800">
                    <p className="text-xl font-bold">{link.name}</p>
                    <div className="w-8 h-8 p-1">
                      {expandedLinkId === index ? <ChevronUpIcon /> : <ChevronDownIcon />}
                    </div>
                  </div>
                ) : (link.link &&
                  // Case: No subLinks → wrap with <Link>
                  <Link href={link.link} className="flex justify-between text-gray-800 w-full">
                    <p className="text-xl font-bold">{link.name}</p>
                  </Link>
                )}
                {link.subLinks && expandedLinkId === index && (
                  <div className="w-full h-full">
                    <ul className="mt-4">
                      {link.subLinks.map((subLink) => (
                        <li
                          className=" pl-1 py-4 font-semibold text-gray-800 rounded-lg cursor-pointer lg:px-4"
                          key={subLink.name}
                        >
                          <Link href={subLink.link} className="flex items-center">
                            <div className="w-10 h-10 p-1 content-center">{subLink.icon}</div>
                            <div className="flex flex-col ml-5">
                              <p className="font-bold">{subLink.name}</p>
                              <p className="text-xs text-gray-500">
                                {subLink.description}
                              </p>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};
