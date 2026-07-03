import "./ErrorState.css";

export default function ErrorState({ message }) {
  if (!message) return null;
  return (
    <div className="error-container">
      <p className="error-text">⚠️ {message}</p>
    </div>
  );
}
