import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import AddLostItem from './pages/AddLostItem';
import FoundList from './pages/FoundList';
import AddFoundItem from './pages/AddFoundItem';
import { ToastContainer } from 'react-toastify';

// New imports
import ItemList from './components/ItemList';
import ItemDetail from './components/ItemDetail';

function App() {
  return (
    <Router>
      <nav className="bg-gray-800 text-white p-3 flex gap-4">
        <Link to="/">Lost Items</Link>
        <Link to="/add">Report Lost Item</Link>
        <Link to="/found">Found Items</Link>
        <Link to="/found/add">Report Found Item</Link>
        {/* New navigation link for tracking */}
        <Link to="/track">Track Items</Link>
      </nav>
      <Routes>
        {/* Existing routes */}
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddLostItem />} />
        <Route path="/found" element={<FoundList />} />
        <Route path="/found/add" element={<AddFoundItem />} />

        {/* New routes for tracking feature */}
        <Route path="/track" element={<ItemList />} />
        <Route path="/track/:id" element={<ItemDetail />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
}

export default App;


// import React from 'react';
// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import Home from './pages/Home';
// import AddLostItem from './pages/AddLostItem';
// import FoundList from './pages/FoundList';
// import AddFoundItem from './pages/AddFoundItem';
// import { ToastContainer } from 'react-toastify';

// function App() {
//   return (
//     <Router>
//       <nav className="bg-gray-800 text-white p-3 flex gap-4">
//         <Link to="/">Lost Items</Link>
//         <Link to="/add">Report Lost Item</Link>
//         <Link to="/found">Found Items</Link>
//         <Link to="/found/add">Report Found Item</Link>
//       </nav>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/add" element={<AddLostItem />} />
//         <Route path="/found" element={<FoundList />} />
//         <Route path="/found/add" element={<AddFoundItem />} />
//       </Routes>
//       <ToastContainer  position="top-right" autoClose={3000} />
//     </Router>
    
//   );
// }

// export default App;
