import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddVehicle from "./pages/AddVehicle";
import SearchAndBook from "./pages/SearchAndBook";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BookingList from "./pages/BookingList";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-vehicle" element={<AddVehicle />} />
          <Route path="/search-book" element={<SearchAndBook />} />
          <Route path="/bookings" element={<BookingList />} />
        </Routes>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </BrowserRouter>
  );
};

export default App;
