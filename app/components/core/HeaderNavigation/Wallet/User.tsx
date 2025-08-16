"use client";

import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import { Network } from "@aptos-labs/ts-sdk";
import { Dictionary } from "@/lib/dictionary-types";
import WalletMenu from "./WalletMenu";

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
