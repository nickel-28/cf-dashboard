import { getRankColorClass } from "../utils/rankUtils";
import "./ProfileHeader.css";

export default function ProfileHeader({ user }) {
  return (
    <div className="profile-header">
      <img src={user.titlePhoto} alt="profile" className="profile-image" />
      <div className="profile-info">
        <h2 className="profile-handle">
          <span className="user-icon">👤</span>
          {user.handle}
        </h2>
        <div className="profile-badges">
          <span className={`rank-badge ${getRankColorClass(user.rank)}`}>
            {user.rank || "Unrated"}
          </span>
          {user.country && (
            <span className="country-badge">📍 {user.country}</span>
          )}
        </div>
      </div>
    </div>
  );
}
