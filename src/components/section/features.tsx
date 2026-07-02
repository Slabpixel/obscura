import Image from "next/image";

export default function Features() {
    return (
        <section id="features" className="relative overflow-hidden py-16 md:py-20 lg:py-28">
            <div className="mx-auto max-w-8xl lg:px-10 md:px-8 sm:px-6 px-4">
                <div className="flex flex-col items-center justify-center gap-10 md:gap-12 lg:gap-15">
                    <h2 className="text-4xl sm:text-5xl lg:text-[3.5rem] tracking-[-0.02em] font-bold text-center leading-[1.1] max-w-175">Everything You Need in One Platform</h2>
                    <div className="grid grid-cols-1 md:grid-cols-8 gap-5 md:h-180 lg:h-240 max-w-252.5 w-full">
                        <div className="gradient-border gradient-border-card relative p-5 sm:p-7.5 md:col-span-5 flex items-end rounded-[1.25rem] min-h-90 sm:min-h-110 md:min-h-0">
                            <Image src="/emotional.png" alt="Emotional" fill className="object-contain w-full" />
                            <div className="relative flex flex-col gap-2 leading-[1.1]">
                                <Image src="/brain.svg" alt="Brain Icon" width={32} height={32} className="mb-3" />
                                <h3 className="text-lg font-bold">
                                    Emotional Operating System
                                </h3>
                                <p className="text-sm">Track moods and triggers to understand what moves within.</p>
                            </div>
                        </div>
                        <div className="gradient-border gradient-border-card relative p-5 sm:p-7.5 md:col-span-3 flex items-end rounded-[1.25rem] min-h-90 sm:min-h-110 md:min-h-0">
                            <Image src="/guidance.png" alt="Emotional" fill className="object-contain w-full" />
                            <div className="relative flex flex-col gap-2 leading-[1.1]">
                                <Image src="/brain.svg" alt="Brain Icon" width={32} height={32} className="mb-3" />
                                <h3 className="text-lg font-bold">
                                AI-Powered Guidance
                                </h3>
                                <p className="text-sm">An AI journaling assistant offers prompts.</p>
                            </div>
                        </div>
                        <div className="gradient-border gradient-border-card relative p-5 sm:p-7.5 md:col-span-3 flex items-end rounded-[1.25rem] min-h-90 sm:min-h-110 md:min-h-0">
                            <Image src="/journey.png" alt="Emotional" fill className="object-contain w-full" />
                            <div className="relative flex flex-col gap-2 leading-[1.1]">
                                <Image src="/brain.svg" alt="Brain Icon" width={32} height={32} className="mb-3" />
                                <h3 className="text-lg font-bold">
                                Journey Automation
                                </h3>
                                <p className="text-sm">Rituals drive change. Small actions build strength.</p>
                            </div>
                        </div>
                        <div className="gradient-border overflow-hidden gradient-border-card relative p-5 sm:p-7.5 md:col-span-5 flex items-end rounded-[1.25rem] min-h-90 sm:min-h-110 md:min-h-0">
                            <Image src="/drelaine.png" alt="Drelaine" fill className="object-cover w-full" />
                            <div className="relative flex flex-col gap-2 leading-[1.1]">
                                <Image src="/brain.svg" alt="Brain Icon" width={32} height={32} className="mb-3" />
                                <h3 className="text-lg font-bold">
                                    Emotional Operating System
                                </h3>
                                <p className="text-sm">Track moods and triggers to understand what moves within.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}