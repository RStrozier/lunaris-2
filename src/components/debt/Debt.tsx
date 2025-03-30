import { useState, useEffect } from "react";
import DebtForm from "./DebtForm";
import { addData, fetchData } from "../../firebase/firestoreUtils";
import DebtList from "./DebtList";
import DebtTotal from "./DebtTotal";

interface Debt {
  id?: string; // Optional because Firestore assigns it
  name: string; // Name of the debt
  type: "Educational" | "Medical" | "Credit Card" | "Past Due Account" | "Other";
  totalAmount: number; // Total amount owed
  minPayment: number; // Minimum payment required
  interestRate: number; // Interest rate as a percentage
  dueDate: string; // Due date in "YYYY-MM-DD" format
}

const Debt = () => {
  const [debtData, setDebtData] = useState<Debt[]>([]);
  const [newDebt, setNewDebt] = useState<Debt>({
    name: "",
    type: "Educational", // Default debt type
    totalAmount: 0,
    minPayment: 0,
    interestRate: 0,
    dueDate: "",
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const userId = import.meta.env.VITE_FIREBASE_TEST_ID;

  // Fetch debt data on component mount
  useEffect(() => {
    const fetchDebt = async () => {
      try {
        setLoading(true);
        const data = await fetchData(`users/${userId}/debt`);
        setDebtData(data as Debt[]);
      } catch (err) {
        setError("Failed to load debt data.");
      } finally {
        setLoading(false);
      }
    };

    fetchDebt();
  }, [userId]);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewDebt((prev) => ({
      ...prev,
      [name]: name === "totalAmount" || name === "minPayment" || name === "interestRate" ? Number(value) : value,
    }));
  };

  // Add new debt
  const handleAddDebt = async () => {
    if (newDebt.name && newDebt.totalAmount > 0) {
      try {
        await addData(`users/${userId}/debt`, newDebt);
        setDebtData([...debtData, newDebt]);
        setNewDebt({
          name: "",
          type: "Educational", // Reset to default type
          totalAmount: 0,
          minPayment: 0,
          interestRate: 0,
          dueDate: "",
        });
      } catch (err) {
        setError("Failed to add debt.");
      }
    }
  };

  const handleDeleteFromState = (id: string) => {
    setDebtData((prev) => prev.filter((debt) => debt.id !== id));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Debt Management</h2>

      <DebtForm newDebt={newDebt} handleChange={handleChange} handleAddDebt={handleAddDebt} />

      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <DebtTotal debtData={debtData} />
          <DebtList debtData={debtData} userId={userId} handleDeleteFromState={handleDeleteFromState} />
        </>
      )}
    </div>
  );
};

export default Debt;