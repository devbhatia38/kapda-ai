"use client";
import React, { useState } from "react";
import { 
  Menu, X, Smartphone, CheckCircle, ArrowRight, Globe, 
  Camera, Zap, BarChart3, Users, LayoutDashboard, Share2, LogIn 
} from "lucide-react";
import TryOnPlayground from "@/components/TryOnPlayground";
import { Toaster } from "react-hot-toast";

const translations = {
  en: {
    heroTitle: "Bring Your Boutique to the Future with AI",
    heroSub: "The ultimate virtual try-on experience for Indian Traditional Wear.",
    tryOn: "Download APK",
    features: "Features",
    howItWorks: "How it Works",
    categories: "Categories",
    testimonials: "What Retailers Say",
    contact: "Contact Us",
    step1: "Upload Person Photo",
    step2: "Select Garment",
    step3: "AI Magic Happens",
    feature1: "Instant AI Try-On",
    feature2: "Catalog Management",
    feature3: "Analytics Dashboard",
    feature4: "Customer CRM",
    feature5: "Side-by-Side Comparison",
    feature6: "Easy Sharing",
  },
  hi: {
    heroTitle: "AI के साथ अपने बुटीक को भविष्य में ले जाएं",
    heroSub: "भारतीय पारंपरिक परिधानों के लिए बेहतरीन वर्चुअल ट्राई-ऑन अनुभव।",
    tryOn: "एपीके डाउनलोड करें",
    features: "विशेषताएं",
    howItWorks: "यह कैसे काम करता है",
    categories: "श्रेणियां",
    testimonials: "रिटेलर्स की राय",
    contact: "संपर्क करें",
    step1: "व्यक्ति की फोटो अपलोड करें",
    step2: "परिधान चुनें",
    step3: "AI जादू होता है",
    feature1: "त्वरित AI ट्राई-ऑन",
    feature2: "कैटलॉग प्रबंधन",
    feature3: "एनालिटिक्स डैशबोर्ड",
    feature4: "कस्टमर CRM",
    feature5: "साइड-बाय-साइड तुलना",
    feature6: "आसान शेयरिंग",
  },
  gu: {
    heroTitle: "AI સાથે તમારા બુટિકને ભવિષ્યમાં લઈ જાઓ",
    heroSub: "ભારતીય પરંપરાગત પોશાક માટે અંતિમ વર્ચ્યુઅલ ટ્રાય-ઓન અનુભવ.",
    tryOn: "APK ડાઉનલોડ કરો",
    features: "વિશેષતાઓ",
    howItWorks: "તે કેવી રીતે કામ કરે છે",
    categories: "શ્રેણીઓ",
    testimonials: "રિટેલર્સ શું કહે છે",
    contact: "સંપર્ક કરો",
    step1: "વ્યક્તિનો ફોટો અપલોડ કરો",
    step2: "ગારમેન્ટ પસંદ કરો",
    step3: "AI જાદુ થાય છે",
    feature1: "ત્વરિત AI ટ્રાય-ઓન",
    feature2: "કેટેલોગ મેનેજમેન્ટ",
    feature3: "એનાલિટિક્સ ડેશબોર્ડ",
    feature4: "કસ્ટમર CRM",
    feature5: "સાઇડ-બાય-સાઇડ સરખામણી",
    feature6: "સરળ શેરિંગ",
  }
};

export default function Home() {
  const [lang, setLang] = useState<"en" | "hi" | "gu">("en");
  const t = translations[lang];

  return (
    <div className="min-h-screen">
      <Toaster />
      {/* Navbar */}
      <nav className="flex justify-between items-center p-6 bg-white/50 backdrop-blur-md sticky top-0 z-50 border-b border-primary/5">
        <div className="text-2xl font-bold text-primary flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white text-xs">K</div>
          Kapda AI
        </div>
        <div className="hidden md:flex space-x-8 font-medium">
          <a href="#demo" className="hover:text-accent transition-colors">Live Demo</a>
          <a href="#features" className="hover:text-accent transition-colors">{t.features}</a>
          <a href="#how" className="hover:text-accent transition-colors">{t.howItWorks}</a>
        </div>
        <div className="flex items-center space-x-4">
          <select 
            value={lang} 
            onChange={(e) => setLang(e.target.value as any)}
            className="bg-transparent border border-primary/20 rounded-lg px-2 py-1 outline-none text-sm font-medium"
          >
            <option value="en">English</option>
            <option value="hi">हिन्दी</option>
            <option value="gu">ગુજરાતી</option>
          </select>
          <a href="/login" className="flex items-center gap-2 text-primary font-bold hover:text-accent transition-colors">
            <LogIn size={20} /> Login
          </a>
          <button className="bg-primary text-white px-4 py-2 rounded-full hidden md:block text-sm font-bold hover:shadow-lg transition-shadow">
            {t.tryOn}
          </button>
        </div>
      </nav>

      {/* Hero */}
      <header className="container mx-auto px-6 py-20 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 space-y-8">
          <div className="inline-block px-4 py-1 bg-accent/10 text-accent rounded-full text-sm font-bold">
            Powered by CatVTON AI
          </div>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight text-primary">
            {t.heroTitle}
          </h1>
          <p className="text-xl text-foreground/80 max-w-lg">
            {t.heroSub}
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="bg-primary text-white px-8 py-4 rounded-2xl text-lg font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all">
              <Smartphone size={20} /> {t.tryOn}
            </button>
            <a href="#demo" className="border-2 border-primary/10 px-8 py-4 rounded-2xl text-lg font-bold hover:bg-primary/5 transition-all flex items-center justify-center">
              Try Live Demo
            </a>
          </div>
          <div className="flex items-center gap-4 text-sm text-foreground/60">
            <div className="flex -space-x-2">
              {[1,2,3,4].map(i => <div key={i} className="w-8 h-8 rounded-full bg-accent border-2 border-background" />)}
            </div>
            Trusted by 500+ boutiques across India
          </div>
        </div>
        <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center relative">
          <div className="w-72 h-[580px] bg-primary/5 rounded-[3rem] border-8 border-primary relative overflow-hidden shadow-2xl z-10">
             <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent" />
             <div className="absolute bottom-10 left-0 right-0 p-6 space-y-4">
                <div className="h-4 w-3/4 bg-primary/20 rounded" />
                <div className="h-4 w-1/2 bg-primary/20 rounded" />
                <div className="h-12 w-full bg-accent rounded-xl" />
             </div>
          </div>
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-accent/20 rounded-full blur-3xl" />
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-primary/20 rounded-full blur-3xl" />
        </div>
      </header>

      {/* Demo Section */}
      <section id="demo" className="py-24 bg-background overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-4xl font-bold text-primary">Experience the AI Magic</h2>
            <p className="text-foreground/60">
              Upload your photo below and see how you look in our sample collection. 
              Boutique owners can upload their entire catalog!
            </p>
          </div>
          <TryOnPlayground />
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-primary mb-16">{t.features}</h2>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            {[
              { title: t.feature1, desc: "Ultra-realistic results in under 10 seconds.", icon: Zap },
              { title: t.feature2, desc: "Easy upload and categorization of your garments.", icon: LayoutDashboard },
              { title: t.feature3, desc: "Insights into which garments are trending.", icon: BarChart3 },
              { title: t.feature4, desc: "Manage customer profiles and history.", icon: Users },
              { title: t.feature5, desc: "Help customers choose between multiple outfits.", icon: Camera },
              { title: t.feature6, desc: "Share results instantly via WhatsApp.", icon: Share2 },
            ].map((f, i) => (
              <div key={i} className="p-8 rounded-3xl border border-primary/5 hover:border-accent/30 transition-all hover:shadow-xl group">
                <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary group-hover:bg-accent group-hover:text-white transition-all mb-6">
                  <f.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">{f.title}</h3>
                <p className="text-foreground/60 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Showcase */}
      <section id="categories" className="py-24 bg-primary text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex justify-between items-end mb-16">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold">{t.categories}</h2>
              <p className="text-white/60">Support for all traditional silhouettes</p>
            </div>
            <ArrowRight size={32} className="text-accent" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Sarees', 'Lehengas', 'Salwar Suits', 'Kurtis', 'Bridal Wear', 'Anarkali', 'Sharara', 'Chaniya Choli'].map((cat) => (
              <div key={cat} className="group p-8 bg-white/5 rounded-3xl border border-white/10 hover:bg-accent hover:border-accent transition-all cursor-pointer">
                <div className="text-2xl font-bold">{cat}</div>
                <div className="text-white/40 group-hover:text-white/80 transition-all text-sm mt-2">Explore &rarr;</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-primary mb-16">{t.testimonials}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { name: "Priya Sharma", shop: "Vastra Boutique, Delhi", text: "Kapda AI has transformed how we sell sarees. Customers can try 10 sarees in 2 minutes!" },
              { name: "Anish Patel", shop: "Zari Emporium, Ahmedabad", text: "The Gujarati support and simple interface made it easy for my staff to use." }
            ].map((test, i) => (
              <div key={i} className="bg-white p-10 rounded-3xl shadow-sm text-left border border-primary/5">
                <div className="text-accent text-4xl mb-6">“</div>
                <p className="text-xl text-primary font-medium mb-8 leading-relaxed italic">"{test.text}"</p>
                <div className="font-bold text-primary">{test.name}</div>
                <div className="text-foreground/60 text-sm">{test.shop}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-24 bg-white border-t border-primary/5">
        <div className="container mx-auto px-6 max-w-2xl">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold text-primary">{t.contact}</h2>
            <p className="text-foreground/60">Start your boutique's AI journey today.</p>
          </div>
          <form className="space-y-4">
             <div className="grid grid-cols-2 gap-4">
               <input type="text" placeholder="Name" className="w-full p-4 bg-background rounded-2xl border-none outline-none focus:ring-2 ring-accent" />
               <input type="text" placeholder="Shop Name" className="w-full p-4 bg-background rounded-2xl border-none outline-none focus:ring-2 ring-accent" />
             </div>
             <input type="email" placeholder="Email Address" className="w-full p-4 bg-background rounded-2xl border-none outline-none focus:ring-2 ring-accent" />
             <textarea placeholder="How can we help?" rows={4} className="w-full p-4 bg-background rounded-2xl border-none outline-none focus:ring-2 ring-accent" />
             <button className="w-full bg-primary text-white p-4 rounded-2xl font-bold hover:bg-primary/90 transition-all">Send Message</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-12">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm">
          <div className="text-2xl font-bold text-primary mb-4 md:mb-0">Kapda AI</div>
          <div className="flex space-x-8 text-foreground/60 mb-4 md:mb-0">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Support</a>
          </div>
          <div className="text-foreground/60">
            © 2026 Kapda AI. All rights reserved. Built for India.
          </div>
        </div>
      </footer>
    </div>
  );
}
