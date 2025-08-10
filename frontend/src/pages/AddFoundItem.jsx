import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AddFoundItem = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [contact, setContact] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("contact", contact);
      formData.append("location", location);
      if (image) formData.append("image", image);

      const res = await axios.post("http://localhost:5000/api/found", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success(res.data.message || "Found item reported successfully!");
      setName("");
      setDescription("");
      setLocation("");
      setContact("");
      setImage(null);
    } catch (error) {
      console.error(error);
      toast.error("Error reporting found item");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Report Found Item</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <input
          type="text"
          placeholder="Item Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded"
          required
        />

        {/* Description */}
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded"
          rows="3"
          required
        ></textarea>

        {/* Location */}
        <input
          type="text"
          placeholder="Location Found"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded"
          required
        />

        {/* Contact */}
        <input
          type="text"
          placeholder="Your Contact Info"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded"
          required
        />

        {/* Image */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full border border-gray-300 p-2 rounded"
        />

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddFoundItem;


// import React, { useState } from "react";
// import axios from "axios";

// const AddFoundItem = () => {
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [location, setLocation] = useState("");
//   const [contact, setContact] = useState("");
//   const [image, setImage] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const formData = new FormData();
//       formData.append("name", name); // matches schema
//       formData.append("description", description);
//       formData.append("contact", contact); // required
//       formData.append("location", location); // optional if your backend parses it into lat/long
//       if (image) formData.append("image", image);

//       const res = await axios.post("http://localhost:5000/api/found", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       alert(res.data.message || "Found item reported successfully!");
//       setName("");
//       setDescription("");
//       setLocation("");
//       setContact("");
//       setImage(null);
//     } catch (error) {
//       console.error(error);
//       alert("Error reporting found item");
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
//       <h2 className="text-2xl font-bold mb-4 text-center">Report Found Item</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Name */}
//         <input
//           type="text"
//           placeholder="Item Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           className="w-full border border-gray-300 p-2 rounded"
//           required
//         />

//         {/* Description */}
//         <textarea
//           placeholder="Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           className="w-full border border-gray-300 p-2 rounded"
//           rows="3"
//           required
//         ></textarea>

//         {/* Location */}
//         <input
//           type="text"
//           placeholder="Location Found"
//           value={location}
//           onChange={(e) => setLocation(e.target.value)}
//           className="w-full border border-gray-300 p-2 rounded"
//           required
//         />

//         {/* Contact */}
//         <input
//           type="text"
//           placeholder="Your Contact Info"
//           value={contact}
//           onChange={(e) => setContact(e.target.value)}
//           className="w-full border border-gray-300 p-2 rounded"
//           required
//         />

//         {/* Image */}
//         <input
//           type="file"
//           accept="image/*"
//           onChange={(e) => setImage(e.target.files[0])}
//           className="w-full border border-gray-300 p-2 rounded"
//         />

//         {/* Submit */}
//         <button
//           type="submit"
//           className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddFoundItem;
