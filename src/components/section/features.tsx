import Image from "next/image";

export default function Features() {
    return (
        <section id="features" className="relative overflow-hidden py-28">
            <div className="mx-auto max-w-8xl lg:px-10 md:px-8 sm:px-6 px-4">
                <div className="flex flex-col items-center justify-center gap-15">
                    <h2 className="text-[3.5rem] tracking-[-0.02em] font-bold text-center leading-[1.1] max-w-175">Everything You Need in One Platform</h2>
                    <div className="grid grid-cols-8 gap-5 h-240 max-w-252.5 w-full">
                        <div className="gradient-border gradient-border-card relative p-7.5 col-span-5 flex items-end rounded-[1.25rem]">
                            <Image src="/emotional.png" alt="Emotional" fill className="object-contain w-full" />
                            <div className="relative flex flex-col gap-2 leading-[1.1]">
                                <Image src="/brain.svg" alt="Brain Icon" width={32} height={32} className="mb-3" />
                                <h3 className="text-lg font-bold">
                                    Emotional Operating System
                                </h3>
                                <p className="text-sm">Track moods and triggers to understand what moves within.</p>
                            </div>
                        </div>
                        <div className="gradient-border gradient-border-card relative p-7.5 col-span-3 flex items-end rounded-[1.25rem]">
                            <Image src="/guidance.png" alt="Emotional" fill className="object-contain w-full" />
                            <div className="relative flex flex-col gap-2 leading-[1.1]">
                                <Image src="/brain.svg" alt="Brain Icon" width={32} height={32} className="mb-3" />
                                <h3 className="text-lg font-bold">
                                AI-Powered Guidance
                                </h3>
                                <p className="text-sm">An AI journaling assistant offers prompts.</p>
                            </div>
                        </div>
                        <div className="gradient-border gradient-border-card relative p-7.5 col-span-3 flex items-end rounded-[1.25rem]">
                            <Image src="/journey.png" alt="Emotional" fill className="object-contain w-full" />
                            <div className="relative flex flex-col gap-2 leading-[1.1]">
                                <Image src="/brain.svg" alt="Brain Icon" width={32} height={32} className="mb-3" />
                                <h3 className="text-lg font-bold">
                                Journey Automation
                                </h3>
                                <p className="text-sm">Rituals drive change. Small actions build strength.</p>
                            </div>
                        </div>
                        <div className="gradient-border overflow-hidden gradient-border-card relative p-7.5 col-span-5 flex items-end rounded-[1.25rem]">
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