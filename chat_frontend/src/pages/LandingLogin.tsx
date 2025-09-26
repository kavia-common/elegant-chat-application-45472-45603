import { FormEvent, useState } from "react";
import { Credentials, login } from "../services/api";
import { useNavigate } from "react-router-dom";

// PUBLIC_INTERFACE
export default function LandingLogin() {
  /** Landing/Login page with hero section and minimalist login form. */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const creds: Credentials = { email, password };
      await login(creds); // Assume cookie-based or token storage handled by backend
      navigate("/chat");
    } catch (err: any) {
      setError(err?.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page">
      <div className="container" style={{ maxWidth: 900 }}>
        <section className="hero card" style={{ background: "var(--ocean-surface)" }}>
          <div className="brand-badge" aria-hidden>OC</div>
          <h1 className="hero-title">OceanChat</h1>
          <p className="hero-sub">Professional messaging with blue & amber accents. Smooth, modern, and minimal.</p>

          <form className="form" onSubmit={onSubmit} aria-label="Login form">
            <input
              className="input"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-label="Email"
            />
            <input
              className="input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-label="Password"
            />
            {error ? (
              <div role="alert" style={{ color: "var(--ocean-error)", fontSize: 14 }}>{error}</div>
            ) : null}
            <button className="btn" type="submit" disabled={submitting} aria-label="Sign in">
              {submitting ? "Signing in..." : "Sign in"}
            </button>
            <button
              type="button"
              className="btn ghost"
              onClick={() => navigate("/chat")}
              aria-label="Continue as guest"
            >
              Continue as guest
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
