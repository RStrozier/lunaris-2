import { useState, useEffect } from "react";
import { fetchData } from "../firebase/firestoreUtils";

interface Bill {
  id?: string;
  name: string;
  category:
    | "Housing"
    | "Utilities"
    | "Insurance"
    | "Phone"
    | "Internet"
    | "Subscriptions"
    | "Transportation"
    | "Grocery"
    | "Medical";
  amount: number;
  dueDate: string;
  occurance: "weekly" | "biweekly" | "monthly" | "yearly";
}

const useFetchBills = (userId: string) => {
  const [billsData, setBillsData] = useState<Bill[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBills = async () => {
      try {
        setLoading(true);
        const data = await fetchData(`users/${userId}/bills`);
        setBillsData(data as Bill[]);
      } catch (err) {
        setError("Failed to load bills data.");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchBills();
    }
  }, [userId]);

  return { billsData, loading, error, setBillsData };
};

export default useFetchBills;