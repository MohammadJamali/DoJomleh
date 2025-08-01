"use client";

import {
    KBarProvider,
    KBarPortal,
    KBarPositioner,
    KBarAnimator,
    KBarSearch,
} from "kbar";
import { RenderResults } from "./ResultsRenderer";
import { initialActions } from "@/lib/kbar_actions";

export interface KBarWrapperProps {
    children: React.ReactNode;
}

export default function KBar({ children }: KBarWrapperProps) {
    return (
        <KBarProvider actions={initialActions}>
            <KBarPortal>
                <KBarPositioner className="backdrop-blur-sm ">
                    <KBarAnimator className="max-w-[600px] w-full rounded-xl overflow-hidden bg-gray-50 text-gray-800 shadow-[rgba(0,_0,_0,_0.24)_0px_0px_40px] shadow-slate-300 ">
                        <KBarSearch className="py-3 px-4 text-base w-full box-border outline-none border-none bg-gray-50 text-gray-800 " />
                        <RenderResults />
                    </KBarAnimator>
                </KBarPositioner>
            </KBarPortal>
            {children}
        </KBarProvider>
    )
}
