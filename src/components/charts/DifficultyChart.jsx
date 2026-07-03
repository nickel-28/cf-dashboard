import { Doughnut } from "react-chartjs-2";
import { getDifficultyBreakdownData } from "../../utils/chartDataUtils";
import { baseDoughnutOptions } from "../../utils/chartOptions";

export default function DifficultyChart({ submissions }) {
  const data = getDifficultyBreakdownData(submissions);
  if (!data) return null;

  return (
    <div className="difficulty-container">
      <div className="difficulty-header">
        <span className="difficulty-icon">🎯</span>
        <h3 className="difficulty-title">Problem Difficulty Breakdown</h3>
      </div>
      <div className="difficulty-wrapper">
        <Doughnut data={data} options={baseDoughnutOptions} />
      </div>
    </div>
  );
}
