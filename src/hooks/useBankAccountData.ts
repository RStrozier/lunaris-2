import { useEffect, useState, useCallback } from "react";
import { fetchData } from "../firebase/firestoreUtils";
import { BankAccount } from "../data/types";
import { useLoading } from "../context/LoadingContext"; // Import global loading context
import { useError } from "../context/ErrorContext"; // Import global error context

const useBankAccountData = (userId: string) => {
  const [bankAccountData, setBankAccountData] = useState<BankAccount[]>([]); // Explicitly type the state
  const { setLoading } = useLoading(); // Access global loading functions
  const { setError, clearError } = useError(); // Access global error functions

  // Function to fetch bank accounts
  const fetchBankAccounts = useCallback(async () => {
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
  }, [userId, setLoading, setError, clearError]);

  // Automatically fetch bank accounts on mount or when userId changes
  useEffect(() => {
    if (userId) {
      fetchBankAccounts(); // Trigger the initial fetch
    }
  }, [userId, fetchBankAccounts]);

  return {
    bankAccountData,
    setBankAccountData,
    refetchBankAccounts: fetchBankAccounts, // Expose fetch function for manual refetching
  };
};

export default useBankAccountData;