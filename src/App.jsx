import { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

import "./styles/theme.css";
import "./styles/rankColors.css";
import "./components/ProfileCard.css";
import Footer from "./components/Footer";

import { fetchUserInfo, fetchUserRating, fetchUserSubmissions } from "./api/codeforcesApi";
import { getAvailableYears } from "./utils/dateUtils";

import { useTheme } from "./hooks/useTheme";
import { useNow } from "./hooks/useNow";
import { useUpcomingContests } from "./hooks/useUpcomingContests";

import ThemeToggle from "./components/ThemeToggle";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import "./components/SearchBar.css";
import UpcomingContests from "./components/UpcomingContests";
import LoadingState from "./components/LoadingState";
import ErrorState from "./components/ErrorState";
import ProfileHeader from "./components/ProfileHeader";
import StatsGrid from "./components/StatsGrid";
import RankSection from "./components/RankSection";
import ActivityHeatmap from "./components/ActivityHeatmap";
import ChartsRow from "./components/charts/ChartsRow";
import InsightsRow from "./components/charts/InsightsRow";
import PracticeRecommendations from "./components/PracticeRecommendations";
import ContestTable from "./components/ContestTable";
import CompareSection from "./components/CompareSection";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function App() {
  const [theme, toggleTheme] = useTheme();
  const now = useNow();
  const upcomingContests = useUpcomingContests(5);

  const [handle, setHandle] = useState("");
  const [user, setUser] = useState(null);
  const [ratingHistory, setRatingHistory] = useState(null);
  const [submissions, setSubmissions] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchUser = async () => {
    if (!handle.trim()) return;

    setLoading(true);
    setError("");
    setUser(null);
    setRatingHistory(null);
    setSubmissions(null);

    try {
      const userInfo = await fetchUserInfo(handle);
      setUser(userInfo);

      const rating = await fetchUserRating(handle);
      setRatingHistory(rating);

      const subs = await fetchUserSubmissions(handle);
      setSubmissions(subs);
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <div className="app-container" data-theme={theme}>
      <ThemeToggle theme={theme} onToggle={toggleTheme} />

      <Header />

      <div className="search-container">
        <SearchBar
          value={handle}
          onChange={setHandle}
          onSubmit={fetchUser}
          loading={loading}
        />
      </div>

      <UpcomingContests contests={upcomingContests} now={now} />

      {loading && <LoadingState />}
      <ErrorState message={error} />

      {user && (
        <div className="profile-container">
          <div className="profile-card">
            <ProfileHeader user={user} />
            <StatsGrid user={user} submissions={submissions} />
            <RankSection handle={handle} user={user} />
            <ActivityHeatmap submissions={submissions} />
            <ChartsRow submissions={submissions} ratingHistory={ratingHistory} />
            <InsightsRow submissions={submissions} />
            <PracticeRecommendations user={user} submissions={submissions} />
            <ContestTable ratingHistory={ratingHistory} />
            <CompareSection user={user} ratingHistory={ratingHistory} />
          </div>
        </div>
      )}
      <Footer/>
    </div>
  );
}
