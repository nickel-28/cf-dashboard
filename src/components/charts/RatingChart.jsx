import { Line } from "react-chartjs-2";
import { getRatingChartData } from "../../utils/chartDataUtils";
import { buildRatingChartOptions } from "../../utils/chartOptions";

export default function RatingChart({ ratingHistory }) {
  if (!ratingHistory || ratingHistory.length === 0) return null;

  const data = getRatingChartData(ratingHistory);
  const options = buildRatingChartOptions(ratingHistory);
  const changes = ratingHistory.map((c) => c.newRating - c.oldRating);

  return (
    <div className="chart-container">
      <div className="chart-header">
        <span className="chart-icon">📊</span>
        <h3 className="chart-title">Rating History</h3>
      </div>
      <div className="chart-wrapper">
        <Line data={data} options={options} />
      </div>
      <div className="chart-stats">
        <div className="chart-stat">
          <span className="chart-stat-label">Total Contests</span>
          <span className="chart-stat-value">{ratingHistory.length}</span>
        </div>
        <div className="chart-stat">
          <span className="chart-stat-label">Best Performance</span>
          <span className="chart-stat-value">+{Math.max(...changes)}</span>
        </div>
        <div className="chart-stat">
          <span className="chart-stat-label">Worst Performance</span>
          <span className="chart-stat-value">{Math.min(...changes)}</span>
        </div>
      </div>
    </div>
  );
}
