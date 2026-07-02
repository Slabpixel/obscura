import Image from "next/image";
import { InsightsPillGrid } from "@/components/glass-pill";

export default function Insights() {
    return (
        <section id="insights" className="relative overflow-hidden py-12 md:py-16 lg:py-20">
            <div className="mx-auto max-w-8xl lg:px-10 md:px-8 sm:px-6 px-4">
                <div className="lg:h-150 rounded-2xl overflow-hidden bg-foreground text-background grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                    <div className="flex flex-col justify-between gap-10 p-6 sm:p-10 lg:p-16 lg:pr-0">
                        <div className="flex flex-col gap-6 lg:gap-10">
                            <h2 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold leading-[1.1] tracking-[-0.02em]">
                                Achieve mental clarity with wellness tools.
                            </h2>
                            <InsightsPillGrid />
                        </div>
                        <p className="font-mono font-medium tracking-wider uppercase text-sm lg:text-base">
                        Obscura simplifies into one intuitive system.
                        </p>
                    </div>
                    <div className="overflow-hidden relative min-h-72 sm:min-h-96 lg:min-h-0">
                        <Image src="/mental.svg" alt="Mental" fill className="object-contain w-full" />
                    </div>
                
                </div>
            </div>
        </section>
    );
}