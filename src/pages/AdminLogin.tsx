import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const AdminLogin = () => {
  const nav = useNavigate();
  const { user, isAdmin, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [mode, setMode] = useState<"signin" | "signup">("signin");

  useEffect(() => {
    document.title = "Admin Login | MASHA ALLAH HEIGHT'S";
    if (!loading && user && isAdmin) nav("/admin");
  }, [user, isAdmin, loading, nav]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email, password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        if (data.user) {
          await supabase.from("user_roles").insert({ user_id: data.user.id, role: "admin" });
        }
        toast.success("Account created. You are now admin.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Welcome back");
      }
      nav("/admin");
    } catch (err: any) {
      toast.error(err.message || "Authentication failed");
    } finally { setBusy(false); }
  };

  return (
    <main className="min-h-screen bg-ink flex items-center justify-center p-4">
      <form onSubmit={submit} className="w-full max-w-md p-8 md:p-10 bg-ink-soft border border-gold/30 shadow-elegant">
        <div className="text-center mb-8">
          <div className="font-display text-3xl text-gold">MASHA ALLAH HEIGHT'S</div>
          <div className="gold-divider mx-auto mt-3" />
          <h1 className="text-white text-xl mt-4 font-display">Admin {mode === "signup" ? "Sign Up" : "Login"}</h1>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-xs uppercase tracking-widest text-white/60">Email</label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
              className="bg-ink border-gold/20 text-white mt-2 focus-visible:ring-gold" />
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest text-white/60">Password</label>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6}
              className="bg-ink border-gold/20 text-white mt-2 focus-visible:ring-gold" />
            {mode === "signup" && <p className="text-xs text-white/40 mt-1">Suggested: Testing@123</p>}
          </div>
          <Button type="submit" disabled={busy} className="w-full bg-gold text-ink hover:bg-gold-light font-semibold">
            {busy && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {mode === "signup" ? "Create Admin Account" : "Sign In"}
          </Button>
          <button type="button" onClick={() => setMode(mode === "signup" ? "signin" : "signup")}
            className="w-full text-center text-xs text-white/60 hover:text-gold">
            {mode === "signup" ? "Already have an account? Sign in" : "First time? Create admin account"}
          </button>
        </div>
      </form>
    </main>
  );
};

export default AdminLogin;
