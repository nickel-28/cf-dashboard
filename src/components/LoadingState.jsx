import "./LoadingState.css";

export default function LoadingState({ message = "Loading profile..." }) {
  return (
    <div className="loading-container">
      <div className="spinner" />
      <p className="loading-text">{message}</p>
    </div>
  );
}
