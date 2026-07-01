import Image from "next/image";
import { InsightsPillGrid } from "@/components/glass-pill";

export default function Insights() {
    return (
        <section id="insights" className="relative overflow-hidden py-20">
            <div className="mx-auto max-w-8xl lg:px-10 md:px-8 sm:px-6 px-4">
                <div className="h-150 rounded-2xl overflow-hidden bg-foreground text-background grid grid-cols-2 gap-16">
                    <div className="flex flex-col justify-between p-16 pr-0">
                        <div className="flex flex-col gap-10">
                            <h2 className="text-[3.5rem] font-bold leading-[1.1] tracking-[-0.02em]">
                                Achieve mental clarity with wellness tools.
                            </h2>
                            <InsightsPillGrid />
                        </div>
                        <p className="font-mono font-medium tracking-wider uppercase">
                        Obscura simplifies into one intuitive system.
                        </p>
                    </div>
                    <div className="overflow-hidden relative">
                        <Image src="/mental.svg" alt="Mental" fill className="object-contain w-full" />
                    </div>
                
                </div>
            </div>
        </section>
    );
}