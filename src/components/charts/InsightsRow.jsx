import TagChart from "./TagChart";
import VerdictChart from "./VerdictChart";
import LanguageChart from "./LanguageChart";
import "./InsightsRow.css";

export default function InsightsRow({ submissions }) {
  if (!submissions) return null;

  return (
    <div className="insights-row">
      <TagChart submissions={submissions} />
      <VerdictChart submissions={submissions} />
      <LanguageChart submissions={submissions} />
    </div>
  );
}
