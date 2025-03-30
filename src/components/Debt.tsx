import React, { useState, useEffect } from "react";
import { addData, fetchData } from "../firebase/firestoreUtils";
import DeleteFromFirestoreBtn from "./buttons/DeleteFromFirestoreBtn";

// Define the type for debt data
interface Debt {
  id?: string; // Optional because Firestore assigns it
  name: string;
  totalAmount: number;
  minPayment: number;
  interestRate: number;
  dueDate: string; // "YYYY-MM-DD"
}

const Debt = () => {
  const [debtData, setDebtData] = useState<Debt[]>([]);
  const [newDebt, setNewDebt] = useState<Debt>({
    name: "",
    totalAmount: 0,
    minPayment: 0,
    interestRate: 0,
    dueDate: "",
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Replace this with the actual user ID
  const userId = import.meta.env.VITE_FIREBASE_TEST_ID;

  if (!userId) {
    console.error("User ID is not defined in the .env file");
  }

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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewDebt((prev) => ({
      ...prev,
      [name]: name === "totalAmount" || name === "minPayment" || name === "interestRate" ? Number(value) : value,
    }));
  };

  // Add new debt document
  const handleAddDebt = async () => {
    if (newDebt.name && newDebt.totalAmount > 0) {
      try {
        await addData(`users/${userId}/debt`, newDebt);
        setDebtData([...debtData, newDebt]); // Update local state
        setNewDebt({ name: "", totalAmount: 0, minPayment: 0, interestRate: 0, dueDate: "" });
      } catch (err) {
        setError("Failed to add debt.");
      }
    }
  };

  // Handle local state update after deletion
  const handleDeleteFromState = (id: string) => {
    setDebtData((prev) => prev.filter((debt) => debt.id !== id));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Debt Management</h2>

      {/* Input form */}
      <div className="mt-4">
        <legend>
          Debt Name
          <input
            type="text"
            name="name"
            placeholder="Debt Name"
            value={newDebt.name}
            onChange={handleChange}
            className="border p-2 mr-2"
          />
        </legend>
        <legend>
          Total
          <input
            type="number"
            name="totalAmount"
            placeholder="Total Amount"
            value={newDebt.totalAmount}
            onChange={handleChange}
            className="border p-2 mr-2"
          />
        </legend>
        <legend>
          Min. Payment
          <input
            type="number"
            name="minPayment"
            placeholder="Minimum Payment"
            value={newDebt.minPayment}
            onChange={handleChange}
            className="border p-2 mr-2"
          />
        </legend>
        <legend>
          Interest Rate
          <input
            type="number"
            name="interestRate"
            placeholder="Interest Rate (%)"
            value={newDebt.interestRate}
            onChange={handleChange}
            className="border p-2 mr-2"
          />
        </legend>
        <legend>
          Due Date
          <input
            type="date"
            name="dueDate"
            value={newDebt.dueDate}
            onChange={handleChange}
            className="border p-2"
          />
        </legend>
        <button onClick={handleAddDebt} className="bg-blue-500 text-white p-2 ml-2">
          Add
        </button>
      </div>

      {/* Display debt list */}
      <div className="mt-4">
        <h3 className="font-bold">Debt List</h3>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <ul>
            {debtData.map((debt) => (
              <li key={debt.id} className="p-2 border-b">
                {debt.name} - ${debt.totalAmount}
                <br />
                Min Payment: ${debt.minPayment}, Interest Rate: {debt.interestRate}%, Due Date: {debt.dueDate}
                <DeleteFromFirestoreBtn
                  collectionName={`users/${userId}/debt`}
                  itemId={debt.id!}
                  onDelete={handleDeleteFromState}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Debt;