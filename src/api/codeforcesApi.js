const BASE_URL = "https://codeforces.com/api";

async function getJson(url) {
  const res = await fetch(url);
  return res.json();
}

export async function fetchUserInfo(handle) {
  const data = await getJson(`${BASE_URL}/user.info?handles=${handle}`);
  if (data.status !== "OK") throw new Error("User not found");
  return data.result[0];
}

export async function fetchUserRating(handle) {
  const data = await getJson(`${BASE_URL}/user.rating?handle=${handle}`);
  return data.status === "OK" ? data.result : [];
}

export async function fetchUserSubmissions(handle) {
  const data = await getJson(
    `${BASE_URL}/user.status?handle=${handle}&from=1&count=10000`
  );
  return data.status === "OK" ? data.result : [];
}

export async function fetchUpcomingContests(limit = 5) {
  const data = await getJson(`${BASE_URL}/contest.list`);
  if (data.status !== "OK") return [];
  return data.result
    .filter((c) => c.phase === "BEFORE")
    .sort((a, b) => a.startTimeSeconds - b.startTimeSeconds)
    .slice(0, limit);
}

export async function fetchAllProblems() {
  const data = await getJson(`${BASE_URL}/problemset.problems`);
  if (data.status !== "OK") throw new Error("Could not fetch problem set");
  return data.result.problems;
}

export async function fetchActiveRatedList() {
  const data = await getJson(`${BASE_URL}/user.ratedList?activeOnly=true`);
  if (data.status !== "OK") throw new Error("Could not fetch rankings");
  return data.result;
}
