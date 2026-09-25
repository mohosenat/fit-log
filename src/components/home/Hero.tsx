import Image from "next/image";
import Link from "next/link";
import { ArrowDown } from "lucide-react";

import heroImage from "@/assets/banner.png";

export default function Hero() {
  return (
    <section className="py-8 md:py-10 lg:py-12">
      <div className="fit-container">
        <div className="grid overflow-hidden rounded-lg bg-[#15171d] md:grid-cols-2">

          {/* Left Content */}
          <div className="flex flex-col justify-center px-7 py-14 sm:px-9 md:px-10 md:py-16 lg:px-14 lg:py-20">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-[#ccff00]">
              WORKOUT LIBRARY
            </p>
<h1 className="fit-display text-[28px] font-bold uppercase leading-[1.05] text-white sm:text-[36px] md:text-5xl lg:text-6xl">
  <span className="whitespace-nowrap">
    TRAIN WITH INTENT.LOG
  </span>
  <br />
  EVERY SET.
</h1>
            <p className="mt-6 max-w-lg text-sm leading-6 text-[#969ca4] md:text-[15px]">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
              into today&apos;s plan, and watch the week&apos;s work add up.
            </p>

<Link
  href="#library"
  className="mt-7 inline-flex w-fit rounded-md bg-[#ccff00] px-6 py-3 text-[10px] font-bold uppercase text-black! transition hover:brightness-105"
>
  BROWSE WORKOUTS
</Link>
          </div>

          {/* Right Image */}
          <div className="relative flex min-h-[360px] items-center justify-center px-8 py-12 sm:min-h-[400px] md:min-h-full md:px-10 md:py-14 lg:px-14 lg:py-16">
            <Image
              src={heroImage}
              alt="Workout illustration"
              priority
              className="h-auto w-full max-w-[440px] object-contain"
            />
          </div>

        </div>
      </div>
    </section>
  );
}