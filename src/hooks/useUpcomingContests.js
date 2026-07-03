import { useState, useEffect } from "react";
import { fetchUpcomingContests } from "../api/codeforcesApi";

export function useUpcomingContests(limit = 5) {
  const [contests, setContests] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        const upcoming = await fetchUpcomingContests(limit);
        if (isMounted) setContests(upcoming);
      } catch (e) {
        // non-critical, fail silently
      }
    };
    load();
    return () => {
      isMounted = false;
    };
  }, [limit]);

  return contests;
}
