import { SubLinksBoxProps } from "./interfaces";
import Link from 'next/link';

export const SubLinksBox = (props: SubLinksBoxProps) => {
  const { subLinks, extraLinks } = props;
  return (
    <div className="absolute pt-2 top-10 w-fit  hidden group-hover:flex">
      <div className="w-fit bg-white shadow-[rgba(0,_0,_0,_0.24)_0px_0px_40px] shadow-slate-400 rounded-xl">
        <ul className="p-2 h-fit w-96 flex-col ">
          {subLinks.map((subLink) => (
            <li
              key={subLink.name}
              className="h-16 hover:bg-slate-200 rounded-xl flex items-center justify-start cursor-pointer font-bold"
            >
              <Link href={subLink.link} className="flex items-center">
                <div
                  className={`h-10 w-10 ml-5 flex items-center justify-center rounded-lg ${subLink.color}`}
                >
                  <div className="h-3/5 w-3/5 text-white">
                    {subLink.icon}
                  </div>
                </div>
                <div className="flex flex-col ml-5">
                  <p className="text-gray-600 ">
                    {subLink.name}
                  </p>
                  <p className="text-gray-400 text-xs">
                    {subLink.description}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        {extraLinks && (
          <div className="flex">
            <div className="h-[calc(100%-3em)] my-auto w-[1px] bg-gray-300 " />
            <ul className="w-56 p-2">
              {extraLinks?.map((extraLink) => (
                <Link href={extraLink.link} className="flex items-center w-full">
                  <li
                    key={extraLink.name}
                    className="p-2 h-10 hover:bg-slate-200  rounded-lg flex items-center justify-start cursor-pointer text-sm font-semibold text-gray-600"
                  >
                    {extraLink.name}
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
