import { NetWorthProps } from "../../data/types";
import useFetchDebt from "../../hooks/useFetchDebt"; // Import custom hook

// Import reusable components
import PersonalDebt from "./PersonalDebt";
import TotalAssets from "./TotalAssets";
import TotalLiabilities from "./TotalLiabilities";
import NetWorthSummary from "./NetWorthSummary";

const NetWorth = ({
  savingsData,
  bankAccountData,
  vehicleData,
  realEstateData,
  investmentData,
  otherAssetsData,
}: NetWorthProps) => {
  const userId = import.meta.env.VITE_FIREBASE_TEST_ID;

  // Use the custom hook to fetch debt data
  const { debtData, loading, error } = useFetchDebt(userId);

  // Helper function for summing up key values in an array of objects
  const sumValues = (data: any[], key: string): number => {
    return data.reduce((total, item) => total + (Number(item[key]) || 0), 0);
  };

  // Calculate Total Debt
  const totalDebt = sumValues(debtData, "totalAmount");

  // Calculate Total Assets
  const totalAssets =
    sumValues(savingsData, "balance") +
    sumValues(bankAccountData, "total") +
    sumValues(vehicleData, "currentWorth") +
    sumValues(realEstateData, "currentWorth") +
    sumValues(investmentData, "currentValue") +
    sumValues(otherAssetsData, "worth");

  // Calculate Total Liabilities
  const totalLiabilities =
    sumValues(vehicleData, "amountOwed") +
    sumValues(realEstateData, "amountOwed") +
    sumValues(otherAssetsData, "amountOwed") +
    totalDebt;

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
          {/* Personal Debt */}
          <div className="mb-3">
            <PersonalDebt totalDebt={totalDebt} />
          </div>

          {/* Total Assets and Total Liabilities in a Row */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            <TotalAssets totalAssets={totalAssets} />
            <TotalLiabilities totalLiabilities={totalLiabilities} />
          </div>

          {/* Net Worth */}
          <div>
            <NetWorthSummary netWorth={netWorth} />
          </div>
        </>
      )}
    </div>
  );
};

export default NetWorth;