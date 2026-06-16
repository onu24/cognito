"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { collection, onSnapshot, query } from "firebase/firestore";
import { ArrowRight, Building2 } from "lucide-react";
import { fallbackClients, type ClientItem } from "@/lib/content";
import { db } from "@/lib/firebase";
import { routes } from "@/lib/routes";

export function ClientsPage() {
  const [clients, setClients] = useState<ClientItem[]>(fallbackClients);

  useEffect(() => {
    const unsubscribe = onSnapshot(query(collection(db, "clients")), (snapshot) => {
      const liveClients = snapshot.docs.map((item) => ({
        id: item.id,
        ...item.data(),
      })) as ClientItem[];
      setClients(liveClients.length ? liveClients : fallbackClients);
    });

    return unsubscribe;
  }, []);

  const featuredClient = useMemo(
    () => clients.find((client) => client.featured) ?? clients[0],
    [clients],
  );

  return (
    <div className="min-h-screen pt-24" style={{ background: "var(--brand-deep-blue)", fontFamily: "var(--font-body)" }}>
      <section className="py-16 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(30,111,255,0.08) 0%, transparent 60%)" }}
        />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative">
          <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "#1E6FFF", fontFamily: "var(--font-heading)", letterSpacing: "0.15em" }}>
            Clients
          </p>
          <h1
            className="mb-5"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#E8F0FF" }}
          >
            Brands That Trust{" "}
            <span style={{ background: "linear-gradient(90deg, #1E6FFF, #00C6FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Cognitoo.inc
            </span>
          </h1>
          <p className="text-base max-w-xl mx-auto" style={{ color: "#7A95B8" }}>
            We build long-term partnerships with brands, institutions, and businesses committed to growing with intention and integrity.
          </p>
        </div>
      </section>

      {featuredClient && (
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <p className="text-xs tracking-widest uppercase mb-8 text-center" style={{ color: "#7A95B8", fontFamily: "var(--font-heading)", letterSpacing: "0.12em" }}>
              Featured Partner
            </p>

            <div
              className="rounded-2xl p-8 lg:p-12 max-w-3xl mx-auto"
              style={{ background: "rgba(8,20,40,0.8)", border: "1px solid rgba(30,111,255,0.2)", boxShadow: "0 0 40px rgba(30,111,255,0.06)" }}
            >
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                {featuredClient.img ? (
                  <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0" style={{ border: "1px solid rgba(30,111,255,0.25)" }}>
                    <img src={featuredClient.img} alt={featuredClient.name} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div
                    className="w-24 h-24 rounded-2xl flex flex-col items-center justify-center shrink-0"
                    style={{ background: "linear-gradient(135deg, rgba(30,111,255,0.15), rgba(0,198,255,0.1))", border: "1px solid rgba(30,111,255,0.25)" }}
                  >
                    <Building2 size={36} style={{ color: "#1E6FFF" }} />
                  </div>
                )}

                <div>
                  <div
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs mb-3"
                    style={{ background: "rgba(30,111,255,0.1)", border: "1px solid rgba(30,111,255,0.2)", color: "#7AB8FF" }}
                  >
                    {featuredClient.type}
                  </div>
                  <h2 className="text-xl font-bold text-white mb-1" style={{ fontFamily: "var(--font-heading)" }}>
                    {featuredClient.name}
                  </h2>
                  <p className="text-sm mb-4" style={{ color: "#7AB8FF" }}>
                    {featuredClient.desc}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: "#A8BFDE" }}>
                    {featuredClient.summary}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-5">
                    {featuredClient.services.map((service) => (
                      <span
                        key={service}
                        className="text-xs px-3 py-1.5 rounded-full"
                        style={{ background: "rgba(30,111,255,0.08)", border: "1px solid rgba(30,111,255,0.15)", color: "#7AB8FF" }}
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-xs tracking-widest uppercase mb-10 text-center" style={{ color: "#7A95B8", fontFamily: "var(--font-heading)", letterSpacing: "0.12em" }}>
            Growing Our Client Family
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {clients.map((client) => (
              <div
                key={client.id}
                className="rounded-xl p-5 flex flex-col items-center justify-center text-center gap-2 min-h-40"
                style={{ background: "rgba(8,20,40,0.6)", border: "1px solid rgba(30,111,255,0.18)" }}
              >
                {client.img ? (
                  <div className="w-14 h-14 rounded-lg overflow-hidden mb-1" style={{ border: "1px solid rgba(30,111,255,0.2)" }}>
                    <img src={client.img} alt={client.name} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-1" style={{ background: "rgba(30,111,255,0.08)" }}>
                    <Building2 size={18} style={{ color: "#7AB8FF" }} />
                  </div>
                )}
                <span className="text-sm font-semibold text-white">{client.name}</span>
                <span className="text-xs" style={{ color: "#7A95B8", fontFamily: "var(--font-heading)" }}>{client.desc}</span>
                <span className="text-xs" style={{ color: "#4A6080" }}>{client.type}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 border-t" style={{ borderColor: "rgba(30,111,255,0.08)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-xs tracking-widest uppercase mb-10 text-center" style={{ color: "#7A95B8", fontFamily: "var(--font-heading)", letterSpacing: "0.12em" }}>
            Industries We Serve
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {["B2C Retail", "Hospitality & Hotels", "Cafes & Restaurants", "Fashion & Lifestyle", "Fitness & Wellness", "Educational Institutions", "Local Businesses", "D2C Brands"].map((industry) => (
              <span
                key={industry}
                className="px-5 py-2.5 rounded-full text-sm"
                style={{ background: "rgba(8,20,40,0.8)", border: "1px solid rgba(30,111,255,0.15)", color: "#A8BFDE" }}
              >
                {industry}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 border-t" style={{ borderColor: "rgba(30,111,255,0.08)" }}>
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="mb-4" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(1.6rem, 3vw, 2.2rem)", color: "#E8F0FF" }}>
            Join Our Growing Roster
          </h2>
          <p className="text-sm mb-8" style={{ color: "#7A95B8" }}>
            We're selective about who we partner with because we invest fully in every brand we work with. Let's see if we're the right fit.
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
