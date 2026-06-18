"use client";
import React, { useState } from "react";
import { createClient } from "@/utils/supabase";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logged in successfully!");
      router.push("/dashboard");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Toaster />
      <div className="w-full max-w-md space-y-8 bg-white p-10 rounded-3xl shadow-xl border border-primary/5">
        <div className="text-center">
          <div className="mx-auto w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white text-xl font-bold mb-4">
            K
          </div>
          <h2 className="text-3xl font-bold text-primary">Retailer Login</h2>
          <p className="text-foreground/60 mt-2">Manage your boutique's AI catalog</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-primary mb-1">Email Address</label>
              <input
                type="email"
                required
                className="w-full p-4 bg-background rounded-2xl border-none outline-none focus:ring-2 ring-accent transition-all"
                placeholder="email@boutique.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary mb-1">Password</label>
              <input
                type="password"
                required
                className="w-full p-4 bg-background rounded-2xl border-none outline-none focus:ring-2 ring-accent transition-all"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white p-4 rounded-2xl font-bold hover:bg-primary/90 transition-all disabled:opacity-50"
          >
            {loading ? "Authenticating..." : "Sign In"}
          </button>
        </form>

        <div className="text-center text-sm text-foreground/60">
          Don't have an account? <a href="/#contact" className="text-accent font-bold">Contact Sales</a>
        </div>
      </div>
    </div>
  );
}
