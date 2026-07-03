import { Doughnut } from "react-chartjs-2";
import { getVerdictBreakdownData } from "../../utils/chartDataUtils";
import { baseDoughnutOptions } from "../../utils/chartOptions";

export default function VerdictChart({ submissions }) {
  const data = getVerdictBreakdownData(submissions);
  if (!data) return null;

  return (
    <div className="insight-container">
      <div className="insight-header">
        <span className="insight-icon">✅</span>
        <h3 className="insight-title">Verdict Breakdown</h3>
      </div>
      <div className="insight-wrapper">
        <Doughnut data={data} options={baseDoughnutOptions} />
      </div>
    </div>
  );
}
