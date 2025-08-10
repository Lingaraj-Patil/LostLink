import React from 'react';

export default function LostItemList({ items }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 p-4">
      {items.map((item) => (
        <div key={item._id} className="border rounded shadow p-3 bg-white">
          {item.imageUrl && (
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-full h-48 object-cover rounded"
            />
          )}
          <h3 className="text-lg font-semibold mt-2">{item.name}</h3>
          <p>{item.description}</p>
          {item.category && (
            <p className="text-gray-500 text-sm">📂 {item.category}</p>
          )}
          {item.contact && (
            <p className="text-gray-500 text-sm">☎ {item.contact}</p>
          )}
          {item.latitude && item.longitude && (
            <p className="text-gray-500 text-sm">
              📍 Lat: {item.latitude}, Lng: {item.longitude}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
