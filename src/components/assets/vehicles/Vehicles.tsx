import { useState } from "react";
import useVehicleData from "../../../hooks/useVehicleData";
import { addData } from "../../../firebase/firestoreUtils";
import VehicleForm from "./VehicleForm";
import VehicleList from "./VehicleList";
import VehicleTotal from "./VehicleTotal";
import { Vehicle } from "../../../data/types";
import { useError } from "../../../context/ErrorContext"; // Import global error context
import { useLoading } from "../../../context/LoadingContext"; // Import global loading context

const Vehicles = () => {
  const userId = import.meta.env.VITE_FIREBASE_TEST_ID;
  // Fetch vehicle data using the custom hook
  const { vehicleData, setVehicleData } = useVehicleData(userId);
  // Global error and loading handling
  const { error } = useError(); // Access global error state
  const { setLoading } = useLoading(); // Access global loading functions

  // State for new vehicle form
  const [newVehicle, setNewVehicle] = useState<Vehicle>({
    year: 0,
    make: "",
    model: "",
    type: "car", // Default to "car"
    amountOwed: 0,
    currentWorth: 0,
  });

  // Handle input changes in the form
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

  // Add a new vehicle to the database
  const handleAddVehicle = async () => {
    if (newVehicle.make && newVehicle.model && newVehicle.currentWorth >= 0) {
      try {
        setLoading(true); // Start global loading
        await addData(`users/${userId}/vehicles`, newVehicle);
        setVehicleData((prev) => [...prev, newVehicle]); // Update state with the new vehicle
        setNewVehicle({
          year: 0,
          make: "",
          model: "",
          type: "car",
          amountOwed: 0,
          currentWorth: 0,
        });
      } catch (err) {
        console.error("Failed to add vehicle:", err);
      } finally {
        setLoading(false); // Stop global loading
      }
    }
  };

  // Handle deletion of a vehicle (state update logic should be added)
  const handleDeleteFromState = (id: string) => {
    setVehicleData((prev) => prev.filter((vehicle) => vehicle.id !== id));
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
        <p className="text-red-500">{error}</p> // Display global error
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