"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { GoLink } from "react-icons/go";
import {
    FaTelegram,
    FaYoutube,
    FaPodcast,
    FaFileCirclePlus,
    FaSignature,
} from "react-icons/fa6";
import styles from "./upload-card.module.css";
import { Dictionary } from "@/lib/dictionary-types";

type Props = {
    localization: Dictionary;
    data: {
        image: string;
        banner?: string;
        author: { name: string };
        urlLabel: string;
        descriptionLabel: string;
        authorLabel: string;
        title: string;
        createdAt: string;
        reminderText: string;
        contentHtml?: string;
    };
};

export default function UploadCard({ data, localization }: Props) {
    // Refs
    const articleRef = useRef<HTMLDivElement | null>(null);
    const bodyRef = useRef<HTMLDivElement | null>(null);
    const reminderBtnRef = useRef<HTMLButtonElement | null>(null);

    // Responsive mode
    const [isShort, setIsShort] = useState<boolean>(() => {
        if (typeof window === "undefined") return false;
        return window.innerHeight < 728;
    });

    // fades
    const [showTopFade, setShowTopFade] = useState(false);
    const [showBottomFade, setShowBottomFade] = useState(false);

    // Form state
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState<string[]>(["Design"]);
    const [tagInput, setTagInput] = useState("");
    // URL & channel
    const [url, setUrl] = useState<string>("");
    const [channelDatasource, setChannelDatasource] = useState<boolean>(false);

    // file state (audio/video only)
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [filePreviewUrl, setFilePreviewUrl] = useState<string | null>(null);
    const [filePreviewType, setFilePreviewType] = useState<string | null>(null);

    // helpers for scroll element
    const getScrollEl = useCallback(() => (isShort ? articleRef.current : bodyRef.current), [isShort]);

    const updateFades = useCallback(() => {
        const el = getScrollEl();
        if (!el) {
            setShowTopFade(false);
            setShowBottomFade(false);
            return;
        }
        const top = el.scrollTop;
        const bottom = el.scrollTop + el.clientHeight;
        setShowTopFade(top > 8);
        setShowBottomFade(bottom + 8 < el.scrollHeight);
    }, [getScrollEl]);

    useEffect(() => {
        const onResize = () => setIsShort(window.innerHeight < 728);
        onResize();
        window.addEventListener("resize", onResize);
        // initial fades
        setTimeout(updateFades, 0);
        return () => window.removeEventListener("resize", onResize);
    }, [updateFades]);

    useEffect(() => {
        const el = getScrollEl();
        if (!el) return;
        updateFades();
        const handler = () => updateFades();
        el.addEventListener("scroll", handler, { passive: true });
        return () => el.removeEventListener("scroll", handler);
    }, [getScrollEl, updateFades, isShort]);

    // icon detection for URL
    const getIconForUrl = (value: string | null) => {
        if (!value) return <GoLink className="text-gray-600" />;
        try {
            const u = new URL(value);
            const host = u.hostname.toLowerCase();
            if (host.includes("t.me") || host.includes("telegram")) return <FaTelegram className="text-blue-500" />;
            if (host.includes("youtube") || host.includes("youtu.be")) return <FaYoutube className="text-red-500" />;
            if (host.includes("castbox") || host.includes("podcast")) return <FaPodcast className="text-indigo-600" />;
            // fallback generic icon
            return <GoLink className="text-gray-600" />;
        } catch {
            // not a valid URL yet
            return <GoLink className="text-gray-400" />;
        }
    };

    // actions
    const handleAction = (action: string) => {
        console.log("action:", action);
    };

    // tags helpers
    const addTag = (t: string) => {
        const tag = t.trim();
        if (!tag || tags.includes(tag)) return;
        setTags((s) => [...s, tag].slice(0, 20));
        setTagInput("");
    };
    const removeTag = (t: string) => setTags((s) => s.filter((x) => x !== t));
    const handleTagKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addTag(tagInput);
        } else if (e.key === "Backspace" && tagInput === "") {
            setTags((s) => s.slice(0, -1));
        }
    };

    // ripple
    const createRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
        const btn = reminderBtnRef.current;
        if (!btn) return;
        const circle = document.createElement("span");
        const diameter = Math.max(btn.clientWidth, btn.clientHeight);
        const radius = diameter / 2;
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${e.clientX - btn.getBoundingClientRect().left - radius}px`;
        circle.style.top = `${e.clientY - btn.getBoundingClientRect().top - radius}px`;
        circle.className = styles.ripple;
        const prev = btn.getElementsByClassName(styles.ripple)[0];
        if (prev) prev.remove();
        btn.appendChild(circle);
    };

    const headIconClasses = "";

    // file handling: audio/video only
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        if (!file) return;
        // enforce audio|video mime (just in case)
        if (!file.type.startsWith("audio") && !file.type.startsWith("video")) {
            alert("Please select an audio or video file.");
            return;
        }

        // selecting a file resets URL
        setUrl("");
        setChannelDatasource(false);

        // revoke old preview
        if (filePreviewUrl) URL.revokeObjectURL(filePreviewUrl);

        const preview = URL.createObjectURL(file);
        setSelectedFile(file);
        setFilePreviewUrl(preview);
        setFilePreviewType(file.type);
    };

    // clearing selected file
    const clearSelectedFile = () => {
        if (filePreviewUrl) URL.revokeObjectURL(filePreviewUrl);
        setSelectedFile(null);
        setFilePreviewUrl(null);
        setFilePreviewType(null);
    };

    // when url changes we should disable file upload (mutual exclusivity)
    useEffect(() => {
        if (url && selectedFile) {
            // ensure mutual exclusivity: if there is a url and a selected file, clear file
            clearSelectedFile();
        }
        updateFades();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url]);

    // UI helpers: whether upload input should be disabled
    const uploadDisabled = !!url.trim();

    return (
        <section className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-md z-50 p-4">
            <div
                ref={articleRef}
                className="bg-white rounded-xl shadow-xl w-full max-w-xl overflow-hidden flex flex-col text-gray-800"
                style={{ height: "min(100vh, 728px)" }}
                role="dialog"
                aria-labelledby="upload-title"
            >
                {/* HEADER 20% */}
                <header className="flex items-center justify-between px-5" style={{ flex: "0 0 20%" }}>
                    <div>
                        <h2 id="upload-title" className="text-xl font-semibold items-center">
                            <p className="flex items-center">{localization.request.requestA} <FaFileCirclePlus className="size-10 h-6 p-1 mx-2 rounded-xl bg-gray-200 border-gray-200 text-gray-600" /></p>
                            {
                                localization.rtl
                                    ? <p><span className="text-gray-400">{localization.request.summarization}</span> {localization.request.new}</p>
                                    : <p>{localization.request.new} <span className="text-gray-400">{localization.request.summarization}</span></p>
                            }
                        </h2>
                        <p className="text-xs mt-3 text-gray-500">
                            {localization.request.subtitle}
                        </p>
                    </div>

                    <div className="relative">
                        <FaPodcast className={
                            `absolute -bottom-3 size-10 p-2 rounded-lg 
                            border border-2 focus:outline-none bg-white 
                            border-gray-200 text-gray-600`
                        } style={{ [localization.rtl ? "left" : "right"]: 64 }} />
                        <FaYoutube className={
                            `absolute bottom-0 rotate-15 size-10 p-2 
                            rounded-lg border border-2 focus:outline-none 
                            bg-white border-gray-200 text-gray-600
                        `} style={{ [localization.rtl ? "left" : "right"]: 32 }} />
                        <FaTelegram className={
                            `absolute -bottom-3 -rotate-15 size-10 p-2 
                            rounded-lg border border-2 focus:outline-none 
                            bg-white border-gray-200 text-gray-600
                        `} style={{ [localization.rtl ? "left" : "right"]: 0 }} />
                    </div>
                </header>

                {/* BODY 70% */}
                <div className="relative px-5" style={{ flex: "1 1 70%", minHeight: 0 }}>
                    <div ref={bodyRef} className="h-full overflow-auto overscroll-contain py-3" style={{ WebkitOverflowScrolling: "touch" }}>
                        <div className="space-y-4">
                            {/* Upload area (audio/video) */}
                            <div className={
                                `rounded-lg border border-dashed
                                border-gray-200 p-4 text-center
                                ${!isShort && "flex flex-col items-center justify-center relative"} 
                                ${uploadDisabled ? "opacity-60" : ""}`}>
                                <label htmlFor="file" className={
                                    `w-full cursor-pointer 
                                    ${selectedFile && filePreviewUrl && "hidden"} 
                                    ${uploadDisabled ? "pointer-events-none" : ""}`}>
                                    <div className={`h-36 w-full rounded-md flex flex-col items-center justify-center bg-gray-50`}>
                                        <p className="text-sm text-gray-500">{localization.request.uploadFile}</p>
                                        <p className="text-xs text-gray-400 mt-2">{localization.request.fileExtentions}</p>
                                    </div>
                                    <input
                                        id="file"
                                        type="file"
                                        accept="audio/*,video/*"
                                        onChange={handleFileChange}
                                        className="sr-only"
                                        disabled={uploadDisabled}
                                    />
                                </label>

                                {/* preview if selected */}
                                {selectedFile && filePreviewUrl && (
                                    <div className="mt-3 w-full">
                                        {filePreviewType?.startsWith("video") ? (
                                            <video src={filePreviewUrl} controls className="w-full rounded-md max-h-56 object-cover" />
                                        ) : (
                                            <audio src={filePreviewUrl} controls className="w-full" />
                                        )}

                                        <div className="mt-2 flex items-center justify-between gap-3">
                                            <div className="text-sm text-gray-700">{selectedFile.name}</div>
                                            <button onClick={clearSelectedFile} className="text-sm px-2 py-1 border rounded-md">
                                                {localization.request.remove}
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* overlay when disabled due to URL */}
                                {uploadDisabled && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-white pointer-events-none rounded-lg">
                                        <div className="text-sm text-gray-600">{localization.request.disabledFile}</div>
                                    </div>
                                )}
                            </div>

                            {/* URL row: icon | input | Channel Datasource checkbox */}
                            <div className="flex flex-col gap-3">
                                <label className="flex-1 text-sm text-gray-700 block mb-1">
                                    {localization.request?.urlLabel ?? "Source URL"}
                                    <span className="text-red-500">*</span>
                                </label>
                                <div className="flex gap-2 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2">
                                    <div className="flex items-center justify-center">
                                        {getIconForUrl(url || null)}
                                    </div>
                                    <input
                                        type="url"
                                        dir="ltr"
                                        value={url}
                                        onChange={(e) => {
                                            setUrl(e.target.value);
                                            // whenever url is typed we clear selected file to ensure exclusivity
                                            if (selectedFile) {
                                                clearSelectedFile();
                                            }
                                        }}
                                        placeholder="https://..."
                                        className="w-full"
                                        aria-describedby="channel-datasource"
                                    />
                                </div>

                            </div>

                            {/* Prompt */}
                            <div>
                                <label className="text-sm text-gray-700 block mb-1">{localization.request.summarizationPrompt} <span className="text-red-500">*</span></label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    rows={4}
                                    className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2" />
                            </div>

                            {/* Tags */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="text-sm text-gray-700">{localization.request.tags}</label>
                                    <span className="text-xs text-gray-400">{Math.max(0, 12 - tags.length)} {localization.request.tagsRemaining}</span>
                                </div>

                                <div className="flex flex-wrap gap-2 items-center">
                                    {tags.map((t) => (
                                        <div key={t} className="inline-flex items-center gap-2 bg-gray-100 rounded-md px-3 py-1 text-sm">
                                            <span>{t}</span>
                                            <button aria-label={`remove-${t}`} onClick={() => removeTag(t)} className="p-1 rounded hover:bg-gray-200">
                                                ×
                                            </button>
                                        </div>
                                    ))}

                                    <input
                                        value={tagInput}
                                        onChange={(e) => setTagInput(e.target.value)}
                                        onKeyDown={handleTagKey}
                                        placeholder={localization.request.addTags}
                                        className="min-w-[120px] flex-1 rounded-md border px-3 py-2 text-sm" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* fades */}
                    {showTopFade && <div className="pointer-events-none absolute left-0 right-0 top-0 h-8 bg-gradient-to-b from-white to-transparent z-40" />}
                    {showBottomFade && <div className="pointer-events-none absolute left-0 right-0 bottom-0 h-8 bg-gradient-to-t from-white to-transparent z-40" />}
                </div>

                {/* FOOTER 10% */}
                <footer className="px-5 py-3 flex items-center justify-between gap-3" style={{ flex: "0 0 10%" }}>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-green-500 block" />
                            <span className="text-sm text-gray-600">{localization.request.acceptingRequest}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button onClick={() => handleAction("cancel")} className="px-4 py-2 border rounded-md">{localization.request.cancel}</button>

                        <button
                            ref={reminderBtnRef}
                            onClick={(e) => {
                                createRipple(e);
                                handleAction("schedule");
                            }}
                            className="relative overflow-hidden px-5 py-2 rounded-md bg-slate-900 text-white flex items-center gap-2"
                        >
                            <FaSignature />
                            <span>{localization.request.request}</span>
                        </button>
                    </div>
                </footer>
            </div>
        </section>
    );
}
