import SavingsTotal from "../components/savings/SavingsTotal";
import useSavingsData from "../hooks/useSavingsData";
import { useLoading } from "../context/LoadingContext";

const NetWorthDashboard = () => {
  const userId = import.meta.env.VITE_FIREBASE_TEST_ID;
  const { savingsData, error } = useSavingsData(userId);
  const { loading } = useLoading();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Net Worth Dashboard</h1>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : !loading ? (
        <>
          <h3 className="text-lg font-semibold mb-2">Assets:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <div className="p-4 bg-gray-100 rounded shadow">
              <h4 className="text-sm font-medium mb-1">Savings</h4>
              <SavingsTotal savingsData={savingsData} />
            </div>
            <div className="p-4 bg-gray-100 rounded shadow">
              <h4 className="text-sm font-medium mb-1">Cash on Hand</h4>
              <SavingsTotal savingsData={savingsData} />
            </div>
            <div className="p-4 bg-gray-100 rounded shadow">
              <h4 className="text-sm font-medium mb-1">Vehicles</h4>
              <SavingsTotal savingsData={savingsData} />
            </div>
            <div className="p-4 bg-gray-100 rounded shadow">
              <h4 className="text-sm font-medium mb-1">Real Estate</h4>
              <SavingsTotal savingsData={savingsData} />
            </div>
            <div className="p-4 bg-gray-100 rounded shadow">
              <h4 className="text-sm font-medium mb-1">Investments</h4>
              <SavingsTotal savingsData={savingsData} />
            </div>
            <div className="p-4 bg-gray-100 rounded shadow">
              <h4 className="text-sm font-medium mb-1">Other Real Estate</h4>
              <SavingsTotal savingsData={savingsData} />
            </div>
            {/* Total Assets */}
            <div className="p-4 bg-blue-100 rounded shadow col-span-full">
              <h4 className="text-sm font-medium mb-1">Total Assets</h4>
              <SavingsTotal savingsData={savingsData} />
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default NetWorthDashboard;