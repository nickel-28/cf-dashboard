export default function StatCard({ icon, label, value, subtext, colorVariant }) {
  return (
    <div className={`stat-card stat-card-${colorVariant}`}>
      <div className="stat-header">
        <span className="stat-icon">{icon}</span>
        <p className="stat-label">{label}</p>
      </div>
      <p className={`stat-value stat-value-${colorVariant}`}>{value}</p>
      {subtext && <p className="stat-subtext">{subtext}</p>}
    </div>
  );
}
