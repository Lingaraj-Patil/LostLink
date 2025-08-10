import React, { useEffect, useState } from "react";
import { fetchLostItems } from "../api";
import LostItemList from "../components/LostItemList";
import SearchBar from "../components/SearchBar";

export default function Home() {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchLostItems().then((res) => setItems(res.data));
  }, []);

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-2xl font-bold p-4">Lost Items</h1>
      <SearchBar query={query} setQuery={setQuery} />
      <LostItemList items={filteredItems} />
    </div>
  );
}
