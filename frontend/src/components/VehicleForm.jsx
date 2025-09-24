const VehicleForm = ({ onSubmit, vehicleData, setVehicleData }) => {
  const handleChange = (e) => {
    setVehicleData({ ...vehicleData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <form onSubmit={() => onSubmit(vehicleData)} className="space-y-3">
        <input
          type="text"
          name="name"
          placeholder="Vehicle Name"
          value={vehicleData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="capacityKg"
          placeholder="Capacity (kg)"
          value={vehicleData.capacityKg}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="tyres"
          placeholder="Tyres"
          value={vehicleData.tyres}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 cursor-pointer hover:scale-x-105 duration-150 transition-all text-white py-2 rounded hover:bg-teal-700"
        >
          Add Vehicle
        </button>
      </form>
    </>
  );
};

export default VehicleForm;
