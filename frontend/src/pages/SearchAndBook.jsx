import { useState } from "react";
import { getAvailableVehicles, createBooking } from "../services/api";

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
        customerId: "cust123", 
      };
      const res = await createBooking(bookingData);
      setMessage(
        `✅ Booking Confirmed! Duration: ${res.data.estimatedRideDurationHours} hours`
      );
      // Optional: remove booked vehicle from list
      setVehicles(vehicles.filter((v) => v._id !== vehicleId));
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setMessage("❌ Vehicle already booked, please try another one");
      } else {
        setMessage("❌ Error creating booking");
      }
    }
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow">
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
        <input
          type="datetime-local"
          name="startTime"
          value={form.startTime}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Searching..." : "Search Availability"}
        </button>
      </form>

      {/* Message */}
      {message && <p className="mb-4">{message}</p>}

      {/* Vehicles List */}
      {vehicles.length > 0 && (
        <div className="space-y-4">
          {vehicles.map((v) => (
            <div
              key={v._id}
              className="p-4 border rounded flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold">{v.name}</h3>
                <p>
                  Capacity: {v.capacityKg} kg | Tyres: {v.tyres}
                </p>
                <p>Estimated Duration: {v.estimatedRideDurationHours} hours</p>
              </div>
              <button
                className="bg-green-600 text-white py-1 px-3 rounded hover:bg-green-700"
                onClick={() => handleBook(v._id)}
                disabled={loading}
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
