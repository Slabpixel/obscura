import Image from "next/image";

export default function Home() {
  return (
    <section id="features" className="h-dvh min-h-180 max-h-300 relative text-background overflow-hidden pb-16 pt-50 scroll-mt-28">
      <Image src="/hero-bg.png" alt="Hero BG" fill className="object-cover" />
      <div className="relative mx-auto h-full max-w-8xl lg:px-10 md:px-8 sm:px-6 px-4">
        <div className="h-full w-full flex flex-col items-center justify-start gap-17.5">
          <div className="relative flex flex-col items-center justify-center text-center">
            <Image src="/circle-overlay.svg" alt="Circle Overlay" width={729} height={117} className="absolute top-1/3 left-1/2 -translate-x-1/2" />
            <span className="relative text-base uppercase font-mono leading-none font-medium tracking-wider">
              How are you today?
            </span>
            <h1 className="relative text-[6.25rem] leading-none font-bold tracking-[-0.02em]">
              Good morning, <span>John</span>
            </h1>
          </div>
          <div className="relative w-full max-w-3xl">
            <Image src="/hero-ui.png" alt="Hero UI" width={680} height={284} />
          </div>
          <div className="absolute bottom-0">
            <span className="text-sm uppercase font-mono leading-none font-medium tracking-wider">
              Powered by the Seryno Emotional Wellness Engine™
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
