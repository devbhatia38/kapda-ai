import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-6 py-20 max-w-4xl">
      <h1 className="text-4xl font-bold text-primary mb-8">Privacy Policy</h1>
      <p className="text-foreground/70 mb-4">Last Updated: June 2026</p>
      
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-primary">1. Information We Collect</h2>
        <p>Kapda AI collects retailer profile information, customer photos (for AI processing), and garment details uploaded by boutique owners.</p>
        
        <h2 className="text-2xl font-bold text-primary">2. How We Use Data</h2>
        <p>Data is used exclusively to provide the virtual try-on service. Customer photos are processed via AI and stored securely in Cloudflare R2 or the retailer's own storage.</p>
        
        <h2 className="text-2xl font-bold text-primary">3. Data Security</h2>
        <p>We implement industry-standard security measures including encryption and Row Level Security (RLS) via Supabase.</p>
        
        <h2 className="text-2xl font-bold text-primary">4. Bring Your Own Key (BYOK)</h2>
        <p>Retailers may choose to use their own API keys. In this case, we act only as a mediator and do not store sensitive credentials longer than necessary for the session.</p>
      </section>
    </div>
  );
}
