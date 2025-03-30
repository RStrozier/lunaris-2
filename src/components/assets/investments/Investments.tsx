import { useState } from "react";
import { addData } from "../../../firebase/firestoreUtils";
import InvestmentForm from "./InvestmentForm";
import InvestmentList from "./InvestmentList";
import useInvestmentData from "../../../hooks/useInvestmentData";
import InvestmentTotal from "./InvestmentTotal";

interface Investment {
  id?: string; // Firestore document ID
  name: string; // Name of the investment (e.g., stock name)
  type: "stocks" | "CDs" | "bonds" | "mutual funds" | "ETFs" | "cryptocurrency"; // Investment type
  amountInvested: number; // Total amount invested
  currentValue: number; // Current market value
}

const Investments = () => {
  const userId = import.meta.env.VITE_FIREBASE_TEST_ID;
  const { investmentData, error, setInvestmentData } = useInvestmentData(userId);

  const [newInvestment, setNewInvestment] = useState<Investment>({
    name: "",
    type: "stocks", // Default to "stocks"
    amountInvested: 0,
    currentValue: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewInvestment((prev) => ({
      ...prev,
      [name]: name === "amountInvested" || name === "currentValue" ? Number(value) : value,
    }));
  };

  const handleAddInvestment = async () => {
    if (newInvestment.name && newInvestment.currentValue >= 0) {
      try {
        await addData(`users/${userId}/investments`, newInvestment);
        setInvestmentData((prev) => [...prev, newInvestment]);
        setNewInvestment({ name: "", type: "stocks", amountInvested: 0, currentValue: 0 });
      } catch (err) {
        console.error("Failed to add investment:", err);
      }
    }
  };

  const handleDeleteFromState = (id: string) => {
    console.warn("handleDeleteFromState: Add refetch logic if needed.");
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
        <p className="text-red-500">{error}</p>
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