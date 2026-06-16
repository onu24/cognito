"use client";

import type React from "react";
import Link from "next/link";
import { ArrowLeft, Loader2, LockKeyhole } from "lucide-react";

type AuthPanelProps = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
};

export function AuthPanel({ title, subtitle, children }: AuthPanelProps) {
  return (
    <main className="min-h-screen px-6 py-8 flex items-center justify-center bg-[#040C1A]">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[#A8BFDE] hover:text-white transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Back to site
        </Link>

        <div className="border border-[rgba(30,111,255,0.16)] bg-[#081428] rounded-lg p-7 shadow-[0_24px_80px_rgba(0,0,0,0.32)]">
          <div className="w-11 h-11 rounded-lg bg-[#1E6FFF] flex items-center justify-center mb-5">
            <LockKeyhole className="text-white" size={20} />
          </div>
          <h1
            className="text-3xl text-white mb-2"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 800 }}
          >
            {title}
          </h1>
          <p className="text-sm text-[#A8BFDE] mb-7">{subtitle}</p>
          {children}
        </div>
      </div>
    </main>
  );
}

export function SubmitButton({
  loading,
  children,
}: {
  loading: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full h-11 rounded-md bg-[#1E6FFF] text-white text-sm font-semibold flex items-center justify-center gap-2 transition-all hover:bg-[#2979FF] disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {loading && <Loader2 size={16} className="animate-spin" />}
      {children}
    </button>
  );
}
