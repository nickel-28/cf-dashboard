export default function RecommendationCard({ problem }) {
  return (
    <a
      href={`https://codeforces.com/problemset/problem/${problem.contestId}/${problem.index}`}
      target="_blank"
      rel="noopener noreferrer"
      className="recommendation-card"
    >
      <p className="recommendation-name">{problem.name}</p>
      <div className="recommendation-meta">
        <span className="recommendation-rating">{problem.rating}</span>
        <span className="recommendation-id">{problem.contestId}{problem.index}</span>
      </div>
      <div className="recommendation-tags">
        {(problem.tags || []).slice(0, 3).map((t) => (
          <span key={t} className="recommendation-tag">{t}</span>
        ))}
      </div>
    </a>
  );
}
