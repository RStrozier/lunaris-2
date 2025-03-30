import { useState } from "react";
import useVehicleData from "../../../hooks/useVehicleData";
import { addData } from "../../../firebase/firestoreUtils";
import VehicleForm from "./VehicleForm";
import VehicleList from "./VehicleList";
import VehicleTotal from "./VehicleTotal";
import { Vehicle } from "../../../data/types";

const Vehicles = () => {
  const userId = import.meta.env.VITE_FIREBASE_TEST_ID;
  const { vehicleData, error, setVehicleData } = useVehicleData(userId);

  const [newVehicle, setNewVehicle] = useState<Vehicle>({
    year: 0,
    make: "",
    model: "",
    type: "car", // Default to "car"
    amountOwed: 0,
    currentWorth: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewVehicle((prev) => ({
      ...prev,
      [name]:
        name === "year" || name === "amountOwed" || name === "currentWorth"
          ? Number(value)
          : value,
    }));
  };

  const handleAddVehicle = async () => {
    if (newVehicle.make && newVehicle.model && newVehicle.currentWorth >= 0) {
      try {
        await addData(`users/${userId}/vehicles`, newVehicle);
        setVehicleData((prev) => [...prev, newVehicle]);
        setNewVehicle({ year: 0, make: "", model: "", type: "car", amountOwed: 0, currentWorth: 0 });
      } catch (err) {
        console.error("Failed to add vehicle:", err);
      }
    }
  };

  const handleDeleteFromState = (id: string) => {
    console.warn("handleDeleteFromState: Add refetch logic if needed.");
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Vehicle Management</h2>

      {/* Vehicle Form */}
      <VehicleForm
        newVehicle={newVehicle}
        handleChange={handleChange}
        handleAddVehicle={handleAddVehicle}
      />

      {/* Total Net Worth */}
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <h3 className="font-bold">Total Net Worth Across All Vehicles</h3>
          <VehicleTotal vehicleData={vehicleData} />
        </>
      )}

      {/* Vehicle List */}
      <VehicleList
        vehicleData={vehicleData}
        handleDeleteFromState={handleDeleteFromState}
      />
    </div>
  );
};

export default Vehicles;