import { useState, useEffect } from "react";
import { fetchData } from "../firebase/firestoreUtils";

const useFetchDebt = (userId: string) => {
  const [debtData, setDebtData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDebt = async () => {
      try {
        setLoading(true);
        const data = await fetchData(`users/${userId}/debt`);
        setDebtData(data as any[]);
      } catch (err) {
        setError("Failed to load debt data.");
      } finally {
        setLoading(false);
      }
    };

    fetchDebt();
  }, [userId]);

  return { debtData, loading, error };
};

export default useFetchDebt;