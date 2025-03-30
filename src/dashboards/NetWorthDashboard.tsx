import { useLoading } from "../context/LoadingContext";
import SavingsTotal from "../components/savings/SavingsTotal";
import useSavingsData from "../hooks/useSavingsData";
import BankAccountTotal from "../components/assets/banking/BankAccountTotal";
import useBankAccountData from "../hooks/useBankAccountData";
import VehicleTotal from "../components/assets/vehicles/VehicleTotal";
import useVehicleData from "../hooks/useVehicleData";
import RealEstateTotal from "../components/assets/real-estate/RealEstateTotal";
import useRealEstateData from "../hooks/useRealEstateData";
import useInvestmentData from "../hooks/useInvestmentData";
import InvestmentTotal from "../components/assets/investments/InvestmentTotal";
import OtherAssetsTotal from "../components/assets/other/OtherAssetsTotal";
import useOtherAssetsData from "../hooks/useOtherAssetsData";
import { Link } from "react-router-dom";
import NetWorth from "../components/NetWorth";

const NetWorthDashboard = () => {
  const userId = import.meta.env.VITE_FIREBASE_TEST_ID;

  // Hooks for fetching data hook handle the error fetching directly globally
  const { savingsData } = useSavingsData(userId);
  const { bankAccountData } = useBankAccountData(userId);
  const { vehicleData } = useVehicleData(userId);
  const { realEstateData } = useRealEstateData(userId);
  const { investmentData } = useInvestmentData(userId);
  const { otherAssetsData } = useOtherAssetsData(userId);

  const { loading } = useLoading();

  // Helper function for summing up key values in an array of objects
  const sumValues = (data: any[], key: string) => {
    return data.reduce((total, item) => total + (Number(item[key]) || 0), 0);
  };

  // Calculate Total Assets (sum of all positive "worths" or "current worths")
  const totalAssets =
    sumValues(savingsData, "currentWorth") +
    sumValues(bankAccountData, "total") +
    sumValues(vehicleData, "currentWorth") +
    sumValues(realEstateData, "currentWorth") +
    sumValues(investmentData, "currentValue") +
    sumValues(otherAssetsData, "worth");

  // Calculate Total Liabilities (sum of all "amount owed" fields)
  const totalLiabilities =
    sumValues(vehicleData, "amountOwed") +
    sumValues(realEstateData, "amountOwed") +
    sumValues(otherAssetsData, "amountOwed");

  // Calculate Net Worth
  const netWorth = totalAssets - totalLiabilities;

  return (
    <div className="p-4 text-black">
      <h1 className="text-2xl font-bold mb-4 text-blue-300">Net Worth Dashboard</h1>
      {!loading ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {/* Individual Asset Categories */}
            <Link to={"/savings"}>
              <div className="p-4 bg-gray-100 rounded shadow">
                <h4 className="text-sm font-medium mb-1">Savings</h4>
                <SavingsTotal savingsData={savingsData} />
              </div>
            </Link>
            <Link to={"/bank-account"}>
              <div className="p-4 bg-gray-100 rounded shadow">
                <h4 className="text-sm font-medium mb-1">Cash in Hand</h4>
                <BankAccountTotal bankAccountData={bankAccountData} />
              </div>
            </Link>
            <Link to={"/vehicles"}>
              <div className="p-4 bg-gray-100 rounded shadow">
                <h4 className="text-sm font-medium mb-1">Vehicles</h4>
                <VehicleTotal vehicleData={vehicleData} />
              </div>
            </Link>
            <Link to={"/real-estate"}>
              <div className="p-4 bg-gray-100 rounded shadow">
                <h4 className="text-sm font-medium mb-1">Real Estate</h4>
                <RealEstateTotal realEstateData={realEstateData} />
              </div>
            </Link>
            <Link to={"/investments"}>
              <div className="p-4 bg-gray-100 rounded shadow">
                <h4 className="text-sm font-medium mb-1">Investments</h4>
                <InvestmentTotal investmentData={investmentData} />
              </div>
            </Link>
            <Link to={"/other-assets"}>
              <div className="p-4 bg-gray-100 rounded shadow">
                <h4 className="text-sm font-medium mb-1">Other Tangible Assets</h4>
                <OtherAssetsTotal otherAssetsData={otherAssetsData} />
              </div>
            </Link>
          </div>

          {/* Net Worth Section */}
          <NetWorth
            savingsData={savingsData}
            bankAccountData={bankAccountData}
            vehicleData={vehicleData}
            realEstateData={realEstateData}
            investmentData={investmentData}
            otherAssetsData={otherAssetsData}
          />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default NetWorthDashboard;