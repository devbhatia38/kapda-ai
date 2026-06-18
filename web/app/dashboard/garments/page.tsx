"use client";
import React, { useEffect, useState } from "react";
import { Plus, Search, Filter, MoreVertical, Trash2, Edit2, ShoppingBag } from "lucide-react";
import { createClient } from "@/utils/supabase";
import toast from "react-hot-toast";

export default function GarmentsPage() {
  const [garments, setGarments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const supabase = createClient();

  useEffect(() => {
    fetchGarments();
  }, []);

  const fetchGarments = async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from("garments")
      .select("*")
      .eq("retailer_id", user.id)
      .order("created_at", { ascending: false });

    if (error) toast.error("Failed to fetch garments");
    else setGarments(data || []);
    setLoading(false);
  };

  const deleteGarment = async (id: string) => {
    if (!confirm("Are you sure you want to delete this garment?")) return;
    const { error } = await supabase.from("garments").delete().eq("id", id);
    if (error) toast.error("Failed to delete garment");
    else {
      toast.success("Garment deleted");
      fetchGarments();
    }
  };

  const filteredGarments = garments.filter(g => 
    g.name.toLowerCase().includes(search.toLowerCase()) || 
    g.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-primary">Catalog Management</h1>
          <p className="text-foreground/60">Upload and manage your boutique's collection.</p>
        </div>
        <button className="bg-primary text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-primary/90 transition-all shadow-lg">
          <Plus size={20} /> Add Garment
        </button>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40" size={20} />
          <input
            type="text"
            placeholder="Search by name or category..."
            className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border-none outline-none focus:ring-2 ring-primary/10 shadow-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button className="px-6 py-4 bg-white rounded-2xl border-none flex items-center gap-2 text-foreground/60 font-medium shadow-sm">
          <Filter size={20} /> Filter
        </button>
      </div>

      {loading ? (
        <div className="grid md:grid-cols-4 gap-6">
          {[1,2,3,4].map(i => <div key={i} className="h-64 bg-white rounded-3xl animate-pulse shadow-sm" />)}
        </div>
      ) : filteredGarments.length > 0 ? (
        <div className="grid md:grid-cols-4 gap-6">
          {filteredGarments.map((garment) => (
            <div key={garment.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-primary/5 group relative">
              <div className="aspect-[3/4] overflow-hidden bg-primary/5 relative">
                <img src={garment.image_url} alt={garment.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                   <button className="p-3 bg-white rounded-xl text-primary hover:bg-primary hover:text-white transition-all">
                      <Edit2 size={20} />
                   </button>
                   <button 
                    onClick={() => deleteGarment(garment.id)}
                    className="p-3 bg-white rounded-xl text-red-500 hover:bg-red-500 hover:text-white transition-all"
                   >
                      <Trash2 size={20} />
                   </button>
                </div>
              </div>
              <div className="p-6">
                <div className="text-sm text-accent font-bold uppercase tracking-wider mb-1">{garment.category}</div>
                <h3 className="text-lg font-bold text-primary">{garment.name}</h3>
                <div className="text-foreground/60 mt-1">₹{garment.price || "N/A"}</div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white p-20 rounded-3xl text-center border border-dashed border-primary/20">
           <ShoppingBag size={48} className="mx-auto text-primary/10 mb-4" />
           <h3 className="text-xl font-bold text-primary">No garments found</h3>
           <p className="text-foreground/60 mt-2">Start by adding your first garment to the catalog.</p>
        </div>
      )}
    </div>
  );
}
