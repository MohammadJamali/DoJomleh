"use client";

import { Navbar } from "@/app/components/core/HeaderNavigation/Navbar";
import RippleButton from "@/app/components/core/RippleButton";
import ShimmerCard from "@/app/components/core/ShimmerCard";
import TagGroup from "@/app/components/core/TagGroup";
import { Dictionary } from "@/lib/dictionary-types";
import { useEffect, useState } from "react";
import {
    FaEllipsis, FaHeart, FaComment, FaShare,
    FaChevronLeft, FaChevronRight, FaMagnifyingGlass,
    FaFigma, FaReact, FaWebflow
} from "react-icons/fa6";


export default function Explore({localization}: {
    localization: Dictionary;
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
                    setLoadingState("done");
                }, 1000); // after shimmer
            }, 1000); // after typing stops

            return () => clearTimeout(typingTimeout);
        } else {
            setLoadingState("idle");
        }
    }, [search]);

    return (<div>
        <Navbar localization={localization} />
        <div className="flex min-h-screen bg-white text-gray-900">
            {/* Sidebar */}
            {sidebarOpen && (
                <aside className="w-64 border-r border-gray-200 p-4 bg-white transition-all">
                    <div className="flex justify-between items-center mb-4 ">
                        <h2 className="font-semibold text-lg">Filters</h2>
                        <button
                            className="p-1 hover:bg-gray-100 rounded"
                            onClick={() => setSidebarOpen(false)}
                        >
                            <FaChevronLeft />
                        </button>
                    </div>
                    <TagGroup
                        title="Platform"
                        tags={[
                            { label: "Webflow", icon: <FaWebflow /> },
                            { label: "Framer", icon: <FaReact /> },
                            { label: "Figma", icon: <FaFigma /> },
                        ]}
                    />
                    <TagGroup title="Categories" tags={[
                        { label: "Navigation" },
                        { label: "Header" },
                        { label: "Pricing" },
                        { label: "Footer" },
                        { label: "FAQ" },
                    ]} />
                    <TagGroup title="Categories" tags={[
                        { label: "Dark mode" },
                        { label: "Crypto" },
                        { label: "SaaS" }
                    ]} />
                </aside>
            )}
            {!sidebarOpen && (
                <button
                    className="p-2 hover:bg-gray-100 border-r border-gray-200"
                    onClick={() => setSidebarOpen(true)}
                >
                    <FaChevronRight />
                </button>
            )}
            {/* Main */}
            <main className="flex-1 p-6 ml-4">
                {/* Search & Sort */}
                <div className="flex justify-between items-center mb-6">
                    <div className="relative w-1/2">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring focus:ring-blue-200"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            {loadingState === "idle" && <FaMagnifyingGlass className="text-gray-400" />}
                            {loadingState === "typing" && (
                                <div className="flex gap-1">
                                    <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" />
                                    <span
                                        className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"
                                        style={{ animationDelay: "0.1s" }}
                                    />
                                    <span
                                        className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"
                                        style={{ animationDelay: "0.2s" }}
                                    />
                                </div>
                            )}
                            {loadingState === "loading" && (
                                <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                            )}
                        </div>
                    </div>

                    <select className="border border-gray-300 rounded-lg px-2 py-1 text-sm">
                        <option>Popular</option>
                        <option>Newest</option>
                        <option>Oldest</option>
                    </select>
                </div>

                {/* Content */}
                {loadingState === "loading" ? (
                    <div className="space-y-4">
                        <ShimmerCard />
                        <ShimmerCard />
                    </div>
                ) : (
                    <div className="space-y-4">
                        {articles.map((a) => (
                            <div
                                key={a.id}
                                className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm"
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 bg-gray-300 rounded-full" />
                                        <span className="font-medium">{a.user}</span>
                                    </div>
                                    <FaEllipsis className="text-gray-400" />
                                </div>
                                <h2 className="font-semibold mb-2">{a.title}</h2>
                                <p className="text-sm text-gray-600 mb-3">{a.content}</p>
                                <div className="flex items-center gap-4 text-sm">
                                    <RippleButton className="flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-100">
                                        <FaHeart className="text-red-500" /> {a.likes} Like
                                    </RippleButton>
                                    <RippleButton className="flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-100">
                                        <FaComment /> Comment
                                    </RippleButton>
                                    <RippleButton className="flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-100">
                                        <FaShare /> Share
                                    </RippleButton>
                                    <RippleButton className="ml-auto px-2 py-1 rounded hover:bg-gray-100">
                                        🔖 Bookmark
                                    </RippleButton>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>

    </div>
    );
}
