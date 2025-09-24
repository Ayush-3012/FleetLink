import { useState } from "react";
import { addVehicle } from "../services/api";

export default function AddVehicle() {
  const [form, setForm] = useState({ name: "", capacityKg: "", tyres: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addVehicle(form);
      setMessage("✅ Vehicle added successfully!");
      setForm({ name: "", capacityKg: "", tyres: "" });
    } catch (err) {
      setMessage("❌ Error adding vehicle");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow">
      <h2 className="text-xl font-bold mb-4">Add Vehicle</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="name"
          placeholder="Vehicle Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="capacityKg"
          placeholder="Capacity (kg)"
          value={form.capacityKg}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="tyres"
          placeholder="Tyres"
          value={form.tyres}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Add Vehicle
        </button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}
