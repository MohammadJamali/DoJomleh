"use client";

import { Dictionary } from "@/lib/dictionary-types";
import {
  IdentificationIcon,
  SunIcon,
  MoonIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import {
  AptosWalletAdapterProvider,
  useWallet,
} from "@aptos-labs/wallet-adapter-react";
import { Network } from "@aptos-labs/ts-sdk";

function WalletMenu({ localization }: { localization: Dictionary }) {
  const { connect, disconnect, account, connected } = useWallet();
  const [theme, setTheme] = useState<string | null>(null);
  const [connecting, setConnecting] = useState(false);

  useEffect(() => {
    setTheme(localStorage.getItem("theme") || "light");
  }, []);

  // Try reconnect on start if previously connected
  useEffect(() => {
    const lastWallet = localStorage.getItem("lastWallet");
    if (!connected && lastWallet) {
      setConnecting(true);
      try {
        connect(lastWallet as any);
      } catch (err) {
        console.error("Auto-connect failed:", err)
      }
      finally {
        setConnecting(false);
      }
    }
  }, [connected, connect]);

  const shortAddress = account?.address
    ? `${account.address.toString().slice(0, 4)}...${account.address
      .toString()
      .slice(-4)}`
    : "";

  const onChangeThemeClick = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    if (newTheme === "dark") {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    }
  };

  const handleConnectClick = async () => {
    try {
      setConnecting(true);
      await connect("Petra");
      localStorage.setItem("lastWallet", "Petra");
      console.log("Connected account:", account?.address);
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
      onclick: onChangeThemeClick,
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

  let className = "-left-[245px] md:-left-[105px]";
  if (localization.rtl) {
    className = "-right-[245px] md:-right-[135px]";
  }

  return (
    <div className="relative group">
      <div className={`flex items-center h-10 gap-3 rounded-lg cursor-pointer w-fit hover:bg-slate-200 px-2`}>
        <img
          src={`https://api.dicebear.com/5.x/bottts-neutral/svg?seed=24`}
          className="my-auto rounded-full w-7 h-7"
          alt="avatar"
        />
        <p className={`${ localization.rtl ? "": "mr-3"} font-bold text-slate-500 hover:text-slate-700 hidden md:block`}>
          {connecting
            ? localization.header.user.connecting || "Connecting..."
            : connected
              ? shortAddress
              : localization.header.user.connect}
        </p>
      </div>
      <div
        className={`absolute w-72 hidden group-hover:flex flex-col pt-2 ${className}`}
      >
        <ul className="p-2 bg-white shadow-[rgba(0,_0,_0,_0.24)_0px_0px_40px] shadow-slate-400 rounded-xl z-10 border-1 border-gray-200">
          {items.map((item) => (
            <li
              key={item.title}
              className="flex items-center justify-start h-16 font-bold cursor-pointer text-slate-500 hover:text-slate-700 hover:bg-slate-200 rounded-xl"
              onClick={item.onclick}
            >
              <div
                className={`h-10 w-10 ml-5 flex items-center justify-center rounded-lg ${item.color}`}
              >
                <div className="w-3/5 h-3/5 text-white">{item.icon}</div>
              </div>
              <p className="ml-5 text-slate-500">{item.title}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function User({ localization }: { localization: Dictionary }) {
  return (
    <AptosWalletAdapterProvider
      dappConfig={{
        network: Network.LOCAL,
      }}
      autoConnect={false} // We handle reconnect manually
      optInWallets={["Petra"]}
    >
      <WalletMenu localization={localization} />
    </AptosWalletAdapterProvider>
  );
}
