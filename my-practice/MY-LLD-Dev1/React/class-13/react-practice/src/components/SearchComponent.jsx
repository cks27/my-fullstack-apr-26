import { useEffect, useState, useRef } from "react";

const dataList = [
  { id: 1, name: "Apple", category: "Fruit", emoji: "🍎" },
  { id: 2, name: "Banana", category: "Fruit", emoji: "🍌" },
  { id: 3, name: "Cherry", category: "Fruit", emoji: "🍒" },
  { id: 4, name: "Date", category: "Fruit", emoji: "📅" },
  { id: 5, name: "Elderberry", category: "Fruit", emoji: "🫐" },
  { id: 6, name: "Fig", category: "Fruit", emoji: "🫚" },
  { id: 7, name: "Grape", category: "Fruit", emoji: "🍇" },
  { id: 8, name: "Honeydew", category: "Fruit", emoji: "🍈" }
];

function SearchComponent() {
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState(dataList);
  const inputRef = useRef(null);

  useEffect(() => {
    const filtered = dataList.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
  }, [query]);

  const handleClear = () => {
    setQuery("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="search-card">
      <div className="search-input-container">
        <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search items..."
          className="search-input"
        />
        {query && (
          <button className="clear-btn" onClick={handleClear} aria-label="Clear search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      <div className="search-results-container">
        <div className="results-header">
          <span>Results ({filteredData.length})</span>
        </div>
        {filteredData.length > 0 ? (
          <ul className="results-list">
            {filteredData.map((item) => (
              <li key={item.id} className="result-item">
                <span className="item-emoji">{item.emoji}</span>
                <div className="item-details">
                  <span className="item-name">{item.name}</span>
                  <span className="item-category">{item.category}</span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="no-results">
            <svg className="no-results-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="8" y1="12" x2="16" y2="12" />
            </svg>
            <p>No items match your search</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchComponent;

