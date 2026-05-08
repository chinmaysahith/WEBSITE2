import { Reveal } from "@/components/expertise/shared/Reveal";
import GrainBlobs from "@/components/shared/GrainBlobs";
import SpinningText from "@/components/shared/SpinningText";
import CTA from "@/components/CTA";

export const metadata = {
  title: "Our Approach — APSLOCK",
  description: "Technology is the medium. People are the point. Here is how we build.",
};

const approachSteps = [
  {
    number: "01",
    title: "Empathy First",
    description: "Before we write a single line of code or design a single screen, we talk to the people who will actually use the product. We believe that the best digital experiences are rooted in a deep understanding of human behavior, frustration, and delight.",
  },
  {
    number: "02",
    title: "Build With Intent",
    description: "We don't do bloat and we don't chase vanity metrics. Every feature, every animation, and every system we architect must earn its keep. If it doesn't serve the user or the business goal directly, it doesn't ship.",
  },
  {
    number: "03",
    title: "Iterate & Elevate",
    description: "Launch is not the finish line; it's the starting line. We rely on quantitative data and qualitative feedback to refine, optimize, and elevate the product in continuous cycles.",
  },
];

export default function ApproachPage() {
  return (
    <main className="flex-1 bg-[#F3F1ED]">
      {/* ── 01 · HERO ─────────────────────────────────────────────────── */}
      <section className="relative min-h-[94svh] flex items-end overflow-hidden">
        <GrainBlobs variant="amber" intensity={0.16} animate={true} className="absolute inset-0 z-0 pointer-events-none" />

        {/* The Spinning Text */}
        <div className="text-[#A8894A] opacity-40">
          <SpinningText />
        </div>

        {/* Soft blend into the next section */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#F3F1ED] to-transparent pointer-events-none z-0" />

        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 pt-32 pb-24 sm:pt-40 sm:pb-32 relative z-10">
          <Reveal delay={100} duration={800} distance={16}>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#C9A84C] mb-8">
              Our Philosophy
            </p>
          </Reveal>



          <Reveal delay={360} duration={1000} distance={32}>
            <h2 className="mt-8 text-[clamp(2.5rem,6vw,5.5rem)] font-editorial font-light tracking-[-0.03em] text-[#1A1625] leading-[0.95] max-w-4xl">
              Technology is the medium.<br />
              <span className="italic text-[#8A7135]">People are the point.</span>
            </h2>
          </Reveal>

          <Reveal delay={500} duration={800} distance={24}>
            <p className="mt-10 text-base sm:text-lg lg:text-xl text-[#6B5A7A] max-w-2xl leading-[1.75]">
              We build high-performance systems and beautiful interfaces, but none of that matters if it doesn't connect with the human on the other side of the screen. Our approach marries rigorous engineering with a profound respect for the user.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── 02 · THE PROCESS ─────────────────────────────────────────── */}
      <section className="py-24 lg:py-40 border-t border-[#E5E0D8] relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">

            {/* Left Column Sticky */}
            <div className="lg:sticky lg:top-32">
              <Reveal delay={0} duration={800} distance={20}>
                <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-bold tracking-tight text-[#1A1625] leading-[1]">
                  The human <br className="hidden lg:block" />
                  <span className="text-[#A8894A]">touch.</span>
                </h2>
              </Reveal>
              <Reveal delay={150} duration={800} distance={20}>
                <p className="mt-6 text-lg text-[#6B5A7A] max-w-md leading-relaxed">
                  We don't use templates and we don't believe in one-size-fits-all. Every project is an opportunity to solve a specific problem for specific people.
                </p>
              </Reveal>
            </div>

            {/* Right Column Steps */}
            <div className="flex flex-col gap-12 sm:gap-20">
              {approachSteps.map((step, index) => (
                <Reveal key={step.number} delay={index * 100} duration={900} distance={40}>
                  <div className="group relative bg-white/40 backdrop-blur-sm rounded-[2rem] p-8 sm:p-12 border border-[#E0D9E8] transition-all duration-700 hover:bg-white/80 hover:shadow-xl hover:shadow-[#A8894A]/5">

                    {/* Number Watermark */}
                    <div className="absolute top-4 right-6 pointer-events-none select-none">
                      <span className="font-display text-[6rem] sm:text-[8rem] font-bold leading-none text-[#1A1625] opacity-5 transition-all duration-700 group-hover:scale-110 group-hover:opacity-10">
                        {step.number}
                      </span>
                    </div>

                    <div className="relative z-10">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="h-[2px] w-8 bg-[#A8894A] transition-all duration-700 group-hover:w-16" />
                        <span className="font-mono text-sm tracking-[0.2em] uppercase text-[#A8894A] font-bold">Phase {step.number}</span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#1A1625] mb-6 tracking-tight">
                        {step.title}
                      </h3>

                      <p className="text-[#6B5A7A] text-base sm:text-lg leading-relaxed max-w-lg">
                        {step.description}
                      </p>
                    </div>

                    {/* Left edge reveal */}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 h-0 w-1 bg-[#A8894A] transition-all duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] group-hover:h-3/4 rounded-r-full" />
                  </div>
                </Reveal>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── 03 · CTA ──────────────────────────────────────────────────── */}
      <CTA />
    </main>
  );
}
