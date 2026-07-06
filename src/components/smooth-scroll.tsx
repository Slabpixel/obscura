"use client";

import LenisScrollTriggerBridge from "@/components/lenis-scroll-trigger-bridge";
import { ReactLenis, type LenisRef } from "lenis/react";
import { useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

type SmoothScrollProps = {
  children: ReactNode;
};

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<LenisRef>(null);

  useGSAP(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
      ScrollTrigger.update();
    }

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    const refreshFrame = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      cancelAnimationFrame(refreshFrame);
      gsap.ticker.remove(update);
    };
  });

  return (
    <ReactLenis root options={{ autoRaf: false, anchors: true, duration: 0.5 }} ref={lenisRef}>
      <LenisScrollTriggerBridge />
      {children}
    </ReactLenis>
  );
}
