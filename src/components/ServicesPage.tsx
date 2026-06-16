import Link from "next/link";
import { Instagram, Lightbulb, Film, CheckCircle2, ArrowRight, Zap, Clock, DollarSign, BarChart3 } from "lucide-react";
import { routes } from "@/lib/routes";

const services = [
  {
    id: "social",
    icon: Instagram,
    title: "Social Media Marketing & Management",
    tagline: "Always On. Always Relevant.",
    overview:
      "Your audience is online 24/7 — your brand should be too. We manage your social media presence from strategy to execution, ensuring consistent, engaging content that builds community and drives action.",
    benefits: [
      "Consistent brand voice across all platforms",
      "Audience growth through organic and strategic engagement",
      "Real-time community management and response",
      "Platform-specific content tailored for each channel",
    ],
    deliverables: [
      "Monthly content calendar",
      "Post design, copy & scheduling",
      "Community management (comments, DMs)",
      "Monthly performance reporting",
      "Platform audit & competitive analysis",
    ],
    workflow: [
      { step: "01", title: "Brand Discovery", desc: "Deep-dive into your brand, audience, and objectives." },
      { step: "02", title: "Strategy Build", desc: "AI-assisted planning and content pillars designed for your goals." },
      { step: "03", title: "Content Production", desc: "Creation, design, copywriting, and scheduling — all handled." },
      { step: "04", title: "Publish & Engage", desc: "Timely posting and active community management." },
      { step: "05", title: "Review & Refine", desc: "Monthly reporting and strategy iteration based on real data." },
    ],
    clients: ["Cafés & Restaurants", "Fashion Brands", "Local Retailers", "Fitness Studios", "Educational Institutions"],
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=500&fit=crop&auto=format",
  },
  {
    id: "content",
    icon: Lightbulb,
    title: "Content Ideation & Planning",
    tagline: "Ideas That Convert. Systems That Scale.",
    overview:
      "Great content starts with a great strategy. We research your audience, map the competitive landscape, and build content systems that generate consistent ideas, reduce decision fatigue, and align your brand story with business outcomes.",
    benefits: [
      "Structured content systems that eliminate creative burnout",
      "Trend-aware ideation relevant to your industry",
      "Content that serves both organic reach and brand identity",
      "Strategic alignment between content and business goals",
    ],
    deliverables: [
      "30/60/90-day content strategy",
      "Content pillar framework",
      "Topic bank and ideation vault",
      "Editorial calendar with briefs",
      "Tone of voice and style guide",
    ],
    workflow: [
      { step: "01", title: "Research Phase", desc: "Audience insights, competitor audit, and trend mapping." },
      { step: "02", title: "Pillar Definition", desc: "Defining the 3–5 content pillars that anchor your brand." },
      { step: "03", title: "Ideation Sprint", desc: "AI-enhanced brainstorming to fill your content vault." },
      { step: "04", title: "Calendar Build", desc: "Mapping topics to dates, formats, and campaign moments." },
      { step: "05", title: "Handoff & Alignment", desc: "Team briefing, documentation, and execution support." },
    ],
    clients: ["Startups & D2C Brands", "Hospitality Groups", "Educational Institutions", "Health & Wellness Brands"],
    image: "https://images.unsplash.com/photo-1528109966604-5a6a4a964e8d?w=800&h=500&fit=crop&auto=format",
  },
  {
    id: "filming",
    icon: Film,
    title: "In-Person Filming & Production",
    tagline: "Your Story. Professionally Told.",
    overview:
      "We bring a professional production team to your location to capture your brand in its best light — literally. From short-form reels to long-form brand films, we handle creative direction, filming, and post-production from start to finish.",
    benefits: [
      "High-quality visuals that elevate brand perception",
      "Short-form content optimized for social platforms",
      "On-location shoots tailored to your environment and brand",
      "Full post-production: editing, color grading, and sound",
    ],
    deliverables: [
      "Pre-production planning and shot list",
      "On-location filming (team & equipment)",
      "Edited reels, ads, or brand films",
      "Platform-optimized exports (Instagram, YouTube, etc.)",
      "Raw footage archive",
    ],
    workflow: [
      { step: "01", title: "Creative Brief", desc: "Defining the visual story, mood board, and shot plan." },
      { step: "02", title: "Pre-Production", desc: "Logistics, location scouting, talent coordination." },
      { step: "03", title: "Production Day", desc: "On-location filming with professional crew." },
      { step: "04", title: "Post-Production", desc: "Editing, color grading, sound design, and graphics." },
      { step: "05", title: "Delivery", desc: "Final files delivered in all required formats." },
    ],
    clients: ["Restaurants & Cafés", "Hotels & Resorts", "Fashion & Lifestyle Brands", "Fitness Studios", "Educational Institutions"],
    image: "https://images.unsplash.com/photo-1611784728558-6c7d9b409cdf?w=800&h=500&fit=crop&auto=format",
  },
];

const efficiencyPoints = [
  {
    icon: Zap,
    title: "AI-Enhanced Workflows",
    desc: "We embed AI tools into planning, research, and production — reducing the hours spent on repetitive tasks and reinvesting that time in strategy and creativity.",
  },
  {
    icon: Clock,
    title: "Faster Turnaround",
    desc: "Streamlined processes mean shorter timelines without cutting corners. What takes traditional agencies weeks, we deliver in days.",
  },
  {
    icon: DollarSign,
    title: "Reduced Operational Costs",
    desc: "Leaner operations with smarter tools means we pass savings on to clients — without compromising on quality or service.",
  },
  {
    icon: BarChart3,
    title: "Better Strategic Planning",
    desc: "Data-informed decisions replace guesswork. Our workflows are built around understanding what works before committing your budget.",
  },
];

export function ServicesPage() {
  return (
    <div className="min-h-screen pt-24" style={{ background: "var(--brand-deep-blue)", fontFamily: "var(--font-body)" }}>
      {/* Hero */}
      <section className="py-16 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(30,111,255,0.1) 0%, transparent 60%)" }}
        />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative">
          <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "#1E6FFF", fontFamily: "var(--font-heading)", letterSpacing: "0.15em" }}>
            Our Services
          </p>
          <h1
            className="mb-5"
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 800,
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              color: "#E8F0FF",
            }}
          >
            Everything Your Brand Needs to{" "}
            <span style={{ background: "linear-gradient(90deg, #1E6FFF, #00C6FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Grow Online
            </span>
          </h1>
          <p className="text-base max-w-xl mx-auto" style={{ color: "#7A95B8" }}>
            From strategy to execution, Cognitoo.inc delivers comprehensive digital marketing services powered by AI-enhanced workflows and creative expertise.
          </p>
        </div>
      </section>

      {/* Services */}
      {services.map((service, idx) => {
        const Icon = service.icon;
        const isEven = idx % 2 === 0;
        return (
          <section
            key={service.id}
            className="py-20 border-t"
            style={{ borderColor: "rgba(30,111,255,0.08)" }}
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              {/* Header */}
              <div className="flex items-start gap-5 mb-12">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                  style={{
                    background: "rgba(30,111,255,0.12)",
                    border: "1px solid rgba(30,111,255,0.2)",
                  }}
                >
                  <Icon size={26} style={{ color: "#1E6FFF" }} />
                </div>
                <div>
                  <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "#1E6FFF", fontFamily: "var(--font-heading)", letterSpacing: "0.12em" }}>
                    {service.tagline}
                  </p>
                  <h2
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontWeight: 700,
                      fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)",
                      color: "#E8F0FF",
                    }}
                  >
                    {service.title}
                  </h2>
                </div>
              </div>

              <div className={`grid lg:grid-cols-2 gap-12 items-start ${!isEven ? "lg:[direction:rtl]" : ""}`}>
                {/* Image */}
                <div className={`rounded-2xl overflow-hidden h-72 lg:h-96 ${!isEven ? "[direction:ltr]" : ""}`} style={{ background: "#0D1E3A" }}>
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className={!isEven ? "[direction:ltr]" : ""}>
                  <p className="text-base leading-relaxed mb-8" style={{ color: "#A8BFDE" }}>{service.overview}</p>

                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    {/* Benefits */}
                    <div
                      className="rounded-xl p-5"
                      style={{
                        background: "rgba(8,20,40,0.8)",
                        border: "1px solid rgba(30,111,255,0.12)",
                      }}
                    >
                      <h4 className="text-sm font-semibold mb-4" style={{ fontFamily: "var(--font-heading)", color: "#7AB8FF" }}>Key Benefits</h4>
                      <ul className="flex flex-col gap-2.5">
                        {service.benefits.map((b) => (
                          <li key={b} className="flex items-start gap-2.5 text-sm" style={{ color: "#A8BFDE" }}>
                            <CheckCircle2 size={14} className="mt-0.5 shrink-0" style={{ color: "#1E6FFF" }} />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Deliverables */}
                    <div
                      className="rounded-xl p-5"
                      style={{
                        background: "rgba(8,20,40,0.8)",
                        border: "1px solid rgba(30,111,255,0.12)",
                      }}
                    >
                      <h4 className="text-sm font-semibold mb-4" style={{ fontFamily: "var(--font-heading)", color: "#7AB8FF" }}>Deliverables</h4>
                      <ul className="flex flex-col gap-2.5">
                        {service.deliverables.map((d) => (
                          <li key={d} className="flex items-start gap-2.5 text-sm" style={{ color: "#A8BFDE" }}>
                            <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ background: "#1E6FFF" }} />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Ideal Clients */}
                  <div>
                    <p className="text-xs font-medium mb-3" style={{ color: "#7A95B8", fontFamily: "var(--font-heading)" }}>Ideal For</p>
                    <div className="flex flex-wrap gap-2">
                      {service.clients.map((c) => (
                        <span
                          key={c}
                          className="text-xs px-3 py-1.5 rounded-full"
                          style={{
                            background: "rgba(30,111,255,0.08)",
                            border: "1px solid rgba(30,111,255,0.15)",
                            color: "#7AB8FF",
                          }}
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Workflow */}
              <div className="mt-12">
                <h4 className="text-sm font-semibold mb-6" style={{ fontFamily: "var(--font-heading)", color: "#7A95B8" }}>Our Workflow</h4>
                <div className="grid md:grid-cols-5 gap-4">
                  {service.workflow.map((w, i) => (
                    <div
                      key={w.step}
                      className="relative rounded-xl p-4"
                      style={{
                        background: "rgba(8,20,40,0.6)",
                        border: "1px solid rgba(30,111,255,0.1)",
                      }}
                    >
                      <div
                        className="text-xs font-bold mb-2"
                        style={{
                          fontFamily: "var(--font-heading)",
                          color: "#1E6FFF",
                        }}
                      >
                        {w.step}
                      </div>
                      <div className="text-sm font-semibold text-white mb-1" style={{ fontFamily: "var(--font-heading)" }}>{w.title}</div>
                      <div className="text-xs leading-relaxed" style={{ color: "#7A95B8" }}>{w.desc}</div>
                      {i < service.workflow.length - 1 && (
                        <div
                          className="hidden md:block absolute top-1/2 -right-3 w-6 h-px"
                          style={{ background: "rgba(30,111,255,0.3)" }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Why Our Pricing */}
      <section className="py-24 border-t" style={{ borderColor: "rgba(30,111,255,0.08)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "#1E6FFF", fontFamily: "var(--font-heading)", letterSpacing: "0.15em" }}>
              Why Our Pricing Is More Efficient
            </p>
            <h2
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 700,
                fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
                color: "#E8F0FF",
              }}
            >
              Premium Quality. Intelligent Efficiency.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
            {efficiencyPoints.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="rounded-2xl p-6"
                style={{
                  background: "rgba(8,20,40,0.7)",
                  border: "1px solid rgba(30,111,255,0.12)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: "rgba(30,111,255,0.12)" }}
                >
                  <Icon size={18} style={{ color: "#1E6FFF" }} />
                </div>
                <h3 className="text-sm font-semibold text-white mb-2" style={{ fontFamily: "var(--font-heading)" }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#7A95B8" }}>{desc}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <p className="text-sm mb-6" style={{ color: "#7A95B8" }}>
              Pricing is tailored to your brand's scope and goals. Get in touch for a custom proposal.
            </p>
            <Link
              href={routes.contact}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-medium transition-all duration-200 hover:scale-105"
              style={{
                fontFamily: "var(--font-body)",
                background: "linear-gradient(135deg, #1E6FFF, #2979FF)",
                boxShadow: "0 4px 24px rgba(30,111,255,0.35)",
              }}
            >
              Get a Custom Proposal <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
