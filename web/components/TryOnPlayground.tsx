"use client";
import React, { useState } from "react";
import { Upload, Zap, RefreshCw, CheckCircle } from "lucide-react";
import { runTryOn } from "@/utils/api";
import toast from "react-hot-toast";

const SAMPLE_GARMENTS = [
  { id: "sample-1", name: "Red Silk Saree", url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=400" },
  { id: "sample-2", name: "Blue Lehenga", url: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&q=80&w=400" },
];

export default function TryOnPlayground() {
  const [personImage, setPersonImage] = useState<string | null>(null);
  const [selectedGarment, setSelectedGarment] = useState(SAMPLE_GARMENTS[0]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPersonImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleTryOn = async () => {
    if (!personImage) return toast.error("Please upload a photo first");
    
    setLoading(true);
    try {
      // In a real demo, we'd upload the person image to a temporary storage first
      // For this prototype, we'll assume the backend can handle the base64 or a mock URL
      const data = await runTryOn({
        retailer_id: "demo-retailer", // Special ID for public demo
        garment_id: selectedGarment.id,
        person_image_url: personImage,
      });
      setResult(data.result_url);
      toast.success("AI Try-on Completed!");
    } catch (error) {
      toast.error("AI Processing failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-primary/5">
      <div className="grid md:grid-cols-2 gap-12">
        {/* Input Side */}
        <div className="space-y-8">
          <div>
            <h3 className="text-2xl font-bold text-primary mb-2">1. Your Photo</h3>
            <p className="text-foreground/60 mb-4">Upload a clear photo of yourself.</p>
            <label className="block aspect-[3/4] rounded-3xl border-2 border-dashed border-primary/10 hover:border-accent transition-all cursor-pointer relative overflow-hidden group">
              {personImage ? (
                <img src={personImage} className="w-full h-full object-cover" alt="User" />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-foreground/40">
                  <Upload size={48} className="mb-4 group-hover:scale-110 transition-transform" />
                  <span className="font-bold">Click to Upload</span>
                </div>
              )}
              <input type="file" className="hidden" onChange={handleUpload} accept="image/*" />
            </label>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-primary mb-2">2. Select Garment</h3>
            <div className="grid grid-cols-2 gap-4">
              {SAMPLE_GARMENTS.map((g) => (
                <div 
                  key={g.id}
                  onClick={() => setSelectedGarment(g)}
                  className={`cursor-pointer rounded-2xl overflow-hidden border-4 transition-all ${
                    selectedGarment.id === g.id ? "border-accent scale-95" : "border-transparent"
                  }`}
                >
                  <img src={g.url} className="w-full h-32 object-cover" alt={g.name} />
                  <div className="p-2 text-xs font-bold text-center bg-background">{g.name}</div>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={handleTryOn}
            disabled={loading || !personImage}
            className="w-full bg-primary text-white p-6 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-primary/90 transition-all shadow-xl disabled:opacity-50"
          >
            {loading ? <RefreshCw className="animate-spin" /> : <Zap />}
            {loading ? "AI is Working..." : "Run AI Try-On"}
          </button>
        </div>

        {/* Result Side */}
        <div className="flex flex-col">
          <h3 className="text-2xl font-bold text-primary mb-2">3. Result</h3>
          <p className="text-foreground/60 mb-4">See your virtual look.</p>
          <div className="flex-1 aspect-[3/4] rounded-3xl bg-primary/5 border border-primary/5 relative overflow-hidden flex items-center justify-center">
             {result ? (
               <img src={result} className="w-full h-full object-cover" alt="Result" />
             ) : loading ? (
               <div className="text-center space-y-4">
                  <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto" />
                  <p className="font-bold text-primary animate-pulse">Generating your look...</p>
               </div>
             ) : (
               <div className="text-center text-foreground/20 px-8">
                  <Zap size={64} className="mx-auto mb-4 opacity-10" />
                  <p className="font-medium">Upload a photo and click "Run AI" to see the magic happen here.</p>
               </div>
             )}
          </div>
          {result && (
            <button className="mt-6 w-full py-4 rounded-2xl border-2 border-primary/10 font-bold text-primary hover:bg-primary/5 transition-all">
              Download Result
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
