import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import logo from "@/assets/logo.png";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { setError("Please fill in all fields"); return; }
    const success = login(email, password);
    if (success) navigate("/dashboard");
    else setError("Invalid credentials");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center">
            <img src={logo} alt="LDPS Logo" className="h-14 w-14 object-contain" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">LDPS</h1>
          <p className="mt-1 text-sm text-muted-foreground">Learning Difficulty Prediction System</p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-8 shadow-card">
          <h2 className="text-lg font-semibold text-foreground mb-6">Sign In</h2>

          {error && <div className="mb-4 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@bitsathy.ac.in"
                className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Password</label>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-lg gradient-primary py-2.5 text-sm font-semibold text-primary-foreground shadow-primary hover:opacity-90 transition-opacity"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 space-y-2 rounded-lg bg-secondary p-3">
            <p className="text-xs font-medium text-muted-foreground">Demo Accounts:</p>
            <p className="text-xs text-muted-foreground">Student: <span className="font-mono text-foreground">student@bitsathy.ac.in</span></p>
            <p className="text-xs text-muted-foreground">Admin: <span className="font-mono text-foreground">admin@bitsathy.ac.in</span></p>
            <p className="text-xs text-muted-foreground">Password: <span className="font-mono text-foreground">bitsathy</span></p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
