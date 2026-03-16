import { useState, useEffect } from "react";
import api from "../api/axios";
import PokemonCard from "../components/PokemonCard";

export default function FavoritesPage() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      try {
        const { data } = await api.get("/favorites");
        setPokemons(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites();
  }, []);

  return (
    <div style={{ padding: 28, maxWidth: 1100, margin: "0 auto" }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ color: "#E2E8F0", fontSize: 26, fontWeight: 900, margin: "0 0 4px 0" }}>
          Mes Favoris ⭐
        </h1>
        <p style={{ color: "#4A6080", margin: 0, fontSize: 14 }}>
          {pokemons.length} Pokémon sauvegardés
        </p>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", color: "#4A6080", padding: 80 }}>Chargement…</div>
      ) : pokemons.length === 0 ? (
        <div style={{
          textAlign: "center", padding: 80,
          background: "#111D30", border: "1px solid #1E3050", borderRadius: 20
        }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>⭐</div>
          <div style={{ color: "#E2E8F0", fontWeight: 700, fontSize: 18, marginBottom: 8 }}>
            Aucun favori pour l'instant
          </div>
          <div style={{ color: "#4A6080", fontSize: 14 }}>
            Ajoutez des Pokémon en favoris depuis leur page de détail
          </div>
        </div>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: 16
        }}>
          {pokemons.map(p => <PokemonCard key={p.id} pokemon={p} />)}
        </div>
      )}
    </div>
  );
}