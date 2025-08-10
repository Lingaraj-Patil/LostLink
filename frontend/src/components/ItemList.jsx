import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ItemList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Dummy API
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=5")
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>📦 Item List</h1>
      {items.map((item) => (
        <div
          key={item.id}
          style={{
            border: "1px solid #ddd",
            margin: "10px 0",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          <h3>{item.title}</h3>
          <p>{item.body.slice(0, 50)}...</p>
          <Link to={`/item/${item.id}`}>
            <button style={{ background: "#4caf50", color: "#fff", padding: "5px 10px" }}>
              Track Item
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default ItemList;
