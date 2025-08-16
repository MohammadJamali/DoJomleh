"use client";

import { useState, useEffect } from "react";
import { Dictionary } from "@/lib/dictionary-types";
import {
  IdentificationIcon,
  SunIcon,
  MoonIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import WalletUnavailableModal from "./WalletUnavailableModal";

export default function WalletMenu({ localization }: { localization: Dictionary }) {
  const { connect, disconnect, account, connected } = useWallet();

  const [theme, setTheme] = useState<string>("light");
  const [connecting, setConnecting] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const shortAddress = account?.address
    ? `${account.address.toString().slice(0, 4)}...${account.address
      .toString()
      .slice(-4)}`
    : "";

  useEffect(() => {
    setTheme(localStorage.getItem("theme") || "light");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    document.documentElement.classList.toggle("dark", newTheme === "dark");
    document.documentElement.classList.toggle("light", newTheme === "light");
  };

  const handleConnectClick = () => {
    try {
      // Check Petra compatibility
      const isPetraCompatible =
        typeof window !== "undefined" && (window as any).aptos;
      if (!isPetraCompatible) {
        setShowModal(true);
        return;
      }

      setConnecting(true);
      connect("Petra"); // sync call
      localStorage.setItem("lastWallet", "Petra");
    } catch (err) {
      console.error("Wallet connection failed:", err);
    } finally {
      setConnecting(false);
    }
  };

  const handleDisconnectClick = () => {
    disconnect();
    localStorage.removeItem("lastWallet");
  };

  const items = [
    {
      title: localization.header.user.profile,
      icon: <IdentificationIcon />,
      color: "bg-indigo-600",
      onclick: () => { },
    },
    {
      title:
        theme === "light"
          ? localization.header.user.darkTheme
          : localization.header.user.lightTheme,
      icon: theme === "light" ? <MoonIcon /> : <SunIcon />,
      color: "bg-teal-600",
      onclick: toggleTheme,
    },
    {
      title: connected
        ? localization.header.user.disconnect
        : connecting
          ? localization.header.user.connecting || "Connecting..."
          : localization.header.user.connect,
      icon: <ExclamationCircleIcon />,
      color: connected ? "bg-red-600" : "bg-green-600",
      onclick: connected ? handleDisconnectClick : handleConnectClick,
    },
  ];

  let menuPosition = "-left-[245px] md:-left-[105px]";
  if (localization.rtl) {
    menuPosition = "-right-[245px] md:-right-[135px]";
  }

  return (
    <>
      {showModal && <WalletUnavailableModal onClose={() => setShowModal(false)} />}
      <div className="relative group">
        <div
          className="
          flex items-center h-10 gap-3 cursor-pointer
          w-fit px-2 font-semibold rounded-lg 
          text-slate-700 hover:text-slate-900
          bg-white/10 backdrop-blur-md
          border border-white/10
          transition-all duration-300
          hover:bg-white"
        >
          <img
            src="https://api.dicebear.com/5.x/bottts-neutral/svg?seed=24"
            className="rounded-full w-7 h-7"
            alt="avatar"
          />
          <p className="font-bold text-slate-700 hover:text-slate-900 hidden md:block">
            {connecting
              ? localization.header.user.connecting || "Connecting..."
              : connected
                ? shortAddress
                : localization.header.user.connect}
          </p>
        </div>
        <div
          className={`absolute w-72 hidden group-hover:flex flex-col pt-2 ${menuPosition}`}
        >
          <ul className="p-2 bg-white rounded-xl border border-white/20 z-10">
            {items.map((item) => (
              <li
                key={item.title}
                className="flex items-center justify-start h-16 font-bold cursor-pointer text-gray-600 hover:bg-slate-200 rounded-xl p-2"
                onClick={item.onclick}
              >
                <div
                  className={`h-10 w-10 ml-5 flex items-center justify-center rounded-lg ${item.color}`}
                >
                  <div className="w-3/5 h-3/5 text-white">{item.icon}</div>
                </div>
                <p className="ml-5">{item.title}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
