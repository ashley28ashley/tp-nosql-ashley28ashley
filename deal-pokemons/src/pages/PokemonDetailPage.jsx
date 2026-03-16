import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import TypeBadge, { COLORS } from "../components/TypeBadge";

function StatBar({ label, value, max = 160, color }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
        <span style={{ fontSize: 11, color: "#8899AA", fontWeight: 600, letterSpacing: 0.5, textTransform: "uppercase" }}>{label}</span>
        <span style={{ fontSize: 12, color: "#E2E8F0", fontWeight: 700 }}>{value}</span>
      </div>
      <div style={{ background: "#1A2535", borderRadius: 4, height: 6, overflow: "hidden" }}>
        <div style={{
          width: `${Math.min((value / max) * 100, 100)}%`,
          height: "100%",
          background: `linear-gradient(90deg, ${color}, ${color}99)`,
          borderRadius: 4,
          transition: "width 0.8s cubic-bezier(.4,0,.2,1)"
        }} />
      </div>
    </div>
  );
}

export default function PokemonDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favLoading, setFavLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/pokemons/${id}`);
        setPokemon(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  const toggleFavorite = async () => {
    setFavLoading(true);
    console.log("Token:", localStorage.getItem("token")); // ← ajoute ça
  console.log("Pokemon id:", id); // ← et ça
    try {
      if (isFavorite) {
        await api.delete(`/favorites/${id}`);
        setIsFavorite(false);
      } else {
        await api.post(`/favorites/${id}`);
        setIsFavorite(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setFavLoading(false);
    }
  };

  if (loading) return (
    <div style={{ textAlign: "center", color: "#4A6080", padding: 80, fontSize: 16 }}>
      Chargement…
    </div>
  );

  if (!pokemon) return (
    <div style={{ textAlign: "center", color: "#EF9090", padding: 80, fontSize: 16 }}>
      Pokémon introuvable.
    </div>
  );

  const mainType = pokemon.type?.[0];
  const color = COLORS[mainType] || "#8899AA";

  return (
    <div style={{ padding: 28, maxWidth: 900, margin: "0 auto" }}>

      {/* Retour */}
      <button onClick={() => navigate("/")} style={{
        background: "none", border: "1px solid #1E3050", borderRadius: 8,
        color: "#8899AA", padding: "6px 14px", fontSize: 13,
        cursor: "pointer", marginBottom: 24,
        display: "flex", alignItems: "center", gap: 6
      }}>← Retour</button>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 24, marginBottom: 24 }}>

        {/* Carte Pokémon */}
        <div style={{
          background: "#111D30", border: `1px solid ${color}44`,
          borderRadius: 20, padding: 32, textAlign: "center",
          position: "relative", overflow: "hidden"
        }}>
          <div style={{
            position: "absolute", inset: 0,
            background: `radial-gradient(circle at 50% 30%, ${color}15, transparent 70%)`
          }} />

          {/* Favori */}
          <button onClick={toggleFavorite} disabled={favLoading} style={{
            position: "absolute", top: 14, right: 14,
            background: isFavorite ? "#FFD60022" : "#1A2535",
            border: `1px solid ${isFavorite ? "#FFD60066" : "#1E3050"}`,
            borderRadius: 8, padding: "6px 10px",
            fontSize: 16, cursor: "pointer", transition: "all 0.2s"
          }}>
            {isFavorite ? "⭐" : "☆"}
          </button>

          <div style={{ color: "#4A6080", fontSize: 12, fontWeight: 700, letterSpacing: 1, marginBottom: 4 }}>
            #{String(pokemon.id).padStart(3, "0")}
          </div>

          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
            alt={pokemon.name?.english}
            style={{ width: 180, height: 180, objectFit: "contain" }}
          />

          <h2 style={{ color: "#E2E8F0", fontSize: 26, fontWeight: 900, margin: "12px 0 10px 0" }}>
            {pokemon.name?.french}
          </h2>
          <p style={{ color: "#4A6080", fontSize: 13, margin: "0 0 12px 0" }}>
            {pokemon.name?.english} · {pokemon.name?.japanese}
          </p>

          <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
            {pokemon.type?.map(t => <TypeBadge key={t} type={t} />)}
          </div>
        </div>

        {/* Stats */}
        <div style={{
          background: "#111D30", border: "1px solid #1E3050",
          borderRadius: 20, padding: 28
        }}>
          <h3 style={{ color: "#E2E8F0", fontWeight: 800, fontSize: 16, marginTop: 0, marginBottom: 20 }}>
            Statistiques de base
          </h3>

          <StatBar label="HP" value={pokemon.base?.HP} color="#66BB6A" />
          <StatBar label="Attaque" value={pokemon.base?.Attack} color="#EF5350" />
          <StatBar label="Défense" value={pokemon.base?.Defense} color="#4FC3F7" />
          <StatBar label="Atk Spéciale" value={pokemon.base?.SpecialAttack} color="#CE93D8" />
          <StatBar label="Déf Spéciale" value={pokemon.base?.SpecialDefense} color="#7986CB" />
          <StatBar label="Vitesse" value={pokemon.base?.Speed} color="#FFD600" />

          {/* Grid stats */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginTop: 20 }}>
            {[
              { label: "HP", value: pokemon.base?.HP, color: "#66BB6A" },
              { label: "ATK", value: pokemon.base?.Attack, color: "#EF5350" },
              { label: "DEF", value: pokemon.base?.Defense, color: "#4FC3F7" },
              { label: "SpATK", value: pokemon.base?.SpecialAttack, color: "#CE93D8" },
              { label: "SpDEF", value: pokemon.base?.SpecialDefense, color: "#7986CB" },
              { label: "SPD", value: pokemon.base?.Speed, color: "#FFD600" },
            ].map(s => (
              <div key={s.label} style={{
                background: "#0A1628", borderRadius: 10,
                padding: "10px", textAlign: "center",
                border: `1px solid ${s.color}22`
              }}>
                <div style={{ color: "#4A6080", fontSize: 10, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase" }}>{s.label}</div>
                <div style={{ color: s.color, fontSize: 20, fontWeight: 900 }}>{s.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Total des stats */}
      <div style={{
        background: "#111D30", border: "1px solid #1E3050",
        borderRadius: 16, padding: "16px 24px",
        display: "flex", alignItems: "center", justifyContent: "space-between"
      }}>
        <span style={{ color: "#8899AA", fontWeight: 600, fontSize: 14 }}>Total des stats</span>
        <span style={{ color: "#FFD600", fontWeight: 900, fontSize: 24 }}>
          {Object.values(pokemon.base || {}).reduce((a, b) => a + b, 0)}
        </span>
      </div>
    </div>
  );
}