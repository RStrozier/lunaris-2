import { useEffect, useState } from "react";
import { fetchData } from "../firebase/firestoreUtils";
import { Vehicle } from "../data/types";

const useVehicleData = (userId: string) => {
  const [vehicleData, setVehicleData] = useState<Vehicle[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const data = await fetchData(`users/${userId}/vehicles`);
        setVehicleData(data as Vehicle[]); // Type assertion
      } catch (err) {
        setError("Failed to fetch vehicles.");
      }
    };

    fetchVehicles();
  }, [userId]);

  return { vehicleData, error, setVehicleData };
};

export default useVehicleData;