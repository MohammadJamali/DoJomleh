"use client";

import React, { useEffect } from "react";

export default function WalletUnavailableModal({ onClose }: { onClose: () => void }) {
  // Prevent page scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleDownloadClick = () => {
    window.open("https://petra.app/", "_blank");
  };

  return (
    <div className="fixed inset-0 h-screen flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white/20 backdrop-blur-sm rounded-xl p-8 w-[90%] max-w-md text-center border border-white/30 shadow-2xl">
        <h2 className="text-2xl font-bold mb-4 text-white">Petra Wallet Not Found</h2>
        <p className="mb-6 text-white/90">
          To use this feature, please install the Petra Wallet.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleDownloadClick}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Download Petra
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
