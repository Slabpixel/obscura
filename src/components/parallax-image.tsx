"use client";

import Image, { type ImageProps } from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type ParallaxImageProps = ImageProps & {
    /** Vertical travel in percent of the image height (applied both directions). */
    strength?: number;
    /** Initial scale used to hide the edges as the image translates. */
    scale?: number;
};

export default function ParallaxImage({ strength = 12, scale, className, ...imageProps }: ParallaxImageProps) {
    const ref = useRef<HTMLImageElement>(null);

    useGSAP(
        () => {
            const el = ref.current;
            if (!el) return;

            const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            if (reducedMotion) return;

            const trigger = el.parentElement;
            if (!trigger) return;

            const coverScale = scale ?? 1 + (strength * 2) / 100;

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
        },
        { scope: ref, dependencies: [strength, scale], revertOnUpdate: true },
    );

    return <Image ref={ref} className={className} {...imageProps} />;
}
