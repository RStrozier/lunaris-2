import { useState, useEffect } from "react";
import { NetWorthProps } from "../data/types";
import { fetchData } from "../firebase/firestoreUtils";

const NetWorth = ({
  savingsData,
  bankAccountData,
  vehicleData,
  realEstateData,
  investmentData,
  otherAssetsData,
}: NetWorthProps) => {
  // State for debt data
  const [debtData, setDebtData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const userId = import.meta.env.VITE_FIREBASE_TEST_ID;

  // Fetch debt data
  useEffect(() => {
    const fetchDebt = async () => {
      try {
        setLoading(true);
        const data = await fetchData(`users/${userId}/debt`);
        setDebtData(data as any[]);
      } catch (err) {
        setError("Failed to load debt data.");
      } finally {
        setLoading(false);
      }
    };

    fetchDebt();
  }, [userId]);

  // Helper function for summing up key values in an array of objects
  const sumValues = (data: any[], key: string): number => {
    return data.reduce((total, item) => total + (Number(item[key]) || 0), 0);
  };

  // Calculate Total Debt
  const totalDebt = sumValues(debtData, "totalAmount");

  // Calculate Total Assets (sum of all positive "worths" or "current worths")
  const totalAssets =
    sumValues(savingsData, "balance") + 
    sumValues(bankAccountData, "total") +
    sumValues(vehicleData, "currentWorth") +
    sumValues(realEstateData, "currentWorth") +
    sumValues(investmentData, "currentValue") +
    sumValues(otherAssetsData, "worth");

  // Calculate Total Liabilities (sum of all "amount owed" fields + debt total amounts)
  const totalLiabilities =
    sumValues(vehicleData, "amountOwed") + // Vehicle-related debts
    sumValues(realEstateData, "amountOwed") + // Real estate-related debts
    sumValues(otherAssetsData, "amountOwed") + // Other asset-related debts
    totalDebt; // All other debts from Debt.tsx

  // Calculate Net Worth
  const netWorth = totalAssets - totalLiabilities;

  return (
    <div>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* Total Personal Debt */}
          <div className="p-4 bg-blue-100 rounded shadow">
            <h4 className="text-sm font-medium mb-1">Personal Debt</h4>
            <p
              className={`text-lg font-bold ${
                totalDebt > 0 ? "text-red-500" : "text-green-500"
              }`}
            >
              $-{totalDebt.toLocaleString()}
            </p>
          </div>
          <br />
          {/* Total Assets */}
          <div className="p-4 bg-blue-100 rounded shadow">
            <h4 className="text-sm font-medium mb-1">Total Assets</h4>
            <p className="text-lg font-bold text-green-500">
              ${totalAssets.toLocaleString()}
            </p>
          </div>
          <br />
          {/* Total Liabilities */}
          <div className="p-4 bg-blue-100 rounded shadow">
            <h4 className="text-sm font-medium mb-1">Total Liabilities</h4>
            <p className="text-lg font-bold text-red-500">
              $-{totalLiabilities.toLocaleString()}
            </p>
          </div>
          <br />
          {/* Net Worth */}
          <div className="p-4 bg-blue-100 rounded shadow">
            <h4 className="text-sm font-medium mb-1">Net Worth</h4>
            <p
              className={`text-lg font-bold ${
                netWorth >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              ${netWorth.toLocaleString()}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default NetWorth;