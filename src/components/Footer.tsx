"use client";

import Link from "next/link";
import { Instagram, Linkedin, ArrowUpRight } from "lucide-react";
import { routes, type PageKey } from "@/lib/routes";

const companyLinks: { label: string; page: PageKey }[] = [
  { label: "Home", page: "home" },
  { label: "Services", page: "services" },
  { label: "Portfolio", page: "portfolio" },
  { label: "Clients", page: "clients" },
];

export function Footer() {
  return (
    <footer
      className="relative border-t"
      style={{
        background: "#020810",
        borderColor: "rgba(30, 111, 255, 0.12)",
      }}
    >
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px"
        style={{ background: "linear-gradient(90deg, transparent, #1E6FFF, transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #1E6FFF, #00C6FF)",
                  boxShadow: "0 0 16px rgba(30, 111, 255, 0.35)",
                }}
              >
                <span className="text-white font-bold text-base" style={{ fontFamily: "var(--font-heading)" }}>C</span>
              </div>
              <span className="text-white text-lg" style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}>
                Cognitoo<span style={{ color: "#1E6FFF" }}>.inc</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "#7A95B8", fontFamily: "var(--font-body)" }}>
              AI-powered marketing for brands that want to grow smarter. We combine creativity, strategy, and technology to build lasting digital presence.
            </p>
            <div className="flex items-center gap-4">
              {[
                { Icon: Instagram, href: "https://www.instagram.com/cognitoo.inc?igsh=ajN1ZnBjcjhxN2Iw" },
                { Icon: Linkedin, href: "#" },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target={href === "#" ? undefined : "_blank"}
                  rel={href === "#" ? undefined : "noreferrer"}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{
                    background: "rgba(30, 111, 255, 0.1)",
                    border: "1px solid rgba(30, 111, 255, 0.2)",
                    color: "#7A95B8",
                  }}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white text-sm mb-5 tracking-widest uppercase" style={{ fontFamily: "var(--font-heading)", fontWeight: 600, letterSpacing: "0.12em" }}>Company</h4>
            <ul className="flex flex-col gap-3">
              {companyLinks.map((item) => (
                <li key={item.page}>
                  <Link
                    href={routes[item.page]}
                    className="text-sm transition-colors duration-200 hover:text-white flex items-center gap-1 group"
                    style={{ color: "#7A95B8", fontFamily: "var(--font-body)" }}
                  >
                    {item.label}
                    <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm mb-5 tracking-widest uppercase" style={{ fontFamily: "var(--font-heading)", fontWeight: 600, letterSpacing: "0.12em" }}>Services</h4>
            <ul className="flex flex-col gap-3">
              {[
                "Social Media Management",
                "Content Ideation & Strategy",
                "In-Person Filming",
                "AI-Powered Systems",
              ].map((s) => (
                <li key={s}>
                  <Link
                    href={routes.services}
                    className="text-sm text-left transition-colors duration-200 hover:text-white"
                    style={{ color: "#7A95B8", fontFamily: "var(--font-body)" }}
                  >
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm mb-5 tracking-widest uppercase" style={{ fontFamily: "var(--font-heading)", fontWeight: 600, letterSpacing: "0.12em" }}>Get In Touch</h4>
            <div className="flex flex-col gap-3">
              <p className="text-sm" style={{ color: "#7A95B8", fontFamily: "var(--font-body)" }}>
                Ready to elevate your brand&apos;s digital presence?
              </p>
              <Link
                href={routes.contact}
                className="mt-2 px-5 py-3 rounded-xl text-sm font-medium text-white text-center transition-all duration-200 hover:scale-105"
                style={{
                  fontFamily: "var(--font-body)",
                  background: "linear-gradient(135deg, #1E6FFF, #2979FF)",
                  boxShadow: "0 4px 20px rgba(30, 111, 255, 0.3)",
                }}
              >
                Start a Conversation
              </Link>
            </div>
          </div>
        </div>

        <div
          className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 border-t"
          style={{ borderColor: "rgba(30, 111, 255, 0.1)" }}
        >
          <p className="text-xs" style={{ color: "#4A6080", fontFamily: "var(--font-body)" }}>
            © 2025 Cognitoo.inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-xs" style={{ color: "#4A6080", fontFamily: "var(--font-body)" }}>Privacy Policy</span>
            <span className="text-xs" style={{ color: "#4A6080", fontFamily: "var(--font-body)" }}>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
