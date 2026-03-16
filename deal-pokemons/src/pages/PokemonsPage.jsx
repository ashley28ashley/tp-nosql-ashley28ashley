import { useState, useEffect } from "react";
import api from "../api/axios";
import PokemonCard from "../components/PokemonCard";
import TypeBadge, { COLORS } from "../components/TypeBadge";

const TYPES = [
  "Fire", "Water", "Grass", "Electric", "Psychic", "Ice",
  "Dragon", "Dark", "Fighting", "Poison", "Ground",
  "Flying", "Bug", "Rock", "Ghost", "Steel", "Fairy", "Normal"
];

export default function PokemonsPage() {
  const [pokemons, setPokemons] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const LIMIT = 12;

  useEffect(() => {
    const fetchPokemons = async () => {
      setLoading(true);
      try {
        const params = { page, limit: LIMIT };
        if (search) params.name = search;
        if (typeFilter) params.type = typeFilter;
        if (sort) params.sort = sort;

        const { data } = await api.get("/pokemons", { params });
        setPokemons(data.data);
        setTotal(data.total);
        setTotalPages(data.totalPages);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    // Délai pour la recherche (évite trop de requêtes)
    const timer = setTimeout(fetchPokemons, 300);
    return () => clearTimeout(timer);
  }, [search, typeFilter, sort, page]);

  const handleSearch = (e) => { setSearch(e.target.value); setPage(1); };
  const handleType = (e) => { setTypeFilter(e.target.value); setPage(1); };
  const handleSort = (e) => { setSort(e.target.value); setPage(1); };

  return (
    <div style={{ padding: 28, maxWidth: 1100, margin: "0 auto" }}>

      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ color: "#E2E8F0", fontSize: 26, fontWeight: 900, margin: "0 0 4px 0" }}>
          Pokédex
        </h1>
        <p style={{ color: "#4A6080", margin: 0, fontSize: 14 }}>
          {total} Pokémon disponibles
        </p>
      </div>

      {/* Filtres */}
      <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
        <input
          value={search} onChange={handleSearch}
          placeholder="🔍  Rechercher un Pokémon…"
          style={{
            flex: 1, minWidth: 200, padding: "10px 14px",
            background: "#111D30", border: "1px solid #1E3050",
            borderRadius: 10, color: "#E2E8F0", fontSize: 14, outline: "none"
          }}
        />
        <select value={typeFilter} onChange={handleType} style={{
          padding: "10px 14px", background: "#111D30", border: "1px solid #1E3050",
          borderRadius: 10, color: "#8899AA", fontSize: 14, outline: "none", cursor: "pointer"
        }}>
          <option value="">Tous les types</option>
          {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <select value={sort} onChange={handleSort} style={{
          padding: "10px 14px", background: "#111D30", border: "1px solid #1E3050",
          borderRadius: 10, color: "#8899AA", fontSize: 14, outline: "none", cursor: "pointer"
        }}>
          <option value="">Trier par…</option>
          <option value="base.HP">HP croissant</option>
          <option value="-base.HP">HP décroissant</option>
          <option value="base.Attack">Attaque croissante</option>
          <option value="-base.Attack">Attaque décroissante</option>
          <option value="base.Speed">Vitesse croissante</option>
          <option value="-base.Speed">Vitesse décroissante</option>
          <option value="name.french">Nom A→Z</option>
        </select>
      </div>

      {/* Grille */}
      {loading ? (
        <div style={{ textAlign: "center", color: "#4A6080", padding: 80, fontSize: 16 }}>
          Chargement…
        </div>
      ) : pokemons.length === 0 ? (
        <div style={{ textAlign: "center", color: "#4A6080", padding: 80, fontSize: 16 }}>
          Aucun Pokémon trouvé
        </div>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: 16, marginBottom: 28
        }}>
          {pokemons.map(p => <PokemonCard key={p.id} pokemon={p} />)}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap" }}>
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            style={{
              padding: "8px 14px", borderRadius: 8,
              background: "#111D30", border: "1px solid #1E3050",
              color: page === 1 ? "#2A3A50" : "#8899AA",
              cursor: page === 1 ? "not-allowed" : "pointer", fontSize: 13
            }}
          >← Préc</button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
            <button key={n} onClick={() => setPage(n)} style={{
              width: 36, height: 36, borderRadius: 8,
              background: page === n ? "linear-gradient(135deg, #FFD600, #FF9800)" : "#111D30",
              border: `1px solid ${page === n ? "transparent" : "#1E3050"}`,
              color: page === n ? "#0A1628" : "#8899AA",
              fontWeight: 700, fontSize: 13, cursor: "pointer"
            }}>{n}</button>
          ))}

          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            style={{
              padding: "8px 14px", borderRadius: 8,
              background: "#111D30", border: "1px solid #1E3050",
              color: page === totalPages ? "#2A3A50" : "#8899AA",
              cursor: page === totalPages ? "not-allowed" : "pointer", fontSize: 13
            }}
          >Suiv →</button>
        </div>
      )}
    </div>
  );
}