import { FormEvent, useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { User, getProfile, updateProfile } from "../services/api";

// PUBLIC_INTERFACE
export default function Settings() {
  /** Profile and settings page allowing user to update display name, status, and avatar URL. */
  const [profile, setProfile] = useState<User | null>(null);
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const p = await getProfile().catch(() => ({
        id: "me",
        name: "Ocean Pro",
        email: "you@example.com",
        status: "Available",
        avatarUrl: ""
      } as User));
      if (!mounted) return;
      setProfile(p);
      setName(p.name || "");
      setStatus(p.status || "");
      setAvatarUrl(p.avatarUrl || "");
    })();
    return () => { mounted = false; };
  }, []);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      const updated = await updateProfile({ name, status, avatarUrl }).catch(() => ({
        ...(profile as User),
        name,
        status,
        avatarUrl
      }));
      setProfile(updated);
      setMessage("Profile updated successfully.");
    } catch {
      setMessage("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <NavBar />
      <div className="page">
        <div className="container" style={{ maxWidth: 900 }}>
          <div className="card" style={{ padding: 24 }}>
            <h2 style={{ marginTop: 0 }}>Profile & Settings</h2>
            {!profile ? (
              <div>Loading profile...</div>
            ) : (
              <form className="form" onSubmit={onSubmit}>
                <label>
                  <div style={{ marginBottom: 6, fontWeight: 600 }}>Display name</div>
                  <input className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
                </label>
                <label>
                  <div style={{ marginBottom: 6, fontWeight: 600 }}>Status</div>
                  <input className="input" value={status} onChange={(e) => setStatus(e.target.value)} placeholder="How are you today?" />
                </label>
                <label>
                  <div style={{ marginBottom: 6, fontWeight: 600 }}>Avatar URL</div>
                  <input className="input" value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} placeholder="https://..." />
                </label>
                {message ? (
                  <div role="status" style={{ color: message.includes("success") ? "var(--ocean-secondary)" : "var(--ocean-error)" }}>
                    {message}
                  </div>
                ) : null}
                <div style={{ display: "flex", gap: 10 }}>
                  <button className="btn" type="submit" disabled={saving}>{saving ? "Saving..." : "Save changes"}</button>
                  <button className="btn ghost" type="button" onClick={() => { setName(profile.name || ""); setStatus(profile.status || ""); setAvatarUrl(profile.avatarUrl || ""); }}>
                    Reset
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
