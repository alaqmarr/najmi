"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function SetupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [available, setAvailable] = useState(false);
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function checkSetup() {
      try {
        const res = await fetch("/api/setup");
        const data = await res.json();
        setAvailable(data.setupAvailable);
        if (!data.setupAvailable) {
          router.push("/");
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    checkSetup();
  }, [router]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        throw new Error("Failed to set up admin");
      }

      router.push("/admin");
    } catch (e: any) {
      setError(e.message);
      setLoading(false);
    }
  };

  if (loading) return <div className="p-8 text-center flex h-screen items-center justify-center">Loading...</div>;
  if (!available) return null;

  return (
    <div className="flex h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-card p-8 shadow-xl border">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-primary">Initial Setup</h2>
          <p className="mt-2 text-sm text-foreground/60">Create the first administrator account.</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={onSubmit}>
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label className="text-sm font-medium">Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full rounded-md border border-input p-2.5 text-foreground bg-background focus:border-primary focus:ring-1 focus:ring-primary"
                placeholder="Admin Name"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Email address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-md border border-input p-2.5 text-foreground bg-background focus:border-primary focus:ring-1 focus:ring-primary"
                placeholder="admin@najmi.com"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-md border border-input p-2.5 text-foreground bg-background focus:border-primary focus:ring-1 focus:ring-primary"
                placeholder="********"
              />
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            Create Admin Account
          </Button>
        </form>
      </div>
    </div>
  );
}
