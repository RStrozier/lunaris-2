import { useEffect, useState } from "react";
import { OtherAsset } from "../data/types";
import { fetchData } from "../firebase/firestoreUtils";
import { useLoading } from "../context/LoadingContext"; // Import global loading context
import { useError } from "../context/ErrorContext"; // Import global error context

const useOtherAssetsData = (userId: string) => {
  const [otherAssetsData, setOtherAssetsData] = useState<OtherAsset[]>([]);
  const { setLoading } = useLoading(); // Access global loading functions
  const { setError, clearError } = useError(); // Access global error functions

  useEffect(() => {
    const fetchOtherAssets = async () => {
      try {
        setLoading(true); // Start global loading
        clearError(); // Clear any previous error
        const data = await fetchData(`users/${userId}/otherAssets`);
        setOtherAssetsData(data as OtherAsset[]);
      } catch (err) {
        setError("Failed to fetch other assets."); // Set a global error
      } finally {
        setLoading(false); // Stop global loading
      }
    };

    if (userId) {
      fetchOtherAssets();
    }
  }, [userId, setLoading, setError, clearError]);

  return { otherAssetsData, setOtherAssetsData }; // Return data and setter
};

export default useOtherAssetsData;