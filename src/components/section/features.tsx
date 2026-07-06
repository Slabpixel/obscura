"use client";

import Image from "next/image";
import { useRef } from "react";
import ParallaxImage from "@/components/parallax-image";
import RevealText from "@/components/reveal-text";
import { gsap, useGSAP } from "@/lib/gsap";

export default function Features() {
    const gridRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const grid = gridRef.current;
            if (!grid) return;

            const cards = Array.from(grid.children) as HTMLElement[];
            const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            if (reducedMotion) return;

            gsap.set(cards, {
                autoAlpha: 0,
                y: 32,
                clipPath: "inset(0 0 100% 0)",
            });

            gsap.to(cards, {
                autoAlpha: 1,
                y: 0,
                clipPath: "inset(0 0 0% 0)",
                duration: 0.8,
                ease: "power3.out",
                stagger: 0.12,
                clearProps: "clipPath",
                scrollTrigger: {
                    trigger: grid,
                    start: "top 80%",
                    once: true,
                },
            });
        },
        { scope: gridRef },
    );

    return (
        <section id="platform" className="relative overflow-hidden py-16 md:py-20 lg:py-28">
            <div className="mx-auto max-w-8xl lg:px-10 md:px-8 sm:px-6 px-4">
                <div className="flex flex-col items-center justify-center gap-10 md:gap-12 lg:gap-15">
                    <RevealText as="h2" className="text-4xl sm:text-5xl lg:text-[3.5rem] tracking-[-0.02em] font-bold text-center leading-[1.1] max-w-175">
                        Everything You Need in One Platform
                    </RevealText>
                    <div
                        ref={gridRef}
                        className="grid grid-cols-1 md:grid-cols-8 gap-5 md:h-180 lg:h-240 max-w-252.5 w-full"
                    >
                        <div className="gradient-border gradient-border-card overflow-hidden relative p-5 sm:p-7.5 md:col-span-5 flex items-end rounded-[1.25rem] min-h-90 sm:min-h-110 md:min-h-0">
                            <ParallaxImage src="/emotional.png" alt="Emotional" fill strength={8} className="object-contain w-full" />
                            <div className="relative flex flex-col gap-2 leading-[1.1]">
                                <Image src="/brain.svg" alt="Brain Icon" width={32} height={32} className="mb-3" />
                                <h3 className="text-lg font-bold">Emotional Operating System</h3>
                                <p className="text-sm">Track moods and triggers to understand what moves within.</p>
                            </div>
                        </div>
                        <div className="gradient-border gradient-border-card overflow-hidden relative p-5 sm:p-7.5 md:col-span-3 flex items-end rounded-[1.25rem] min-h-90 sm:min-h-110 md:min-h-0">
                            <ParallaxImage src="/guidance.png" alt="Emotional" fill strength={8} className="object-contain w-full" />
                            <div className="relative flex flex-col gap-2 leading-[1.1]">
                                <Image src="/brain.svg" alt="Brain Icon" width={32} height={32} className="mb-3" />
                                <h3 className="text-lg font-bold">AI-Powered Guidance</h3>
                                <p className="text-sm">An AI journaling assistant offers prompts.</p>
                            </div>
                        </div>
                        <div className="gradient-border gradient-border-card overflow-hidden relative p-5 sm:p-7.5 md:col-span-3 flex items-end rounded-[1.25rem] min-h-90 sm:min-h-110 md:min-h-0">
                            <ParallaxImage src="/journey.png" alt="Emotional" fill strength={8} className="object-contain w-full" />
                            <div className="relative flex flex-col gap-2 leading-[1.1]">
                                <Image src="/brain.svg" alt="Brain Icon" width={32} height={32} className="mb-3" />
                                <h3 className="text-lg font-bold">Journey Automation</h3>
                                <p className="text-sm">Rituals drive change. Small actions build strength.</p>
                            </div>
                        </div>
                        <div className="gradient-border overflow-hidden gradient-border-card relative p-5 sm:p-7.5 md:col-span-5 flex items-end rounded-[1.25rem] min-h-90 sm:min-h-110 md:min-h-0">
                            <ParallaxImage src="/drelaine.png" alt="Drelaine" fill strength={10} className="object-cover w-full" />
                            <div className="relative flex flex-col gap-2 leading-[1.1]">
                                <Image src="/brain.svg" alt="Brain Icon" width={32} height={32} className="mb-3" />
                                <h3 className="text-lg font-bold">Emotional Operating System</h3>
                                <p className="text-sm">Track moods and triggers to understand what moves within.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
