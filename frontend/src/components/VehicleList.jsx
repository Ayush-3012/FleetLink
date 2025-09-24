export default function VehicleList({ vehicles, onBook, loading }) {
  if (vehicles.length === 0) {
    return <p>No vehicles found.</p>;
  }

  return (
    <div className="space-y-4">
      {vehicles.map((v) => (
        <div
          key={v._id}
          className="p-4 text-blue-600 font-bold hover:translate-x-1.5 duration-150 transition-all shadow-[0_0_10px] shadow-teal-700 rounded flex justify-between items-center"
        >
          <div>
            <h3 className="font-semibold">{v.name}</h3>
            <p>
              Capacity: {v.capacityKg} kg | Tyres: {v.tyres}
            </p>
            <p>Estimated Duration: {v.estimatedRideDurationHours} hours</p>
          </div>
          <button
            className="bg-green-600 cursor-pointer text-white py-1 px-3 rounded hover:bg-green-700"
            onClick={() => onBook(v._id)}
            disabled={loading}
          >
            Book Now
          </button>
        </div>
      ))}
    </div>
  );
}
