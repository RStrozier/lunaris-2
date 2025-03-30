import { useState, useEffect } from "react";
import { fetchData } from "../firebase/firestoreUtils";
import { useLoading } from "../context/LoadingContext"; // Use the global LoadingContext

interface Savings {
  id?: string;
  name: string;
  accountType: "Savings" | "HSA" | "Investment" | "Retirement";
  balance: number;
}

const useSavingsData = (userId: string) => {
  const [savingsData, setSavingsData] = useState<Savings[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { setLoading } = useLoading(); // Get global setLoading from LoadingContext

  useEffect(() => {
    const fetchSavings = async () => {
      try {
        setLoading(true); // Start global loading
        const data = await fetchData(`users/${userId}/savings`);
        setSavingsData(data as Savings[]);
      } catch (err) {
        setError("Failed to load savings data.");
      } finally {
        setLoading(false); // Stop global loading
      }
    };

    if (userId) {
      fetchSavings();
    }
  }, [userId, setLoading]);

  return { savingsData, error }; // No local loading state, use global state instead
};

export default useSavingsData;