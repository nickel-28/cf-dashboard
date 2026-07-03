import { Line } from "react-chartjs-2";
import { getComparisonChartData } from "../utils/chartDataUtils";
import { buildRatingChartOptions, buildCompareChartOptions } from "../utils/chartOptions";

export default function CompareChart({ user, ratingHistory, compareUser, compareRatingHistory }) {
  const data = getComparisonChartData(user, ratingHistory, compareUser, compareRatingHistory);
  if (!data) return null;

  const options = buildCompareChartOptions(buildRatingChartOptions(ratingHistory));

  return (
    <div className="compare-chart-wrapper">
      <Line data={data} options={options} />
    </div>
  );
}
