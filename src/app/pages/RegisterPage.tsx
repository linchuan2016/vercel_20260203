import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/utils/supabaseClient";
import { useLanguage } from "@/app/context/LanguageContext";
import { FadeIn } from "@/app/components/ui/animation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export function RegisterPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
    } else {
      toast.success("Account created! You can now login.");
      // Auto login or redirect to login? Usually sign up logs you in if email confirm is off.
      // But just in case, let's redirect to login or home.
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center px-4 pt-20">
      <FadeIn>
        <div className="w-full max-w-md bg-neutral-900 p-8 rounded-2xl border border-white/10 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">{t('auth.registerTitle')}</h1>
            <p className="text-neutral-400 text-sm">FUTURE<span className="text-neutral-600">PM</span></p>
          </div>

          <form onSubmit={handleRegister} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-neutral-400 mb-2">{t('auth.email')}</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-neutral-950 border border-white/10 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-400 mb-2">{t('auth.password')}</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-neutral-950 border border-white/10 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-500 transition-colors flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="animate-spin w-5 h-5" /> : t('auth.submitRegister')}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link to="/login" className="text-sm text-neutral-400 hover:text-white">
              {t('auth.hasAccount')} {t('auth.linkLogin')}
            </Link>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
