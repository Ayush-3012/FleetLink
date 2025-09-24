export default function Home() {
  const vehicles = [
    {
      id: 1,
      name: "Tata Truck",
      capacity: 2000,
      tyres: 6,
    },
    {
      id: 2,
      name: "Mahindra Pickup",
      capacity: 1000,
      tyres: 4,
    },
    {
      id: 3,
      name: "Ashok Leyland",
      capacity: 3000,
      tyres: 8,
    },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        FleetLink Vehicles
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {vehicles.map((v) => (
          <div
            key={v.id}
            className="border rounded-2xl overflow-hidden shadow hover:shadow-lg transition duration-300"
          >
            <div className="p-4">
              <h3 className="font-semibold text-lg">{v.name}</h3>
              <p>Capacity: {v.capacity} kg</p>
              <p>Tyres: {v.tyres}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
