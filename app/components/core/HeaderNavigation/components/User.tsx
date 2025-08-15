"use client";

import { useState, useEffect } from "react";
import { Dictionary } from "@/lib/dictionary-types";
import {
  IdentificationIcon,
  SunIcon,
  MoonIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

import {
  AptosWalletAdapterProvider,
  useWallet,
} from "@aptos-labs/wallet-adapter-react";
import { Network } from "@aptos-labs/ts-sdk";

// Modal component for wallet not available
function WalletUnavailableModal({ onClose }: { onClose: () => void }) {
  const handleDownloadClick = () => {
    window.open("https://petra.app/", "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 w-96 text-center border border-white/20">
        <h2 className="text-xl font-bold mb-4 text-white">Petra Wallet Not Found</h2>
        <p className="mb-6 text-white/80">
          To use this feature, please install the Petra Wallet.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleDownloadClick}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Download Petra
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function WalletMenu({ localization }: { localization: Dictionary }) {
  const { connect, disconnect, account, connected } = useWallet();
  const [theme, setTheme] = useState<string>("light");
  const [connecting, setConnecting] = useState(false);
  const [petraAvailable, setPetraAvailable] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // Check wallet availability on mount
  useEffect(() => {
    const isPetraAvailable = typeof window !== "undefined" && (window as any).aptos !== undefined;
    if (!isPetraAvailable) {
      setPetraAvailable(false);
      setShowModal(true);
    }
  }, []);

  useEffect(() => {
    setTheme(localStorage.getItem("theme") || "light");
  }, []);

  // Try reconnect on start if previously connected
  useEffect(() => {
    const lastWallet = localStorage.getItem("lastWallet");
    if (!connected && lastWallet && petraAvailable) {
      setConnecting(true);
      try {
        connect(lastWallet as any); // just call it
      } catch (err) {
        console.error("Auto-connect failed:", err);
      } finally {
        setConnecting(false);
      }
    }
  }, [connected, connect, petraAvailable]);

  const shortAddress = account?.address
    ? `${account.address.toString().slice(0, 4)}...${account.address
      .toString()
      .slice(-4)}`
    : "";

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    document.documentElement.classList.toggle("dark", newTheme === "dark");
    document.documentElement.classList.toggle("light", newTheme === "light");
  };

  const handleConnectClick = async () => {
    if (!petraAvailable) {
      setShowModal(true);
      return;
    }
    try {
      setConnecting(true);
      connect("Petra");
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
      title: theme === "light" ? localization.header.user.darkTheme : localization.header.user.lightTheme,
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
        <div className="
          flex items-center h-10 gap-3 cursor-pointer
          w-fit px-2 font-semibold rounded-lg cursor-pointer 
          text-slate-700 hover:text-slate-900
          bg-white/10 backdrop-blur-md
          border border-white/10
          transition-all duration-300
          hover:bg-white">

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
        <div className={`absolute w-72 hidden group-hover:flex flex-col pt-2 ${menuPosition}`}>
          <ul className="p-2 bg-white rounded-xl border border-white/20 z-10">
            {items.map((item) => (
              <li
                key={item.title}
                className="flex items-center justify-start h-16 font-bold cursor-pointer text-gray-600 hover:bg-slate-200 rounded-xl p-2"
                onClick={item.onclick}
              >
                <div className={`h-10 w-10 ml-5 flex items-center justify-center rounded-lg ${item.color}`}>
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

export default function User({ localization }: { localization: Dictionary }) {
  return (
    <AptosWalletAdapterProvider
      dappConfig={{ network: Network.LOCAL }}
      autoConnect={false}
      optInWallets={["Petra"]}
    >
      <WalletMenu localization={localization} />
    </AptosWalletAdapterProvider>
  );
}
