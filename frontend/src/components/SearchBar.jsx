import React from "react";

export default function SearchBar({ query, setQuery }) {
  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="🔍 Search items..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full border border-gray-300 p-2 rounded"
      />
    </div>
  );
}
