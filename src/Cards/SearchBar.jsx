import React, { useEffect, useState } from "react";
import "../CSS/SearchBar.css";
import { Search, Star, ChevronLeft, ChevronRight } from "lucide-react";

export default function SearchBar({ placeholder = "Search cafes..." }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
  if (!query.trim()) {
    setResults([]);
    setTotalPages(0);
    return;
  }

  const delayDebounce = setTimeout(() => {
    fetch(`https://reviewbackend-990d.onrender.com/getcafe/search/${query}/${page}`)
      .then((res) => res.json())
      .then((data) => {
        setResults(data.content || []);
        setTotalPages(data.totalPages || 0);
      })
      .catch(console.error);
  }, 400); // 👈 debounce delay (ms)


  return () => clearTimeout(delayDebounce);
}, [query, page]);


  const handleSearch = (e) => {
    e.preventDefault();
    setPage(0); // reset page on new search
  };

  return (
    <div className="search-page">
      {/* Search Bar */}
      <form className="search-bar" onSubmit={handleSearch}>
        <div className="search-input-wrapper">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input"
          />
        </div>
        <button type="submit" className="search-btn">
          Search
        </button>
      </form>

      {/* Results */}
      {query && (
        <div className="search-results-page">
          {results.length === 0 ? (
            <div className="no-results">No cafes found</div>
          ) : (
            <>
              <div className="results-grid">
                {results.map((cafe) => (
                  <div key={cafe.id} className="result-card" onClick={() => window.location.href=`/card/${cafe.id}`}>
                    <img src={cafe.image} alt={cafe.name} />

                    <div className="card-content">
                      <h3>{cafe.name}</h3>
                      <p className="address">{cafe.address}</p>

                      <div className="rating">
                        <Star size={14} fill="#fbbf24" stroke="none" />
                        {cafe.rating.toFixed(1)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="pagination">
                  <button
                    disabled={page === 1}
                    onClick={() => setPage((p) => p - 1)}
                  >
                    <ChevronLeft size={18} />
                  </button>

                  <span>
                    Page {page} of {totalPages}
                  </span>

                  <button
                    disabled={page +1> totalPages}
                    onClick={() => setPage((p) => p + 1)}
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}