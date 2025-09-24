import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getAvailableVehicles, createBooking } from "../services/api";
import VehicleList from "../components/VehicleList";
import { toast } from "react-toastify";

export default function SearchAndBook() {
  const [form, setForm] = useState({
    capacityRequired: "",
    fromPincode: "",
    toPincode: "",
    startTime: "",
  });
  const [vehicles, setVehicles] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await getAvailableVehicles(form);
      setVehicles(res.data);
      if (res.data.length === 0) setMessage("No vehicles available.");
    } catch (err) {
      console.log(err);
      setMessage("❌ Error fetching vehicles");
    }
    setLoading(false);
  };

  const handleBook = async (vehicleId) => {
    setLoading(true);
    setMessage("");
    try {
      const bookingData = {
        vehicleId,
        fromPincode: form.fromPincode,
        toPincode: form.toPincode,
        startTime: form.startTime,
        customerId: "cust123", // temp user Id for testing.
      };
      const res = await createBooking(bookingData);
      setMessage(
        `✅ Booking Confirmed! Duration: ${res.data.estimatedRideDurationHours} hours`
      );
      toast.success(
        `✅ Booking Confirmed! Duration: ${res.data.estimatedRideDurationHours} hours`
      );
      setVehicles(vehicles.filter((v) => v._id !== vehicleId));
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setMessage("❌ Vehicle already booked, please try another one");
        toast.error("❌ Vehicle already booked, please try another one");
      } else {
        setMessage("❌ Error creating booking");
        toast.error("❌ Error creating booking");
      }
    }
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-slate-100 rounded-2xl shadow-[0_0_5px] shadow-slate-800">
      <h2 className="text-xl font-bold mb-4">Search & Book Vehicle</h2>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="grid gap-3 mb-6">
        <input
          type="number"
          name="capacityRequired"
          placeholder="Capacity Required (kg)"
          value={form.capacityRequired}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          name="fromPincode"
          placeholder="From Pincode"
          value={form.fromPincode}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          name="toPincode"
          placeholder="To Pincode"
          value={form.toPincode}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        {/* <input
          type="datetime-local"
          name="startTime"
          value={form.startTime}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        /> */}
        <DatePicker
          selected={form.startTime ? new Date(form.startTime) : null}
          onChange={(date) =>
            setForm({ ...form, startTime: date.toISOString() })
          }
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="yyyy-MM-dd HH:mm"
          placeholderText="Select start date & time"
          className="p-2 border rounded w-full"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 cursor-pointer hover:scale-x-105 duration-150 transition-all text-white py-2 rounded hover:bg-teal-700"
          disabled={loading}
        >
          {loading ? "Searching..." : "Search Availability"}
        </button>
      </form>

      {message && <p className="mb-4">{message}</p>}

      {vehicles.length > 0 && (
        <VehicleList
          vehicles={vehicles}
          onBook={handleBook}
          loading={loading}
        />
      )}
    </div>
  );
}
