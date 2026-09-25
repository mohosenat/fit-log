"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { useFitLog } from "@/context/FitLogContext";
import logo from "@/assets/logo.png";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = useFitLog();
  const [open, setOpen] = useState(false);

  const workoutActive = pathname === "/";
  const planActive = pathname.startsWith("/my-plan");

  return (
    <header className="sticky top-0 z-50 border-b border-[#191d22] bg-[#0b0d0f]/95 backdrop-blur">

      {/* ================= DESKTOP / MAIN NAVBAR ================= */}
      <div className="fit-container flex h-[68px] items-center justify-between gap-8">

        {/* ================= LOGO ================= */}
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="flex shrink-0 items-center gap-2.5"
        >
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
        </Link>

        {/* ================= CENTER NAVIGATION ================= */}
        <nav className="hidden items-center gap-9 md:flex">

          <Link
            href="/"
            className={`text-[12px] font-medium transition-colors duration-200 ${
              workoutActive
                ? "text-[#ccff00]"
                : "text-[#d5d8dc] hover:text-white"
            }`}
          >
            Workout
          </Link>

          <Link
            href="/my-plan"
            className={`text-[12px] font-medium transition-colors duration-200 ${
              planActive
                ? "text-[#ccff00]"
                : "text-[#d5d8dc] hover:text-white"
            }`}
          >
            My Plan
          </Link>

        </nav>

        {/* ================= RIGHT SIDE ================= */}
        <div className="hidden items-center gap-6 md:flex">

          {/* PLAN */}
          <Link
            href="/my-plan"
            className="group flex items-center gap-2 text-[12px] font-medium text-[#d5d8dc] transition-colors duration-200 hover:text-white"
          >
            <span>Plan</span>

            <span className="flex h-[21px] min-w-[21px] items-center justify-center rounded-full bg-[#ccff00] px-1.5 text-[12px] leading-none text-[#0b0d0f] transition-colors duration-200 group-hover:scale-103">
              {plan.length}
            </span>
          </Link>

          {/* SAVED */}
          <Link
            href="/my-plan?tab=saved"
            className="group flex items-center gap-2 text-[12px] font-medium text-[#d5d8dc] transition-colors duration-200 hover:text-white"
          >
            <span>Saved</span>

            <span className="flex h-[21px] min-w-[21px] items-center justify-center rounded-full border border-[#555b63] px-1.5 text-[12px] leading-none text-[#d5d8dc] transition-colors duration-200 group-hover:border-[#858c95] group-hover:text-white">
              {saved.length}
            </span>
          </Link>

        </div>

        {/* ================= MOBILE MENU BUTTON ================= */}
        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          aria-label="Toggle navigation"
          aria-expanded={open}
          className="text-[#ccff00] transition-opacity duration-200 hover:opacity-80 md:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* ================= MOBILE NAVIGATION ================= */}
      {open && (
        <nav className="border-t border-[#191d22] bg-[#0b0d0f] px-4 pb-5 md:hidden">
          <div className="fit-container flex flex-col gap-5 pt-5">

            {/* WORKOUT */}
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className={`text-[14px] font-medium transition-colors duration-200 ${
                workoutActive
                  ? "text-[#ccff00]"
                  : "text-[#858c95] hover:text-white"
              }`}
            >
              Workout
            </Link>

            {/* MY PLAN */}
            <Link
              href="/my-plan"
              onClick={() => setOpen(false)}
              className={`text-[14px] font-medium transition-colors duration-200 ${
                planActive
                  ? "text-[#ccff00]"
                  : "text-[#858c95] hover:text-white"
              }`}
            >
              My Plan
            </Link>

            {/* MOBILE COUNTERS */}
            <div className="flex items-center gap-6 border-t border-[#252a30] pt-5">

              {/* PLAN */}
              <Link
                href="/my-plan"
                onClick={() => setOpen(false)}
                className="group flex items-center gap-2 text-[12px] font-medium text-[#d5d8dc] transition-colors duration-200 hover:text-white"
              >
                <span>Plan</span>

                <span className="flex h-[21px] min-w-[21px] items-center justify-center rounded-full bg-[#ccff00] px-1.5 text-[10px] font-bold leading-none text-[#0b0d0f]">
                  {plan.length}
                </span>
              </Link>

              {/* SAVED */}
              <Link
                href="/my-plan?tab=saved"
                onClick={() => setOpen(false)}
                className="group flex items-center gap-2 text-[12px] font-medium text-[#d5d8dc] transition-colors duration-200 hover:text-white"
              >
                <span>Saved</span>

                <span className="flex h-[21px] min-w-[21px] items-center justify-center rounded-full border border-[#555b63] px-1.5 text-[10px] leading-none text-[#d5d8dc] transition-colors duration-200 group-hover:border-[#858c95] group-hover:text-white">
                  {saved.length}
                </span>
              </Link>

            </div>
          </div>
        </nav>
      )}
    </header>
  );
}