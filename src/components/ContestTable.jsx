import { useState } from "react";
import { getContestRows } from "../utils/chartDataUtils";
import "./ContestTable.css";

export default function ContestTable({ ratingHistory }) {
  const [sortKey, setSortKey] = useState("date");
  const [sortDir, setSortDir] = useState("desc");

  if (!ratingHistory || ratingHistory.length === 0) return null;

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  const rows = getContestRows(ratingHistory, sortKey, sortDir);

  return (
    <div className="contest-table-section">
      <div className="contest-table-header">
        <span className="contest-table-icon">📋</span>
        <h3 className="contest-table-title">Contest Performance</h3>
      </div>
      <div className="contest-table-wrapper">
        <table className="contest-table">
          <thead>
            <tr>
              <th onClick={() => handleSort("name")}>Contest</th>
              <th onClick={() => handleSort("rank")}>Rank</th>
              <th>Old → New</th>
              <th onClick={() => handleSort("change")}>Change</th>
              <th onClick={() => handleSort("date")}>Date</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                <td className="contest-table-name">{row.name}</td>
                <td>{row.rank}</td>
                <td>{row.oldRating} → {row.newRating}</td>
                <td className={row.change >= 0 ? "change-positive" : "change-negative"}>
                  {row.change >= 0 ? "+" : ""}{row.change}
                </td>
                <td>{new Date(row.date * 1000).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
