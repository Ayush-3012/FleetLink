import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import AddVehicle from "./pages/AddVehicle";
import SearchAndBook from "./pages/SearchAndBook";
import Home from "./pages/Home";

const App = () => {
  return (
    <BrowserRouter>
      <nav className="p-4 bg-gray-800 text-white flex gap-4">
        <Link to="/add-vehicle">Add Vehicle</Link>
        <Link to="/search-book">Search & Book</Link>
      </nav>
      <div className="p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-vehicle" element={<AddVehicle />} />
          <Route path="/search-book" element={<SearchAndBook />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
