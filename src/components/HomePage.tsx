"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { collection, onSnapshot, query } from "firebase/firestore";
import { ArrowRight, Play, CheckCircle2, Zap, BarChart3, Clock, DollarSign, TrendingUp, Instagram, Film, Lightbulb, X, Check, ChevronRight } from "lucide-react";
import { fallbackPortfolio, type PortfolioItem } from "@/lib/content";
import { db } from "@/lib/firebase";
import { routes } from "@/lib/routes";

const taglines = [
  "Intelligence That Markets",
  "Strategy Meets Technology",
  "Growth Without Guesswork",
];

const services = [
  {
    icon: Instagram,
    title: "Social Media Marketing & Management",
    desc: "Full-service social media management powered by AI-assisted content calendars, community engagement, and performance analytics across all major platforms.",
    tags: ["Instagram", "Facebook", "LinkedIn", "YouTube"],
  },
  {
    icon: Lightbulb,
    title: "Content Ideation & Strategy",
    desc: "Data-informed content planning that transforms your brand voice into compelling narratives. From concept to calendar, we build systems that scale.",
    tags: ["Content Calendars", "Brand Voice", "Campaign Planning"],
  },
  {
    icon: Film,
    title: "In-Person Filming & Production",
    desc: "Professional on-location video production for reels, ads, brand films, and social content. We handle creative direction, filming, and post-production.",
    tags: ["Reels", "Brand Films", "Ads", "Photography"],
  },
];

const comparisonRows = [
  { label: "Workflow", traditional: "Manual, repetitive", cognitoo: "AI-assisted & automated" },
  { label: "Turnaround", traditional: "Slow (weeks)", cognitoo: "Fast execution" },
  { label: "Pricing", traditional: "High overhead costs", cognitoo: "Cost efficient" },
  { label: "Insights", traditional: "Limited reporting", cognitoo: "Data-informed decisions" },
  { label: "Scalability", traditional: "Hard to scale", cognitoo: "Built to scale with you" },
  { label: "Strategy", traditional: "One-size-fits-all", cognitoo: "Tailored to your brand" },
];

const stats = [
  { value: "3+", label: "Core Services", icon: Zap },
  { value: "AI", label: "Enhanced Workflows", icon: BarChart3 },
  { value: "Fast", label: "Turnaround Time", icon: Clock },
  { value: "ROI", label: "Results Available Upon Request", icon: TrendingUp },
];

const strategicPartners = [
  {
    name: "Wolflix Dev",
    role: "Websites, apps, e-commerce, CRM systems, and growth-focused digital tools.",
    accent: "#D9582A",
    points: ["Web Development", "Mobile Apps", "E-Commerce", "CRM Solutions"],
    link: "https://wolfix-dev.vercel.app",
  },
  {
    name: "Cognitoo Agency",
    role: "Social media strategy, content production, campaign management, and brand growth.",
    accent: "#1E6FFF",
    points: ["Content Strategy", "Social Management", "Creative Production", "Growth Insights"],
    link: null,
  },
];

export function HomePage() {
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [portfolioPreview, setPortfolioPreview] = useState<PortfolioItem[]>(fallbackPortfolio.slice(0, 3));

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setTaglineIndex((i) => (i + 1) % taglines.length);
        setVisible(true);
      }, 400);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(query(collection(db, "portfolio")), (snapshot) => {
      const liveProjects = snapshot.docs.map((item) => ({
        id: item.id,
        ...item.data(),
      })) as PortfolioItem[];
      setPortfolioPreview((liveProjects.length ? liveProjects : fallbackPortfolio).slice(0, 3));
    });

    return unsubscribe;
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "var(--brand-deep-blue)", fontFamily: "var(--font-body)" }}>
      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
        {/* Background radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 80% 60% at 50% 20%, rgba(30,111,255,0.12) 0%, transparent 65%)",
          }}
        />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(rgba(30,111,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(30,111,255,1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div>
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs mb-8"
                style={{
                  background: "rgba(30,111,255,0.1)",
                  border: "1px solid rgba(30,111,255,0.25)",
                  color: "#7AB8FF",
                  fontFamily: "var(--font-body)",
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ background: "#1E6FFF" }}
                />
                AI-Powered Digital Marketing Agency
              </div>

              <h1
                className="mb-4 leading-tight"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 800,
                  fontSize: "clamp(2.5rem, 5vw, 4rem)",
                  color: "#E8F0FF",
                }}
              >
                Your Brand Deserves{" "}
                <span
                  className="block transition-all duration-400"
                  style={{
                    background: "linear-gradient(90deg, #1E6FFF, #00C6FF)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(8px)",
                  }}
                >
                  {taglines[taglineIndex]}
                </span>
              </h1>

              <p
                className="text-lg leading-relaxed mb-10 max-w-lg"
                style={{ color: "#7A95B8" }}
              >
                Cognitoo.inc blends AI-assisted workflows, creative strategy, and in-person production to help B2C brands, institutions, and hospitality businesses build a stronger digital presence — faster, smarter, and at scale.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href={routes.contact}
                  className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-white font-medium text-sm transition-all duration-200 hover:scale-105 hover:shadow-lg"
                  style={{
                    fontFamily: "var(--font-body)",
                    background: "linear-gradient(135deg, #1E6FFF, #2979FF)",
                    boxShadow: "0 4px 24px rgba(30,111,255,0.4)",
                  }}
                >
                  Book A Consultation
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href={routes.portfolio}
                  className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "#E8F0FF",
                    border: "1px solid rgba(30,111,255,0.3)",
                    background: "rgba(30,111,255,0.06)",
                  }}
                >
                  <Play size={14} />
                  View Portfolio
                </Link>
              </div>

              {/* Quick stats */}
              <div className="flex flex-wrap gap-8 mt-14">
                {stats.map(({ value, label, icon: Icon }) => (
                  <div key={label}>
                    <div
                      className="text-2xl mb-1"
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontWeight: 800,
                        background: "linear-gradient(90deg, #1E6FFF, #00C6FF)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {value}
                    </div>
                    <div className="text-xs" style={{ color: "#7A95B8" }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — visual card stack */}
            <div className="relative hidden lg:flex items-center justify-center">
              {/* Main card */}
              <div
                className="relative rounded-2xl p-6 w-80"
                style={{
                  background: "rgba(8,20,40,0.9)",
                  border: "1px solid rgba(30,111,255,0.2)",
                  boxShadow: "0 0 60px rgba(30,111,255,0.12), 0 24px 48px rgba(0,0,0,0.4)",
                }}
              >
                <div className="flex items-center justify-between mb-5">
                  <span className="text-sm font-medium text-white" style={{ fontFamily: "var(--font-heading)" }}>Campaign Performance</span>
                  <span className="text-xs px-2.5 py-1 rounded-full" style={{ background: "rgba(30,111,255,0.15)", color: "#7AB8FF" }}>Live</span>
                </div>
                {["Engagement Rate", "Content Reach", "Brand Awareness", "Conversion Intent"].map((metric, i) => (
                  <div key={metric} className="mb-3">
                    <div className="flex justify-between text-xs mb-1.5">
                      <span style={{ color: "#7A95B8" }}>{metric}</span>
                      <span style={{ color: "#7AB8FF" }}>To Be Updated</span>
                    </div>
                    <div className="h-1.5 rounded-full" style={{ background: "rgba(30,111,255,0.12)" }}>
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{
                          width: `${[72, 85, 60, 78][i]}%`,
                          background: "linear-gradient(90deg, #1E6FFF, #00C6FF)",
                        }}
                      />
                    </div>
                  </div>
                ))}
                <div className="mt-5 pt-4 border-t flex items-center gap-2" style={{ borderColor: "rgba(30,111,255,0.12)" }}>
                  <Zap size={13} style={{ color: "#1E6FFF" }} />
                  <span className="text-xs" style={{ color: "#7A95B8" }}>AI workflow active — Data not publicly disclosed</span>
                </div>
              </div>

              {/* Floating chip 1 */}
              <div
                className="absolute -top-4 -right-4 rounded-xl px-4 py-2.5 text-xs"
                style={{
                  background: "rgba(8,20,40,0.95)",
                  border: "1px solid rgba(30,111,255,0.2)",
                  color: "#7AB8FF",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
                }}
              >
                <div className="font-semibold text-white text-sm" style={{ fontFamily: "var(--font-heading)" }}>3 Services</div>
                <div style={{ color: "#7A95B8" }}>End-to-end delivery</div>
              </div>

              {/* Floating chip 2 */}
              <div
                className="absolute -bottom-4 -left-4 rounded-xl px-4 py-2.5 text-xs"
                style={{
                  background: "rgba(8,20,40,0.95)",
                  border: "1px solid rgba(30,111,255,0.2)",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
                }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#1E6FFF" }} />
                  <span style={{ color: "#7AB8FF" }}>AI-Assisted Workflows</span>
                </div>
              </div>

              {/* Glow */}
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{ boxShadow: "0 0 80px rgba(30,111,255,0.08)" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── WHO WE HELP ─── */}
      <section className="py-24 relative">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(30,111,255,0.04) 0%, transparent 70%)" }}
        />
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "#1E6FFF", fontFamily: "var(--font-heading)", letterSpacing: "0.15em" }}>
              Trusted Growth Partner
            </p>
            <h2
              className="mb-5"
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 700,
                fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
                color: "#E8F0FF",
              }}
            >
              Built for Brands That Think Forward
            </h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: "#7A95B8" }}>
              We partner with businesses that understand the value of intentional digital strategy — from growing local brands to scaling hospitality groups and institutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "🏪", title: "B2C Brands", desc: "Retail, lifestyle, and direct-to-consumer brands looking to grow their community and convert audiences." },
              { icon: "🎓", title: "Educational Institutions", desc: "Universities, schools, and coaching institutes building recruitment pipelines and brand reputation." },
              { icon: "🏨", title: "Hospitality Businesses", desc: "Hotels, restaurants, cafés, and resorts showcasing their experience through premium visual content." },
              { icon: "📍", title: "Local Brands", desc: "Neighborhood businesses ready to compete at a larger scale with professional-grade marketing." },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl p-6 group hover:scale-[1.02] transition-all duration-300"
                style={{
                  background: "rgba(8,20,40,0.7)",
                  border: "1px solid rgba(30,111,255,0.12)",
                }}
              >
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-base font-semibold text-white mb-2" style={{ fontFamily: "var(--font-heading)" }}>{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#7A95B8" }}>{item.desc}</p>
              </div>
            ))}
          </div>

          {/* What we do */}
          <div
            className="mt-16 rounded-2xl p-8 lg:p-12 grid lg:grid-cols-3 gap-8"
            style={{
              background: "rgba(8,20,40,0.5)",
              border: "1px solid rgba(30,111,255,0.12)",
            }}
          >
            {[
              { title: "What We Do", desc: "Cognitoo.inc delivers end-to-end digital marketing — from strategy and content creation to filming and performance management — powered by AI-assisted workflows that save time without cutting quality." },
              { title: "Why We're Different", desc: "We move faster than traditional agencies by embedding AI into our process. That means better planning, faster content production, and smarter insights — all at a price point that makes sense for your stage of growth." },
              { title: "Why Brands Choose Us", desc: "Because we treat your brand like our own. We don't template you into a package. Every strategy is tailored, every piece of content is intentional, and every campaign is built for your specific audience." },
            ].map((item) => (
              <div key={item.title}>
                <h3 className="text-base font-semibold mb-3" style={{ fontFamily: "var(--font-heading)", color: "#7AB8FF" }}>{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#7A95B8" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Partner */}
      <section className="py-24 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(90deg, rgba(217,88,42,0.08), transparent 45%, rgba(30,111,255,0.08))" }}
        />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-stretch">
            <div
              className="rounded-2xl p-8 lg:p-10 flex flex-col justify-between"
              style={{
                background: "rgba(8,20,40,0.78)",
                border: "1px solid rgba(217,88,42,0.22)",
              }}
            >
              <div>
                <p className="text-xs uppercase mb-4" style={{ color: "#D9582A", fontFamily: "var(--font-heading)", fontWeight: 700 }}>
                  Strategic Partner
                </p>
                <h2
                  className="mb-5"
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 800,
                    fontSize: "clamp(2rem, 4vw, 3.3rem)",
                    color: "#E8F0FF",
                  }}
                >
                  Wolflix Dev x Cognitoo Agency
                </h2>
                <p className="text-base leading-relaxed max-w-xl" style={{ color: "#A8BFDE" }}>
                  Wolflix builds the digital backbone - websites, apps, stores, and business tools - while Cognitoo drives the brand voice through content, campaigns, and social growth.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 mt-8">
                <span className="px-4 py-2 rounded-lg text-sm font-medium" style={{ color: "#F5D8C8", border: "1px solid rgba(217,88,42,0.35)", background: "rgba(217,88,42,0.12)" }}>
                  Wolflix Dev
                </span>
                <span className="px-4 py-2 rounded-lg text-sm font-medium" style={{ color: "#7AB8FF", border: "1px solid rgba(30,111,255,0.35)", background: "rgba(30,111,255,0.1)" }}>
                  Cognitoo Agency
                </span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {strategicPartners.map((partner) => (
                <div
                  key={partner.name}
                  className="rounded-2xl p-7"
                  style={{
                    background: "rgba(8,20,40,0.7)",
                    border: `1px solid ${partner.accent}40`,
                  }}
                >
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <div>
                      <h3 className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>
                        {partner.name}
                      </h3>
                      <p className="text-xs mt-1" style={{ color: "#7A95B8" }}>
                        {partner.name === "Wolflix Dev" ? "Development Partner" : "Marketing Partner"}
                      </p>
                    </div>
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold"
                      style={{ background: `${partner.accent}22`, color: partner.accent }}
                    >
                      {partner.name.charAt(0)}
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed mb-6" style={{ color: "#A8BFDE" }}>
                    {partner.role}
                  </p>
                  <div className="flex flex-col gap-3">
                    {partner.points.map((point) => (
                      <div key={point} className="flex items-center gap-3 text-sm" style={{ color: "#7A95B8" }}>
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: partner.accent }} />
                        {point}
                      </div>
                    ))}
                  </div>
                  {partner.link ? (
                    <a
                      href={partner.link}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-7 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-105"
                      style={{
                        color: "#071326",
                        background: partner.accent,
                        boxShadow: `0 12px 28px ${partner.accent}35`,
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      Meet Wolflix
                      <ArrowRight size={15} />
                    </a>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── SERVICES PREVIEW ─── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "#1E6FFF", fontFamily: "var(--font-heading)", letterSpacing: "0.15em" }}>
                Services
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 700,
                  fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
                  color: "#E8F0FF",
                }}
              >
                How We Grow Your Brand
              </h2>
            </div>
            <Link
              href={routes.services}
              className="flex items-center gap-2 text-sm transition-colors hover:gap-3"
              style={{ color: "#1E6FFF", fontFamily: "var(--font-body)" }}
            >
              View All Services <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {services.map(({ icon: Icon, title, desc, tags }) => (
              <Link
                key={title}
                href={routes.services}
                className="rounded-2xl p-7 group hover:scale-[1.02] transition-all duration-300 cursor-pointer block"
                style={{
                  background: "rgba(8,20,40,0.7)",
                  border: "1px solid rgba(30,111,255,0.12)",
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{
                    background: "rgba(30,111,255,0.12)",
                    border: "1px solid rgba(30,111,255,0.2)",
                  }}
                >
                  <Icon size={22} style={{ color: "#1E6FFF" }} />
                </div>
                <h3 className="text-base font-semibold text-white mb-3" style={{ fontFamily: "var(--font-heading)" }}>{title}</h3>
                <p className="text-sm leading-relaxed mb-5" style={{ color: "#7A95B8" }}>{desc}</p>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 rounded-full"
                      style={{
                        background: "rgba(30,111,255,0.08)",
                        border: "1px solid rgba(30,111,255,0.18)",
                        color: "#7AB8FF",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY COGNITOO (Comparison) ─── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "#1E6FFF", fontFamily: "var(--font-heading)", letterSpacing: "0.15em" }}>
              Why Cognitoo.inc
            </p>
            <h2
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 700,
                fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
                color: "#E8F0FF",
              }}
            >
              The Smarter Way to Market
            </h2>
          </div>

          <div
            className="rounded-2xl overflow-hidden"
            style={{
              border: "1px solid rgba(30,111,255,0.15)",
              background: "rgba(8,20,40,0.5)",
            }}
          >
            {/* Header */}
            <div className="grid grid-cols-3 text-sm font-semibold">
              <div className="px-6 py-5 border-r" style={{ borderColor: "rgba(30,111,255,0.12)", color: "#7A95B8", fontFamily: "var(--font-heading)" }}>
                Feature
              </div>
              <div className="px-6 py-5 border-r text-center" style={{ borderColor: "rgba(30,111,255,0.12)", color: "#7A95B8", fontFamily: "var(--font-heading)" }}>
                Traditional Agencies
              </div>
              <div
                className="px-6 py-5 text-center"
                style={{
                  fontFamily: "var(--font-heading)",
                  background: "rgba(30,111,255,0.08)",
                  color: "#7AB8FF",
                }}
              >
                Cognitoo.inc ✦
              </div>
            </div>

            {comparisonRows.map((row, i) => (
              <div
                key={row.label}
                className="grid grid-cols-3 text-sm border-t"
                style={{ borderColor: "rgba(30,111,255,0.08)" }}
              >
                <div className="px-6 py-4 border-r font-medium" style={{ borderColor: "rgba(30,111,255,0.08)", color: "#A8BFDE", fontFamily: "var(--font-body)" }}>
                  {row.label}
                </div>
                <div className="px-6 py-4 border-r text-center flex items-center justify-center gap-2" style={{ borderColor: "rgba(30,111,255,0.08)", color: "#4A6080" }}>
                  <X size={13} style={{ color: "#d4183d" }} />
                  {row.traditional}
                </div>
                <div
                  className="px-6 py-4 text-center flex items-center justify-center gap-2"
                  style={{
                    background: "rgba(30,111,255,0.04)",
                    color: "#7AB8FF",
                  }}
                >
                  <Check size={13} style={{ color: "#1E6FFF" }} />
                  {row.cognitoo}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PORTFOLIO PREVIEW ─── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "#1E6FFF", fontFamily: "var(--font-heading)", letterSpacing: "0.15em" }}>
                Portfolio
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 700,
                  fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
                  color: "#E8F0FF",
                }}
              >
                Work That Speaks for Itself
              </h2>
            </div>
            <Link
              href={routes.portfolio}
              className="flex items-center gap-2 text-sm transition-colors hover:gap-3"
              style={{ color: "#1E6FFF", fontFamily: "var(--font-body)" }}
            >
              Explore Our Work <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {portfolioPreview.map((project) => (
              <Link
                key={project.id}
                href={routes.portfolio}
                className="rounded-2xl overflow-hidden group cursor-pointer hover:scale-[1.02] transition-all duration-300 block"
                style={{
                  border: "1px solid rgba(30,111,255,0.12)",
                  background: "rgba(8,20,40,0.7)",
                }}
              >
                <div className="relative h-48 overflow-hidden" style={{ background: "#0D1E3A" }}>
                  <img
                    src={project.img}
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to top, rgba(4,12,26,0.7), transparent)" }}
                  />
                  <span
                    className="absolute top-3 right-3 text-xs px-3 py-1.5 rounded-full"
                    style={{
                      background: "rgba(4,12,26,0.85)",
                      border: "1px solid rgba(30,111,255,0.2)",
                      color: "#7AB8FF",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    {project.industry}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-base font-semibold text-white mb-2" style={{ fontFamily: "var(--font-heading)" }}>{project.name}</h3>
                  <p className="text-sm" style={{ color: "#7A95B8" }}>{project.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div
            className="rounded-3xl p-12 lg:p-16 relative overflow-hidden"
            style={{
              background: "rgba(8,20,40,0.8)",
              border: "1px solid rgba(30,111,255,0.2)",
              boxShadow: "0 0 80px rgba(30,111,255,0.08)",
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(30,111,255,0.1) 0%, transparent 60%)",
              }}
            />
            <div className="relative">
              <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "#1E6FFF", fontFamily: "var(--font-heading)", letterSpacing: "0.15em" }}>
                Ready to Grow?
              </p>
              <h2
                className="mb-5"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 800,
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  color: "#E8F0FF",
                }}
              >
                Let's Build Your Digital Presence
              </h2>
              <p className="text-base mb-10 max-w-lg mx-auto" style={{ color: "#7A95B8" }}>
                Whether you're launching a brand or scaling an existing one, we'll craft a strategy built around your goals. No guesswork — just intentional marketing.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href={routes.contact}
                  className="flex items-center gap-2 px-8 py-4 rounded-xl text-white font-medium transition-all duration-200 hover:scale-105"
                  style={{
                    fontFamily: "var(--font-body)",
                    background: "linear-gradient(135deg, #1E6FFF, #2979FF)",
                    boxShadow: "0 4px 24px rgba(30,111,255,0.4)",
                  }}
                >
                  Book A Free Consultation
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href={routes.services}
                  className="flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "#E8F0FF",
                    border: "1px solid rgba(30,111,255,0.3)",
                    background: "rgba(30,111,255,0.06)",
                  }}
                >
                  Explore Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
