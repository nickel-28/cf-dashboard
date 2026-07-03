import { formatCountdown } from "../utils/dateUtils";
import "./UpcomingContests.css";

export default function UpcomingContests({ contests, now }) {
  if (!contests || contests.length === 0) return null;

  return (
    <div className="contests-widget">
      <div className="contests-widget-header">
        <span className="contests-icon">📅</span>
        <h3 className="contests-widget-title">Upcoming Contests</h3>
      </div>
      <div className="contests-list">
        {contests.map((c) => (
          <div key={c.id} className="contest-item">
            <div className="contest-item-info">
              <p className="contest-item-name">{c.name}</p>
              <p className="contest-item-time">
                {new Date(c.startTimeSeconds * 1000).toLocaleString()}
              </p>
            </div>
            <div className="contest-countdown">
              {formatCountdown(c.startTimeSeconds, now)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
