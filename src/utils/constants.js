export const VERDICT_LABELS = {
  OK: "Accepted",
  WRONG_ANSWER: "Wrong Answer",
  TIME_LIMIT_EXCEEDED: "Time Limit Exceeded",
  RUNTIME_ERROR: "Runtime Error",
  COMPILATION_ERROR: "Compilation Error",
  MEMORY_LIMIT_EXCEEDED: "Memory Limit Exceeded",
  PRESENTATION_ERROR: "Presentation Error",
  IDLENESS_LIMIT_EXCEEDED: "Idleness Limit Exceeded",
  SECURITY_VIOLATED: "Security Violated",
  CRASHED: "Crashed",
  CHALLENGED: "Hacked",
  SKIPPED: "Skipped",
  REJECTED: "Rejected",
  PARTIAL: "Partial",
  FAILED: "Failed",
};

export const VERDICT_COLORS = {
  OK: "#4ade80",
  WRONG_ANSWER: "#f87171",
  TIME_LIMIT_EXCEEDED: "#fb923c",
  RUNTIME_ERROR: "#f472b6",
  COMPILATION_ERROR: "#c084fc",
  MEMORY_LIMIT_EXCEEDED: "#facc15",
  CHALLENGED: "#a78bfa",
  SKIPPED: "#9ca3af",
  REJECTED: "#9ca3af",
  PARTIAL: "#22d3ee",
  PRESENTATION_ERROR: "#fb7185",
  IDLENESS_LIMIT_EXCEEDED: "#94a3b8",
  SECURITY_VIOLATED: "#ef4444",
  CRASHED: "#dc2626",
  FAILED: "#9ca3af",
};

export const LANGUAGE_COLORS = [
  "#60a5fa", "#a78bfa", "#4ade80", "#fb923c",
  "#f472b6", "#22d3ee", "#facc15", "#f87171",
];

export const DIFFICULTY_COLORS = [
  "#4ade80", "#22d3ee", "#60a5fa", "#a78bfa",
  "#c084fc", "#f472b6", "#fb923c", "#f87171",
];

export const RANK_CLASS_MAP = {
  newbie: "rank-newbie",
  pupil: "rank-pupil",
  specialist: "rank-specialist",
  expert: "rank-expert",
  "candidate master": "rank-candidate-master",
  master: "rank-master",
  "international master": "rank-international-master",
  grandmaster: "rank-grandmaster",
  "international grandmaster": "rank-international-grandmaster",
  "legendary grandmaster": "rank-legendary-grandmaster",
};
