"use client";

import { FormEvent, useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { Send, CheckCircle2, Mail, Phone, Instagram, Linkedin } from "lucide-react";
import { db } from "@/lib/firebase";

const budgetOptions = [
  "Under ₹15,000/month",
  "₹15,000 – ₹30,000/month",
  "₹30,000 – ₹60,000/month",
  "₹60,000 – ₹1,00,000/month",
  "Above ₹1,00,000/month",
  "Prefer to discuss",
];

const serviceOptions = [
  "Social Media Marketing & Management",
  "Content Ideation & Planning",
  "In-Person Filming & Production",
  "Full-Service Package",
  "Custom Requirement",
];

const industryOptions = [
  "B2C Retail",
  "Hospitality / Hotel",
  "Café / Restaurant",
  "Fashion & Lifestyle",
  "Fitness & Wellness",
  "Educational Institution",
  "Local Business",
  "D2C Brand",
  "Other",
];

export function ContactPage() {
  const [form, setForm] = useState({
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    website: "",
    industry: "",
    budget: "",
    services: [] as string[],
    contactMethod: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const toggleService = (service: string) => {
    setForm((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
  };

  const resetForm = () => {
    setForm({
      fullName: "",
      companyName: "",
      email: "",
      phone: "",
      website: "",
      industry: "",
      budget: "",
      services: [],
      contactMethod: "",
      message: "",
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      await addDoc(collection(db, "contactMessages"), {
        ...form,
        fullName: form.fullName.trim(),
        companyName: form.companyName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        website: form.website.trim(),
        message: form.message.trim(),
        status: "new",
        createdAt: serverTimestamp(),
      });
      resetForm();
      setSubmitted(true);
    } catch {
      setError("Could not send your message right now. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputStyle = {
    background: "rgba(13,30,58,0.8)",
    border: "1px solid rgba(30,111,255,0.2)",
    color: "#E8F0FF",
    borderRadius: "10px",
    padding: "12px 16px",
    fontSize: "14px",
    width: "100%",
    outline: "none",
    fontFamily: "var(--font-body)",
    transition: "border-color 0.2s",
  };

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
            Contact
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
            Let's Build Your{" "}
            <span style={{ background: "linear-gradient(90deg, #1E6FFF, #00C6FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Digital Presence
            </span>
          </h1>
          <p className="text-base max-w-xl mx-auto" style={{ color: "#7A95B8" }}>
            Tell us about your brand and goals. We'll review your inquiry and reach out within 1–2 business days with a personalized response.
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left — Info */}
            <div>
              <div
                className="rounded-2xl p-8 mb-6"
                style={{
                  background: "rgba(8,20,40,0.8)",
                  border: "1px solid rgba(30,111,255,0.15)",
                }}
              >
                <h3 className="text-base font-semibold text-white mb-6" style={{ fontFamily: "var(--font-heading)" }}>
                  Get in Touch
                </h3>

                <div className="flex flex-col gap-5">
                  <div className="flex items-start gap-3">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: "rgba(30,111,255,0.12)" }}
                    >
                      <Mail size={15} style={{ color: "#1E6FFF" }} />
                    </div>
                    <div>
                      <p className="text-xs mb-1" style={{ color: "#7A95B8" }}>Email</p>
                      <p className="text-sm text-white">your-email@example.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: "rgba(30,111,255,0.12)" }}
                    >
                      <Phone size={15} style={{ color: "#1E6FFF" }} />
                    </div>
                    <div>
                      <p className="text-xs mb-1" style={{ color: "#7A95B8" }}>Phone / WhatsApp</p>
                      <p className="text-sm text-white">Available upon inquiry</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: "rgba(30,111,255,0.12)" }}
                    >
                      <Instagram size={15} style={{ color: "#1E6FFF" }} />
                    </div>
                    <div>
                      <p className="text-xs mb-1" style={{ color: "#7A95B8" }}>Instagram</p>
                      <a
                        href="https://www.instagram.com/cognitoo.inc?igsh=ajN1ZnBjcjhxN2Iw"
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-white hover:text-[#7AB8FF] transition-colors"
                      >
                        @cognitoo.inc
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: "rgba(30,111,255,0.12)" }}
                    >
                      <Linkedin size={15} style={{ color: "#1E6FFF" }} />
                    </div>
                    <div>
                      <p className="text-xs mb-1" style={{ color: "#7A95B8" }}>LinkedIn</p>
                      <p className="text-sm text-white">Cognitoo.inc</p>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="rounded-2xl p-6"
                style={{
                  background: "rgba(8,20,40,0.6)",
                  border: "1px solid rgba(30,111,255,0.12)",
                }}
              >
                <h4 className="text-sm font-semibold text-white mb-3" style={{ fontFamily: "var(--font-heading)" }}>Response Time</h4>
                <p className="text-xs leading-relaxed" style={{ color: "#7A95B8" }}>
                  We review all inquiries carefully and aim to respond within 1–2 business days with a thoughtful, personalized reply.
                </p>
              </div>
            </div>

            {/* Right — Form */}
            <div className="lg:col-span-2">
              {submitted ? (
                <div
                  className="rounded-2xl p-12 text-center h-full flex flex-col items-center justify-center"
                  style={{
                    background: "rgba(8,20,40,0.8)",
                    border: "1px solid rgba(30,111,255,0.2)",
                  }}
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                    style={{ background: "rgba(30,111,255,0.15)" }}
                  >
                    <CheckCircle2 size={32} style={{ color: "#1E6FFF" }} />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                    Message Received
                  </h2>
                  <p className="text-sm mb-8" style={{ color: "#7A95B8", maxWidth: "380px" }}>
                    Thank you for reaching out. The Cognitoo.inc team will review your inquiry and get back to you within 1–2 business days.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-sm px-6 py-2.5 rounded-xl text-white"
                    style={{ background: "rgba(30,111,255,0.2)", border: "1px solid rgba(30,111,255,0.3)" }}
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="rounded-2xl p-8"
                  style={{
                    background: "rgba(8,20,40,0.8)",
                    border: "1px solid rgba(30,111,255,0.15)",
                  }}
                >
                  <div className="grid md:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label className="block text-xs font-medium mb-2" style={{ color: "#A8BFDE" }}>Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="Your full name"
                        value={form.fullName}
                        onChange={(e) => handleChange("fullName", e.target.value)}
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-2" style={{ color: "#A8BFDE" }}>Company Name</label>
                      <input
                        type="text"
                        placeholder="Your brand or company"
                        value={form.companyName}
                        onChange={(e) => handleChange("companyName", e.target.value)}
                        style={inputStyle}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label className="block text-xs font-medium mb-2" style={{ color: "#A8BFDE" }}>Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="you@company.com"
                        value={form.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-2" style={{ color: "#A8BFDE" }}>Phone Number</label>
                      <input
                        type="tel"
                        placeholder="+91 XXXXX XXXXX"
                        value={form.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        style={inputStyle}
                      />
                    </div>
                  </div>

                  <div className="mb-5">
                    <label className="block text-xs font-medium mb-2" style={{ color: "#A8BFDE" }}>Website / Social Media Handle</label>
                    <input
                      type="text"
                      placeholder="www.yourbrand.com or @yourbrand"
                      value={form.website}
                      onChange={(e) => handleChange("website", e.target.value)}
                      style={inputStyle}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label className="block text-xs font-medium mb-2" style={{ color: "#A8BFDE" }}>Industry</label>
                      <select
                        value={form.industry}
                        onChange={(e) => handleChange("industry", e.target.value)}
                        style={{ ...inputStyle, cursor: "pointer" }}
                      >
                        <option value="" style={{ background: "#081428" }}>Select your industry</option>
                        {industryOptions.map((o) => (
                          <option key={o} value={o} style={{ background: "#081428" }}>{o}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-2" style={{ color: "#A8BFDE" }}>Monthly Marketing Budget</label>
                      <select
                        value={form.budget}
                        onChange={(e) => handleChange("budget", e.target.value)}
                        style={{ ...inputStyle, cursor: "pointer" }}
                      >
                        <option value="" style={{ background: "#081428" }}>Select budget range</option>
                        {budgetOptions.map((o) => (
                          <option key={o} value={o} style={{ background: "#081428" }}>{o}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Services */}
                  <div className="mb-5">
                    <label className="block text-xs font-medium mb-3" style={{ color: "#A8BFDE" }}>Services Interested In</label>
                    <div className="flex flex-wrap gap-2">
                      {serviceOptions.map((s) => {
                        const active = form.services.includes(s);
                        return (
                          <button
                            key={s}
                            type="button"
                            onClick={() => toggleService(s)}
                            className="px-4 py-2 rounded-full text-xs transition-all duration-150"
                            style={{
                              background: active ? "rgba(30,111,255,0.2)" : "rgba(13,30,58,0.8)",
                              border: active ? "1px solid rgba(30,111,255,0.5)" : "1px solid rgba(30,111,255,0.15)",
                              color: active ? "#7AB8FF" : "#7A95B8",
                            }}
                          >
                            {s}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Contact Method */}
                  <div className="mb-5">
                    <label className="block text-xs font-medium mb-3" style={{ color: "#A8BFDE" }}>Preferred Contact Method</label>
                    <div className="flex flex-wrap gap-3">
                      {["Email", "Phone Call", "WhatsApp", "Video Call"].map((method) => (
                        <button
                          key={method}
                          type="button"
                          onClick={() => handleChange("contactMethod", method)}
                          className="px-4 py-2 rounded-full text-xs transition-all duration-150"
                          style={{
                            background: form.contactMethod === method ? "rgba(30,111,255,0.2)" : "rgba(13,30,58,0.8)",
                            border: form.contactMethod === method ? "1px solid rgba(30,111,255,0.5)" : "1px solid rgba(30,111,255,0.15)",
                            color: form.contactMethod === method ? "#7AB8FF" : "#7A95B8",
                          }}
                        >
                          {method}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="mb-7">
                    <label className="block text-xs font-medium mb-2" style={{ color: "#A8BFDE" }}>Tell Us About Your Goals</label>
                    <textarea
                      rows={4}
                      placeholder="Briefly describe your brand, current challenges, and what you're hoping to achieve..."
                      value={form.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      style={{ ...inputStyle, resize: "vertical" }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-white font-medium text-sm transition-all duration-200 hover:scale-[1.01]"
                    style={{
                      fontFamily: "var(--font-body)",
                      background: "linear-gradient(135deg, #1E6FFF, #2979FF)",
                      boxShadow: "0 4px 24px rgba(30,111,255,0.35)",
                      opacity: submitting ? 0.72 : 1,
                      cursor: submitting ? "not-allowed" : "pointer",
                    }}
                  >
                    {submitting ? "Sending..." : "Let's Build Your Digital Presence"}
                    <Send size={15} />
                  </button>

                  {error && (
                    <p className="text-center text-xs mt-4" style={{ color: "#FCA5A5" }}>
                      {error}
                    </p>
                  )}

                  <p className="text-center text-xs mt-4" style={{ color: "#4A6080" }}>
                    By submitting this form, you agree to be contacted by Cognitoo.inc regarding your inquiry.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
