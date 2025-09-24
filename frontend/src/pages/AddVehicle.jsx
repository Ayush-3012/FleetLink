import { useState } from "react";
import { addVehicle } from "../services/api";
import VehicleForm from "../components/VehicleForm";
import { toast } from "react-toastify";

export default function AddVehicle() {
  const [vehicleData, setVehicleData] = useState({
    name: "",
    capacityKg: "",
    tyres: "",
  });
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    try {
      await addVehicle(vehicleData);
      setMessage("✅ Vehicle added successfully!");
      toast.success("✅ Vehicle added successfully!");
    } catch (err) {
      console.log(err);
      setMessage("❌ Error adding vehicle");
      toast.error("❌ Error adding vehicle");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-slate-100 p-6 rounded-2xl shadow-[0_0_5px] shadow-slate-800">
      <h2 className="text-xl font-bold mb-4">Add Vehicle</h2>
      <VehicleForm
        onSubmit={handleSubmit}
        vehicleData={vehicleData}
        setVehicleData={setVehicleData}
      />
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}
