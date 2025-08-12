"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import { PiCopy, PiUser } from "react-icons/pi";
import { GoCopy, GoLink, GoPencil } from "react-icons/go";
import { FaArrowLeft, FaArrowRight, FaBell, FaCopy, FaTelegram, FaThumbsUp } from "react-icons/fa6";
import { FaShareAlt } from "react-icons/fa";
import { Dictionary } from "@/lib/dictionary-types";

type Props = {
    localization: Dictionary
    data: {
        image: string;
        banner: string;
        author: { name: string };
        url: string;
        descriptionLabel: string;
        authorLabel: string;
        title: string;
        createdAt: string;
        reminderText: string;
        contentHtml: string;
    };
};

export default function SummaryClient({ data, localization }: Props) {
    const scrollRef = useRef<HTMLDivElement | null>(null);

    const handleAction = (action: string) => {
        console.log("Action:", action);
    };

    // ripple effect
    const rippleRef = useRef<HTMLButtonElement | null>(null);
    const createRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
        const btn = rippleRef.current;
        if (!btn) return;
        const circle = document.createElement("span");
        const diameter = Math.max(btn.clientWidth, btn.clientHeight);
        const radius = diameter / 2;
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${e.clientX - btn.getBoundingClientRect().left - radius}px`;
        circle.style.top = `${e.clientY - btn.getBoundingClientRect().top - radius}px`;
        circle.className = styles.ripple;
        const ripple = btn.getElementsByClassName(styles.ripple)[0];
        if (ripple) ripple.remove();
        btn.appendChild(circle);
    };

    return (
        <section className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-md z-50 h-screen">
            <article
                className="bg-white backdrop-blur-lg rounded-xl shadow-lg max-h-screen w-xl p-6 m-4 text-gray-800"
                itemScope
                itemType="https://schema.org/Article"
            >
                {/* Header buttons */}
                <div className="flex items-center justify-between mb-6 text-gray-500">
                    <button
                        aria-label="go"
                        onClick={() => handleAction("go")}
                        className="inline-flex items-center justify-center border-2 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-offset-1"
                    >
                        {localization.rtl ? <FaArrowRight /> : <FaArrowLeft />}
                    </button>
                    <div className="flex items-center gap-2">
                        <button
                            aria-label="like"
                            onClick={() => handleAction("like")}
                            className="inline-flex items-center justify-center border-2 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-offset-1"
                        >
                            <FaThumbsUp />
                        </button>
                        <button
                            aria-label="share"
                            onClick={() => handleAction("share")}
                            className="inline-flex items-center justify-center border-2 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-offset-1"
                        >
                            <FaShareAlt />
                        </button>
                    </div>
                </div>

                <div className="relative">
                    <div
                        ref={scrollRef}
                        className={`overflow-auto overscroll-contain max-h-[min(72vh,728px)]`}
                    >
                        <div className="space-y-2">
                            <img
                                src={data.banner}
                                alt="banner"
                                className="w-full h-auto rounded-lg object-cover"
                                style={{ maxHeight: 240 }}
                            />

                            {/* Info rows */}
                            <div className="pt-2 text-sm space-y-2">

                                {/* Author row */}
                                <div className="flex items-center mb-3">
                                    <div className="relative">
                                        <Image
                                            src={data.image}
                                            alt={data.author.name}
                                            width={64}
                                            height={64}
                                            className="rounded-full object-cover w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16"
                                        />
                                        <button
                                            aria-label="telegram"
                                            onClick={() => handleAction("telegram")}
                                            className="absolute bottom-0 right-0 inline-flex items-center justify-center rounded-full p-1 bg-white/70 text-blue-500 border border-blue-300 focus:outline-none"
                                        >
                                            <FaTelegram />
                                        </button>
                                    </div>
                                    <div className="mx-3 flex-1">
                                        <h1 className="text-lg sm:text-xl font-semibold">{data.title}</h1>
                                        <p className="text-xs text-gray-500">{data.createdAt}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <div className="w-8 flex justify-center text-gray-600"><PiUser /></div>
                                    <div className="text-xs text-gray-400 w-28">{data.authorLabel}</div>
                                    <button
                                        onClick={() => handleAction("author")}
                                        className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-50 text-amber-600 text-sm focus:outline-none focus:ring-2 cursor-pointer"
                                    >
                                        <PiUser />
                                        <span>{data.author.name}</span>
                                    </button>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-8 flex justify-center text-gray-600"><GoLink /></div>
                                    <div className="text-xs text-gray-400 w-28">{localization.summary.urlLabel}</div>
                                    <button
                                        onClick={() => handleAction("author")}
                                        className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 text-grey-600 text-sm focus:outline-none focus:ring-2 cursor-pointer"
                                    >
                                        <PiCopy />
                                        <span>{data.url}</span>
                                    </button>
                                </div>
                                <div className="flex items-start gap-2">
                                    <div className="w-8 flex justify-center pt-1 text-gray-600"><GoPencil /></div>
                                    <div className="text-xs text-gray-400 w-28">{data.descriptionLabel}</div>
                                    <p className="leading-snug">Lorem ipsum dolor sit amet...</p>
                                </div>
                            </div>

                            <section
                                itemProp="articleBody"
                                className="leading-relaxed max-w-none mb-10"
                            >
                                <div
                                    className={styles.markdown}
                                    dangerouslySetInnerHTML={{ __html: data.contentHtml }}
                                />
                            </section>
                        </div>
                    </div>

                    {/* Fades */}
                    {/* <div className="pointer-events-none absolute inset-x-0 top-0 h-3 bg-gradient-to-b from-white to-transparent z-50" /> */}
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white to-transparent z-50" />
                </div>

                <button
                    ref={rippleRef}
                    onClick={(e) => {
                        createRipple(e);
                        handleAction("reminder");
                    }}
                    className="mt-4 w-full bg-gray-100 rounded-md items-center relative overflow-hidden px-4 py-3 rounded-md text-grey-600 font-medium focus:outline-none"
                >
                    <span className="inline-flex items-center gap-2">
                        <FaBell /> {data.reminderText}
                    </span>
                </button>
            </article>
        </section>
    );
}
