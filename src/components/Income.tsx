import React, { useState, useEffect } from "react";
import { addData, fetchData } from "../firebase/firestoreUtils";
import DeleteFromFirestoreBtn from "./buttons/DeleteFromFirestoreBtn";

interface Income {
  id?: string; // Optional because Firestore assigns it
  name: string;
  type: "fixed" | "variable";
  amount: number;
  frequency: "weekly" | "biweekly" | "monthly";
  startDate?: string; // Optional start date
}

function Income() {
  const [incomeData, setIncomeData] = useState<Income[]>([]);
  const [newIncome, setNewIncome] = useState<Income>({
    name: "",
    type: "fixed",
    amount: 0,
    frequency: "monthly",
    startDate: "",
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const userId = import.meta.env.VITE_FIREBASE_TEST_ID;

  if (!userId) {
    console.error("User ID is not defined in the .env file");
  }

  useEffect(() => {
    const fetchIncome = async () => {
      try {
        setLoading(true);
        const data = await fetchData(`users/${userId}/income`);
        setIncomeData(data as Income[]);
      } catch (err) {
        setError("Failed to load income data.");
      } finally {
        setLoading(false);
      }
    };

    fetchIncome();
  }, [userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewIncome((prev) => ({
      ...prev,
      [name]: name === "amount" ? Number(value) : value,
    }));
  };

  const handleAddIncome = async () => {
    if (newIncome.name && newIncome.amount > 0 && newIncome.startDate) {
      try {
        await addData(`users/${userId}/income`, newIncome);
        setIncomeData([...incomeData, newIncome]);
        setNewIncome({ name: "", type: "fixed", amount: 0, frequency: "monthly", startDate: "" });
      } catch (err) {
        setError("Failed to add income.");
      }
    }
  };

  // Handle local state update after deletion
  const handleDeleteFromState = (id: string) => {
    setIncomeData((prev) => prev.filter((income) => income.id !== id));
  };

  const calculateNextPayday = (frequency: string, startDate: string): string => {
    const today = new Date();
    const start = new Date(startDate);

    if (start > today) return start.toISOString().split("T")[0];

    let nextPayday = new Date(start);
    while (nextPayday <= today) {
      if (frequency === "weekly") {
        nextPayday.setDate(nextPayday.getDate() + 7);
      } else if (frequency === "biweekly") {
        nextPayday.setDate(nextPayday.getDate() + 14);
      } else if (frequency === "monthly") {
        nextPayday.setMonth(nextPayday.getMonth() + 1);
      }
    }

    return nextPayday.toISOString().split("T")[0];
  };

  return (
    <div className="p-4">
      <h3 className="text-xl font-bold">Income Management</h3>

      <div className="mt-4">
        <legend>
          Income Name
          <input
            type="text"
            name="name"
            placeholder="Income Name"
            value={newIncome.name}
            onChange={handleChange}
            className="border p-2 mr-2"
          />
        </legend>
        <legend>
          Type
          <select
            name="type"
            value={newIncome.type}
            onChange={handleChange}
            className="border p-2 mr-2"
          >
            <option value="fixed">Fixed</option>
            <option value="variable">Variable</option>
          </select>
        </legend>
        <legend>
          Amount
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={newIncome.amount}
            onChange={handleChange}
            className="border p-2 mr-2"
          />
        </legend>
        <legend>
          Frequency
          <select
            name="frequency"
            value={newIncome.frequency}
            onChange={handleChange}
            className="border p-2"
          >
            <option value="weekly">Weekly</option>
            <option value="biweekly">Biweekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </legend>
        <legend>
          Start Date
          <input
            type="date"
            name="startDate"
            value={newIncome.startDate}
            onChange={handleChange}
            className="border p-2"
          />
        </legend>
        <button onClick={handleAddIncome} className="bg-blue-500 text-white p-2 ml-2">
          Add
        </button>
      </div>

      <div className="mt-4">
        <h3 className="font-bold">Income List</h3>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <ul>
            {incomeData.map((income) => (
              <li key={income.id} className="p-2 border-b">
                {income.name} - ${income.amount} ({income.type}, {income.frequency})
                <br />
                Next Payday:{" "}
                {income.startDate
                  ? calculateNextPayday(income.frequency, income.startDate)
                  : "Start date not set"}
                <DeleteFromFirestoreBtn
                  collectionName={`users/${userId}/income`}
                  itemId={income.id!}
                  onDelete={handleDeleteFromState}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Income;