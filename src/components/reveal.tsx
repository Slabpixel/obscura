"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createElement, useLayoutEffect, useRef, type ElementType, type ReactNode } from "react";

gsap.registerPlugin(ScrollTrigger);

type RevealProps = {
    as?: ElementType;
    children: ReactNode;
    className?: string;
    trigger?: "scroll" | "load";
    delay?: number;
    /** When set, the element's direct children are revealed with this stagger. */
    stagger?: number;
    y?: number;
    blur?: number;
    duration?: number;
    start?: string;
};

export default function Reveal({
    as = "div",
    children,
    className,
    trigger = "scroll",
    delay = 0,
    stagger,
    y = 24,
    blur = 8,
    duration = 0.7,
    start = "top 85%",
}: RevealProps) {
    const ref = useRef<HTMLElement>(null);

    useLayoutEffect(() => {
        const el = ref.current;
        if (!el) return;

        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reducedMotion) return;

        const targets = stagger ? Array.from(el.children) : [el];
        if (targets.length === 0) return;

        gsap.set(targets, { autoAlpha: 0, y, filter: `blur(${blur}px)` });

        const tween = gsap.to(targets, {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration,
            ease: "power3.out",
            stagger: stagger ?? 0,
            delay,
            ...(trigger === "scroll"
                ? { scrollTrigger: { trigger: el, start, once: true } }
                : {}),
        });

        return () => {
            tween.scrollTrigger?.kill();
            tween.kill();
            gsap.set(targets, { clearProps: "all" });
        };
    }, [trigger, delay, stagger, y, blur, duration, start]);

    return createElement(as, { ref, className }, children);
}
