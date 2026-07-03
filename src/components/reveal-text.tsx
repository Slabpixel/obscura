"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { createElement, useLayoutEffect, useRef, type ElementType } from "react";

gsap.registerPlugin(ScrollTrigger, SplitText);

type RevealTextProps = {
    as?: ElementType;
    children: string;
    className?: string;
    trigger?: "scroll" | "load";
    delay?: number;
    stagger?: number;
    duration?: number;
    start?: string;
};

export default function RevealText({
    as = "span",
    children,
    className,
    trigger = "scroll",
    delay = 0,
    stagger = 0.02,
    duration = 0.6,
    start = "top 85%",
}: RevealTextProps) {
    const ref = useRef<HTMLElement>(null);

    useLayoutEffect(() => {
        const el = ref.current;
        if (!el) return;

        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reducedMotion) return;

        let split: SplitText | undefined;

        const ctx = gsap.context(() => {
            // autoSplit re-splits on font load / width change; returning the tween
            // from onSplit lets SplitText clean up and resume progress on re-split.
            split = SplitText.create(el, {
                type: "words, chars",
                autoSplit: true,
                aria: "auto",
                onSplit(self) {
                    gsap.set(self.chars, { display: "inline-block" });

                    return gsap.from(self.chars, {
                        autoAlpha: 0,
                        yPercent: 60,
                        filter: "blur(12px)",
                        duration,
                        ease: "power3.out",
                        stagger,
                        delay,
                        ...(trigger === "scroll"
                            ? { scrollTrigger: { trigger: el, start, once: true } }
                            : {}),
                    });
                },
            });
        }, ref);

        return () => {
            ctx.revert();
            split?.revert();
        };
    }, [children, trigger, delay, stagger, duration, start]);

    return createElement(as, { ref, className }, children);
}
