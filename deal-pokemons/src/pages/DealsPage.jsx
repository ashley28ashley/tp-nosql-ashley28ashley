import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StatusBadge from "../components/StatusBadge";

const MOCK_DEALS = [
  { id: 1, pokemon: "Dracaufeu", pokemonId: 6, price: 89.99, seller: "PokeTrader_77", status: "Disponible", date: "2026-03-01", rating: 4.8 },
  { id: 2, pokemon: "Mewtwo", pokemonId: 150, price: 249.99, seller: "LegendaryCards", status: "Disponible", date: "2026-03-05", rating: 5.0 },
  { id: 3, pokemon: "Pikachu", pokemonId: 25, price: 19.99, seller: "PikaPika_Shop", status: "Vendu", date: "2026-02-28", rating: 4.5 },
  { id: 4, pokemon: "Lokhlass", pokemonId: 131, price: 45.00, seller: "AquaDeals", status: "Disponible", date: "2026-03-07", rating: 4.2 },
  { id: 5, pokemon: "Dracolosse", pokemonId: 149, price: 189.00, seller: "DragonMaster", status: "Réservé", date: "2026-03-06", rating: 4.9 },
];

export default function DealsPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const PER_PAGE = 5;

  const filtered = MOCK_DEALS.filter(d => {
    const matchSearch = d.pokemon.toLowerCase().includes(search.toLowerCase()) ||
      d.seller.toLowerCase().includes(search.toLowerCase());
    const matchStatus = !statusFilter || d.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div style={{ padding: 28, maxWidth: 1000, margin: "0 auto" }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ color: "#E2E8F0", fontSize: 26, fontWeight: 900, margin: "0 0 4px 0" }}>
          Tous les Deals 🏷️
        </h1>
        <p style={{ color: "#4A6080", margin: 0, fontSize: 14 }}>
          {filtered.length} deals disponibles
        </p>
      </div>

      {/* Filtres */}
      <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
        <input
          value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
          placeholder="🔍  Pokémon ou vendeur…"
          style={{
            flex: 1, minWidth: 200, padding: "10px 14px",
            background: "#111D30", border: "1px solid #1E3050",
            borderRadius: 10, color: "#E2E8F0", fontSize: 14, outline: "none"
          }}
        />
        <select value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1); }} style={{
          padding: "10px 14px", background: "#111D30", border: "1px solid #1E3050",
          borderRadius: 10, color: "#8899AA", fontSize: 14, outline: "none", cursor: "pointer"
        }}>
          <option value="">Tous les statuts</option>
          <option value="Disponible">Disponible</option>
          <option value="Vendu">Vendu</option>
          <option value="Réservé">Réservé</option>
        </select>
      </div>

      {/* Tableau */}
      <div style={{
        background: "#111D30", border: "1px solid #1E3050",
        borderRadius: 16, overflow: "hidden", marginBottom: 20
      }}>
        {/* En-tête */}
        <div style={{
          display: "grid", gridTemplateColumns: "2fr 1.5fr 1fr 1fr 1fr 80px",
          padding: "12px 20px", borderBottom: "1px solid #1E3050"
        }}>
          {["Pokémon", "Vendeur", "Prix", "Statut", "Date", ""].map(h => (
            <div key={h} style={{ color: "#4A6080", fontSize: 11, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase" }}>
              {h}
            </div>
          ))}
        </div>

        {/* Lignes */}
        {paginated.map((deal, i) => (
          <div key={deal.id}
            style={{
              display: "grid", gridTemplateColumns: "2fr 1.5fr 1fr 1fr 1fr 80px",
              padding: "14px 20px", alignItems: "center",
              borderBottom: i < paginated.length - 1 ? "1px solid #1A2535" : "none",
              transition: "background 0.15s", cursor: "pointer"
            }}
            onMouseEnter={e => e.currentTarget.style.background = "#151F30"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${deal.pokemonId}.png`}
                alt={deal.pokemon}
                style={{ width: 40, height: 40, objectFit: "contain" }}
              />
              <span style={{ color: "#E2E8F0", fontWeight: 700, fontSize: 14 }}>{deal.pokemon}</span>
            </div>
            <div style={{ color: "#C8D8E8", fontSize: 13 }}>{deal.seller}</div>
            <div style={{ color: "#FFD600", fontWeight: 800, fontSize: 15 }}>{deal.price.toFixed(2)} €</div>
            <StatusBadge status={deal.status} />
            <div style={{ color: "#4A6080", fontSize: 12 }}>{deal.date}</div>
            <button
              onClick={() => navigate(`/deals/${deal.id}`)}
              style={{
                background: "linear-gradient(135deg, #FFD600, #FF9800)",
                border: "none", borderRadius: 7,
                color: "#0A1628", padding: "6px 12px",
                fontSize: 11, fontWeight: 800, cursor: "pointer"
              }}
            >Voir →</button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
            <button key={n} onClick={() => setPage(n)} style={{
              width: 36, height: 36, borderRadius: 8,
              background: page === n ? "linear-gradient(135deg, #FFD600, #FF9800)" : "#111D30",
              border: `1px solid ${page === n ? "transparent" : "#1E3050"}`,
              color: page === n ? "#0A1628" : "#8899AA",
              fontWeight: 700, fontSize: 13, cursor: "pointer"
            }}>{n}</button>
          ))}
        </div>
      )}
    </div>
  );
}