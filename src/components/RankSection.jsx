import { useState } from "react";
import { fetchActiveRatedList } from "../api/codeforcesApi";
import "./RankSection.css";

export default function RankSection({ handle, user }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const calculateRanks = async () => {
    setLoading(true);
    setError("");
    setData(null);
    try {
      const ratedList = await fetchActiveRatedList();
      const sorted = [...ratedList].sort((a, b) => b.rating - a.rating);
      const globalIndex = sorted.findIndex(
        (u) => u.handle.toLowerCase() === handle.toLowerCase()
      );

      let countryIndex = -1;
      let countryTotal = 0;
      if (user?.country) {
        const countryUsers = sorted.filter((u) => u.country === user.country);
        countryTotal = countryUsers.length;
        countryIndex = countryUsers.findIndex(
          (u) => u.handle.toLowerCase() === handle.toLowerCase()
        );
      }

      setData({
        global: globalIndex >= 0 ? globalIndex + 1 : null,
        globalTotal: sorted.length,
        country: countryIndex >= 0 ? countryIndex + 1 : null,
        countryTotal,
      });
    } catch (e) {
      setError(
        "Handle not in active rated list (inactive in last 6 months) or rank service unavailable."
      );
    }
    setLoading(false);
  };

  return (
    <div className="rank-section">
      <button className="rank-button" onClick={calculateRanks} disabled={loading}>
        {loading ? "Calculating..." : "🌍 Calculate Global & Country Rank"}
      </button>
      {error && <p className="inline-error">{error}</p>}
      {data && (
        <div className="rank-results">
          <div className="rank-result-card">
            <span className="rank-result-label">Global Rank</span>
            <span className="rank-result-value">
              {data.global ? `#${data.global}` : "N/A"}
            </span>
            <span className="rank-result-total">of {data.globalTotal} active</span>
          </div>
          <div className="rank-result-card">
            <span className="rank-result-label">
              Country Rank ({user.country || "N/A"})
            </span>
            <span className="rank-result-value">
              {data.country ? `#${data.country}` : "N/A"}
            </span>
            <span className="rank-result-total">of {data.countryTotal} active</span>
          </div>
        </div>
      )}
    </div>
  );
}
