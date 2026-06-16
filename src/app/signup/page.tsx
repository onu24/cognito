"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { AuthPanel, SubmitButton } from "@/components/auth/AuthPanel";

const bootstrapRef = doc(db, "system", "adminBootstrap");

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [locked, setLocked] = useState<boolean | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getDoc(bootstrapRef)
      .then((snapshot) => setLocked(snapshot.exists() && snapshot.data().locked))
      .catch(() => setLocked(false));
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const snapshot = await getDoc(bootstrapRef);
      if (snapshot.exists() && snapshot.data().locked) {
        setLocked(true);
        setError("Signup has already been used. Please log in instead.");
        return;
      }

      const credential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password,
      );
      await updateProfile(credential.user, { displayName: name.trim() });
      await setDoc(doc(db, "admins", credential.user.uid), {
        name: name.trim(),
        email: email.trim(),
        role: "owner",
        createdAt: serverTimestamp(),
      });
      await setDoc(bootstrapRef, {
        locked: true,
        ownerUid: credential.user.uid,
        ownerEmail: email.trim(),
        createdAt: serverTimestamp(),
      });

      router.replace("/admin");
    } catch {
      setError("Could not create the admin account. Check Firebase Auth and Firestore permissions.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthPanel
      title="One-time setup"
      subtitle="Create the first admin account. After this, signup locks automatically."
    >
      {locked ? (
        <div className="space-y-5">
          <p className="text-sm text-[#A8BFDE]">
            Admin signup has already been completed for this Firebase project.
          </p>
          <Link
            href="/login"
            className="flex h-11 items-center justify-center rounded-md bg-[#1E6FFF] text-sm font-semibold text-white hover:bg-[#2979FF]"
          >
            Go to login
          </Link>
        </div>
      ) : (
        <form className="space-y-4" onSubmit={handleSubmit}>
          <label className="block">
            <span className="text-sm text-[#E8F0FF]">Name</span>
            <input
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="mt-2 w-full h-11 rounded-md border border-[rgba(30,111,255,0.2)] bg-[#0D1E3A] px-3 text-white outline-none focus:border-[#1E6FFF]"
            />
          </label>
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
              minLength={6}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 w-full h-11 rounded-md border border-[rgba(30,111,255,0.2)] bg-[#0D1E3A] px-3 text-white outline-none focus:border-[#1E6FFF]"
            />
          </label>

          {error && <p className="text-sm text-red-300">{error}</p>}
          <SubmitButton loading={loading || locked === null}>
            Create admin
          </SubmitButton>
        </form>
      )}
    </AuthPanel>
  );
}
