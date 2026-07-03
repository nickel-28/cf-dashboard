import { useState } from "react";
import { fetchUserInfo, fetchUserRating } from "../api/codeforcesApi";
import SearchBar from "./SearchBar";
import CompareTable from "./CompareTable";
import CompareChart from "./CompareChart";
import "./CompareSection.css";

export default function CompareSection({ user, ratingHistory }) {
  const [showCompare, setShowCompare] = useState(false);
  const [compareHandle, setCompareHandle] = useState("");
  const [compareUser, setCompareUser] = useState(null);
  const [compareRatingHistory, setCompareRatingHistory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchCompareUser = async () => {
    if (!compareHandle.trim()) return;
    setLoading(true);
    setError("");
    setCompareUser(null);
    setCompareRatingHistory(null);
    try {
      const info = await fetchUserInfo(compareHandle);
      setCompareUser(info);

      const rating = await fetchUserRating(compareHandle);
      setCompareRatingHistory(rating);
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  };

  return (
    <div className="compare-section">
      <button className="compare-toggle-button" onClick={() => setShowCompare((s) => !s)}>
        {showCompare ? "Hide Comparison" : "⚔️ Compare with Another Handle"}
      </button>

      {showCompare && (
        <div className="compare-content">
          <SearchBar
            value={compareHandle}
            onChange={setCompareHandle}
            onSubmit={fetchCompareUser}
            loading={loading}
            placeholder="Enter handle to compare..."
            buttonLabel={loading ? "Loading..." : "Compare"}
          />

          {error && <p className="inline-error">{error}</p>}

          {compareUser && (
            <>
              <CompareTable user={user} compareUser={compareUser} />
              <CompareChart
                user={user}
                ratingHistory={ratingHistory}
                compareUser={compareUser}
                compareRatingHistory={compareRatingHistory}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
}
