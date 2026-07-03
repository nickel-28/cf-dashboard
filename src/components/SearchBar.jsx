import "./SearchBar.css";

export default function SearchBar({
  value,
  onChange,
  onSubmit,
  loading,
  placeholder = "Enter Codeforces handle...",
  buttonLabel,
}) {
  return (
    <div className="search-wrapper">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && onSubmit()}
        className="search-input"
      />
      {buttonLabel ? (
        <button
          onClick={onSubmit}
          disabled={loading || !value.trim()}
          className="search-text-button"
        >
          {buttonLabel}
        </button>
      ) : (
        <button
          onClick={onSubmit}
          disabled={loading || !value.trim()}
          className="search-button"
        >
          <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
