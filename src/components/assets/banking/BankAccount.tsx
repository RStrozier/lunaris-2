import { useState } from "react";
import { addData, deleteData } from "../../../firebase/firestoreUtils"; // Add deleteData for deletion
import BankAccountForm from "./BankAccountForm";
import BankAccountList from "./BankAccountList";
import BankAccountTotal from "./BankAccountTotal";
import useBankAccountData from "../../../hooks/useBankAccountData";
import { useError } from "../../../context/ErrorContext"; // Import global error context
import { useLoading } from "../../../context/LoadingContext"; // Import global loading context
import useSavingsData from "../../../hooks/useSavingsData"; // Fetch savings data for aggregation

interface BankAccount {
  id?: string;
  name: string;
  type: "Checking" | "Savings" | "Investment";
  total: number;
}

const BankAccount = () => {
  const userId = import.meta.env.VITE_FIREBASE_TEST_ID;
  // Fetch bank account data
  const { bankAccountData, refetchBankAccounts } = useBankAccountData(userId);
  // Fetch savings data
  const { savingsData } = useSavingsData(userId);
  // Global error handling
  const { error, setError, clearError } = useError();
  // Global loading handling
  const { setLoading } = useLoading();

  // State for the new bank account form
  const [newBankAccount, setNewBankAccount] = useState<BankAccount>({
    name: "",
    type: "Checking",
    total: 0,
  });

  // Aggregate Savings Total
  const savingsAccountTotal = savingsData.reduce(
    (total, savings) => total + (savings.balance || 0),
    0
  );

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
        clearError(); // Clear any previous errors
        setLoading(true); // Show global loading indicator
        await addData(`users/${userId}/bankAccounts`, newBankAccount);
        setNewBankAccount({ name: "", type: "Checking", total: 0 });
        refetchBankAccounts(); // Refetch bank accounts data
      } catch (err) {
        setError("Failed to add bank account."); // Set global error
        console.error(err);
      } finally {
        setLoading(false); // Stop global loading indicator
      }
    } else {
      setError("Please provide a valid account name and total amount."); // Validation error
    }
  };

  // Handle deletion of a bank account
  const handleDeleteFromState = async (id: string) => {
    try {
      clearError(); // Clear any previous errors
      setLoading(true); // Show global loading indicator
      await deleteData(`users/${userId}/bankAccounts`, id); // Delete the account from Firestore
      refetchBankAccounts(); // Refetch the bank accounts data after deletion
    } catch (err) {
      setError("Failed to delete bank account."); // Set global error
      console.error(err);
    } finally {
      setLoading(false); // Stop global loading indicator
    }
  };

  // Ensure all totals are numeric
  const totalBankAccounts = bankAccountData.reduce(
    (total, account) => total + Number(account.total || 0),
    0
  );

  // Calculate totals for HSA, Retirement, and Investment
  const hsaTotal = savingsData
    .filter((savings) => savings.accountType === "HSA")
    .reduce((total, hsa) => total + Number(hsa.balance || 0), 0);

  const retirementTotal = savingsData
    .filter((savings) => savings.accountType === "Retirement")
    .reduce((total, retirement) => total + Number(retirement.balance || 0), 0);

  const investmentTotal = savingsData
    .filter((savings) => savings.accountType === "Investment")
    .reduce((total, investment) => total + Number(investment.balance || 0), 0);

  // Combine totals (bank accounts, HSA, Retirement, and Investment)
  const totalCombined =
    Number(totalBankAccounts) + Number(hsaTotal) + Number(retirementTotal) + Number(investmentTotal);


  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Bank Account Management</h2>
      
      {/* Bank Account Form */}
      <BankAccountForm
        newBankAccount={newBankAccount}
        handleChange={handleChange}
        handleAddBankAccount={handleAddBankAccount}
      />

      {/* Bank Account List */}
      <BankAccountList
        bankAccountData={bankAccountData}
        userId={userId}
        handleDeleteFromState={handleDeleteFromState}
      />

      {/* Total Bank Accounts */}
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
        {/* Breakdown for HSA, Retirement, and Investment */}
        <div className="p-4 bg-gray-800 rounded-lg shadow-md mb-6">
          <h3 className="text-lg font-bold text-gray-200 mb-4">
            Savings Accounts Breakdown
          </h3>
          <p className="text-sm text-gray-400 mb-4">
            Also including the following savings accounts associated with your Savings Management:
          </p>
          <div className="text-base text-gray-200 space-y-2">
            {hsaTotal > 0 && (
              <p>
                <span className="font-semibold text-green-500">HSA Total:</span> ${hsaTotal.toLocaleString()}
              </p>
            )}
            {retirementTotal > 0 && (
              <p>
                <span className="font-semibold text-green-500">Retirement Total:</span> ${retirementTotal.toLocaleString()}
              </p>
            )}
            {investmentTotal > 0 && (
              <p>
                <span className="font-semibold text-green-500">Investment Total:</span> ${investmentTotal.toLocaleString()}
              </p>
            )}
          </div>
        </div>
      
        {/* Total Across All Accounts */}
        <div className="p-4 bg-green-100 rounded-lg shadow-md">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            Total Across All Accounts
          </h3>
          <BankAccountTotal
            bankAccountData={bankAccountData} // Include all bank accounts, including Savings
            savingsData={savingsData} // Pass savingsData for HSA, Retirement, and Investment
          />
        </div>
      </>
      )}
    </div>
  );
};

export default BankAccount;