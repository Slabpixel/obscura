"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "lenis/react";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function LenisScrollTriggerBridge() {
    const lenis = useLenis();

    useEffect(() => {
        if (!lenis) return;

        ScrollTrigger.scrollerProxy(document.documentElement, {
            scrollTop(value) {
                if (arguments.length && value !== undefined) {
                    lenis.scrollTo(value, { immediate: true });
                }
                return lenis.scroll;
            },
            getBoundingClientRect() {
                return {
                    top: 0,
                    left: 0,
                    width: window.innerWidth,
                    height: window.innerHeight,
                };
            },
            pinType: "transform",
        });

        const onRefresh = () => lenis.resize();
        ScrollTrigger.addEventListener("refresh", onRefresh);
        ScrollTrigger.refresh();

        return () => {
            ScrollTrigger.removeEventListener("refresh", onRefresh);
            ScrollTrigger.scrollerProxy(document.documentElement, {});
        };
    }, [lenis]);

    return null;
}
