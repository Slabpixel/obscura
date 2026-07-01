"use client";

import LiquidGlass from "liquid-glass-react";
import Image from "next/image";
import { useEffect, useRef, useState, type RefObject } from "react";

/** Figma glass → liquid-glass-react: refraction 80, frost ~5, dispersion 50, splay 0 */
const FIGMA_GLASS = {
    displacementScale: 80,
    blurAmount: 0.05,
    aberrationIntensity: 50,
    elasticity: 0,
    saturation: 180,
} as const;

type GlassPillProps = {
    icon: string;
    label: string;
    mouseContainer?: RefObject<HTMLElement | null>;
};

/** Padding lives here — not on LiquidGlass — so the library can't clip it via overflow:hidden on .glass */
function PillContent({ icon, label }: { icon: string; label: string }) {
    return (
        <span className="flex items-center gap-2 py-1.5 px-3 text-sm font-medium whitespace-nowrap text-white">
            <Image src={icon} alt="" width={11} height={11} />
            {label}
        </span>
    );
}

export function GlassPill({ icon, label, mouseContainer }: GlassPillProps) {
    const sizerRef = useRef<HTMLDivElement>(null);
    const [size, setSize] = useState<{ width: number; height: number } | null>(null);

    useEffect(() => {
        const sizer = sizerRef.current;
        if (!sizer) return;

        const update = () => {
            setSize({ width: sizer.offsetWidth, height: sizer.offsetHeight });
        };

        update();
        const observer = new ResizeObserver(update);
        observer.observe(sizer);
        return () => observer.disconnect();
    }, [icon, label]);

    return (
        <div
            className="relative inline-flex shrink-0"
            style={size ? { width: size.width, height: size.height } : undefined}
        >
            <div ref={sizerRef} aria-hidden className="invisible inline-flex pointer-events-none select-none">
                <PillContent icon={icon} label={label} />
            </div>

            {size ? (
                <div className="absolute inset-0">
                    <LiquidGlass
                        {...FIGMA_GLASS}
                        cornerRadius={8}
                        padding="0"
                        mouseContainer={mouseContainer}
                        className="glass-pill-host size-full"
                        style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            width: size.width,
                            height: size.height,
                        }}
                    >
                        <PillContent icon={icon} label={label} />
                    </LiquidGlass>
                </div>
            ) : null}
        </div>
    );
}

const PILLS = [
    { icon: "/brain-w.svg", label: "Emotional insights" },
    { icon: "/compass-w.svg", label: "Expert guidance for routines" },
    { icon: "/layer-group.svg", label: "Unified data across platforms" },
    { icon: "/share-nodes.svg", label: "Mood, thought, and behavior connect" },
    { icon: "/life-ring.svg", label: "Support available when needed" },
    { icon: "/feather.svg", label: "Gentle progress, not pressure" },
] as const;

export function InsightsPillGrid() {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <div ref={containerRef} className="flex flex-wrap gap-3">
            {PILLS.map((pill) => (
                <GlassPill
                    key={pill.label}
                    icon={pill.icon}
                    label={pill.label}
                    mouseContainer={containerRef}
                />
            ))}
        </div>
    );
}
