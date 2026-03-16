import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { path: "/", label: "Pokémons", icon: "🎴" },
    { path: "/deals", label: "Deals", icon: "🏷️" },
    { path: "/favorites", label: "Favoris", icon: "⭐" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header style={{
      background: "#0D1B2E", borderBottom: "1px solid #1E3050",
      padding: "0 28px", height: 60,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      position: "sticky", top: 0, zIndex: 100,
    }}>
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
        <div onClick={() => navigate("/")} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
          <span style={{
            background: "linear-gradient(135deg, #FFD600, #FF9800)",
            borderRadius: 8, padding: "4px 8px",
            fontSize: 13, fontWeight: 900, color: "#0A1628"
          }}>⚡ Deal</span>
          <span style={{ color: "#E2E8F0", fontWeight: 800, fontSize: 16 }}>Pokémons</span>
        </div>

        {/* Nav */}
        <nav style={{ display: "flex", gap: 4 }}>
          {links.map(l => (
            <button key={l.path} onClick={() => navigate(l.path)} style={{
              background: location.pathname === l.path ? "#1E3050" : "transparent",
              border: "none", borderRadius: 8,
              color: location.pathname === l.path ? "#FFD600" : "#8899AA",
              padding: "6px 14px", fontSize: 13, fontWeight: 600,
              cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
              transition: "all 0.2s"
            }}>
              {l.icon} {l.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Avatar + menu */}
      <div style={{ position: "relative" }}>
        <button onClick={() => setMenuOpen(!menuOpen)} style={{
          display: "flex", alignItems: "center", gap: 10,
          background: "#1A2535", border: "1px solid #1E3050",
          borderRadius: 10, padding: "6px 14px", cursor: "pointer"
        }}>
          <div style={{
            width: 30, height: 30, borderRadius: "50%",
            background: "linear-gradient(135deg, #FFD600, #FF9800)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 14, fontWeight: 900, color: "#0A1628"
          }}>
            {user?.username?.[0]?.toUpperCase()}
          </div>
          <span style={{ color: "#E2E8F0", fontSize: 13, fontWeight: 600 }}>{user?.username}</span>
          <span style={{ color: "#4A6080", fontSize: 11 }}>▾</span>
        </button>

        {menuOpen && (
          <div style={{
            position: "absolute", right: 0, top: "calc(100% + 8px)",
            background: "#111D30", border: "1px solid #1E3050",
            borderRadius: 12, padding: 8, minWidth: 160,
            boxShadow: "0 12px 32px #00000066", zIndex: 200
          }}>
            <button onClick={() => { setMenuOpen(false); }} style={{
              display: "block", width: "100%", textAlign: "left",
              background: "none", border: "none", color: "#C8D8E8",
              padding: "8px 12px", borderRadius: 8, fontSize: 13, cursor: "pointer"
            }}>👤 Mon profil</button>
            <div style={{ borderTop: "1px solid #1E3050", margin: "6px 0" }} />
            <button onClick={handleLogout} style={{
              display: "block", width: "100%", textAlign: "left",
              background: "none", border: "none", color: "#EF9090",
              padding: "8px 12px", borderRadius: 8, fontSize: 13, cursor: "pointer"
            }}>🚪 Se déconnecter</button>
          </div>
        )}
      </div>
    </header>
  );
}