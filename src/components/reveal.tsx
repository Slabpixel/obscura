"use client";

import { createElement, useRef, type ElementType, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

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

    useGSAP(
        () => {
            const el = ref.current;
            if (!el) return;

            const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            if (reducedMotion) return;

            const targets = stagger ? Array.from(el.children) : [el];
            if (targets.length === 0) return;

            gsap.set(targets, { autoAlpha: 0, y, filter: `blur(${blur}px)` });

            gsap.to(targets, {
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
        },
        {
            scope: ref,
            dependencies: [trigger, delay, stagger, y, blur, duration, start],
            revertOnUpdate: true,
        },
    );

    return createElement(as, { ref, className }, children);
}
