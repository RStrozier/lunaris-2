import { useState } from "react";
import { addData } from "../../../firebase/firestoreUtils";
import BankAccountForm from "./BankAccountForm";
import BankAccountList from "./BankAccountList";
import BankAccountTotal from "./BankAccountTotal";
import useBankAccountData from "../../../hooks/useBankAccountData";

interface BankAccount {
  id?: string;
  name: string;
  type: "Checking" | "Savings" | "Investment";
  total: number;
}
const BankAccount = () => {
  const userId = import.meta.env.VITE_FIREBASE_TEST_ID;

  // Use the custom hook to fetch bank account data
  const { bankAccountData, error } = useBankAccountData(userId);

  // State for the new bank account form
  const [newBankAccount, setNewBankAccount] = useState<BankAccount>({
    name: "",
    type: "Checking",
    total: 0,
  });

  // Handle input changes in the form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewBankAccount((prev) => ({
      ...prev,
      [name]: name === "total" ? Number(value) : value,
    }));
  };

  // Add a new bank account to the database
  const handleAddBankAccount = async () => {
    if (newBankAccount.name && newBankAccount.total > 0) {
      try {
        await addData(`users/${userId}/bankAccounts`, newBankAccount);
        setNewBankAccount({ name: "", type: "Checking", total: 0 });

        // Temporary solution: Reload the page to trigger the hook
        window.location.reload();
      } catch (err) {
        console.error("Failed to add bank account:", err);
      }
    }
  };

  // Handle deletion of a bank account (placeholder for now)
  const handleDeleteFromState = (id: string) => {
    console.warn("handleDeleteFromState: Add refetch logic if needed.");
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Bank Account Management</h2>

      {/* Bank Account Form */}
      <BankAccountForm
        newBankAccount={newBankAccount}
        handleChange={handleChange}
        handleAddBankAccount={handleAddBankAccount}
      />

      {/* Total Bank Accounts */}
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <h3 className="font-bold">Total Across All Accounts</h3>
          <BankAccountTotal bankAccountData={bankAccountData} />
        </>
      )}

      {/* Bank Account List */}
      <BankAccountList
        bankAccountData={bankAccountData}
        userId={userId}
        handleDeleteFromState={handleDeleteFromState}
        error={error}
      />
    </div>
  );
};

export default BankAccount;