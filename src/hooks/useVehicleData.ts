import { useEffect, useState } from "react";
import { fetchData } from "../firebase/firestoreUtils";
import { Vehicle } from "../data/types";
import { useLoading } from "../context/LoadingContext"; 
import { useError } from "../context/ErrorContext"; 

const useVehicleData = (userId: string) => {
  const [vehicleData, setVehicleData] = useState<Vehicle[]>([]);
  const { setLoading } = useLoading(); // Access global loading functions
  const { setError, clearError } = useError(); // Access global error functions

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setLoading(true); // Start global loading
        clearError(); // Clear any previous error
        const data = await fetchData(`users/${userId}/vehicles`);
        setVehicleData(data as Vehicle[]); // Type assertion
      } catch (err) {
        setError("Failed to fetch vehicles."); // Set global error
      } finally {
        setLoading(false); // Stop global loading
      }
    };

    if (userId) {
      fetchVehicles();
    }
  }, [userId, setLoading, setError, clearError]);

  return { vehicleData, setVehicleData }; 
};

export default useVehicleData;