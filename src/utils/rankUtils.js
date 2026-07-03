import { RANK_CLASS_MAP } from "./constants";

export function getRankColorClass(rank) {
  return RANK_CLASS_MAP[rank?.toLowerCase()] || "rank-newbie";
}
