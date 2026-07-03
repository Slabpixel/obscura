"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image, { type ImageProps } from "next/image";
import { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

type ParallaxImageProps = ImageProps & {
    /** Vertical travel in percent of the image height (applied both directions). */
    strength?: number;
    /** Initial scale used to hide the edges as the image translates. */
    scale?: number;
};

export default function ParallaxImage({ strength = 12, scale, className, ...imageProps }: ParallaxImageProps) {
    const ref = useRef<HTMLImageElement>(null);

    useLayoutEffect(() => {
        const el = ref.current;
        if (!el) return;

        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reducedMotion) return;

        const trigger = el.parentElement;
        if (!trigger) return;

        const coverScale = scale ?? 1 + (strength * 2) / 100;

        const ctx = gsap.context(() => {
            gsap.set(el, { scale: coverScale, transformOrigin: "center center" });
            gsap.fromTo(
                el,
                { yPercent: -strength },
                {
                    yPercent: strength,
                    ease: "none",
                    scrollTrigger: {
                        trigger,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true,
                    },
                },
            );
        });

        return () => ctx.revert();
    }, [strength, scale]);

    return <Image ref={ref} className={className} {...imageProps} />;
}
