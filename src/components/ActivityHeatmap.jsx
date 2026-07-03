import { useState, useEffect } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import {
  getAvailableYears,
  getHeatmapData,
  getTotalSubmissionsForYear,
} from "../utils/dateUtils";
import "./ActivityHeatmap.css";

export default function ActivityHeatmap({ submissions }) {
  const availableYears = getAvailableYears(submissions);
  const [selectedYear, setSelectedYear] = useState(
    availableYears[0] || new Date().getFullYear()
  );

  useEffect(() => {
    if (availableYears.length === 0) return;
    const currentYear = new Date().getFullYear();
    setSelectedYear(
      availableYears.includes(currentYear) ? currentYear : availableYears[0]
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submissions]);

  if (!submissions || availableYears.length === 0) return null;

  return (
    <div className="heatmap-container">
      <div className="heatmap-header-wrapper">
        <div className="heatmap-header">
          <span className="heatmap-icon">🔥</span>
          <h3 className="heatmap-title">Submission Activity</h3>
        </div>
        <div className="year-selector">
          <label htmlFor="year-select" className="year-label">Year:</label>
          <select
            id="year-select"
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            className="year-dropdown"
          >
            {availableYears.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
          <span className="year-stats">
            {getTotalSubmissionsForYear(submissions, selectedYear)} submissions
          </span>
        </div>
      </div>
      <div className="heatmap-wrapper">
        <CalendarHeatmap
          startDate={new Date(selectedYear, 0, 1)}
          endDate={new Date(selectedYear, 11, 31)}
          values={getHeatmapData(submissions, selectedYear)}
          classForValue={(value) => {
            if (!value) return "color-empty";
            if (value.count < 3) return "color-scale-1";
            if (value.count < 6) return "color-scale-2";
            if (value.count < 10) return "color-scale-3";
            return "color-scale-4";
          }}
          tooltipDataAttrs={(value) => {
            if (!value || !value.date) return null;
            return { "data-tip": `${value.date}: ${value.count || 0} submissions` };
          }}
          showWeekdayLabels={true}
        />
      </div>
      <div className="heatmap-legend">
        <span className="legend-text">Less</span>
        <div className="legend-box color-empty"></div>
        <div className="legend-box color-scale-1"></div>
        <div className="legend-box color-scale-2"></div>
        <div className="legend-box color-scale-3"></div>
        <div className="legend-box color-scale-4"></div>
        <span className="legend-text">More</span>
      </div>
    </div>
  );
}
