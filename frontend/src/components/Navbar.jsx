import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="p-4 bg-gray-800 sticky top-0 w-full text-white flex items-center justify-center gap-4">
        <Link
          to="/"
          className="hover:underline hover:-translate-y-1.25 duration-150 transition"
        >
          Home
        </Link>
        <Link
          to="/add-vehicle"
          className="hover:underline hover:-translate-y-1.25 duration-150 transition"
        >
          Add Vehicle
        </Link>
        <Link
          to="/search-book"
          className="hover:underline hover:-translate-y-1.25 duration-150 transition"
        >
          Search & Book
        </Link>
        <Link
          to="/bookings"
          className="hover:underline hover:-translate-y-1.25 duration-150 transition"
        >
          Bookings
        </Link>
      </nav>
    </>
  );
};

export default Navbar;
