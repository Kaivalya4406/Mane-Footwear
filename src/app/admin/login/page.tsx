"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Wordmark from "../../../components/shared/Wordmark";
import { authClient } from "../../../lib/auth-client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const { error: signInError } = await authClient.signIn.email({
      email,
      password,
    });

    setIsSubmitting(false);

    if (signInError) {
      setError("Invalid email or password.");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <section className="bg-offwhite">
      <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-6 py-16 sm:px-8">
        <div className="text-center">
          <Wordmark className="justify-center text-lg text-navy" />
          <h1 className="mt-6 text-2xl font-bold text-navy">Admin Sign In</h1>
          <p className="mt-2 text-sm text-foreground/70">
            Sign in to manage MANE FOOTWEAR.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-navy">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5 w-full rounded-md border border-gray-light bg-white px-4 py-2.5 text-sm text-navy focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-navy">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5 w-full rounded-md border border-gray-light bg-white px-4 py-2.5 text-sm text-navy focus:outline-none"
            />
          </div>

          {error && (
            <p role="alert" className="text-sm font-medium text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex w-full items-center justify-center rounded-full bg-orange px-6 py-3 text-sm font-semibold text-navy transition-colors hover:bg-orange-dark disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </section>
  );
}