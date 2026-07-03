import { Bar } from "react-chartjs-2";
import { getTagBreakdownData } from "../../utils/chartDataUtils";
import { tagBarOptions } from "../../utils/chartOptions";

export default function TagChart({ submissions }) {
  const data = getTagBreakdownData(submissions);
  if (!data) return null;

  return (
    <div className="insight-container">
      <div className="insight-header">
        <span className="insight-icon">🏷️</span>
        <h3 className="insight-title">Top Tags Solved</h3>
      </div>
      <div className="insight-wrapper insight-wrapper-tall">
        <Bar data={data} options={tagBarOptions} />
      </div>
    </div>
  );
}
