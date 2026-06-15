"use client";
import React, { useState } from "react";
import { Menu, X, Smartphone, CheckCircle, ArrowRight, Globe } from "lucide-react";

const translations = {
  en: {
    heroTitle: "Bring Your Boutique to the Future with AI",
    heroSub: "The ultimate virtual try-on experience for Indian Traditional Wear.",
    tryOn: "Download APK",
    features: "Features",
    howItWorks: "How it Works",
    categories: "Categories",
    step1: "Upload Person Photo",
    step2: "Select Garment",
    step3: "AI Magic Happens",
  },
  hi: {
    heroTitle: "AI के साथ अपने बुटीक को भविष्य में ले जाएं",
    heroSub: "भारतीय पारंपरिक परिधानों के लिए बेहतरीन वर्चुअल ट्राई-ऑन अनुभव।",
    tryOn: "एपीके डाउनलोड करें",
    features: "विशेषताएं",
    howItWorks: "यह कैसे काम करता है",
    categories: "श्रेणियां",
    step1: "व्यक्ति की फोटो अपलोड करें",
    step2: "परिधान चुनें",
    step3: "AI जादू होता है",
  },
  gu: {
    heroTitle: "AI સાથે તમારા બુટિકને ભવિષ્યમાં લઈ જાઓ",
    heroSub: "ભારતીય પરંપરાગત પોશાક માટે અંતિમ વર્ચ્યુઅલ ટ્રાય-ઓન અનુભવ.",
    tryOn: "APK ડાઉનલોડ કરો",
    features: "વિશેષતાઓ",
    howItWorks: "તે કેવી રીતે કામ કરે છે",
    categories: "શ્રેણીઓ",
    step1: "વ્યક્તિનો ફોટો અપલોડ કરો",
    step2: "ગારમેન્ટ પસંદ કરો",
    step3: "AI જાદુ થાય છે",
  }
};

export default function Home() {
  const [lang, setLang] = useState<"en" | "hi" | "gu">("en");
  const t = translations[lang];

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-6 bg-white/50 backdrop-blur-md sticky top-0 z-50">
        <div className="text-2xl font-bold text-primary">Kapda AI</div>
        <div className="hidden md:flex space-x-8 font-medium">
          <a href="#features">{t.features}</a>
          <a href="#how">{t.howItWorks}</a>
          <a href="#categories">{t.categories}</a>
        </div>
        <div className="flex items-center space-x-4">
          <select 
            value={lang} 
            onChange={(e) => setLang(e.target.value as any)}
            className="bg-transparent border border-primary/20 rounded px-2 py-1 outline-none"
          >
            <option value="en">English</option>
            <option value="hi">हिन्दी</option>
            <option value="gu">ગુજરાતી</option>
          </select>
          <button className="bg-primary text-white px-4 py-2 rounded-full hidden md:block">
            {t.tryOn}
          </button>
        </div>
      </nav>

      {/* Hero */}
      <header className="container mx-auto px-6 py-20 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight text-primary">
            {t.heroTitle}
          </h1>
          <p className="text-xl text-foreground/80">
            {t.heroSub}
          </p>
          <div className="flex space-x-4">
            <button className="bg-primary text-white px-8 py-4 rounded-xl text-lg font-bold flex items-center gap-2">
              <Smartphone size={20} /> {t.tryOn}
            </button>
          </div>
        </div>
        <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center relative">
          <div className="w-64 h-[500px] bg-primary/10 rounded-[3rem] border-8 border-primary relative overflow-hidden shadow-2xl">
             {/* Mockup content */}
             <div className="absolute inset-0 flex items-center justify-center text-primary/20 text-4xl font-black italic">
               MOCKUP
             </div>
          </div>
          <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-accent/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        </div>
      </header>

      {/* Categories */}
      <section id="categories" className="py-20 bg-primary text-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">{t.categories}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['Sarees', 'Lehengas', 'Salwar Suits', 'Kurtis', 'Bridal Wear', 'Anarkali', 'Sharara', 'Chaniya Choli'].map((cat) => (
              <div key={cat} className="p-6 bg-white/10 rounded-2xl border border-white/20 text-center hover:bg-accent transition-colors cursor-default">
                {cat}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-16 text-center text-primary">{t.howItWorks}</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { title: t.step1, desc: "Take a photo of your customer or use our mannequin.", icon: "📸" },
              { title: t.step2, desc: "Select any garment from your digitized catalog.", icon: "👗" },
              { title: t.step3, desc: "Get high-quality virtual try-on results instantly.", icon: "✨" }
            ].map((step, i) => (
              <div key={i} className="text-center space-y-4">
                <div className="text-6xl mb-4">{step.icon}</div>
                <h3 className="text-xl font-bold">{step.title}</h3>
                <p className="text-foreground/70">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-12">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <div className="text-2xl font-bold text-primary mb-4 md:mb-0">Kapda AI</div>
          <div className="text-foreground/60 text-sm">
            © 2026 Kapda AI. Built for the modern Indian Retailer.
          </div>
        </div>
      </footer>
    </div>
  );
}
