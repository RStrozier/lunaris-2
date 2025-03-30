import { useEffect, useState } from "react";
import { fetchData } from "../firebase/firestoreUtils";
import { BankAccount } from "../components/assets/banking/BankAccount";

const useBankAccountData = (userId: string) => {
  // Explicitly type the state as an array of BankAccount
  const [bankAccountData, setBankAccountData] = useState<BankAccount[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBankAccounts = async () => {
      try {
        const data = await fetchData(`users/${userId}/bankAccounts`);
        setBankAccountData(data as BankAccount[]); // Type assertion
      } catch (err) {
        setError("Failed to fetch bank accounts.");
      }
    };

    fetchBankAccounts();
  }, [userId]);

  return { bankAccountData, error };
};

export default useBankAccountData;