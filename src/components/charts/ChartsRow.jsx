import DifficultyChart from "./DifficultyChart";
import RatingChart from "./RatingChart";
import "./ChartsRow.css";

export default function ChartsRow({ submissions, ratingHistory }) {
  return (
    <div className="charts-row">
      <DifficultyChart submissions={submissions} />
      <RatingChart ratingHistory={ratingHistory} />
    </div>
  );
}
