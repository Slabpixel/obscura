import Image from "next/image";
import Reveal from "@/components/reveal";
import RevealText from "@/components/reveal-text";
import ScrambleText from "@/components/scramble-text";

export default function Resources() {
    return (
        <section id="pricing" className="relative py-16 md:py-20 lg:py-30">
            <div className="mx-auto max-w-8xl px-4 sm:px-6 md:px-8 lg:px-10">
                <div className="flex flex-col items-center gap-10 md:gap-12 lg:gap-16 w-full mx-auto max-w-292.5">

                    <div className="flex flex-col items-center gap-6">
                        <Reveal className="bg-muted/10 rounded-md px-2 py-1 flex items-center gap-2">
                            <div className="size-3"><Image src="/bolt.svg" alt="bolt" width={10} height={10} /></div>
                            <span className="text-sm font-medium">Responds when it counts</span>
                        </Reveal>
                        <RevealText as="h2" className="text-center max-w-175 text-4xl sm:text-5xl lg:text-[3.5rem] font-bold leading-[1.1] tracking-[-0.02em]">
                            Resources that resonate with your feelings.
                        </RevealText>
                    </div>

                    <Reveal className="w-full">
                        <Image src="/full.png" alt="" width={2000} height={2000} className="w-full h-auto" />
                    </Reveal>

                    <p className="text-center font-mono font-medium tracking-wider uppercase text-sm lg:text-base">
                        <ScrambleText reveal="scroll">Tools designed to align seamlessly with your emotions.</ScrambleText>
                    </p>
                </div>
            </div>
        </section>
    );
}