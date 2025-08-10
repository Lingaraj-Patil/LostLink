import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function ItemDetail() {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    // Dummy API call
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((res) => res.json())
      .then((data) => setItem(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!item) return <p>Loading tracking info...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>📍 Tracking Details for Item #{id}</h1>
      <h2>{item.title}</h2>
      <p>{item.body}</p>

      {/* Simulated tracking updates */}
      <div style={{ marginTop: "20px", border: "1px solid #ddd", padding: "10px" }}>
        <h3>🚚 Tracking Status</h3>
        <ul>
          <li>Order placed ✅</li>
          <li>Shipped 📦</li>
          <li>In transit 🚛</li>
          <li>Out for delivery 🛵</li>
        </ul>
      </div>

      <Link to="/">
        <button style={{ marginTop: "20px" }}>⬅ Back to Items</button>
      </Link>
    </div>
  );
}

export default ItemDetail;
