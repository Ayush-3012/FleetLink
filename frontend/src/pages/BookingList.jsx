import { useEffect, useState } from "react";
import { getBookings, cancelBooking } from "../services/api";
import { toast } from "react-toastify";

export default function BookingList() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await getBookings();
      setBookings(res.data);
    } catch (err) {
      console.log(err);
      toast.error("❌ Error fetching bookings");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = async (id) => {
    try {
      await cancelBooking(id);
      toast.success("✅ Booking cancelled!");
      setBookings(bookings.filter((b) => b._id !== id));
    } catch (err) {
      console.log(err);
      toast.error("❌ Error cancelling booking");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-slate-200 rounded-2xl shadow">
      <h2 className="text-xl font-bold mb-4">Your Bookings</h2>
      {loading ? (
        <p>Loading...</p>
      ) : bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((b) => (
            <div
              key={b._id}
              className="p-4 border rounded flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold">{b.vehicleId.name}</h3>
                <p>
                  Capacity: {b.vehicleId.capacityKg} kg | Tyres:{" "}
                  {b.vehicleId.tyres}
                </p>
                <p>
                  From: {b.fromPincode} To: {b.toPincode} | Start:{" "}
                  {new Date(b.startTime).toLocaleString()} | End:{" "}
                  {new Date(b.endTime).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => handleCancel(b._id)}
                className="bg-red-600 cursor-pointer hover:scale-x-105 duration-150 transition-all
                 text-white py-1 px-3 rounded hover:bg-red-700"
              >
                Cancel
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
