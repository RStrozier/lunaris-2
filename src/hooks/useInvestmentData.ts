import { useEffect, useState } from "react";
import { fetchData } from "../firebase/firestoreUtils";
import { Investment } from "../data/types";
import { useLoading } from "../context/LoadingContext"; // Import global loading context
import { useError } from "../context/ErrorContext"; // Import global error context

const useInvestmentData = (userId: string) => {
  const [investmentData, setInvestmentData] = useState<Investment[]>([]);
  const { setLoading } = useLoading(); // Access global loading functions
  const { setError, clearError } = useError(); // Access global error functions

  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        setLoading(true); // Start global loading
        clearError(); // Clear any previous error
        const data = await fetchData(`users/${userId}/investments`);
        setInvestmentData(data as Investment[]);
      } catch (err) {
        setError("Failed to fetch investments."); // Set a global error
      } finally {
        setLoading(false); // Stop global loading
      }
    };

    if (userId) {
      fetchInvestments();
    }
  }, [userId, setLoading, setError, clearError]);

  return { investmentData, setInvestmentData }; // Return data and setter
};

export default useInvestmentData;