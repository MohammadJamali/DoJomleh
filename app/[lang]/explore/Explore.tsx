"use client";

import { CompanyLogo } from "@/app/components/core/HeaderNavigation/components/CompanyLogo";
import dynamic from "next/dynamic";
import RippleButton from "@/app/components/core/RippleButton";
import ShimmerCard from "@/app/components/core/ShimmerCard";
import TagGroup from "@/app/components/core/TagGroup";
import { Dictionary } from "@/lib/dictionary-types";
import { useEffect, useState } from "react";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import {
    FaChevronLeft, FaChevronRight, FaMagnifyingGlass,
    FaPodcast,
    FaYoutube,
    FaTelegram,
    FaChevronDown
} from "react-icons/fa6";
import AuthorBanner from "./AuthorBanner";
import { IoFilter } from "react-icons/io5";
import ArticleCard from "./components/ArticleCard";
import SectionFooter from "@/app/components/sections/landing/SectionFooter";
import Divider from "@/app/components/core/Devider";
import { remark } from "remark";
import SummaryView  from "../summary/SummaryView";

const User = dynamic(() => import("../../components/core/HeaderNavigation/components/User.2tsx"), { ssr: false });


function Sidebar({ localization }: { localization: Dictionary }) {
    const [sidebarOpen, setSidebarOpen] = useState(true); // desktop state
    const [filterOpen, setFilterOpen] = useState(true); // mobile state
    const [isMobile, setIsMobile] = useState(typeof window !== "undefined" ? window.innerWidth < 768 : false);

    // Watch for resize to update isMobile
    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            if (!mobile) {
                // When switching to desktop, ensure filterOpen is reset
                setFilterOpen(true);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className={`
                 border-gray-200
                border-b md:border-b-0 md:border-r
            `}>
            <aside
                className={`
                    flex flex-col transition-all duration-300
                    ${sidebarOpen ? "w-full md:w-64" : "w-full md:w-12"}
                    ${sidebarOpen ? "translate-x-0" : "md:-translate-x-full"}
                `}
                aria-label="Content Filters">
                {/* Top Section */}
                <header
                    className={`flex justify-between items-center h-20 px-4 md:px-0 md:justify-center border-b border-gray-200 
                    transition-opacity duration-300
                    ${!isMobile && !sidebarOpen ? "opacity-0" : "opacity-100"}`}
                >
                    <CompanyLogo localization={localization} />
                    {isMobile && (
                        <div>
                            <User localization={localization} />
                        </div>
                    )}
                </header>

                {/* Filter Header */}
                <div className="flex justify-between items-center px-4 h-16 border-b border-gray-200 ">
                    <div
                        className={`flex gap-2 items-center transition-all duration-300
                        ${!isMobile && !sidebarOpen ? "opacity-0 w-[0px]" : "opacity-100"}`}>
                        <IoFilter />
                        <h2 className="font-semibold text-lg">{localization.explore.filters}</h2>
                    </div>
                    <button
                        className="p-1 z-10 hover:bg-gray-100 rounded ml-[45px]"
                        onClick={() => {
                            if (!isMobile) {
                                setSidebarOpen(!sidebarOpen); // Desktop: slide left
                            } else {
                                setFilterOpen(!filterOpen); // Mobile: collapse filter list
                            }
                        }}
                        aria-label="Toggle Sidebar"
                    >
                        <span className={`hidden md:block transform transition-transform duration-300 ${sidebarOpen ? "rotate-180" : ""}`}>
                            {localization.rtl ? <FaChevronLeft /> : <FaChevronRight />}
                        </span>
                        <FaChevronDown
                            className={`block md:hidden transform transition-transform duration-300 ${filterOpen ? "rotate-180" : ""}`} />
                    </button>
                </div>

                {/* Filter List */}
                <div
                    className={`overflow-hidden transition-[max-height] duration-500 ease-in-out
                    ${isMobile && !filterOpen ? "max-h-0" : "max-h-[800px]"}`}
                >
                    <section className="flex flex-col gap-4 p-4">
                        <TagGroup
                            title={localization.explore.sources.label}
                            tags={[
                                { label: localization.explore.sources.telegram, icon: <FaTelegram /> },
                                { label: localization.explore.sources.youtube, icon: <FaYoutube /> },
                                { label: localization.explore.sources.podcast, icon: <FaPodcast /> },
                            ]}
                            localization={localization}
                        />
                        <TagGroup
                            title="Categories"
                            tags={[
                                { label: "Navigation" },
                                { label: "Header" },
                                { label: "Pricing" },
                                { label: "Footer" },
                                { label: "FAQ" },
                            ]}
                            localization={localization}
                        />
                        <TagGroup
                            title="Categories"
                            tags={[
                                { label: "Dark mode" },
                                { label: "Crypto" },
                                { label: "SaaS" }
                            ]}
                            localization={localization}
                        />
                    </section>
                </div>
            </aside></div>
    );
}


export default function Explore({ localization, summaryId }: {
    localization: Dictionary;
    summaryId?: string;
}) {
    const [search, setSearch] = useState("");
    const [loadingState, setLoadingState] = useState<"idle" | "typing" | "loading" | "done">("idle");
    const [articles, setArticles] = useState([
        {
            id: 1,
            user: "Alex Jedi",
            title: "How to evolve into a Superhuman with your Digital Mind Palace",
            content:
                "The method of loci is a strategy of memory enhancement which uses visualizations of familiar spatial environments in order to enhance the recall of information...",
            likes: 5,
        },
        {
            id: 2,
            user: "Elleezen",
            title: "How to Use Mind Palace Technique to Memorize Literally Everything",
            content:
                "The basic principle of the Mind Palace technique is that the places you know very well can help you remember large portions of information...",
            likes: 41,
        },
    ]);

    const [sidebarOpen, setSidebarOpen] = useState(true);

    // Debounce logic with multiple loading phases
    useEffect(() => {
        if (search.trim().length > 0) {
            setLoadingState("typing");

            const typingTimeout = setTimeout(() => {
                setLoadingState("loading");

                setTimeout(() => {
                    setLoadingState("idle");
                }, 1000); // after shimmer
            }, 1000); // after typing stops

            return () => clearTimeout(typingTimeout);
        } else {
            setLoadingState("idle");
        }
    }, [search]);

    // return (<div style={{ backgroundColor: "#f7f7f9" }}>
     return (<div>
        <div className="flex flex-col md:flex-row text-gray-900">
            <Sidebar localization={localization} />

            {/* Main Content */}
            <main className="flex-1">
                {/* Search & User */}
                <header className="flex h-20 px-4 sm:px-6 border-b border-gray-200 justify-between items-center gap-4 sm:gap-0">
                    <div className="bg-white relative w-full md:w-1/2">
                        <input
                            type="text"
                            placeholder={`${localization.explore.search} ...`}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring focus:ring-blue-200"
                            aria-label="Search Articles"
                        />
                        <div className={`absolute ${localization.rtl ? "left-3" : "right-3"} top-1/2 -translate-y-1/2`}>
                            {loadingState === "idle" && <FaMagnifyingGlass className="text-gray-400" />}
                            {loadingState === "typing" && (
                                <div className="flex gap-1">
                                    <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" />
                                    <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                                    <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                                </div>
                            )}
                            {loadingState === "loading" && (
                                <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                            )}
                        </div>
                    </div>

                    <div className="hidden md:block">
                        <User localization={localization} />
                    </div>
                </header>

                {/* Author & Content */}
                <div className="flex flex-col lg:flex-row lg:min-h-200 ">
                    <section className={`
                        pt-4 border-gray-200 border-b lg:border-b-0 
                        md:border-${localization.rtl ? "l" : "r"} w-full lg:w-80 min-w-80
                    `}>
                        <AuthorBanner
                            localization={localization}
                            userData={{
                                name: "Ronald Richards",
                                group: "#5236852",
                                avatar: "/images/13864618.jpg",
                                lastActivity: "2 Nov 2024 at 09:00AM",
                                activities: [
                                    { id: 1, user: "Eleanor Pena", action: "tagged you in a comment", time: "Today 12:00 PM", status: "accepted" },
                                    { id: 2, user: "Eleanor Pena", action: "shared deal progress", time: "Today 12:00 PM", status: ["new", "in-progress"] },
                                    { id: 3, user: "Eleanor Pena", action: "commented on Documents update", time: "Today 4:00 AM", status: null },
                                ],
                                loanPurpose: "newPurchase",
                                loanAmount: "NZ$4,50,000",
                            }}
                        />
                    </section>

                    <section className="grid place-content-start m-4 gap-8" style={{
                        gridTemplateColumns: `repeat(auto-fit, minmax(400px, 1fr))`,
                    }}>
                        {summaryId &&  <SummaryView data={{
                            image: "/images/ramzali.jpg",
                            banner: "/images/robots-banner.jpg",
                            author: { name: "Mohammad" },
                            url: localization.summary.urlLabel,
                            descriptionLabel: localization.summary.abstractLabel,
                            authorLabel: localization.summary.authorLabel,
                            title: localization.summary.title,
                            createdAt: localization.summary.createdAt,
                            reminderText: localization.summary.reminder,
                            contentHtml: "Content...",
                        }} localization={localization} id={summaryId} />}
                        {!summaryId &&  (loadingState === "loading" ? (
                            <>
                                <ShimmerCard />
                                <ShimmerCard />
                            </>
                        ) : (
                            articles.map((article) =>
                                <ArticleCard
                                    key={article.id}
                                    article={article}
                                    localization={localization} />
                            )
                           
                        ))}
                    </section>
                </div>
            </main>
        </div>

        <Divider />
        <SectionFooter localization={localization} maxWidth="0" />
    </div>
    );
}
