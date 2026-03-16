import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TypeBadge, { COLORS } from "./TypeBadge";

export default function PokemonCard({ pokemon }) {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();
  const mainType = pokemon.type?.[0];
  const color = COLORS[mainType] || "#8899AA";

  return (
    <div
      onClick={() => navigate(`/pokemons/${pokemon.id}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "#151F30" : "#111D30",
        border: `1px solid ${hovered ? color + "66" : "#1E3050"}`,
        borderRadius: 16, padding: 20, cursor: "pointer",
        transition: "all 0.25s cubic-bezier(.4,0,.2,1)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered ? `0 12px 32px ${color}22` : "none",
        position: "relative", overflow: "hidden"
      }}
    >
      {/* Barre colorée en haut */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 3,
        background: `linear-gradient(90deg, ${color}, ${color}44)`,
      }} />

      {/* Image */}
      <div style={{ textAlign: "center", marginBottom: 12 }}>
        <div style={{
          background: `radial-gradient(circle at center, ${color}15, transparent 70%)`,
          borderRadius: 12, padding: 8, display: "inline-block"
        }}>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
            alt={pokemon.name?.english}
            style={{ width: 90, height: 90, objectFit: "contain" }}
          />
        </div>
      </div>

      {/* Numéro */}
      <div style={{ color: "#4A6080", fontSize: 11, fontWeight: 700, letterSpacing: 1, marginBottom: 2 }}>
        #{String(pokemon.id).padStart(3, "0")}
      </div>

      {/* Nom */}
      <div style={{ color: "#E2E8F0", fontWeight: 800, fontSize: 17, marginBottom: 8 }}>
        {pokemon.name?.french || pokemon.name?.english}
      </div>

      {/* Types */}
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 12 }}>
        {pokemon.type?.map(t => <TypeBadge key={t} type={t} />)}
      </div>

      {/* Stats rapides */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ color: "#4A6080", fontSize: 11 }}>HP</div>
          <div style={{ color: "#66BB6A", fontWeight: 800, fontSize: 16 }}>{pokemon.base?.HP}</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ color: "#4A6080", fontSize: 11 }}>ATK</div>
          <div style={{ color: "#EF5350", fontWeight: 800, fontSize: 16 }}>{pokemon.base?.Attack}</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ color: "#4A6080", fontSize: 11 }}>SPD</div>
          <div style={{ color: "#FFD600", fontWeight: 800, fontSize: 16 }}>{pokemon.base?.Speed}</div>
        </div>
      </div>

      {/* Bouton */}
      <button style={{
        width: "100%", marginTop: 14, padding: "9px",
        background: hovered ? `linear-gradient(135deg, ${color}, ${color}99)` : "#1A2535",
        border: `1px solid ${color}44`,
        borderRadius: 8, color: hovered ? "#0A1628" : color,
        fontSize: 12, fontWeight: 700, cursor: "pointer",
        transition: "all 0.2s", pointerEvents: "none"
      }}>
        Voir le détail →
      </button>
    </div>
  );
}