import { useState } from "react";
import SavingsForm from "./SavingsForm";
import SavingsList from "./SavingsList";
import SavingsTotal from "./SavingsTotal";
import { addData } from "../../firebase/firestoreUtils";
import useSavingsData from "../../hooks/useSavingsData";
import LoadingIndicator from "../LoadingIndicator";
import SavingsMessage from "./SavingsMessage";

export interface Savings {
  id?: string;
  name: string;
  accountType: "Savings" | "HSA" | "Investment" | "Retirement";
  balance: number;
}

const Savings = () => {
  const userId = import.meta.env.VITE_FIREBASE_TEST_ID;

  const { savingsData, refetchSavings } = useSavingsData(userId); // Use refetchSavings
  const [newSavings, setNewSavings] = useState<Savings>({
    name: "",
    accountType: "Savings",
    balance: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewSavings((prev) => ({
      ...prev,
      [name]: name === "balance" ? Number(value) : value,
    }));
  };

  const handleAddSavings = async () => {
    if (newSavings.name && newSavings.balance > 0) {
      try {
        await addData(`users/${userId}/savings`, newSavings);
        setNewSavings({ name: "", accountType: "Savings", balance: 0 });
        refetchSavings(); // Dynamically refetch savings data
      } catch (err) {
        console.error("Failed to add savings.");
      }
    }
  };

  const handleDeleteFromState = (id: string) => {
    console.warn("handleDeleteFromState: Add refetch logic if needed.");
  };

  return (
    <div className="p-4">
      <LoadingIndicator />
     {/* Savings Information */}
      <SavingsMessage />
      <div className="p-4 bg-gray-200 rounded-lg shadow-md text-center">
      <h3 className="text-sm font-medium text-gray-400 mb-2">Total Savings</h3>
      <SavingsTotal savingsData={savingsData} />
      </div>

      <SavingsList
        savingsData={savingsData}
        userId={userId}
        handleDeleteFromState={handleDeleteFromState}
      />

      <SavingsForm
        newSavings={newSavings}
        handleChange={handleChange}
        handleAddSavings={handleAddSavings}
      />

    </div>
  );
};

export default Savings;