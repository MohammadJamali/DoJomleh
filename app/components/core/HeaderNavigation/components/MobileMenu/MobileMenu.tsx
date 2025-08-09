import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Link from 'next/link';
import { JSX } from "react";
import { Dictionary } from "@/lib/dictionary-types";
import User from "../User";

export interface MenuLinksProps {
  menuLinks: MenuLinks[];
}

export interface MenuLinks {
  name: string;
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
    <div className="absolute w-[calc(100vw-2.5em)] h-[calc(100vh-6em)] top-20 left-5 rounded-lg bg-slate-50 shadow-[rgba(0,_0,_0,_0.24)_0px_0px_40px] shadow-slate-400">
      <div className="flex flex-col h-[calc(100%-4em)] m-8 overflow-auto">
        <ul>
          {menuLinks.map((link, index) => (
            <div className="relative group" key={link.name}>
              <li
                className="px-3 py-4 font-semibold rounded-lg cursor-pointer lg:px-4"
                onClick={() => onMenuItemClick(index)}
              >
                <div className="flex justify-between text-gray-800">
                  <p className="text-xl font-bold">{link.name}</p>
                  <div className="w-8 h-8 p-1">
                    {expandedLinkId === index ? (
                      <ChevronUpIcon />
                    ) : (
                      <ChevronDownIcon />
                    )}
                  </div>
                </div>
                {expandedLinkId === index && (
                  <div className="w-full h-full">
                    <ul className="mt-4">
                      {link.subLinks.map((subLink) => (
                        <li
                          className=" pl-1 py-4 font-semibold text-gray-800 rounded-lg cursor-pointer lg:px-4"
                          key={subLink.name}
                        >
                          <Link href={subLink.link} className="flex items-center">
                            <div className="w-10 h-10 p-1">{subLink.icon}</div>
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
