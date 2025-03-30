import { useState, useEffect, useCallback } from "react";
import { fetchData } from "../firebase/firestoreUtils";
import { useLoading } from "../context/LoadingContext"; // Global loading context
import { useError } from "../context/ErrorContext"; // Global error context

interface Savings {
  id?: string;
  name: string;
  accountType: "Savings" | "HSA" | "Investment" | "Retirement";
  balance: number;
}

const useSavingsData = (userId: string) => {
  const [savingsData, setSavingsData] = useState<Savings[]>([]);
  const { setLoading } = useLoading();
  const { setError, clearError } = useError();

  const fetchSavings = useCallback(async () => {
    try {
      setLoading(true);
      clearError();
      const data = await fetchData(`users/${userId}/savings`);
      setSavingsData(data as Savings[]);
    } catch (err) {
      setError("Failed to fetch savings data.");
    } finally {
      setLoading(false);
    }
  }, [userId, setLoading, setError, clearError]);

  useEffect(() => {
    if (userId) {
      fetchSavings();
    }
  }, [userId, fetchSavings]);

  return { savingsData, refetchSavings: fetchSavings }; // Expose refetch function
};

export default useSavingsData;