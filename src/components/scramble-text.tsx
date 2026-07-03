"use client";

import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, type MouseEventHandler, type RefObject } from "react";

gsap.registerPlugin(ScrambleTextPlugin, ScrollTrigger);

const ENTER_DURATION = 0.6;
const LEAVE_DURATION = 0.35;
const REVEAL_DURATION = 0.9;
const SCRAMBLE_SPEED = 1.2;
const REVEAL_DELAY = 0.25;

const SCRAMBLE_IN = {
    chars: "upperCase",
    speed: SCRAMBLE_SPEED,
    revealDelay: REVEAL_DELAY,
} as const;

const SCRAMBLE_OUT = {
    chars: "upperCase",
    speed: SCRAMBLE_SPEED,
    revealDelay: 0,
    rightToLeft: true,
} as const;

type ScrambleTrigger = "self" | "parent";
type RevealMode = "none" | "scroll" | "load";

type ScrambleTextSpanProps = {
    as?: "span";
    children: string;
    className?: string;
    trigger?: ScrambleTrigger;
    reveal?: RevealMode;
    revealDelay?: number;
    revealStart?: string;
};

type ScrambleTextAnchorProps = {
    as: "a";
    children: string;
    className?: string;
    trigger?: ScrambleTrigger;
    reveal?: RevealMode;
    revealDelay?: number;
    revealStart?: string;
    href: string;
    onClick?: MouseEventHandler<HTMLAnchorElement>;
    target?: string;
    rel?: string;
};

type ScrambleTextProps = ScrambleTextSpanProps | ScrambleTextAnchorProps;

type ScrambleOptions = {
    trigger: ScrambleTrigger;
    reveal: RevealMode;
    revealDelay: number;
    revealStart: string;
};

function useScrambleHover<T extends HTMLElement>(originalText: string, options: ScrambleOptions) {
    const { trigger, reveal, revealDelay, revealStart } = options;
    const ref = useRef<T>(null);
    const tweenRef = useRef<gsap.core.Tween | null>(null);
    const originalRef = useRef(originalText);
    originalRef.current = originalText;

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reducedMotion) return;

        const restore = () => {
            el.textContent = originalRef.current;
        };

        const killTween = () => {
            tweenRef.current?.kill();
            tweenRef.current = null;
        };

        const scramble = (duration: number, config: object) => {
            killTween();
            tweenRef.current = gsap.to(el, {
                duration,
                overwrite: true,
                scrambleText: { ...config, text: originalRef.current },
                onComplete: restore,
            });
        };

        // Hover in/out
        const hoverTarget = trigger === "parent" ? el.parentElement : el;
        const onEnter = () => scramble(ENTER_DURATION, SCRAMBLE_IN);
        const onLeave = () => scramble(LEAVE_DURATION, SCRAMBLE_OUT);

        hoverTarget?.addEventListener("mouseenter", onEnter);
        hoverTarget?.addEventListener("mouseleave", onLeave);

        // Reveal (scramble in) on load or scroll
        let revealTrigger: ScrollTrigger | null = null;
        let delayedCall: gsap.core.Tween | null = null;

        if (reveal !== "none") {
            const runReveal = () => scramble(REVEAL_DURATION, SCRAMBLE_IN);

            if (reveal === "load") {
                delayedCall = gsap.delayedCall(revealDelay, runReveal);
            } else {
                revealTrigger = ScrollTrigger.create({
                    trigger: el,
                    start: revealStart,
                    once: true,
                    onEnter: () => {
                        delayedCall = gsap.delayedCall(revealDelay, runReveal);
                    },
                });
            }
        }

        return () => {
            hoverTarget?.removeEventListener("mouseenter", onEnter);
            hoverTarget?.removeEventListener("mouseleave", onLeave);
            revealTrigger?.kill();
            delayedCall?.kill();
            killTween();
            restore();
        };
    }, [originalText, trigger, reveal, revealDelay, revealStart]);

    return ref;
}

export default function ScrambleText(props: ScrambleTextProps) {
    const {
        children,
        className,
        trigger = "self",
        reveal = "none",
        revealDelay = 0,
        revealStart = "top 85%",
    } = props;
    const ref = useScrambleHover<HTMLElement>(children, { trigger, reveal, revealDelay, revealStart });

    if (props.as === "a") {
        const { href, onClick, target, rel } = props;

        return (
            <a
                ref={ref as RefObject<HTMLAnchorElement>}
                href={href}
                onClick={onClick}
                target={target}
                rel={rel}
                className={className}
            >
                {children}
            </a>
        );
    }

    return (
        <span ref={ref as RefObject<HTMLSpanElement>} className={className}>
            {children}
        </span>
    );
}
