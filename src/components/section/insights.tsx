"use client";

import Image from "next/image";
import { useRef } from "react";
import { InsightsPillGrid } from "@/components/glass-pill";
import ScrambleText from "@/components/scramble-text";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";

export default function Insights() {
    const sectionRef = useRef<HTMLElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const monoRef = useRef<HTMLParagraphElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const section = sectionRef.current;
            const card = cardRef.current;
            const heading = headingRef.current;
            const mono = monoRef.current;
            const image = imageRef.current;

            if (!section || !card || !heading || !mono || !image) return;

            const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            if (reducedMotion) return;

            const pills = Array.from(section.querySelectorAll<HTMLElement>("[data-pills] > *"));
            const monoSpan = mono.querySelector<HTMLElement>("span");
            const monoText = monoSpan?.textContent ?? "";

            const split = SplitText.create(heading, {
                type: "words, chars",
                aria: "auto",
            });

            gsap.set(split.chars, {
                display: "inline-block",
                autoAlpha: 0,
                yPercent: 60,
                filter: "blur(12px)",
            });
            gsap.set(mono, { autoAlpha: 0 });
            gsap.set(image, { autoAlpha: 0, scale: 1.06, transformOrigin: "center center" });
            gsap.set(pills, { autoAlpha: 0, y: 20 });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "top 70%",
                    once: true,
                },
            });

            tl.from(card, {
                clipPath: "inset(0 0 100% 0)",
                duration: 0.9,
                ease: "power3.out",
            });

            tl.to(
                split.chars,
                {
                    autoAlpha: 1,
                    yPercent: 0,
                    filter: "blur(0px)",
                    duration: 0.6,
                    ease: "power3.out",
                    stagger: 0.02,
                },
                "-=0.35",
            );
            tl.to(mono, { autoAlpha: 1, duration: 0.2 }, "-=0.2");
            if (monoSpan) {
                tl.to(
                    monoSpan,
                    {
                        duration: 0.8,
                        scrambleText: { text: monoText, chars: "upperCase", speed: 1.2 },
                    },
                    "<",
                );
            }

            tl.to(
                image,
                { autoAlpha: 1, scale: 1, duration: 0.7, ease: "power3.out" },
                "-=0.4",
            );

            tl.to(
                pills,
                { autoAlpha: 1, y: 0, duration: 0.5, ease: "power3.out", stagger: 0.08 },
                "-=0.3",
            );

            return () => {
                split.revert();
            };
        },
        { scope: sectionRef },
    );

    return (
        <section ref={sectionRef} id="insights" className="relative overflow-hidden py-12 md:py-16 lg:py-20">
            <div className="mx-auto max-w-8xl lg:px-10 md:px-8 sm:px-6 px-4">
                <div ref={cardRef} className="lg:h-150 rounded-2xl overflow-hidden bg-foreground text-background grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                    <div className="flex flex-col justify-between gap-10 p-6 sm:p-10 lg:p-16 lg:pr-0">
                        <div className="flex flex-col gap-6 lg:gap-10">
                            <h2 ref={headingRef} className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-[1.1] tracking-[-0.02em]">
                                Achieve mental clarity with wellness tools.
                            </h2>
                            <InsightsPillGrid />
                        </div>
                        <p ref={monoRef} className="font-mono font-medium tracking-wider uppercase text-sm lg:text-base">
                            <ScrambleText>Obscura simplifies into one intuitive system.</ScrambleText>
                        </p>
                    </div>
                    <div ref={imageRef} className="overflow-hidden relative min-h-72 sm:min-h-96 lg:min-h-0">
                        <Image src="/mental.svg" alt="Mental" fill className="object-contain w-full" />
                    </div>

                </div>
            </div>
        </section>
    );
}
