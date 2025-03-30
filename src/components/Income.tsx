import React, { useState, useEffect } from "react";
import { addData, fetchData } from "../firebase/firestoreUtils";
import DeleteFromFirestoreBtn from "./buttons/DeleteFromFirestoreBtn";

interface Income {
  id?: string; // Optional because Firestore assigns it
  name: string;
  type: "Salary" | "Freelance" | "Gift" | "Other";
  amount: number;
  frequency: "weekly" | "biweekly" | "monthly";
  payDate?: string; // Optional pay date
}

function Income() {
  const [incomeData, setIncomeData] = useState<Income[]>([]);
  const [newIncome, setNewIncome] = useState<Income>({
    name: "",
    type: "Salary",
    amount: 0,
    frequency: "monthly",
    payDate: "",
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
    if (newIncome.name && newIncome.amount > 0 && newIncome.payDate) {
      try {
        await addData(`users/${userId}/income`, newIncome);
        setIncomeData([...incomeData, newIncome]);
        setNewIncome({ name: "", amount: 0, type: "Salary", frequency: "monthly", payDate: "" });
      } catch (err) {
        setError("Failed to add income.");
      }
    }
  };

  const handleDeleteFromState = (id: string) => {
    setIncomeData((prev) => prev.filter((income) => income.id !== id));
  };

  const calculateNextPayday = (frequency: string, payDate: string): string => {
    const today = new Date();
    const start = new Date(payDate);

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

  // Calculate total income
  const totalMonthlyIncome = incomeData.reduce((sum, income) => {
    if (income.frequency === "weekly") {
      return sum + income.amount * 4.33; // Weekly to monthly
    } else if (income.frequency === "biweekly") {
      return sum + income.amount * 2; // Biweekly to monthly
    } else if (income.frequency === "monthly") {
      return sum + income.amount; // Monthly is already monthly
    }
    return sum;
  }, 0);

  const totalYearlyIncome = incomeData.reduce((sum, income) => {
    if (income.frequency === "weekly") {
      return sum + income.amount * 52; // Weekly to yearly
    } else if (income.frequency === "biweekly") {
      return sum + income.amount * 26; // Biweekly to yearly
    } else if (income.frequency === "monthly") {
      return sum + income.amount * 12; // Monthly to yearly
    }
    return sum;
  }, 0);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Income Management</h2>

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
          Type
          <select
            name="type"
            value={newIncome.type}
            onChange={handleChange}
            className="border p-2"
          >
            <option value="Salary">Salary</option>
            <option value="Freelance">Freelance</option>
            <option value="Gift">Gift</option>
            <option value="Other">Other</option>
          </select>
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
          Pay Date
          <input
            type="date"
            name="payDate"
            value={newIncome.payDate}
            onChange={handleChange}
            className="border p-2"
          />
        </legend>
        <button onClick={handleAddIncome} className="bg-blue-500 text-white p-2 ml-2">
          Add
        </button>
      </div>

      {/* Display total incomes */}
      <div className="mt-4">
        <h3 className="font-bold">Total Income</h3>
        <p className="text-lg">
          <strong>Monthly: ${totalMonthlyIncome.toLocaleString()}</strong>
        </p>
        <p className="text-lg">
          <strong>Yearly: ${totalYearlyIncome.toLocaleString()}</strong>
        </p>
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
                {income.name} - ${income.amount} ({income.frequency})
                <br />
                Next Payday:{" "}
                {income.payDate
                  ? calculateNextPayday(income.frequency, income.payDate)
                  : "Pay date not set"}
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