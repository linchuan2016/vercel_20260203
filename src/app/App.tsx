import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/app/context/LanguageContext";
import { Navbar } from "@/app/components/Navbar";
import { Hero } from "@/app/components/Hero";
import { Footer } from "@/app/components/Footer";
import { TechPage } from "@/app/pages/TechPage";
import { InsightsPage } from "@/app/pages/InsightsPage";
import { CommercialPage } from "@/app/pages/CommercialPage";
import { MethodologyPage } from "@/app/pages/MethodologyPage";
import { LoginPage } from "@/app/pages/LoginPage";
import { RegisterPage } from "@/app/pages/RegisterPage";
import { Toaster } from "sonner";

export default function App() {
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
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
          <Footer />
          <Toaster position="top-center" richColors />
        </main>
      </LanguageProvider>
    </BrowserRouter>
  );
}
