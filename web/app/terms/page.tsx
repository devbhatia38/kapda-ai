import React from "react";

export default function TermsOfService() {
  return (
    <div className="container mx-auto px-6 py-20 max-w-4xl">
      <h1 className="text-4xl font-bold text-primary mb-8">Terms of Service</h1>
      <p className="text-foreground/70 mb-4">Last Updated: June 2026</p>
      
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-primary">1. License and Access</h2>
        <p>We grant you a limited, non-exclusive license to use Kapda AI for your boutique business. Lifetime tiers are subject to a one-time fee.</p>
        
        <h2 className="text-2xl font-bold text-primary">2. Payment Terms</h2>
        <p>Subscriptions are billed monthly. Failure to pay will result in a suspension of services. Lifetime whitelabeling is a final sale.</p>
        
        <h2 className="text-2xl font-bold text-primary">3. Whitelabeling</h2>
        <p>Lifetime tier users may customize the app's branding. However, "Powered by CatVTON" or similar AI attributions must remain as per model licenses.</p>
        
        <h2 className="text-2xl font-bold text-primary">4. Liability</h2>
        <p>Kapda AI is provided "as is." We are not liable for any business interruptions or AI-generated image inaccuracies.</p>
      </section>
    </div>
  );
}
