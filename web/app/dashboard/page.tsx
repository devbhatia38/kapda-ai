"use client";
import React, { useEffect, useState } from "react";
import { Zap, ShoppingBag, Users, TrendingUp } from "lucide-react";
import { createClient } from "@/utils/supabase";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    tryons: 0,
    garments: 0,
    customers: 0,
  });
  const supabase = createClient();

  useEffect(() => {
    async function fetchStats() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const [tryons, garments, customers] = await Promise.all([
        supabase.table("usage_logs").select("tryon_count").eq("retailer_id", user.id).single(),
        supabase.table("garments").select("id", { count: 'exact', head: true }).eq("retailer_id", user.id),
        supabase.table("customers").select("id", { count: 'exact', head: true }).eq("retailer_id", user.id),
      ]);

      setStats({
        tryons: tryons.data?.tryon_count || 0,
        garments: garments.count || 0,
        customers: customers.count || 0,
      });
    }
    fetchStats();
  }, []);

  const cards = [
    { name: "Total AI Try-ons", value: stats.tryons, icon: Zap, color: "bg-amber-500" },
    { name: "Total Garments", value: stats.garments, icon: ShoppingBag, color: "bg-blue-500" },
    { name: "Total Customers", value: stats.customers, icon: Users, color: "bg-green-500" },
    { name: "Monthly Growth", value: "+12%", icon: TrendingUp, color: "bg-purple-500" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-primary">Overview</h1>
        <p className="text-foreground/60">Welcome back to your boutique dashboard.</p>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div key={card.name} className="bg-white p-6 rounded-3xl shadow-sm border border-primary/5">
            <div className={`w-12 h-12 ${card.color} rounded-2xl flex items-center justify-center text-white mb-4`}>
              <card.icon size={24} />
            </div>
            <div className="text-2xl font-bold text-primary">{card.value}</div>
            <div className="text-foreground/60 text-sm">{card.name}</div>
          </div>
        ))}
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-sm border border-primary/5 min-h-[400px] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center text-primary mx-auto">
             <TrendingUp size={32} />
          </div>
          <h3 className="text-xl font-bold text-primary">Try-on Analytics</h3>
          <p className="text-foreground/60 max-w-sm">
            Detailed charts for your try-on sessions will appear here as you gather more data.
          </p>
        </div>
      </div>
    </div>
  );
}
