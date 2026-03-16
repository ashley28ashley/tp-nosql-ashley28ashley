import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handle = async () => {
    if (!username || !password) { setError("Veuillez remplir tous les champs."); return; }
    setLoading(true);
    setError("");
    try {
      await api.post("/auth/register", { username, password });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de l'inscription.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh", background: "#0A1628",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'Sora', sans-serif"
    }}>
      <div style={{ width: "100%", maxWidth: 420, padding: "0 20px" }}>
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

        <div style={{
          background: "#111D30", border: "1px solid #1E3050",
          borderRadius: 20, padding: 36, boxShadow: "0 24px 64px #00000066"
        }}>
          <h2 style={{ color: "#E2E8F0", fontSize: 22, fontWeight: 800, marginBottom: 6, marginTop: 0 }}>
            Créer un compte
          </h2>
          <p style={{ color: "#4A6080", fontSize: 13, marginBottom: 28, marginTop: 0 }}>
            Rejoignez la communauté des dresseurs
          </p>

          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", color: "#8899AA", fontSize: 12, fontWeight: 600, marginBottom: 6, letterSpacing: 0.5, textTransform: "uppercase" }}>
              Nom d'utilisateur
            </label>
            <input
              value={username} onChange={e => setUsername(e.target.value)}
              placeholder="sacha"
              style={{ width: "100%", padding: "12px 14px", background: "#0A1628", border: "1px solid #1E3050", borderRadius: 10, color: "#E2E8F0", fontSize: 14, outline: "none", boxSizing: "border-box" }}
              onFocus={e => e.target.style.borderColor = "#FFD600"}
              onBlur={e => e.target.style.borderColor = "#1E3050"}
            />
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={{ display: "block", color: "#8899AA", fontSize: 12, fontWeight: 600, marginBottom: 6, letterSpacing: 0.5, textTransform: "uppercase" }}>
              Mot de passe
            </label>
            <input
              type="password" value={password} onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              onKeyDown={e => e.key === "Enter" && handle()}
              style={{ width: "100%", padding: "12px 14px", background: "#0A1628", border: "1px solid #1E3050", borderRadius: 10, color: "#E2E8F0", fontSize: 14, outline: "none", boxSizing: "border-box" }}
              onFocus={e => e.target.style.borderColor = "#FFD600"}
              onBlur={e => e.target.style.borderColor = "#1E3050"}
            />
          </div>

          {error && (
            <div style={{ background: "#EF535015", border: "1px solid #EF535033", borderRadius: 8, padding: "10px 14px", marginBottom: 16, color: "#EF9090", fontSize: 13 }}>
              ⚠️ {error}
            </div>
          )}

          <button onClick={handle} style={{
            width: "100%", padding: "13px",
            background: loading ? "#1E3050" : "linear-gradient(135deg, #FFD600, #FF9800)",
            border: "none", borderRadius: 10,
            color: loading ? "#4A6080" : "#0A1628",
            fontSize: 15, fontWeight: 800, cursor: loading ? "not-allowed" : "pointer"
          }}>
            {loading ? "Création en cours…" : "Créer mon compte →"}
          </button>

          <p style={{ textAlign: "center", marginTop: 20, marginBottom: 0, color: "#4A6080", fontSize: 13 }}>
            Déjà un compte ?{" "}
            <span onClick={() => navigate("/login")} style={{ color: "#FFD600", cursor: "pointer", fontWeight: 700 }}>
              Se connecter
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}