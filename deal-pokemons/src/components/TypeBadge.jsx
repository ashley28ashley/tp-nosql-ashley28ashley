const COLORS = {
  Fire: "#FF6B35", Water: "#4FC3F7", Grass: "#66BB6A",
  Electric: "#FFD600", Psychic: "#CE93D8", Ice: "#80DEEA",
  Dragon: "#7986CB", Dark: "#546E7A", Fighting: "#EF5350",
  Poison: "#AB47BC", Ground: "#BCAAA4", Flying: "#90CAF9",
  Bug: "#AED581", Rock: "#FFA726", Ghost: "#7E57C2",
  Steel: "#B0BEC5", Fairy: "#F48FB1", Normal: "#EEEEEE",
};

export { COLORS };

export default function TypeBadge({ type }) {
  return (
    <span style={{
      background: (COLORS[type] || "#8899AA") + "22",
      color: COLORS[type] || "#8899AA",
      border: `1px solid ${(COLORS[type] || "#8899AA")}55`,
      borderRadius: 20, padding: "2px 10px",
      fontSize: 11, fontWeight: 700,
      letterSpacing: 0.5, textTransform: "uppercase",
    }}>{type}</span>
  );
}