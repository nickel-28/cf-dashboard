import { getRankColorClass } from "../utils/rankUtils";

export default function CompareTable({ user, compareUser }) {
  return (
    <table className="compare-table">
      <thead>
        <tr>
          <th></th>
          <th>{user.handle}</th>
          <th>{compareUser.handle}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Rank</td>
          <td className={getRankColorClass(user.rank)}>{user.rank || "Unrated"}</td>
          <td className={getRankColorClass(compareUser.rank)}>{compareUser.rank || "Unrated"}</td>
        </tr>
        <tr>
          <td>Rating</td>
          <td>{user.rating || "N/A"}</td>
          <td>{compareUser.rating || "N/A"}</td>
        </tr>
        <tr>
          <td>Max Rating</td>
          <td>{user.maxRating || "N/A"}</td>
          <td>{compareUser.maxRating || "N/A"}</td>
        </tr>
        <tr>
          <td>Contribution</td>
          <td>{user.contribution || 0}</td>
          <td>{compareUser.contribution || 0}</td>
        </tr>
        <tr>
          <td>Friends</td>
          <td>{user.friendOfCount || 0}</td>
          <td>{compareUser.friendOfCount || 0}</td>
        </tr>
      </tbody>
    </table>
  );
}
