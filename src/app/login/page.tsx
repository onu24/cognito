"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { AuthPanel, SubmitButton } from "@/components/auth/AuthPanel";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) router.replace("/admin");
    });
    return unsubscribe;
  }, [router]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      router.replace("/admin");
    } catch {
      setError("Login failed. Check the email and password, then try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthPanel
      title="Admin login"
      subtitle="Sign in to manage the Cognitoo.inc dashboard."
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        <label className="block">
          <span className="text-sm text-[#E8F0FF]">Email</span>
          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-2 w-full h-11 rounded-md border border-[rgba(30,111,255,0.2)] bg-[#0D1E3A] px-3 text-white outline-none focus:border-[#1E6FFF]"
          />
        </label>
        <label className="block">
          <span className="text-sm text-[#E8F0FF]">Password</span>
          <input
            type="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-2 w-full h-11 rounded-md border border-[rgba(30,111,255,0.2)] bg-[#0D1E3A] px-3 text-white outline-none focus:border-[#1E6FFF]"
          />
        </label>

        {error && <p className="text-sm text-red-300">{error}</p>}
        <SubmitButton loading={loading}>Log in</SubmitButton>
      </form>

      <p className="mt-5 text-sm text-[#A8BFDE]">
        First setup?{" "}
        <Link href="/signup" className="text-[#00C6FF] hover:text-white">
          Create the one-time admin
        </Link>
      </p>
    </AuthPanel>
  );
}
