"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { collection, onSnapshot, query } from "firebase/firestore";
import { ArrowRight } from "lucide-react";
import { fallbackPortfolio, type PortfolioItem } from "@/lib/content";
import { db } from "@/lib/firebase";
import { routes } from "@/lib/routes";

export function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [projects, setProjects] = useState<PortfolioItem[]>(fallbackPortfolio);
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(query(collection(db, "portfolio")), (snapshot) => {
      const liveProjects = snapshot.docs.map((item) => ({
        id: item.id,
        ...item.data(),
      })) as PortfolioItem[];
      setProjects(liveProjects.length ? liveProjects : fallbackPortfolio);
    });

    return unsubscribe;
  }, []);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(projects.map((project) => project.category).filter(Boolean)))],
    [projects],
  );

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  return (
    <div className="min-h-screen pt-24" style={{ background: "var(--brand-deep-blue)", fontFamily: "var(--font-body)" }}>
      <section className="py-16 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(30,111,255,0.08) 0%, transparent 60%)" }}
        />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative">
          <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "#1E6FFF", fontFamily: "var(--font-heading)", letterSpacing: "0.15em" }}>
            Portfolio
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
            Projects That{" "}
            <span style={{ background: "linear-gradient(90deg, #1E6FFF, #00C6FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Define Our Standard
            </span>
          </h1>
          <p className="text-base max-w-xl mx-auto" style={{ color: "#7A95B8" }}>
            Explore a selection of our projects, each showcasing our creative capability, strategic approach, and design standards across industries.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-10">
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-200"
              style={{
                fontFamily: "var(--font-body)",
                background: activeCategory === category ? "linear-gradient(135deg, #1E6FFF, #2979FF)" : "rgba(8,20,40,0.8)",
                color: activeCategory === category ? "#fff" : "#7A95B8",
                border: activeCategory === category ? "none" : "1px solid rgba(30,111,255,0.15)",
                boxShadow: activeCategory === category ? "0 4px 16px rgba(30,111,255,0.3)" : "none",
              }}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project) => (
              <div
                key={project.id}
                className="rounded-2xl overflow-hidden group cursor-pointer hover:scale-[1.02] transition-all duration-300"
                style={{ background: "rgba(8,20,40,0.7)", border: "1px solid rgba(30,111,255,0.12)" }}
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative h-56 overflow-hidden" style={{ background: "#0D1E3A" }}>
                  <img src={project.img} alt={project.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(4,12,26,0.75), transparent)" }} />
                  <span
                    className="absolute top-3 left-3 text-xs px-3 py-1.5 rounded-full"
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
                <div className="p-6">
                  <h3 className="text-base font-semibold text-white mb-2" style={{ fontFamily: "var(--font-heading)" }}>{project.name}</h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "#7A95B8" }}>{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.deliverables.slice(0, 2).map((deliverable) => (
                      <span
                        key={deliverable}
                        className="text-xs px-2.5 py-1 rounded-full"
                        style={{ background: "rgba(30,111,255,0.08)", border: "1px solid rgba(30,111,255,0.15)", color: "#7AB8FF" }}
                      >
                        {deliverable}
                      </span>
                    ))}
                    {project.deliverables.length > 2 && (
                      <span className="text-xs px-2.5 py-1 rounded-full" style={{ color: "#4A6080" }}>
                        +{project.deliverables.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(2,8,16,0.9)", backdropFilter: "blur(8px)" }}
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="max-w-2xl w-full rounded-2xl overflow-hidden"
            style={{ background: "#081428", border: "1px solid rgba(30,111,255,0.2)", boxShadow: "0 0 80px rgba(30,111,255,0.12)" }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative h-56" style={{ background: "#0D1E3A" }}>
              <img src={selectedProject.img} alt={selectedProject.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(8,20,40,0.9), transparent 50%)" }} />
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-sm"
                style={{ background: "rgba(4,12,26,0.9)", color: "#7A95B8", border: "1px solid rgba(30,111,255,0.2)" }}
              >
                x
              </button>
              <div className="absolute bottom-4 left-6">
                <span
                  className="text-xs px-3 py-1.5 rounded-full mb-2 inline-block"
                  style={{ background: "rgba(30,111,255,0.2)", color: "#7AB8FF", border: "1px solid rgba(30,111,255,0.3)" }}
                >
                  {selectedProject.industry}
                </span>
                <h3 className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>{selectedProject.name}</h3>
              </div>
            </div>
            <div className="p-6">
              <p className="text-sm leading-relaxed mb-5" style={{ color: "#A8BFDE" }}>{selectedProject.description}</p>
              <h4 className="text-xs font-semibold mb-3 uppercase tracking-widest" style={{ color: "#1E6FFF", fontFamily: "var(--font-heading)" }}>Deliverables</h4>
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProject.deliverables.map((deliverable) => (
                  <span
                    key={deliverable}
                    className="text-xs px-3 py-1.5 rounded-full"
                    style={{ background: "rgba(30,111,255,0.08)", border: "1px solid rgba(30,111,255,0.15)", color: "#7AB8FF" }}
                  >
                    {deliverable}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <section className="py-20 border-t" style={{ borderColor: "rgba(30,111,255,0.08)" }}>
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="mb-4" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(1.6rem, 3vw, 2.2rem)", color: "#E8F0FF" }}>
            Ready to Create Your Success Story?
          </h2>
          <p className="text-sm mb-8" style={{ color: "#7A95B8" }}>
            Let's talk about what Cognitoo.inc can build for your brand: custom strategy, premium content, and real results.
          </p>
          <Link
            href={routes.contact}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-medium transition-all duration-200 hover:scale-105"
            style={{ fontFamily: "var(--font-body)", background: "linear-gradient(135deg, #1E6FFF, #2979FF)", boxShadow: "0 4px 24px rgba(30,111,255,0.35)" }}
          >
            Start a Conversation <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
