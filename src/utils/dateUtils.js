export function getSolvedSet(submissions) {
  const set = new Set();
  if (!submissions) return set;
  submissions.forEach((s) => {
    if (s.verdict === "OK") set.add(`${s.problem.contestId}-${s.problem.index}`);
  });
  return set;
}

export function getAvailableYears(submissions) {
  const years = new Set();
  (submissions || []).forEach((sub) => {
    const date = new Date(sub.creationTimeSeconds * 1000);
    years.add(date.getFullYear());
  });
  return Array.from(years).sort((a, b) => b - a);
}

export function getHeatmapData(submissions, selectedYear) {
  if (!submissions) return [];

  const submissionsByDate = {};
  const startDate = new Date(selectedYear, 0, 1);
  const endDate = new Date(selectedYear, 11, 31);

  submissions.forEach((sub) => {
    if (sub.verdict === "OK") {
      const date = new Date(sub.creationTimeSeconds * 1000);
      if (date >= startDate && date <= endDate) {
        const dateStr = date.toISOString().split("T")[0];
        submissionsByDate[dateStr] = (submissionsByDate[dateStr] || 0) + 1;
      }
    }
  });

  return Object.keys(submissionsByDate).map((date) => ({
    date,
    count: submissionsByDate[date],
  }));
}

export function getTotalSubmissionsForYear(submissions, selectedYear) {
  if (!submissions) return 0;
  const startDate = new Date(selectedYear, 0, 1);
  const endDate = new Date(selectedYear, 11, 31);

  return submissions.filter((sub) => {
    if (sub.verdict === "OK") {
      const date = new Date(sub.creationTimeSeconds * 1000);
      return date >= startDate && date <= endDate;
    }
    return false;
  }).length;
}

export function getStreaks(submissions) {
  if (!submissions || submissions.length === 0) return { current: 0, longest: 0 };
  const dateSet = new Set();
  submissions.forEach((s) => {
    if (s.verdict === "OK") {
      const d = new Date(s.creationTimeSeconds * 1000);
      dateSet.add(d.toISOString().split("T")[0]);
    }
  });
  const dates = Array.from(dateSet).sort();
  if (dates.length === 0) return { current: 0, longest: 0 };

  let longest = 1;
  let run = 1;
  for (let i = 1; i < dates.length; i++) {
    const diffDays = Math.round(
      (new Date(dates[i]) - new Date(dates[i - 1])) / 86400000
    );
    if (diffDays === 1) {
      run += 1;
    } else {
      longest = Math.max(longest, run);
      run = 1;
    }
  }
  longest = Math.max(longest, run);

  const todayStr = new Date().toISOString().split("T")[0];
  const yesterdayStr = new Date(Date.now() - 86400000).toISOString().split("T")[0];
  let current = 0;
  if (dateSet.has(todayStr) || dateSet.has(yesterdayStr)) {
    let cursor = dateSet.has(todayStr) ? new Date() : new Date(Date.now() - 86400000);
    while (dateSet.has(cursor.toISOString().split("T")[0])) {
      current += 1;
      cursor = new Date(cursor.getTime() - 86400000);
    }
  }

  return { current, longest };
}

export function formatCountdown(startTimeSeconds, now) {
  const diff = startTimeSeconds * 1000 - now;
  if (diff <= 0) return "Started";
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  const secs = Math.floor((diff % 60000) / 1000);
  return `${days}d ${hours}h ${mins}m ${secs}s`;
}
