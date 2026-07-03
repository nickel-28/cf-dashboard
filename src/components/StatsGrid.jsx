import StatCard from "./StatCard";
import { getStreaks } from "../utils/dateUtils";
import "./StatsGrid.css";

export default function StatsGrid({ user, submissions }) {
  const streaks = submissions ? getStreaks(submissions) : null;

  return (
    <div className="stats-grid">
      <StatCard
        icon="📈"
        label="Current Rating"
        value={user.rating || "N/A"}
        colorVariant="blue"
      />
      <StatCard
        icon="🏆"
        label="Max Rating"
        value={user.maxRating || "N/A"}
        subtext={user.maxRank || "Unrated"}
        colorVariant="purple"
      />
      <StatCard
        icon="⭐"
        label="Contribution"
        value={`${user.contribution >= 0 ? "+" : ""}${user.contribution || 0}`}
        colorVariant="green"
      />
      <StatCard
        icon="👥"
        label="Friends"
        value={user.friendOfCount || 0}
        colorVariant="orange"
      />
      {streaks && (
        <>
          <StatCard
            icon="🔥"
            label="Current Streak"
            value={`${streaks.current} days`}
            colorVariant="blue"
          />
          <StatCard
            icon="⚡"
            label="Longest Streak"
            value={`${streaks.longest} days`}
            colorVariant="purple"
          />
        </>
      )}
    </div>
  );
}
