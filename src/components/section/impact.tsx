"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const CARDS = [
    { image: "/impact/card-1.png", label: "Mood layers" },
    { image: "/impact/card-2.png", label: "Wellness score" },
    { image: "/impact/card-3.png", label: "Emotional cycles" },
    { image: "/impact/card-4.png", label: "Connect activities to moods." },
] as const;

type CardLayout = {
    left: string;
    labelOpacity: number;
};

const CARD_WIDTH = "25.7%";
const CARD_WIDTH_NUM = 25.7;

const SPREAD_STEP = (100 - CARD_WIDTH_NUM) / (CARDS.length - 1);
const RIGHTMOST = (CARDS.length - 1) * SPREAD_STEP;
/** Tighter pack while cards wait on the right. */
const PACK_STEP = SPREAD_STEP * 0.52;

function leftSlot(index: number): string {
    return `${index * SPREAD_STEP}%`;
}

function getWaitingLeft(index: number, firstWaitingIndex: number, totalWaiting: number): string {
    const rightIndex = index - firstWaitingIndex;

    if (rightIndex === totalWaiting - 1) return `${RIGHTMOST}%`;

    return `${RIGHTMOST - (totalWaiting - 1 - rightIndex) * PACK_STEP}%`;
}

function getCardLeft(index: number, activeIndex: number): string {
    if (index <= activeIndex) return leftSlot(index);

    return getWaitingLeft(index, activeIndex + 1, CARDS.length - activeIndex - 1);
}

function getStepLayout(activeIndex: number): CardLayout[] {
    if (activeIndex < 0) {
        return CARDS.map((_, index) => ({
            left: getWaitingLeft(index, 0, CARDS.length),
            labelOpacity: 0,
        }));
    }

    return CARDS.map((_, index) => ({
        left: getCardLeft(index, activeIndex),
        labelOpacity: index <= activeIndex ? 1 : 0,
    }));
}

const INITIAL_LAYOUT = getStepLayout(-1);

export default function Impact() {
    const sectionRef = useRef<HTMLElement>(null);
    const pinRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const cardVisualRefs = useRef<(HTMLDivElement | null)[]>([]);
    const labelRefs = useRef<(HTMLDivElement | null)[]>([]);

    useLayoutEffect(() => {
        const section = sectionRef.current;
        const pin = pinRef.current;
        const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
        const labels = labelRefs.current.filter(Boolean) as HTMLDivElement[];

        if (!section || !pin || cards.length === 0) return;

        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        let hoverCleanups: (() => void)[] = [];

        const ctx = gsap.context(() => {
            if (reducedMotion) {
                cards.forEach((card, index) => {
                    gsap.set(card, { left: leftSlot(index) });
                });
                gsap.set(labels, { opacity: 1 });
                return;
            }

            const pinLength = () => window.innerHeight * CARDS.length;
            /** Scroll before pin locks — animation begins as the section enters view. */
            const leadIn = () => window.innerHeight * 0.85;

            ScrollTrigger.create({
                trigger: pin,
                start: "top top",
                end: () => `+=${pinLength()}`,
                pin: true,
                anticipatePin: 1,
                invalidateOnRefresh: true,
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "top bottom+=80%",
                    end: () => `+=${leadIn() + pinLength()}`,
                    scrub: 0.75,
                    invalidateOnRefresh: true,
                },
            });

            for (let step = 0; step <= CARDS.length; step++) {
                const layout = getStepLayout(step - 1);

                cards.forEach((card, cardIndex) => {
                    tl.to(
                        card,
                        {
                            left: layout[cardIndex].left,
                            duration: 1,
                            ease: "power2.inOut",
                        },
                        step,
                    );
                });

                labels.forEach((label, labelIndex) => {
                    tl.to(
                        label,
                        {
                            opacity: layout[labelIndex].labelOpacity,
                            duration: 0.35,
                            ease: "power2.out",
                        },
                        step + 0.15,
                    );
                });
            }

            if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
                hoverCleanups = cards.map((card, index) => {
                    const visualEl = cardVisualRefs.current[index];
                    if (!visualEl) return () => {};

                    gsap.set(card, { transformPerspective: 900 });

                    const xTo = gsap.quickTo(visualEl, "x", { duration: 0.55, ease: "power3.out" });
                    const yTo = gsap.quickTo(visualEl, "y", { duration: 0.55, ease: "power3.out" });

                    const image = visualEl.querySelector("img");

                    const imgXTo = image
                        ? gsap.quickTo(image, "x", { duration: 0.65, ease: "power3.out" })
                        : null;
                    const imgYTo = image
                        ? gsap.quickTo(image, "y", { duration: 0.65, ease: "power3.out" })
                        : null;

                    const onMove = (event: MouseEvent) => {
                        const rect = card.getBoundingClientRect();
                        const relX = (event.clientX - rect.left) / rect.width - 0.5;
                        const relY = (event.clientY - rect.top) / rect.height - 0.5;

                        xTo(relX * rect.width * 0.1);
                        yTo(relY * rect.height * 0.1);

                        imgXTo?.(relX * rect.width * 0.01);
                        imgYTo?.(relY * rect.height * 0.01);
                    };

                    const onLeave = () => {
                        xTo(0);
                        yTo(0);
                        imgXTo?.(0);
                        imgYTo?.(0);
                    };

                    card.addEventListener("mousemove", onMove);
                    card.addEventListener("mouseleave", onLeave);

                    return () => {
                        card.removeEventListener("mousemove", onMove);
                        card.removeEventListener("mouseleave", onLeave);
                    };
                });
            }
        }, section);

        const refresh = () => ScrollTrigger.refresh();
        requestAnimationFrame(refresh);
        window.addEventListener("load", refresh);

        return () => {
            window.removeEventListener("load", refresh);
            hoverCleanups.forEach((cleanup) => cleanup());
            ctx.revert();
        };
    }, []);

    return (
        <section id="how-it-works" ref={sectionRef} className="relative">
            <div className="mx-auto max-w-8xl px-4 py-10 lg:py-15 sm:px-6 md:px-8 lg:px-10">
                <h2 className="text-center text-4xl sm:text-5xl lg:text-[3.5rem] font-bold leading-[1.1] tracking-[-0.02em]">
                    Proven success. Major impact.
                </h2>
            </div>

            <div ref={pinRef} className="flex h-svh w-full flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-10">
                <div className="relative mx-auto min-h-64 sm:min-h-96 lg:min-h-144 w-full max-w-286">
                    <div className="relative min-h-64 sm:min-h-96 lg:min-h-144 w-full">
                        {CARDS.map((card, index) => (
                            <div
                                key={card.label}
                                ref={(el) => {
                                    cardRefs.current[index] = el;
                                }}
                                className="absolute top-0 cursor-pointer"
                                style={{
                                    left: INITIAL_LAYOUT[index].left,
                                    width: CARD_WIDTH,
                                    zIndex: index + 1,
                                }}
                            >
                                <div
                                    ref={(el) => {
                                        cardVisualRefs.current[index] = el;
                                    }}
                                    className="relative w-full overflow-hidden rounded-2xl will-change-transform transform-3d"
                                    style={{ aspectRatio: "294 / 448" }}
                                >
                                    <Image
                                        src={card.image}
                                        alt=""
                                        fill
                                        sizes="(max-width: 768px) 45vw, 294px"
                                        className="object-cover object-left"
                                        priority={index === 0}
                                    />
                                </div>

                                <div
                                    ref={(el) => {
                                        labelRefs.current[index] = el;
                                    }}
                                    className="mt-4 flex items-end gap-3 opacity-0"
                                >
                                    <Image
                                        src="/impact/label-line.svg"
                                        alt=""
                                        width={1}
                                        height={80}
                                        className="h-14 w-px shrink-0 lg:h-20"
                                    />
                                    <span className="font-mono text-sm font-medium uppercase tracking-wider">
                                        {card.label}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
