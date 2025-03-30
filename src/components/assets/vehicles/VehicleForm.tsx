import { VehicleFormProps } from "../../../data/types";

const VehicleForm = ({ newVehicle, handleChange, handleAddVehicle,
}: VehicleFormProps ) => {
  return (
    <div className="mb-4">
      <h3 className="font-bold">Add New Vehicle</h3>
      <div className="flex flex-col space-y-2">
        <legend>
            Year
        <input
          type="number"
          name="year"
          value={newVehicle.year}
          onChange={handleChange}
          placeholder="Enter vehicle year"
          className="border p-2 rounded"
        /></legend>
        <legend>Make
        <input
          type="text"
          name="make"
          value={newVehicle.make}
          onChange={handleChange}
          placeholder="Enter vehicle make"
          className="border p-2 rounded"
        /></legend>
        <legend>
            Model
        <input
          type="text"
          name="model"
          value={newVehicle.model}
          onChange={handleChange}
          placeholder="Enter vehicle model"
          className="border p-2 rounded"
        /></legend>
        <legend>
            Type
        <select
          name="type"
          value={newVehicle.type}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="car">Car</option>
          <option value="motorcycle">Motorcycle</option>
          <option value="boat">Boat</option>
          <option value="other">Other</option>
        </select></legend>
        <legend>
            Amount Owed
        <input
          type="number"
          name="amountOwed"
          value={newVehicle.amountOwed}
          onChange={handleChange}
          placeholder="Enter amount owed"
          className="border p-2 rounded"
        /></legend>
        <legend>
            Current Value
        <input
          type="number"
          name="currentWorth"
          value={newVehicle.currentWorth}
          onChange={handleChange}
          placeholder="Enter current worth"
          className="border p-2 rounded"
        /></legend>

        {/* Button to add vehicle */}
        <button
          onClick={handleAddVehicle}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Vehicle
        </button>
      </div>
    </div>
  );
};

export default VehicleForm;