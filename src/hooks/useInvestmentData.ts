import { useEffect, useState } from "react";
import { fetchData } from "../firebase/firestoreUtils";
import { Investment } from "../data/types";

const useInvestmentData = (userId: string) => {
  const [investmentData, setInvestmentData] = useState<Investment[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        const data = await fetchData(`users/${userId}/investments`);
        setInvestmentData(data as Investment[]);
      } catch (err) {
        setError("Failed to fetch investments.");
      }
    };

    fetchInvestments();
  }, [userId]);

  return { investmentData, error, setInvestmentData };
};

export default useInvestmentData;