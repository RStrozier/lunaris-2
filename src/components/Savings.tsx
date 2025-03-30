import React, { useState, useEffect } from "react";
import { addData, fetchData } from "../firebase/firestoreUtils";
import DeleteFromFirestoreBtn from "./buttons/DeleteFromFirestoreBtn";

// Define the type for savings data
interface Savings {
  id?: string; // Optional because Firestore assigns it
  name: string;
  accountType: "Savings" | "HSA" | "Investment" | "Retirement";
  balance: number;
}

const Savings = () => {
  const [savingsData, setSavingsData] = useState<Savings[]>([]);
  const [newSavings, setNewSavings] = useState<Savings>({
    name: "",
    accountType: "Savings",
    balance: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // TODO: LOGIN 
  const userId = import.meta.env.VITE_FIREBASE_TEST_ID;

  if (!userId) {
    console.error("User ID is not defined in the .env file");
  }

  // Fetch savings data on component mount
  useEffect(() => {
    const fetchSavings = async () => {
      try {
        setLoading(true);
        const data = await fetchData(`users/${userId}/savings`);
        setSavingsData(data as Savings[]);
      } catch (err) {
        setError("Failed to load savings data.");
      } finally {
        setLoading(false);
      }
    };

    fetchSavings();
  }, [userId]);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewSavings((prev) => ({
      ...prev,
      [name]: name === "balance" ? Number(value) : value,
    }));
  };

  // Add new savings document
  const handleAddSavings = async () => {
    if (newSavings.name && newSavings.balance > 0) {
      try {
        await addData(`users/${userId}/savings`, newSavings);
        setSavingsData([...savingsData, newSavings]); // Update local state
        setNewSavings({ name: "", accountType: "Savings", balance: 0 });
      } catch (err) {
        setError("Failed to add savings.");
      }
    }
  };

  // Handle local state update after deletion
  const handleDeleteFromState = (id: string) => {
    setSavingsData((prev) => prev.filter((savings) => savings.id !== id));
  };

  // Calculate total savings
  const totalSavings = savingsData.reduce((sum, savings) => sum + savings.balance, 0);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Savings Management</h2>

      {/* Input form */}
      <div className="mt-4">
        <legend>
          Name
          <input
            type="text"
            name="name"
            placeholder="Savings Name"
            value={newSavings.name}
            onChange={handleChange}
            className="border p-2 mr-2"
          />
        </legend>
        <legend>
          Account Type
          <select
            name="accountType"
            value={newSavings.accountType}
            onChange={handleChange}
            className="border p-2 mr-2"
          >
            <option value="Savings">Savings</option>
            <option value="Investment">Investment</option>
            <option value="HSA">HSA</option>
            <option value="Retirement">Retirement</option>
          </select>
        </legend>
        <legend>
          Balance
          <input
            type="number"
            name="balance"
            placeholder="Balance"
            value={newSavings.balance}
            onChange={handleChange}
            className="border p-2 mr-2"
          />
        </legend>
        <button onClick={handleAddSavings} className="bg-blue-500 text-white p-2 ml-2">
          Add
        </button>
      </div>

      {/* Display total savings */}
      <div className="mt-4">
        <h3 className="font-bold">Total Savings</h3>
        <p className="text-lg">
          <strong>${totalSavings.toLocaleString()}</strong>
        </p>
      </div>

      {/* Display savings list */}
      <div className="mt-4">
        <h3 className="font-bold">Savings List</h3>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <ul>
            {savingsData.map((savings) => (
              <li key={savings.id} className="p-2 border-b">
                {savings.name} - ${savings.balance} ({savings.accountType})
                <DeleteFromFirestoreBtn
                  collectionName={`users/${userId}/savings`}
                  itemId={savings.id!}
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

export default Savings;