import { useState } from "react";
import { fetchAllProblems } from "../api/codeforcesApi";
import { getSolvedSet } from "../utils/dateUtils";
import RecommendationCard from "./RecommendationCard";
import "./PracticeRecommendations.css";

export default function PracticeRecommendations({ user, submissions }) {
  const [allProblems, setAllProblems] = useState(null);
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState(null);

  if (!submissions) return null;

  const fetchRecommendations = async () => {
    setLoading(true);
    try {
      let problems = allProblems;
      if (!problems) {
        problems = await fetchAllProblems();
        setAllProblems(problems);
      }
      const solved = getSolvedSet(submissions);
      const base = user?.rating ? Math.round(user.rating / 100) * 100 : 1000;
      const candidates = problems.filter(
        (p) =>
          p.rating &&
          p.rating >= base &&
          p.rating <= base + 200 &&
          !solved.has(`${p.contestId}-${p.index}`)
      );
      const shuffled = [...candidates].sort(() => Math.random() - 0.5);
      setRecommendations(shuffled.slice(0, 6));
    } catch (e) {
      setRecommendations([]);
    }
    setLoading(false);
  };

  return (
    <div className="recommendations-section">
      <div className="recommendations-header">
        <span className="recommendations-icon">💡</span>
        <h3 className="recommendations-title">Practice Recommendations</h3>
        <button className="recs-button" onClick={fetchRecommendations} disabled={loading}>
          {loading ? "Finding..." : "Get Problems"}
        </button>
      </div>
      {recommendations && recommendations.length > 0 && (
        <div className="recommendations-grid">
          {recommendations.map((p) => (
            <RecommendationCard key={`${p.contestId}-${p.index}`} problem={p} />
          ))}
        </div>
      )}
      {recommendations && recommendations.length === 0 && (
        <p className="recs-empty">No matching unsolved problems found nearby your rating.</p>
      )}
    </div>
  );
}
