import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/app/context/LanguageContext";
import { Navbar } from "@/app/components/Navbar";
import { Hero } from "@/app/components/Hero";
import { Footer } from "@/app/components/Footer";
import { TechPage } from "@/app/pages/TechPage";
import { InsightsPage } from "@/app/pages/InsightsPage";
import { CommercialPage } from "@/app/pages/CommercialPage";
import { MethodologyPage } from "@/app/pages/MethodologyPage";
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    document.title = "futurepm";
  }, []);

  return (
    <BrowserRouter>
      <LanguageProvider>
        <main className="bg-neutral-950 min-h-screen text-white selection:bg-indigo-500/30">
          <Navbar />
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/methodology" element={<MethodologyPage />} />
            <Route path="/tech" element={<TechPage />} />
            <Route path="/insights" element={<InsightsPage />} />
            <Route path="/commercial" element={<CommercialPage />} />
          </Routes>
          <Footer />
        </main>
      </LanguageProvider>
    </BrowserRouter>
  );
}