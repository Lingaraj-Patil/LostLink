import React, { useState } from 'react';
import { createLostItem } from '../api';

export default function LostItemForm({ onItemAdded }) {
  const [form, setForm] = useState({
    name: '',
    description: '',
    category: '',
    contact: ''
  });
  const [coords, setCoords] = useState({ latitude: '', longitude: '' });
  const [image, setImage] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleFileChange = (e) => setImage(e.target.files[0]);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => setCoords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }),
        (err) => alert('Location access denied!')
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('description', form.description);
    formData.append('category', form.category);
    formData.append('contact', form.contact);
    formData.append('latitude', coords.latitude);
    formData.append('longitude', coords.longitude);
    if (image) formData.append('image', image);

    const res = await createLostItem(formData);
    onItemAdded(res.data);
    setForm({ name: '', description: '', category: '', contact: '' });
    setCoords({ latitude: '', longitude: '' });
    setImage(null);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded space-y-3 max-w-md mx-auto">
      <input type="text" name="name" placeholder="Item Name" value={form.name} onChange={handleChange} className="border p-2 w-full rounded" required />
      <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="border p-2 w-full rounded" />
      <input type="text" name="category" placeholder="Category (e.g. 📱, 🎒)" value={form.category} onChange={handleChange} className="border p-2 w-full rounded" />
      <input type="text" name="contact" placeholder="Contact Info" value={form.contact} onChange={handleChange} className="border p-2 w-full rounded" required />
      <button type="button" onClick={getLocation} className="bg-gray-200 px-3 py-1 rounded">📍 Get Current Location</button>
      {coords.latitude && <p className="text-sm text-gray-500">Lat: {coords.latitude}, Lng: {coords.longitude}</p>}
      <input type="file" onChange={handleFileChange} className="w-full" />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
    </form>
  );
}
