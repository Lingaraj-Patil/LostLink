import React, { useEffect, useState } from "react";
import { fetchFoundItems } from "../api";
import LostItemList from "../components/LostItemList"; // same UI
import SearchBar from "../components/SearchBar";

export default function FoundList() {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchFoundItems().then((res) => setItems(res.data));
  }, []);

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-2xl font-bold p-4">Found Items</h1>
      <SearchBar query={query} setQuery={setQuery} />
      <LostItemList items={filteredItems} />
    </div>
  );
}


// import React, { useEffect, useState } from 'react';
// import { fetchFoundItems } from '../api';
// import LostItemList from '../components/LostItemList'; // reuse same UI

// export default function FoundList() {
//   const [items, setItems] = useState([]);

//   useEffect(() => {
//     fetchFoundItems().then((res) => setItems(res.data));
//   }, []);

//   return (
//     <div>
//       <h1 className="text-2xl font-bold p-4">Found Items</h1>
//       <LostItemList items={items} />
//     </div>
//   );
// }
