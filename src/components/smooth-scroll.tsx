"use client";

import LenisScrollTriggerBridge from "@/components/lenis-scroll-trigger-bridge";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis, type LenisRef } from "lenis/react";
import { useEffect, useRef, type ReactNode } from "react";

gsap.registerPlugin(ScrollTrigger);

type SmoothScrollProps = {
  children: ReactNode;
};

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
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
  }, []);

  return (
    <ReactLenis root options={{ autoRaf: false, anchors: true }} ref={lenisRef}>
      <LenisScrollTriggerBridge />
      {children}
    </ReactLenis>
  );
}
