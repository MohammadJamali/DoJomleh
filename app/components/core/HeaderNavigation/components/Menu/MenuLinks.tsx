import { JSX } from "react";
import { SubLinksBox } from "./LinkSubItems";
import Link from "next/link";

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

export const MenuLinks = ({ menuLinks }: MenuLinksProps) => {
  return (
    <ul className="flex px-1 lg:px-4">
      {menuLinks.map((link) => (
        <div className="relative group" key={link.name}>{
          link.link
            ? <Link href={link.link} className="flex items-center">
              <li className="
                p-2 font-semibold rounded-lg cursor-pointer 
                lg:px-4 text-slate-500 hover:text-slate-700 
                hover:bg-slate-200">
                {link.name}
              </li>
            </Link>
            : <li className="
              p-2 font-semibold rounded-lg cursor-pointer 
              lg:px-4 text-slate-500 hover:text-slate-700 
              hover:bg-slate-200 ">
              {link.name}
            </li>
        }
          {
            link.subLinks &&
            <div className="hidden group-hover:block">
              <SubLinksBox
                subLinks={link.subLinks}
                extraLinks={link.extraLinks}
              />
            </div>
          }
        </div>
      ))}
    </ul>
  );
};
