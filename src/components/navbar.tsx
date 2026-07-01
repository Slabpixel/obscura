"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
    { href: "#features", label: "features" },
    { href: "#insights", label: "Insights" },
    { href: "#how-it-works", label: "How it works" },
    { href: "#pricing", label: "Pricing" },
] as const;

export default function Navbar() {
    const [activeSection, setActiveSection] = useState("features");
    const navRef = useRef<HTMLDivElement>(null);
    const indicatorRef = useRef<HTMLDivElement>(null);
    const linkRefs = useRef<Partial<Record<string, HTMLAnchorElement | null>>>({});
    const hasAnimated = useRef(false);

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

    useLayoutEffect(() => {
        const nav = navRef.current;
        const indicator = indicatorRef.current;
        const activeLink = linkRefs.current[activeSection];

        if (!nav || !indicator || !activeLink) return;

        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const navRect = nav.getBoundingClientRect();
        const linkRect = activeLink.getBoundingClientRect();

        gsap.to(indicator, {
            x: linkRect.left - navRect.left,
            y: linkRect.top - navRect.top,
            width: linkRect.width,
            height: linkRect.height,
            opacity: 1,
            duration: hasAnimated.current && !reducedMotion ? 0.45 : 0,
            ease: "power3.out",
            overwrite: true,
        });

        hasAnimated.current = true;
    }, [activeSection]);

    useEffect(() => {
        const onResize = () => {
            const nav = navRef.current;
            const indicator = indicatorRef.current;
            const activeLink = linkRefs.current[activeSection];

            if (!nav || !indicator || !activeLink) return;

            const navRect = nav.getBoundingClientRect();
            const linkRect = activeLink.getBoundingClientRect();

            gsap.set(indicator, {
                x: linkRect.left - navRect.left,
                y: linkRect.top - navRect.top,
                width: linkRect.width,
                height: linkRect.height,
            });
        };

        window.addEventListener("resize", onResize);
        ScrollTrigger.addEventListener("refresh", onResize);

        return () => {
            window.removeEventListener("resize", onResize);
            ScrollTrigger.removeEventListener("refresh", onResize);
        };
    }, [activeSection]);

    return (
        <nav className="fixed font-mono text-background whitespace-nowrap flex items-center justify-center font-medium uppercase tracking-wider lg:px-10 md:px-8 sm:px-6 px-4 top-5 w-full mx-auto z-100">
            <div className="gradient-border mx-auto max-w-8xl bg-background/10 w-full backdrop-blur-xl rounded-[1.25rem] flex items-center h-20 p-3">
                <div className="flex flex-1 items-center">
                    <a href="/" className="h-full place-content-center w-fit">
                        <Image src="/logo.svg" alt="Logo" width={144} height={48} />
                    </a>
                </div>
                <div
                    ref={navRef}
                    className="relative flex h-full items-center justify-center rounded-lg bg-foreground p-2 gap-2"
                >
                    <div
                        ref={indicatorRef}
                        className="nav-link-indicator btn-gradient gradient-border-inner opacity-0"
                        aria-hidden
                    />
                    {NAV_LINKS.map(({ href, label }) => {
                        const id = href.slice(1);
                        return (
                            <a
                                key={href}
                                ref={(el) => {
                                    linkRefs.current[id] = el;
                                }}
                                href={href}
                                aria-current={activeSection === id ? "page" : undefined}
                                className="nav-link"
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
