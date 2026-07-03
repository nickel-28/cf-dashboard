import {
  VERDICT_LABELS,
  VERDICT_COLORS,
  LANGUAGE_COLORS,
  DIFFICULTY_COLORS,
} from "./constants";

export function getRatingChartData(ratingHistory) {
  if (!ratingHistory || ratingHistory.length === 0) return null;

  const labels = ratingHistory.map((_, i) => `#${i + 1}`);
  const ratings = ratingHistory.map((c) => c.newRating);
  const changes = ratingHistory.map((c) => c.newRating - c.oldRating);
  const maxChange = Math.max(...changes);
  const minChange = Math.min(...changes);

  const pointColors = changes.map((ch) => {
    if (ch === maxChange && maxChange > 0) return "#4ade80";
    if (ch === minChange && minChange < 0) return "#f87171";
    return "#60a5fa";
  });
  const pointRadii = changes.map((ch) =>
    ch === maxChange || ch === minChange ? 7 : 3
  );

  return {
    labels,
    datasets: [
      {
        label: "Rating",
        data: ratings,
        borderColor: "#60a5fa",
        backgroundColor: "rgba(96, 165, 250, 0.1)",
        tension: 0.4,
        fill: true,
        pointRadius: pointRadii,
        pointHoverRadius: pointRadii.map((r) => r + 3),
        pointBackgroundColor: pointColors,
        pointBorderColor: "#1e3a8a",
        pointBorderWidth: 2,
      },
    ],
  };
}

export function getDifficultyBreakdownData(submissions) {
  if (!submissions) return null;

  const solvedProblems = new Set();
  const difficultyCount = {};

  submissions.forEach((sub) => {
    if (sub.verdict === "OK" && sub.problem.rating) {
      const problemId = `${sub.problem.contestId}-${sub.problem.index}`;
      if (!solvedProblems.has(problemId)) {
        solvedProblems.add(problemId);
        const rating = sub.problem.rating;
        difficultyCount[rating] = (difficultyCount[rating] || 0) + 1;
      }
    }
  });

  const sortedRatings = Object.keys(difficultyCount).sort((a, b) => a - b);
  if (sortedRatings.length === 0) return null;
  const counts = sortedRatings.map((rating) => difficultyCount[rating]);

  return {
    labels: sortedRatings,
    datasets: [
      {
        label: "Problems Solved",
        data: counts,
        backgroundColor: DIFFICULTY_COLORS,
        borderColor: "#1f2937",
        borderWidth: 2,
      },
    ],
  };
}

export function getTagBreakdownData(submissions) {
  if (!submissions || submissions.length === 0) return null;
  const solved = new Set();
  const tagCounts = {};

  submissions.forEach((s) => {
    if (s.verdict === "OK") {
      const id = `${s.problem.contestId}-${s.problem.index}`;
      if (!solved.has(id)) {
        solved.add(id);
        (s.problem.tags || []).forEach((tag) => {
          tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });
      }
    }
  });

  const entries = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);
  if (entries.length === 0) return null;

  return {
    labels: entries.map(([t]) => t),
    datasets: [
      {
        label: "Problems Solved",
        data: entries.map(([, c]) => c),
        backgroundColor: "rgba(96, 165, 250, 0.7)",
        borderColor: "#60a5fa",
        borderWidth: 1,
        borderRadius: 6,
      },
    ],
  };
}

export function getVerdictBreakdownData(submissions) {
  if (!submissions || submissions.length === 0) return null;
  const counts = {};
  submissions.forEach((s) => {
    const v = s.verdict || "UNKNOWN";
    counts[v] = (counts[v] || 0) + 1;
  });
  const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]);

  return {
    labels: entries.map(([v]) => VERDICT_LABELS[v] || v),
    datasets: [
      {
        data: entries.map(([, c]) => c),
        backgroundColor: entries.map(([v]) => VERDICT_COLORS[v] || "#6b7280"),
        borderColor: "#1f2937",
        borderWidth: 2,
      },
    ],
  };
}

export function getLanguageBreakdownData(submissions) {
  if (!submissions || submissions.length === 0) return null;
  const counts = {};
  submissions.forEach((s) => {
    const lang = s.programmingLanguage || "Unknown";
    counts[lang] = (counts[lang] || 0) + 1;
  });
  const entries = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);

  return {
    labels: entries.map(([l]) => l),
    datasets: [
      {
        data: entries.map(([, c]) => c),
        backgroundColor: LANGUAGE_COLORS,
        borderColor: "#1f2937",
        borderWidth: 2,
      },
    ],
  };
}

export function getComparisonChartData(user, ratingHistory, compareUser, compareRatingHistory) {
  if (!ratingHistory || !compareRatingHistory) return null;
  const maxLen = Math.max(ratingHistory.length, compareRatingHistory.length);
  const userData = Array.from({ length: maxLen }, (_, i) =>
    ratingHistory[i] ? ratingHistory[i].newRating : null
  );
  const compareData = Array.from({ length: maxLen }, (_, i) =>
    compareRatingHistory[i] ? compareRatingHistory[i].newRating : null
  );

  return {
    labels: Array.from({ length: maxLen }, (_, i) => `#${i + 1}`),
    datasets: [
      {
        label: user.handle,
        data: userData,
        borderColor: "#60a5fa",
        backgroundColor: "rgba(96,165,250,0.08)",
        tension: 0.4,
        pointRadius: 2,
        spanGaps: true,
      },
      {
        label: compareUser.handle,
        data: compareData,
        borderColor: "#fb923c",
        backgroundColor: "rgba(251,146,60,0.08)",
        tension: 0.4,
        pointRadius: 2,
        spanGaps: true,
      },
    ],
  };
}

export function getContestRows(ratingHistory, sortKey, sortDir) {
  if (!ratingHistory) return [];
  const rows = ratingHistory.map((c) => ({
    name: c.contestName,
    rank: c.rank,
    oldRating: c.oldRating,
    newRating: c.newRating,
    change: c.newRating - c.oldRating,
    date: c.ratingUpdateTimeSeconds,
  }));
  return [...rows].sort((a, b) => {
    let diff = 0;
    if (sortKey === "date") diff = a.date - b.date;
    else if (sortKey === "rank") diff = a.rank - b.rank;
    else if (sortKey === "change") diff = a.change - b.change;
    else if (sortKey === "name") diff = a.name.localeCompare(b.name);
    return sortDir === "asc" ? diff : -diff;
  });
}
