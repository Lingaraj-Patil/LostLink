import React, { useState } from "react";
import LostItemForm from "../components/LostItemForm";
import { toast } from "react-toastify";

export default function AddLostItem() {
  const [items, setItems] = useState([]);

  const handleItemAdded = (item) => {
    setItems([...items, item]);
    toast.success("✅ Lost item reported successfully!");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold p-4">Report Lost Item</h1>
      <LostItemForm onItemAdded={handleItemAdded} />
    </div>
  );
}


// import React, { useState } from 'react';
// import LostItemForm from '../components/LostItemForm';

// export default function AddLostItem() {
//   const [items, setItems] = useState([]);

//   return (
//     <div>
//       <h1 className="text-2xl font-bold p-4">Report Lost Item</h1>
//       <LostItemForm onItemAdded={(item) => setItems([...items, item])} />
//     </div>
//   );
// }
