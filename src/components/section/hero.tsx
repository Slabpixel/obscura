import Image from "next/image";
import ParallaxImage from "@/components/parallax-image";
import Reveal from "@/components/reveal";
import RevealText from "@/components/reveal-text";
import ScrambleText from "@/components/scramble-text";

export default function Hero() {
    return (
        <section id="features" style={{ background: "radial-gradient(53.58% 35% at 50% 50%, #A4AA85 0%, #526649 100%)" }} className="h-dvh min-h-160 sm:min-h-180 relative text-background overflow-hidden pb-16 pt-32 md:pt-36 lg:pt-40 scroll-mt-28">
            <ParallaxImage src="/hero.png" alt="Hero BG" fill preload strength={12} className="object-cover object-bottom" />
            <div className="relative mx-auto h-full max-w-8xl lg:px-10 md:px-8 sm:px-6 px-4">
                <div className="relative h-full w-full flex flex-col items-center justify-start gap-10 sm:gap-14 lg:gap-17.5">
                    <div className="relative flex flex-col items-center justify-center text-center">
                        <Image src="/circle-overlay.svg" alt="Circle Overlay" width={729} height={117} className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[85vw] max-w-182 h-auto" />
                        <span className="relative text-sm sm:text-base uppercase font-mono leading-none font-medium tracking-wider">
                            <ScrambleText reveal="load" revealDelay={0.2}>How are you today?</ScrambleText>
                        </span>
                        <h1 className="relative text-5xl md:text-6xl lg:text-7xl xl:text-[6.25rem] leading-none font-bold tracking-[-0.02em]">
                            <RevealText as="span" trigger="load" delay={0.4}>Good morning, </RevealText>
                            <Reveal
                                as="span"
                                trigger="load"
                                delay={1}
                                className="inline-block opacity-60 bg-[linear-gradient(276deg,rgba(255,255,255,0)_-38.93%,#fff_83.15%)] bg-clip-text text-transparent"
                            >
                                John
                            </Reveal>
                        </h1>
                    </div>
                    <Reveal as="div" trigger="load" delay={0.9} stagger={0.12} className="relative w-full max-w-3xl grid grid-cols-4 gap-[1.5%]">
                        <div className="relative bg-black/10 gradient-border backdrop-blur-xl rounded-lg p-[7%] h-full">
                            <Image src="/hero-1.svg" alt="" width={1000} height={1000} className="w-full h-auto" />
                        </div>
                        <div className="relative col-span-2 bg-black/10 gradient-border backdrop-blur-xl rounded-lg p-[7%] h-full">
                            <Image src="/bg-ch.svg" alt="" fill className="object-cover object-bottom-left" />
                            <Image src="/hero-2.svg" alt="" width={1000} height={1000} className="w-full h-auto" />
                        </div>
                        <div className="relative bg-black/10 gradient-border backdrop-blur-xl rounded-lg p-[7%] h-full">
                            <Image src="/hero-3.svg" alt="" width={1000} height={1000} className="w-full h-auto" />
                        </div>
                    </Reveal>
                    <div className="absolute bottom-0 px-4">
                        <span className="block text-center text-xs sm:text-sm uppercase font-mono leading-tight font-medium tracking-wider whitespace-normal">
                            <ScrambleText reveal="load" revealDelay={1.3}>Powered by the Seryno Emotional Wellness Engine™</ScrambleText>
                        </span>
                    </div>
                </div>
            </div>
            <ParallaxImage strength={16} src="/person.png" alt="Person" width={500} height={1000} className="lg:w-1/3 xl:w-1/4 w-full sm:w-1/2 absolute z-1 bottom-[8%] left-[49.5%] -translate-x-1/2 pointer-events-none" />
        </section>
    );
}