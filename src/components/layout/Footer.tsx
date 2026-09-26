import Image from "next/image";
import logo from "@/assets/logo.png";

export default function Footer() {
  return (
    <footer className="border-t border-[#1c2025] bg-[#090b0d]">
      <div className="fit-container flex items-center justify-between gap-4 py-7">

        {/* Brand */}
        <div className="flex shrink-0 items-center gap-2">
          <Image
            src={logo}
            alt="FitLog logo"
            width={22}
            height={22}
            className="h-[22px] w-[22px] object-contain"
          />

          <span className="fit-display text-[11px] font-bold tracking-[0.08em] text-white sm:text-[13px]">
            FITLOG
          </span>
        </div>

        {/* Mobile Copyright */}
        <p className="text-right text-[10px] text-[#555d66] sm:hidden">
          © 2026 FitLog
        </p>

        {/* Desktop Copyright */}
        <p className="hidden text-right text-[11px] text-[#555d66] sm:block">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>

      </div>
    </footer>
  );
}