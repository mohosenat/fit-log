"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useFitLog } from "@/context/FitLogContext";
import logo from "@/assets/logo.png";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = useFitLog();

  const workoutActive = pathname === "/";
  const planActive = pathname.startsWith("/my-plan");

  return (
    <header className="sticky top-0 z-50 border-b border-[#191d22] bg-[#0b0d0f]/95 backdrop-blur">
      <div className="fit-container flex h-[64px] items-center justify-between gap-3 md:h-[68px] md:gap-8">

        {/* ================= LOGO ================= */}
        <Link
          href="/"
          className="flex shrink-0 items-center"
        >
          {/* MOBILE: logo only */}
          <Image
            src={logo}
            alt="FitLog logo"
            width={30}
            height={30}
            priority
            className="h-[30px] w-[30px] object-contain md:hidden"
          />

          {/* DESKTOP: logo + text */}
          <div className="hidden items-center gap-2.5 md:flex">
            <Image
              src={logo}
              alt="FitLog logo"
              width={30}
              height={30}
              priority
              className="h-[30px] w-[30px] object-contain"
            />

            <span className="fit-display text-[20px] font-bold tracking-[0.07em] text-white">
              FITLOG
            </span>
          </div>
        </Link>

        {/* ================= CENTER NAVIGATION ================= */}
        <nav className="flex items-center gap-1 rounded-full bg-transparent md:gap-1.5 md:bg-transparent">

          {/* WORKOUT */}
          <Link
            href="/"
            className={`flex h-[38px] items-center justify-center rounded-full px-3.5 text-[12px] font-semibold transition-colors duration-200 md:h-[42px] md:px-6 md:text-[13px] ${
              workoutActive
                ? "bg-[#202f0d] text-[#ccff00]"
                : "text-[#9ba1a9] hover:text-white"
            }`}
          >
            Workouts
          </Link>

          {/* MY PLAN */}
          <Link
            href="/my-plan"
            className={`flex h-[38px] items-center justify-center rounded-full px-3.5 text-[12px] font-semibold transition-colors duration-200 md:h-[42px] md:px-6 md:text-[13px] ${
              planActive
                ? "bg-[#202f0d] text-[#ccff00]"
                : "text-[#9ba1a9] hover:text-white"
            }`}
          >
            My Plan
          </Link>

        </nav>

        {/* ================= RIGHT SIDE ================= */}
        <div className="flex shrink-0 items-center gap-2 md:gap-6">

          {/* PLAN */}
          <Link
            href="/my-plan"
            aria-label={`Today's plan: ${plan.length} workouts`}
            className="group flex items-center"
          >
            
            <span className="mr-2 hidden text-[12px] font-medium text-[#d5d8dc] transition-colors duration-200 group-hover:text-white md:block">
              Plan
            </span>

            <span className="flex h-[26px] min-w-[26px] items-center justify-center rounded-full bg-[#ccff00] px-1.5 text-[12px] font-bold leading-none text-[#0b0d0f] transition-transform duration-150 group-hover:scale-105 md:h-[21px] md:min-w-[21px] md:text-[12px]">
              {plan.length}
            </span>
          </Link>

          {/* SAVED */}
          <Link
            href="/my-plan"
            aria-label={`Saved workouts: ${saved.length}`}
            className="group flex items-center"
          >

            <span className="mr-2 hidden text-[12px] font-medium text-[#d5d8dc] transition-colors duration-200 group-hover:text-white md:block">
              Saved
            </span>

            <span className="flex h-[26px] min-w-[26px] items-center justify-center rounded-full border border-[#555b63] px-1.5 text-[12px] font-medium leading-none text-[#d5d8dc] transition-colors duration-200 group-hover:border-[#858c95] group-hover:text-white md:h-[21px] md:min-w-[21px] md:text-[12px]">
              {saved.length}
            </span>
          </Link>

        </div>
      </div>
    </header>
  );
}