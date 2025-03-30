import { useState } from "react";
import { addData } from "../../../firebase/firestoreUtils";
import InvestmentForm from "./InvestmentForm";
import InvestmentList from "./InvestmentList";
import useInvestmentData from "../../../hooks/useInvestmentData";
import InvestmentTotal from "./InvestmentTotal";
import { useError } from "../../../context/ErrorContext"; // Import global error context
import { useLoading } from "../../../context/LoadingContext"; // Import global loading context

interface Investment {
  id?: string; // Firestore document ID
  name: string; // Name of the investment (e.g., stock name)
  type: "stocks" | "CDs" | "bonds" | "mutual funds" | "ETFs" | "cryptocurrency"; // Investment type
  amountInvested: number; // Total amount invested
  currentValue: number; // Current market value
}

const Investments = () => {
  const userId = import.meta.env.VITE_FIREBASE_TEST_ID;
  const { investmentData, setInvestmentData } = useInvestmentData(userId); // Use the custom hook

  const { error } = useError(); // Access global error state
  const { setLoading } = useLoading(); // Access global loading functions

  // State for new investment form
  const [newInvestment, setNewInvestment] = useState<Investment>({
    name: "",
    type: "stocks", // Default to "stocks"
    amountInvested: 0,
    currentValue: 0,
  });

  // Handle input changes in the form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewInvestment((prev) => ({
      ...prev,
      [name]: name === "amountInvested" || name === "currentValue" ? Number(value) : value,
    }));
  };

  // Add a new investment to the database
  const handleAddInvestment = async () => {
    if (newInvestment.name && newInvestment.currentValue >= 0) {
      try {
        setLoading(true); // Start global loading
        await addData(`users/${userId}/investments`, newInvestment); // Add to Firestore
        setInvestmentData((prev) => [...prev, newInvestment]); // Update state with the new investment
        setNewInvestment({ name: "", type: "stocks", amountInvested: 0, currentValue: 0 }); // Reset form
      } catch (err) {
        console.error("Failed to add investment:", err); // Error is already handled globally
      } finally {
        setLoading(false); // Stop global loading
      }
    }
  };

  // Handle deletion of an investment (state update logic should be added)
  const handleDeleteFromState = (id: string) => {
    setInvestmentData((prev) => prev.filter((investment) => investment.id !== id));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Investment Management</h2>
      <br />

      {/* Investment Form */}
      <InvestmentForm
        newInvestment={newInvestment}
        handleChange={handleChange}
        handleAddInvestment={handleAddInvestment}
      />

      {/* Total Net Worth */}
      {error ? (
        <p className="text-red-500">{error}</p> // Display global error
      ) : (
        <>
          <h3 className="font-bold">Total Net Worth Across All Investments</h3>
          <InvestmentTotal investmentData={investmentData} />
        </>
      )}

      {/* Investment List */}
      <InvestmentList
        investmentData={investmentData}
        handleDeleteFromState={handleDeleteFromState}
      />
    </div>
  );
};

export default Investments;