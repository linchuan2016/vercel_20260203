import { motion } from "motion/react";
import { Menu, X, Globe, User } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "@/app/context/LanguageContext";
import { supabase } from "@/utils/supabaseClient";
import { toast } from "sonner";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const [session, setSession] = useState<any>(null);
  const location = useLocation();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) toast.error(error.message);
    else toast.success("Logged out successfully");
  };

  const links = [
    { name: t('nav.methodology'), href: "/methodology" },
    { name: t('nav.tech'), href: "/tech" },
    { name: t('nav.insights'), href: "/insights" },
    { name: t('nav.commercial'), href: "/commercial" },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'zh' : 'en');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-neutral-950/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold tracking-tighter text-white">
          FUTURE<span className="text-neutral-500">PM</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={`text-sm font-medium transition-colors ${
                isActive(link.href) ? "text-white" : "text-neutral-400 hover:text-white"
              }`}
            >
              {link.name}
            </Link>
          ))}
          
          <div className="h-4 w-px bg-white/10 mx-2" />

          <button 
            onClick={toggleLanguage}
            className="flex items-center gap-2 text-sm font-medium text-neutral-400 hover:text-white transition-colors"
          >
            <Globe className="w-4 h-4" />
            <span>{language === 'en' ? '中文' : 'English'}</span>
          </button>

          {session ? (
             <button
              onClick={handleLogout}
              className="text-sm font-medium text-neutral-400 hover:text-white transition-colors"
            >
              {t('nav.logout')}
            </button>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors">
                {t('nav.login')}
              </Link>
              <Link
                to="/register"
                className="px-5 py-2 bg-white text-black text-sm font-medium rounded-full hover:bg-neutral-200 transition-colors"
              >
                {t('nav.register')}
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Nav Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <button 
            onClick={toggleLanguage}
            className="text-neutral-400 hover:text-white"
          >
            <span className="text-sm font-medium">{language === 'en' ? 'CN' : 'EN'}</span>
          </button>
          <button
            className="text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden bg-neutral-950 border-b border-white/10"
        >
          <div className="flex flex-col p-6 gap-6">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium text-neutral-400 hover:text-white"
              >
                {link.name}
              </Link>
            ))}
            
            <div className="h-px w-full bg-white/10" />

            {session ? (
              <button onClick={() => { handleLogout(); setIsOpen(false); }} className="text-lg font-medium text-neutral-400 hover:text-white text-left">
                {t('nav.logout')}
              </button>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsOpen(false)} className="text-lg font-medium text-neutral-400 hover:text-white">
                  {t('nav.login')}
                </Link>
                <Link to="/register" onClick={() => setIsOpen(false)} className="text-lg font-medium text-neutral-400 hover:text-white">
                  {t('nav.register')}
                </Link>
              </>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
}
