"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { getPageKeyFromPath, routes, type PageKey } from "@/lib/routes";

const navLinks: { label: string; page: PageKey }[] = [
  { label: "Home", page: "home" },
  { label: "Services", page: "services" },
  { label: "Portfolio", page: "portfolio" },
  { label: "Clients", page: "clients" },
  { label: "Contact", page: "contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const currentPage = getPageKeyFromPath(pathname);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled
            ? "rgba(4, 12, 26, 0.95)"
            : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(30, 111, 255, 0.12)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link
              href={routes.home}
              onClick={closeMobile}
              className="flex items-center gap-3 group"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center relative overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #1E6FFF, #00C6FF)",
                  boxShadow: "0 0 20px rgba(30, 111, 255, 0.4)",
                }}
              >
                <span
                  className="text-white text-lg select-none"
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 800 }}
                >
                  C
                </span>
              </div>
              <div className="flex flex-col leading-none">
                <span
                  className="text-white text-lg tracking-wide"
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
                >
                  Cognitoo
                  <span style={{ color: "#1E6FFF" }}>.inc</span>
                </span>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.page}
                  href={routes[link.page]}
                  className="relative text-sm tracking-wide transition-colors duration-200 group"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 500,
                    color: currentPage === link.page ? "#1E6FFF" : "#A8BFDE",
                  }}
                >
                  {link.label}
                  <span
                    className="absolute -bottom-1 left-0 h-px transition-all duration-300"
                    style={{
                      width: currentPage === link.page ? "100%" : "0%",
                      background: "linear-gradient(90deg, #1E6FFF, #00C6FF)",
                    }}
                  />
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <Link
                href={routes.contact}
                className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white transition-all duration-200 hover:scale-105"
                style={{
                  fontFamily: "var(--font-body)",
                  background: "linear-gradient(135deg, #1E6FFF, #2979FF)",
                  boxShadow: "0 4px 20px rgba(30, 111, 255, 0.35)",
                }}
              >
                Book Consultation
              </Link>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden text-white p-2"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {mobileOpen && (
          <div
            className="md:hidden border-t"
            style={{
              background: "rgba(4, 12, 26, 0.98)",
              borderColor: "rgba(30, 111, 255, 0.12)",
            }}
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {navLinks.map((link) => (
                <Link
                  key={link.page}
                  href={routes[link.page]}
                  onClick={closeMobile}
                  className="text-left text-base transition-colors"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: currentPage === link.page ? "#1E6FFF" : "#A8BFDE",
                  }}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href={routes.contact}
                onClick={closeMobile}
                className="mt-2 px-5 py-3 rounded-xl text-sm font-medium text-white text-center"
                style={{
                  background: "linear-gradient(135deg, #1E6FFF, #2979FF)",
                }}
              >
                Book Consultation
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
