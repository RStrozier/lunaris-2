import React, { useState } from "react";
import SavingsForm from "./SavingsForm";
import SavingsList from "./SavingsList";
import SavingsTotal from "./SavingsTotal";
import { addData } from "../../firebase/firestoreUtils";
import useSavingsData from "../../hooks/useSavingsData";
import LoadingIndicator from "../LoadingIndicator"; 

interface Savings {
  id?: string;
  name: string;
  accountType: "Savings" | "HSA" | "Investment" | "Retirement";
  balance: number;
}

const Savings = () => {
  const userId = import.meta.env.VITE_FIREBASE_TEST_ID;
  // Use the custom hook to fetch savings data
  const { savingsData, error } = useSavingsData(userId); 
  // State for new savings input form
  const [newSavings, setNewSavings] = useState<Savings>({
    name: "",
    accountType: "Savings",
    balance: 0,
  });

  // Handle input changes in the form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewSavings((prev) => ({
      ...prev,
      [name]: name === "balance" ? Number(value) : value,
    }));
  };

  // Add new savings to the database
  const handleAddSavings = async () => {
    if (newSavings.name && newSavings.balance > 0) {
      try {
        await addData(`users/${userId}/savings`, newSavings);
        setNewSavings({ name: "", accountType: "Savings", balance: 0 });

        // Refetch savings data
        window.location.reload(); // Temporary solution to reload the page and trigger the hook
      } catch (err) {
        console.error("Failed to add savings.");
      }
    }
  };

  // Handle deletion of savings from the list
  const handleDeleteFromState = (id: string) => {
    console.warn("handleDeleteFromState: Add refetch logic if needed.");
  };

  return (
    <div className="p-4">
      {/* Global Loading Indicator */}
      <LoadingIndicator />

      <h2 className="text-xl font-bold">Savings Management</h2>

      {/* Savings Form */}
      <SavingsForm
        newSavings={newSavings}
        handleChange={handleChange}
        handleAddSavings={handleAddSavings}
      />

      {/* Total Savings */}
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <h3 className="font-bold">Total Savings</h3>
          <SavingsTotal savingsData={savingsData} />
        </>
      )}

      {/* Savings List */}
      <SavingsList
        savingsData={savingsData}
        userId={userId}
        handleDeleteFromState={handleDeleteFromState}
        error={error}
      />
    </div>
  );
};

export default Savings;