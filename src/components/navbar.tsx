"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
    { href: "#features", label: "features" },
    { href: "#insights", label: "Insights" },
    { href: "#how-it-works", label: "How it works" },
    { href: "#pricing", label: "Pricing" },
] as const;

export default function Navbar() {
    const [activeSection, setActiveSection] = useState("features");

    useEffect(() => {
        const triggers = NAV_LINKS.flatMap(({ href }) => {
            const id = href.slice(1);
            const element = document.getElementById(id);
            if (!element) return [];

            return ScrollTrigger.create({
                trigger: element,
                start: "top 45%",
                end: "bottom 45%",
                onToggle: ({ isActive }) => {
                    if (isActive) setActiveSection(id);
                },
            });
        });

        return () => triggers.forEach((trigger) => trigger.kill());
    }, []);

    return (
        <nav className="fixed font-mono text-background whitespace-nowrap flex items-center justify-center font-medium uppercase tracking-wider lg:px-10 md:px-8 sm:px-6 px-4 top-5 w-full mx-auto z-100">
            <div className="gradient-border mx-auto max-w-8xl bg-background/10 w-full backdrop-blur-xl rounded-[1.25rem] flex items-center h-20 p-3">
                <div className="flex flex-1 items-center">
                    <a href="/" className="h-full place-content-center w-fit">
                        <Image src="/logo.svg" alt="Logo" width={144} height={48} />
                    </a>
                </div>
                <div className="flex h-full items-center justify-center p-2 rounded-lg bg-foreground gap-2">
                    {NAV_LINKS.map(({ href, label }) => {
                        const id = href.slice(1);
                        return (
                            <a
                                key={href}
                                href={href}
                                aria-current={activeSection === id ? "page" : undefined}
                                className={`nav-link${activeSection === id ? " is-active" : ""}`}
                            >
                                {label}
                            </a>
                        );
                    })}
                </div>
                <div className="flex flex-1 items-center justify-end gap-6 h-full">
                    <a href="/login" className="opacity-80 ">
                        Log In
                    </a>
                    <a href="/signup" className="btn-gradient gradient-border-inner rounded-2xl h-full gap-2.5 flex items-center justify-center px-4">
                        <span>Get Started</span>
                        <span className="rounded-full bg-background size-7 flex items-center justify-center">
                            <Image src="plus.svg" alt="Plus" width={16} height={16} />
                        </span>
                    </a>
                </div>
            </div>
        </nav>
    );
}
