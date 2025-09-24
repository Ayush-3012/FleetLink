  import { useEffect, useState } from "react";
  import { FaTruck } from "react-icons/fa";
  import { getAllVehicles } from "../services/api";

  export default function Home() {
    const [vehicles, setVehicles] = useState([]);
    useEffect(() => {
      const fetchVehicles = async () => {
        const res = await getAllVehicles();
        setVehicles(res.data);
      };

      fetchVehicles();
    }, []);

    return (
      <div className="p-6 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">
          FleetLink Vehicles
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {vehicles.map((v) => (
            <div
              key={v._id}
              className="flex items-center justify-center flex-col rounded-2xl overflow-hidden shadow-[0_0_10px] shadow-teal-700 hover:shadow-lg hover:scale-105 duration-200 transition"
            >
              <FaTruck className="text-5xl text-blue-800" />
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
