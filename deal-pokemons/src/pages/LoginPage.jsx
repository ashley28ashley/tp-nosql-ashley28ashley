import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handle = async () => {
    if (!username || !password) {
      setError("Veuillez remplir tous les champs.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const { data } = await api.post("/auth/login", { username, password });
      login(data.token, username);
      navigate("/");
    } catch (err) {
      setError("Identifiants invalides.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh", background: "#0A1628",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'Sora', sans-serif",
      backgroundImage: "radial-gradient(ellipse at 20% 50%, #1a2f5e22 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, #FFD60011 0%, transparent 50%)"
    }}>
      <div style={{ width: "100%", maxWidth: 420, padding: "0 20px" }}>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 12,
            background: "linear-gradient(135deg, #FFD600, #FF9800)",
            borderRadius: 16, padding: "10px 20px", marginBottom: 16
          }}>
            <span style={{ fontSize: 28 }}>⚡</span>
            <span style={{ fontSize: 22, fontWeight: 900, color: "#0A1628" }}>Deal Pokémons</span>
          </div>
          <p style={{ color: "#4A6080", fontSize: 14, margin: 0 }}>La marketplace des dresseurs</p>
        </div>

        {/* Card */}
        <div style={{
          background: "#111D30", border: "1px solid #1E3050",
          borderRadius: 20, padding: 36,
          boxShadow: "0 24px 64px #00000066"
        }}>
          <h2 style={{ color: "#E2E8F0", fontSize: 22, fontWeight: 800, marginBottom: 6, marginTop: 0 }}>
            Connexion
          </h2>
          <p style={{ color: "#4A6080", fontSize: 13, marginBottom: 28, marginTop: 0 }}>
            Accédez à votre espace dresseur
          </p>

          {/* Username */}
          <div style={{ marginBottom: 16 }}>
            <label style={{
              display: "block", color: "#8899AA", fontSize: 12,
              fontWeight: 600, marginBottom: 6, letterSpacing: 0.5, textTransform: "uppercase"
            }}>Nom d'utilisateur</label>
            <input
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="sacha"
              style={{
                width: "100%", padding: "12px 14px", background: "#0A1628",
                border: "1px solid #1E3050", borderRadius: 10, color: "#E2E8F0",
                fontSize: 14, outline: "none", boxSizing: "border-box"
              }}
              onFocus={e => e.target.style.borderColor = "#FFD600"}
              onBlur={e => e.target.style.borderColor = "#1E3050"}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: 20 }}>
            <label style={{
              display: "block", color: "#8899AA", fontSize: 12,
              fontWeight: 600, marginBottom: 6, letterSpacing: 0.5, textTransform: "uppercase"
            }}>Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              onKeyDown={e => e.key === "Enter" && handle()}
              style={{
                width: "100%", padding: "12px 14px", background: "#0A1628",
                border: "1px solid #1E3050", borderRadius: 10, color: "#E2E8F0",
                fontSize: 14, outline: "none", boxSizing: "border-box"
              }}
              onFocus={e => e.target.style.borderColor = "#FFD600"}
              onBlur={e => e.target.style.borderColor = "#1E3050"}
            />
          </div>

          {/* Error */}
          {error && (
            <div style={{
              background: "#EF535015", border: "1px solid #EF535033",
              borderRadius: 8, padding: "10px 14px", marginBottom: 16,
              color: "#EF9090", fontSize: 13
            }}>⚠️ {error}</div>
          )}

          {/* Button */}
          <button
            onClick={handle}
            style={{
              width: "100%", padding: "13px",
              background: loading ? "#1E3050" : "linear-gradient(135deg, #FFD600, #FF9800)",
              border: "none", borderRadius: 10,
              color: loading ? "#4A6080" : "#0A1628",
              fontSize: 15, fontWeight: 800,
              cursor: loading ? "not-allowed" : "pointer",
              letterSpacing: 0.3, transition: "all 0.2s"
            }}
          >
            {loading ? "Connexion en cours…" : "Se connecter →"}
          </button>

          {/* Register link */}
          <p style={{ textAlign: "center", marginTop: 20, marginBottom: 0, color: "#4A6080", fontSize: 13 }}>
            Pas encore de compte ?{" "}
            <span
              onClick={() => navigate("/register")}
              style={{ color: "#FFD600", cursor: "pointer", fontWeight: 700 }}
            >
              S'inscrire
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}