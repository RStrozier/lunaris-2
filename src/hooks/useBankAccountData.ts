import { useEffect, useState } from "react";
import { fetchData } from "../firebase/firestoreUtils";
import { BankAccount } from "../data/types";
import { useLoading } from "../context/LoadingContext"; // Import global loading context
import { useError } from "../context/ErrorContext"; // Import global error context

const useBankAccountData = (userId: string) => {
  const [bankAccountData, setBankAccountData] = useState<BankAccount[]>([]); // Explicitly type the state
  const { setLoading } = useLoading(); // Access global loading functions
  const { setError, clearError } = useError(); // Access global error functions

  useEffect(() => {
    const fetchBankAccounts = async () => {
      try {
        setLoading(true); // Start global loading
        clearError(); // Clear any previous error
        const data = await fetchData(`users/${userId}/bankAccounts`);
        setBankAccountData(data as BankAccount[]); // Type assertion
      } catch (err) {
        setError("Failed to fetch bank accounts."); // Set a global error
      } finally {
        setLoading(false); // Stop global loading
      }
    };

    if (userId) {
      fetchBankAccounts();
    }
  }, [userId, setLoading, setError, clearError]);

  return { bankAccountData, setBankAccountData }; // Return data and setter
};

export default useBankAccountData;