import Image from "next/image";

export default function Footer() {
    return (
        <section id="footer" style={{ background: "radial-gradient(53.58% 35% at 50% 50%, #A4AA85 0%, #526649 100%)" }} className="relative h-160 sm:h-180 lg:h-232 text-background overflow-hidden pt-12 pb-12 sm:pt-20 sm:pb-16 lg:pt-28 lg:pb-21">
            <Image src="/footer-bg.png" alt="footer-bg" fill className="absolute top-0 left-0 w-full h-full object-cover" />
            <div className="relative mx-auto max-w-8xl h-full px-4 sm:px-6 md:px-8 lg:px-10">
                <div className="flex flex-col w-full h-full items-center justify-between gap-6">
                    <div className="flex flex-col items-center gap-4 sm:gap-6 lg:gap-8">
                        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
                            <div className="bg-black/10 rounded-md px-2 py-1 flex items-center gap-2">
                                <div className="size-3 flex items-center justify-center"><Image src="/hand-holding-heart.svg" alt="" width={10} height={10} /></div>
                                <span className="md:text-sm text-xs font-medium">Responds when it counts</span>
                            </div>
                            <div className="bg-black/10 rounded-md px-2 py-1 flex items-center gap-2">
                                <div className="size-3 flex items-center justify-center"><Image src="/seedling.svg" alt="" width={10} height={10} /></div>
                                <span className="md:text-sm text-xs font-medium">Small shifts, lasting change</span>
                            </div>
                            <div className="bg-black/10 rounded-md px-2 py-1 flex items-center gap-2">
                                <div className="size-3 flex items-center justify-center"><Image src="/wave-square.svg" alt="" width={10} height={10} /></div>
                                <span className="md:text-sm text-xs font-medium">From stress to balance</span>
                            </div>
                        </div>
                        <h2 className="text-center max-w-175 text-4xl sm:text-5xl lg:text-[3.5rem] font-bold leading-[1.1] tracking-[-0.02em]">
                            Ready to Transform Your Emotional World?
                        </h2>
                    </div>
                    <div className="flex flex-col items-center gap-8">
                        <div className="flex items-center gap-2">
                            <a href="#" target="_blank" className="gradient-border size-12 rounded-lg flex items-center justify-center hover:-translate-y-2 transition-transform bg-black/10 backdrop-blur-xl">
                                <Image src="/x-twitter.svg" alt="" width={16} height={16} />
                            </a>
                            <a href="#" target="_blank" className="gradient-border size-12 rounded-lg flex items-center justify-center hover:-translate-y-2 transition-transform bg-black/10 backdrop-blur-xl">
                                <Image src="/instagram.svg" alt="" width={16} height={16} />
                            </a>
                            <a href="#" target="_blank" className="gradient-border size-12 rounded-lg flex items-center justify-center hover:-translate-y-2 transition-transform bg-black/10 backdrop-blur-xl">
                                <Image src="/facebook.svg" alt="" width={16} height={16} />
                            </a>
                        </div>
                        <p className="text-center text-xs sm:text-sm font-medium uppercase tracking-wider font-mono px-4">
                            © 2025 Obscura. All rights reserved.
                            Privacy Policy
                            Terms of Service
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}