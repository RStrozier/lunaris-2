import BillsList from "../components/bills/BillsList";
import BillsTotal from "../components/bills/BillsTotal";
import { useLoading } from "../context/LoadingContext";
import { useError } from "../context/ErrorContext";
import useFetchBills from "../hooks/useFetchBills";
import LoadingIndicator from "../components/LoadingIndicator";
import Bills from "../components/bills/Bills";
import BillsForm from "../components/bills/BillsForm";
import { Link } from "react-router-dom";

const BudgetDashboard = () => {
  const { loading } = useLoading();
  const { error } = useError();

  const userId = import.meta.env.VITE_FIREBASE_TEST_ID;

  // Use the custom hook to fetch bills data
  const { billsData, setBillsData } = useFetchBills(userId);

  // Handle deletion from state
  const handleDeleteFromState = (id: string) => {
    setBillsData((prev) => prev.filter((bill) => bill.id !== id));
  };

  // Calculate the next due date for a bill
  const calculateNextDueDate = (dueDate: string, occurance: string): string => {
    const today = new Date();
    let nextDueDate = new Date(dueDate);

    while (nextDueDate <= today) {
      if (occurance === "weekly") {
        nextDueDate.setDate(nextDueDate.getDate() + 7);
      } else if (occurance === "biweekly") {
        nextDueDate.setDate(nextDueDate.getDate() + 14);
      } else if (occurance === "monthly") {
        nextDueDate.setMonth(nextDueDate.getMonth() + 1);
      } else if (occurance === "yearly") {
        nextDueDate.setFullYear(nextDueDate.getFullYear() + 1);
      }
    }

    return nextDueDate.toISOString().split("T")[0];
  };

  // Calculate total monthly bills
  const totalMonthlyBills = billsData.reduce((sum, bill) => {
    let normalizedAmount = bill.amount;

    if (bill.occurance === "weekly") {
      normalizedAmount *= 4.33;
    } else if (bill.occurance === "biweekly") {
      normalizedAmount *= 2;
    } else if (bill.occurance === "yearly") {
      normalizedAmount /= 12;
    }

    return sum + normalizedAmount;
  }, 0);

  // Calculate total yearly bills
  const totalYearlyBills = billsData.reduce((sum, bill) => {
    let normalizedAmount = bill.amount;

    if (bill.occurance === "weekly") {
      normalizedAmount *= 52;
    } else if (bill.occurance === "biweekly") {
      normalizedAmount *= 26;
    } else if (bill.occurance === "monthly") {
      normalizedAmount *= 12;
    }

    return sum + normalizedAmount;
  }, 0);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-center mb-6">Budget Dashboard</h2>

      {loading ? (
        <LoadingIndicator />
      ) : error ? (
        <p className="text-center text-red-500 font-medium">{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bills List */}
          <div className="bg-green-700 shadow-md rounded-lg p-4">
            <BillsList
              billsData={billsData}
              userId={userId}
              handleDeleteFromState={handleDeleteFromState}
              calculateNextDueDate={calculateNextDueDate}
            />
          </div>

          {/* Bills Total */}
          <div className="bg-gray-200 text-red-400 shadow-md rounded-lg p-4">
            <BillsTotal
              totalMonthlyBills={totalMonthlyBills}
              totalYearlyBills={totalYearlyBills}
            />
          </div>
          {/* Add Bill Button right now reroutes.. possible modal oppurtunity */}
          <Link to={'/bills'}>
          <div className="bg-gray-200 text-green-600 shadow-md rounded-lg p-4">
          <button>Add More Bills</button>
          </div>
          </Link>
          
        </div>
      )}
    </div>
  );
};

export default BudgetDashboard;