export const baseDoughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom",
      labels: { color: "#9ca3af", padding: 10, font: { size: 11 } },
    },
    tooltip: {
      backgroundColor: "rgba(17, 24, 39, 0.9)",
      titleColor: "#fff",
      bodyColor: "#60a5fa",
      borderColor: "#374151",
      borderWidth: 1,
      padding: 12,
    },
  },
};

export const tagBarOptions = {
  indexAxis: "y",
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: "rgba(17, 24, 39, 0.9)",
      titleColor: "#fff",
      bodyColor: "#60a5fa",
      borderColor: "#374151",
      borderWidth: 1,
      padding: 10,
    },
  },
  scales: {
    x: {
      grid: { color: "rgba(55, 65, 81, 0.3)" },
      ticks: { color: "#9ca3af" },
    },
    y: {
      grid: { display: false },
      ticks: { color: "#9ca3af", font: { size: 11 } },
    },
  },
};

export function buildRatingChartOptions(ratingHistory) {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "rgba(17, 24, 39, 0.9)",
        titleColor: "#fff",
        bodyColor: "#60a5fa",
        borderColor: "#374151",
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          title: function (context) {
            if (!ratingHistory) return "";
            return ratingHistory[context[0].dataIndex].contestName;
          },
          label: function (context) {
            return `Rating: ${context.parsed.y}`;
          },
          afterLabel: function (context) {
            if (!ratingHistory) return "";
            const contest = ratingHistory[context.dataIndex];
            const change = contest.newRating - contest.oldRating;
            return `Change: ${change > 0 ? "+" : ""}${change}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: { color: "rgba(55, 65, 81, 0.3)" },
        ticks: { color: "#9ca3af", maxTicksLimit: 10 },
      },
      y: {
        grid: { color: "rgba(55, 65, 81, 0.3)" },
        ticks: { color: "#9ca3af" },
      },
    },
  };
}

export function buildCompareChartOptions(baseOptions) {
  return {
    ...baseOptions,
    plugins: {
      ...baseOptions.plugins,
      legend: {
        display: true,
        labels: { color: "#9ca3af" },
      },
      tooltip: {
        backgroundColor: "rgba(17, 24, 39, 0.9)",
        titleColor: "#fff",
        bodyColor: "#60a5fa",
        borderColor: "#374151",
        borderWidth: 1,
        padding: 12,
      },
    },
  };
}
