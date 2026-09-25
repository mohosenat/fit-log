import Image from "next/image";
import logo from "@/assets/logo.png";

export default function Footer() {
  return (
    <footer className="border-t border-[#1c2025] bg-[#090b0d]">
      <div className="fit-container flex min-h-[70px] flex-col items-start justify-center gap-3 py-5 sm:flex-row sm:items-center sm:justify-between">

        {/* Brand */}
        <div className="flex items-center gap-2">
          <Image
            src={logo}
            alt="FitLog logo"
            width={20}
            height={20}
            className="h-5 w-5 object-contain"
          />

          <span className="fit-display text-[10px] font-bold tracking-[0.08em] text-white">
            FITLOG
          </span>
        </div>

        {/* Copyright */}
        <p className="text-[9px] text-[#555d66]">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>

      </div>
    </footer>
  );
}