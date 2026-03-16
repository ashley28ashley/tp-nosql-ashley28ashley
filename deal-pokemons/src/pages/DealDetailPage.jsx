import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import StatusBadge from "../components/StatusBadge";

const MOCK_DEALS = [
  { id: 1, pokemon: "Dracaufeu", pokemonId: 6, price: 89.99, seller: "PokeTrader_77", status: "Disponible", date: "2026-03-01", rating: 4.8 },
  { id: 2, pokemon: "Mewtwo", pokemonId: 150, price: 249.99, seller: "LegendaryCards", status: "Disponible", date: "2026-03-05", rating: 5.0 },
  { id: 3, pokemon: "Pikachu", pokemonId: 25, price: 19.99, seller: "PikaPika_Shop", status: "Vendu", date: "2026-02-28", rating: 4.5 },
  { id: 4, pokemon: "Lokhlass", pokemonId: 131, price: 45.00, seller: "AquaDeals", status: "Disponible", date: "2026-03-07", rating: 4.2 },
  { id: 5, pokemon: "Dracolosse", pokemonId: 149, price: 189.00, seller: "DragonMaster", status: "Réservé", date: "2026-03-06", rating: 4.9 },
];

export default function DealDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bought, setBought] = useState(false);

  const deal = MOCK_DEALS.find(d => d.id === parseInt(id));

  if (!deal) return (
    <div style={{ textAlign: "center", color: "#EF9090", padding: 80, fontSize: 16 }}>
      Deal introuvable.
    </div>
  );

  return (
    <div style={{ padding: 28, maxWidth: 700, margin: "0 auto" }}>
      <button onClick={() => navigate("/deals")} style={{
        background: "none", border: "1px solid #1E3050", borderRadius: 8,
        color: "#8899AA", padding: "6px 14px", fontSize: 13,
        cursor: "pointer", marginBottom: 24
      }}>← Retour</button>

      {/* Card principale */}
      <div style={{
        background: "#111D30", border: "1px solid #1E3050",
        borderRadius: 20, padding: 32, marginBottom: 20
      }}>
        {/* Pokémon associé */}
        <div style={{ display: "flex", gap: 20, alignItems: "center", marginBottom: 28 }}>
          <div style={{
            background: "#1A2535", borderRadius: 16, padding: 16,
            border: "1px solid #1E3050"
          }}>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${deal.pokemonId}.png`}
              alt={deal.pokemon}
              style={{ width: 100, height: 100, objectFit: "contain" }}
            />
          </div>
          <div>
            <div style={{ color: "#4A6080", fontSize: 12, marginBottom: 4 }}>Pokémon</div>
            <h2 style={{ color: "#E2E8F0", fontSize: 24, fontWeight: 900, margin: "0 0 8px 0" }}>
              {deal.pokemon}
            </h2>
            <StatusBadge status={deal.status} />
          </div>
        </div>

        {/* Infos */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
          {[
            { label: "Vendeur", value: deal.seller, icon: "👤" },
            { label: "Date", value: deal.date, icon: "📅" },
            { label: "Note", value: "★".repeat(Math.floor(deal.rating)) + ` ${deal.rating}`, icon: "⭐" },
            { label: "Statut", value: <StatusBadge status={deal.status} />, icon: "📌" },
          ].map(item => (
            <div key={item.label} style={{
              background: "#0A1628", borderRadius: 10,
              padding: "12px 16px", border: "1px solid #1E3050"
            }}>
              <div style={{ color: "#4A6080", fontSize: 11, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", marginBottom: 6 }}>
                {item.icon} {item.label}
              </div>
              <div style={{ color: "#C8D8E8", fontSize: 14, fontWeight: 600 }}>{item.value}</div>
            </div>
          ))}
        </div>

        {/* Prix + Achat */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: "#0A1628", borderRadius: 14,
          padding: "18px 22px", border: "1px solid #FFD60033"
        }}>
          <div>
            <div style={{ color: "#4A6080", fontSize: 12, marginBottom: 4 }}>Prix du deal</div>
            <div style={{ color: "#FFD600", fontSize: 32, fontWeight: 900 }}>
              {deal.price.toFixed(2)} €
            </div>
          </div>
          <button
            onClick={() => setBought(true)}
            disabled={deal.status !== "Disponible" || bought}
            style={{
              background: bought
                ? "#1E3050"
                : deal.status === "Disponible"
                  ? "linear-gradient(135deg, #FFD600, #FF9800)"
                  : "#1E3050",
              border: "none", borderRadius: 12,
              color: bought ? "#66BB6A" : deal.status === "Disponible" ? "#0A1628" : "#4A6080",
              padding: "14px 28px", fontSize: 15, fontWeight: 800,
              cursor: deal.status === "Disponible" && !bought ? "pointer" : "not-allowed",
              transition: "all 0.2s"
            }}
          >
            {bought ? "✅ Acheté !" : deal.status === "Disponible" ? "Acheter maintenant" : deal.status}
          </button>
        </div>
      </div>

      {/* Commentaires */}
      <div style={{
        background: "#111D30", border: "1px solid #1E3050",
        borderRadius: 16, padding: 22
      }}>
        <h3 style={{ color: "#E2E8F0", fontWeight: 800, fontSize: 15, marginTop: 0, marginBottom: 16 }}>
          💬 Commentaires
        </h3>
        {[
          { user: "AshKetchum", text: "Très bon vendeur, livraison rapide !", date: "2026-03-01" },
          { user: "Misty_W", text: "Pokémon en parfait état, je recommande.", date: "2026-02-20" },
        ].map((c, i) => (
          <div key={i} style={{
            background: "#0A1628", borderRadius: 10,
            padding: "12px 16px", marginBottom: 10,
            border: "1px solid #1E3050"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ color: "#E2E8F0", fontWeight: 700, fontSize: 13 }}>{c.user}</span>
              <span style={{ color: "#4A6080", fontSize: 11 }}>{c.date}</span>
            </div>
            <p style={{ color: "#8899AA", fontSize: 13, margin: 0 }}>{c.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
