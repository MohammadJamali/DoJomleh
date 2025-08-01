import { JSX } from "react";
import { SubLinksBox } from "./Menu/LinkSubItems";

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

export const MenuLinks = ({ menuLinks }: MenuLinksProps) => {
  return (
    <ul className="flex px-1 lg:px-4">
      {menuLinks.map((link) => (
        <div className="relative group" key={link.name}>
          <li className="p-2 font-semibold rounded-lg cursor-pointer lg:px-4 text-slate-500 hover:text-slate-700 hover:bg-slate-200 ">
            {link.name}
          </li>
          <div className="hidden group-hover:block">
            <SubLinksBox
              subLinks={link.subLinks}
              extraLinks={link.extraLinks}
            />
          </div>
        </div>
      ))}
    </ul>
  );
};
