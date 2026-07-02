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
    const [menuOpen, setMenuOpen] = useState(false);
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
        // Desktop links are hidden on mobile — skip while collapsed
        if (activeLink.offsetParent === null) return;

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
            if (activeLink.offsetParent === null) return;

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

    // Close the mobile menu once the viewport reaches the desktop layout
    useEffect(() => {
        const media = window.matchMedia("(min-width: 64rem)");
        const onChange = () => {
            if (media.matches) setMenuOpen(false);
        };
        media.addEventListener("change", onChange);
        return () => media.removeEventListener("change", onChange);
    }, []);

    const closeMenu = () => setMenuOpen(false);

    return (
        <nav className="fixed font-mono text-background whitespace-nowrap font-medium uppercase tracking-wider lg:px-10 md:px-8 sm:px-6 px-4 top-3 sm:top-5 w-full mx-auto z-100">
            <div className="gradient-border mx-auto max-w-8xl bg-background/10 w-full backdrop-blur-xl rounded-[1.25rem] flex flex-col">
                <div className="flex items-center h-16 lg:h-20 p-3">
                    <div className="flex flex-1 items-center">
                        <a href="/" className="h-full place-content-center w-fit">
                            <Image src="/logo.svg" alt="Logo" width={144} height={48} className="w-28 lg:w-36 h-auto" />
                        </a>
                    </div>

                    <div
                        ref={navRef}
                        className="relative hidden lg:flex h-full items-center justify-center rounded-lg bg-foreground p-2 gap-2"
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

                    <div className="hidden lg:flex flex-1 items-center justify-end gap-6 h-full">
                        <a href="/login" className="opacity-80">
                            Log In
                        </a>
                        <a href="/signup" className="btn-gradient gradient-border-inner rounded-2xl h-full gap-2.5 flex items-center justify-center px-4">
                            <span>Get Started</span>
                            <span className="rounded-full bg-background size-7 flex items-center justify-center">
                                <Image src="plus.svg" alt="Plus" width={16} height={16} />
                            </span>
                        </a>
                    </div>

                    <button
                        type="button"
                        onClick={() => setMenuOpen((open) => !open)}
                        aria-expanded={menuOpen}
                        aria-label={menuOpen ? "Close menu" : "Open menu"}
                        className="lg:hidden relative flex size-10 items-center justify-center rounded-lg bg-foreground"
                    >
                        <span
                            className={`absolute h-0.5 w-5 rounded-full bg-background transition-transform duration-300 ${
                                menuOpen ? "rotate-45" : "-translate-y-1.5"
                            }`}
                        />
                        <span
                            className={`absolute h-0.5 w-5 rounded-full bg-background transition-opacity duration-300 ${
                                menuOpen ? "opacity-0" : "opacity-100"
                            }`}
                        />
                        <span
                            className={`absolute h-0.5 w-5 rounded-full bg-background transition-transform duration-300 ${
                                menuOpen ? "-rotate-45" : "translate-y-1.5"
                            }`}
                        />
                    </button>
                </div>

                <div
                    className={`lg:hidden grid transition-[grid-template-rows] duration-300 ease-out ${
                        menuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                >
                    <div className="overflow-hidden">
                        <div className="flex flex-col gap-2 p-3 pt-0">
                            <div className="flex flex-col rounded-lg bg-foreground p-2 gap-1">
                                {NAV_LINKS.map(({ href, label }) => {
                                    const id = href.slice(1);
                                    const isActive = activeSection === id;
                                    return (
                                        <a
                                            key={href}
                                            href={href}
                                            onClick={closeMenu}
                                            aria-current={isActive ? "page" : undefined}
                                            className={`flex items-center rounded-lg px-4 py-3 ${
                                                isActive ? "btn-gradient gradient-border-inner" : ""
                                            }`}
                                        >
                                            {label}
                                        </a>
                                    );
                                })}
                            </div>
                            <div className="flex items-center gap-2">
                                <a
                                    href="/login"
                                    onClick={closeMenu}
                                    className="flex flex-1 items-center justify-center rounded-lg bg-foreground px-4 py-3"
                                >
                                    Log In
                                </a>
                                <a
                                    href="/signup"
                                    onClick={closeMenu}
                                    className="btn-gradient gradient-border-inner flex flex-1 items-center justify-center gap-2.5 rounded-lg px-4 py-3"
                                >
                                    <span>Get Started</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
