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
      <div className="fit-container flex h-[58px] items-center justify-between gap-4">

        {/* Logo */}
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="flex shrink-0 items-center gap-2"
        >
          <Image
            src={logo}
            alt="FitLog logo"
            width={26}
            height={26}
            priority
            className="h-[26px] w-[26px] object-contain"
          />

          <span className="fit-display text-[13px] font-bold tracking-[0.06em] text-white">
            FITLOG
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-5 md:flex">
          <Link
            href="/"
            className={`text-[10px] font-medium transition ${
              workoutActive
                ? "text-[#ccff00]"
                : "text-[#8b9199] hover:text-white"
            }`}
          >
            Workout
          </Link>

          <Link
            href="/my-plan"
            className={`text-[10px] font-medium transition ${
              planActive
                ? "text-[#ccff00]"
                : "text-[#8b9199] hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </nav>

        {/* Counters */}
        <div className="hidden items-center gap-4 md:flex">
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 text-[10px] text-white"
          >
            Plan

            <span className="flex h-[16px] min-w-[16px] items-center justify-center rounded-full bg-[#ccff00] px-1 text-[9px] font-bold text-black">
              {plan.length}
            </span>
          </Link>

          <Link
            href="/my-plan?tab=saved"
            className="flex items-center gap-1.5 text-[10px] text-white"
          >
            Saved

            <span className="flex h-[16px] min-w-[16px] items-center justify-center rounded-full border border-[#555b63] px-1 text-[9px] text-white">
              {saved.length}
            </span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          aria-label="Toggle navigation"
          aria-expanded={open}
          className="text-[#ccff00] md:hidden"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {open && (
        <nav className="border-t border-[#191d22] bg-[#0b0d0f] px-4 pb-4 md:hidden">
          <div className="fit-container flex flex-col gap-4 pt-4">

            <Link
              href="/"
              onClick={() => setOpen(false)}
              className={
                workoutActive
                  ? "text-sm text-[#ccff00]"
                  : "text-sm text-[#a4aab1]"
              }
            >
              Workout
            </Link>

            <Link
              href="/my-plan"
              onClick={() => setOpen(false)}
              className={
                planActive
                  ? "text-sm text-[#ccff00]"
                  : "text-sm text-[#a4aab1]"
              }
            >
              My Plan
            </Link>

            <div className="flex items-center gap-5 border-t border-[#252a30] pt-4">

              <Link
                href="/my-plan"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 text-xs text-white"
              >
                Plan

                <span className="rounded-full bg-[#ccff00] px-2 py-0.5 text-[10px] font-bold text-black">
                  {plan.length}
                </span>
              </Link>

              <Link
                href="/my-plan?tab=saved"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 text-xs text-white"
              >
                Saved

                <span className="rounded-full border border-[#555b63] px-2 py-0.5 text-[10px] text-white">
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