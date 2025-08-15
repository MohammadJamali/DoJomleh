"use client";

import { useState } from "react";
import { Dictionary } from "@/lib/dictionary-types";
import Image from "next/image";
import { FaEnvelope, FaPhoneAlt, FaEllipsisH, FaBell } from "react-icons/fa";

export default function AuthorBanner({ localization, userData }: {
  localization: Dictionary;
  userData: any;
}) {
  const t = localization.explore.author;
  const [tab, setTab] = useState<"deal" | "activities">("activities");

  const ActionBtn = ({ icon: Icon, label, color }: { icon: any; label: string; color: string }) => (
    <button className={`p-3 rounded-lg border border-gray-200 ${color}`}>
      <Icon /> <span className="sr-only">{label}</span>
    </button>
  );

  return (
    <main className="font-sans">
      <article className="overflow-hidden">
        {/* Header */}
        <section className="p-4 text-center">
          <Image src={userData.avatar} alt={userData.name} width={64} height={64} className="rounded-full mx-auto" />
          <h1 className="text-lg font-semibold mt-2">{userData.name}</h1>
          <p className="text-gray-500 text-sm">{userData.group}</p>

          <div className="flex justify-center gap-3 mt-4">
            <ActionBtn icon={FaEnvelope} label={t.mail} color="bg-blue-50 text-blue-600" />
            <ActionBtn icon={FaPhoneAlt} label={t.call} color="bg-green-50 text-green-600" />
            <ActionBtn icon={FaEllipsisH} label={t.more} color="bg-gray-50 text-gray-600" />
          </div>

          <p className="text-xs text-gray-500 mt-3">
            <span className="font-medium">{t.lastActivity}:</span> {userData.lastActivity}
          </p>
        </section>

        {/* Tabs */}
        <div className="flex border-t border-gray-200">
          {[
            { id: "deal", label: t.dealInfo },
            { id: "activities", label: t.activities },
          ].map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setTab(id as any)}
              className={`flex-1 py-2 text-sm font-medium transition-all duration-300 ${
                tab === id
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div
          className="transition-all duration-500 ease-in-out"
          style={{ opacity: 1, transform: "translateY(0)" }}
        >
          {tab === "activities" ? (
            <section className="p-4 space-y-4">
              {userData.activities.map(({ id, user, action, time, status }) => (
                <div key={id} className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 text-xs">
                    <FaBell />
                  </div>
                  <div>
                    <p className="text-sm">
                      <span className="font-medium">{user}</span> {action}
                    </p>
                    <p className="text-xs text-gray-500">{time}</p>
                    {status && (
                      <div className="flex gap-2 mt-1">
                        {Array.isArray(status) ? (
                          <>
                            <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs rounded">{t.new}</span>
                            <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded">{t.inProgress}</span>
                          </>
                        ) : (
                          <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded">{t.accepted}</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </section>
          ) : (
            <section className="p-4">
              <h2 className="text-sm font-medium mb-2">{t.loanRequested}</h2>
              <p className="text-xs text-gray-500">{t.loanPurpose}: <span className="font-medium">{t.newPurchase}</span></p>
              <p className="text-xs text-gray-500">{t.loanAmount}: <span className="font-medium">{userData.loanAmount}</span></p>
            </section>
          )}
        </div>
      </article>
    </main>
  );
}
