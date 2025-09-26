import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../services/api";

// PUBLIC_INTERFACE
export default function NavBar() {
  /** Top navigation bar with brand and quick actions. */
  const location = useLocation();
  const navigate = useNavigate();
  const onLogout = async () => {
    try {
      await logout();
    } catch {
      // ignore placeholder failures
    } finally {
      navigate("/login");
    }
  };

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <div className="navbar">
      <div className="nav-inner container" style={{ maxWidth: 1200 }}>
        <Link to="/" className="brand" aria-label="OceanChat Home">
          <div className="brand-badge">OC</div>
          <div>OceanChat</div>
        </Link>
        <div className="nav-actions">
          <Link className="btn ghost" to="/chat" aria-current={isActive("/chat") ? "page" : undefined}>Chat</Link>
          <Link className="btn ghost" to="/settings" aria-current={isActive("/settings") ? "page" : undefined}>Settings</Link>
          <button className="btn secondary" onClick={onLogout} aria-label="Logout">Logout</button>
        </div>
      </div>
    </div>
  );
}
