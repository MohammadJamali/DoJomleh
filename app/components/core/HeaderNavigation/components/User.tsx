"use client"

import { Dictionary } from "@/lib/dictionary-types";
import {
  IdentificationIcon,
  SunIcon,
  MoonIcon,
  AdjustmentsVerticalIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";

const User = ({ localization }: { localization: Dictionary }) => {
  const [theme, setTheme] = useState<string | null>(null);

  useEffect(() => {
    setTheme(localStorage.getItem("theme"));
  }, []);

  const ms = new Date().getUTCMilliseconds();

  const items = [
    {
      title: localization.callToAction.header.user.profile,
      icon: <IdentificationIcon />,
      color: "bg-indigo-600 ",
      onclick: () => { },
    },
    {
      title: theme === "light"
        ? localization.callToAction.header.user.darkTheme
        : localization.callToAction.header.user.lightTheme,
      icon: theme === "light" ? <MoonIcon /> : <SunIcon />,
      color: "bg-teal-600",
      onclick: () => onChangeThemeClick(),
    },
    {
      title: localization.callToAction.header.user.settings,
      icon: <AdjustmentsVerticalIcon />,
      color: "bg-fuchsia-600",
      onclick: () => { },
    },
    {
      title: localization.callToAction.header.user.logout,
      icon: <ExclamationCircleIcon />,
      color: "bg-red-600",
      onclick: () => { },
    },
  ];

  const onChangeThemeClick = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);

    if (newTheme === "dark") {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    }
  };

  let className = "-left-[170px]";
  if (localization.rtl) {
    className = "-right-[170px]"
  }

  return (
    <div className="relative group">
      <div className="flex items-center h-10 gap-3 rounded-lg cursor-pointer w-fit hover:bg-slate-200 px-2">
        <img
          src={`https://api.dicebear.com/5.x/bottts-neutral/svg?seed=24`}
          className="my-auto ml-3 rounded-full w-7 h-7"
        />
        <p className="mr-3 font-bold text-slate-500 hover:text-slate-700">Steve</p>
      </div>
      <div className={`absolute w-72 hidden md:group-hover:flex flex-col pt-2 ${className}`}>
        <ul className="p-2 bg-white shadow-[rgba(0,_0,_0,_0.24)_0px_0px_40px] shadow-slate-400 hidden md:group-hover:flex flex-col  rounded-xl ">
          {items.map((item) => (
            <li
              key={item.title}
              className="flex items-center justify-start h-16 font-bold cursor-pointer text-slate-500 hover:text-slate-700  hover:bg-slate-200 rounded-xl"
              onClick={item.onclick}
            >
              <div
                className={`h-10 w-10 ml-5 flex items-center justify-center rounded-lg ${item.color}`}
              >
                <div className="w-3/5 h-3/5 text-white">
                  {item.icon}
                </div>
              </div>
              <p className="ml-5 text-slate-500">
                {item.title}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default User;
