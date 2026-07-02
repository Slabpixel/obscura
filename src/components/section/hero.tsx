import Image from "next/image";

export default function Hero() {
    return (
        <section id="features" className="h-dvh min-h-160 sm:min-h-180 relative text-background overflow-hidden pb-16 pt-32 md:pt-36 lg:pt-40 scroll-mt-28">
            <Image src="/hero-bg.png" alt="Hero BG" fill className="object-cover object-bottom" />
            <div className="relative mx-auto h-full max-w-8xl lg:px-10 md:px-8 sm:px-6 px-4">
                <div className="relative h-full w-full flex flex-col items-center justify-start gap-10 sm:gap-14 lg:gap-17.5">
                    <div className="relative flex flex-col items-center justify-center text-center">
                        <Image src="/circle-overlay.svg" alt="Circle Overlay" width={729} height={117} className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[85vw] max-w-182 h-auto" />
                        <span className="relative text-sm sm:text-base uppercase font-mono leading-none font-medium tracking-wider">
                            How are you today?
                        </span>
                        <h1 className="relative text-5xl sm:text-6xl md:text-7xl xl:text-[6.25rem] leading-none font-bold tracking-[-0.02em]">
                            Good morning,{" "}
                            <span className="opacity-60 bg-[linear-gradient(276deg,rgba(255,255,255,0)_-38.93%,#fff_83.15%)] bg-clip-text text-transparent">
                                John
                            </span>
                        </h1>
                    </div>
                    <div className="relative w-full max-w-3xl">
                        <Image src="/hero-ui.svg" alt="Hero UI" width={2000} height={1000} className="w-full h-auto" />
                    </div>
                    <div className="absolute bottom-0 px-4">
                        <span className="block text-center text-xs sm:text-sm uppercase font-mono leading-tight font-medium tracking-wider whitespace-normal">
                            Powered by the Seryno Emotional Wellness Engine™
                        </span>
                    </div>
                </div>
            </div>
            {/* <Image src="/person.png" alt="Person" width={500} height={1000} className="w-1/4 max-xl:hidden absolute z-1 bottom-[8%] left-[49.5%] -translate-x-1/2 pointer-events-none" /> */}
        </section>
    );
}