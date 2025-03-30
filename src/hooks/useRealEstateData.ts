import { useEffect, useState } from "react";
import { fetchData } from "../firebase/firestoreUtils";
import { RealEstate } from "../data/types";
import { useLoading } from "../context/LoadingContext"; // Import global loading context
import { useError } from "../context/ErrorContext"; // Import global error context

const useRealEstateData = (userId: string) => {
  const [realEstateData, setRealEstateData] = useState<RealEstate[]>([]);
  const { setLoading } = useLoading(); // Access global loading functions
  const { setError, clearError } = useError(); // Access global error functions

  useEffect(() => {
    const fetchRealEstate = async () => {
      try {
        setLoading(true); // Start global loading
        clearError(); // Clear any previous error
        const data = await fetchData(`users/${userId}/realEstate`);
        setRealEstateData(data as RealEstate[]); // Type assertion
      } catch (err) {
        setError("Failed to fetch real estate data."); // Set a global error
      } finally {
        setLoading(false); // Stop global loading
      }
    };

    if (userId) {
      fetchRealEstate();
    }
  }, [userId, setLoading, setError, clearError]);

  return { realEstateData, setRealEstateData }; // Return data and setter
};

export default useRealEstateData;