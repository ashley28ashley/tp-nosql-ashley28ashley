export default function StatusBadge({ status }) {
  const cfg = {
    "Disponible": { bg: "#66BB6A22", color: "#66BB6A", border: "#66BB6A44" },
    "Vendu":      { bg: "#EF535022", color: "#EF9090", border: "#EF535044" },
    "Réservé":    { bg: "#FFD60022", color: "#FFD600", border: "#FFD60044" },
  }[status] || { bg: "#1E3050", color: "#8899AA", border: "#1E3050" };

  return (
    <span style={{
      background: cfg.bg, color: cfg.color,
      border: `1px solid ${cfg.border}`,
      borderRadius: 20, padding: "2px 10px",
      fontSize: 11, fontWeight: 700
    }}>{status}</span>
  );
}