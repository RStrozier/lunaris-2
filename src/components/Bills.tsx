import React, { useState, useEffect } from "react";
import { addData, fetchData } from "../firebase/firestoreUtils";
import DeleteFromFirestoreBtn from "./buttons/DeleteFromFirestoreBtn";

// Define the type for bill data
interface Bill {
  id?: string; // Optional because Firestore assigns it
  name: string;
  category:
    | "Housing"
    | "Utilities"
    | "Insurance"
    | "Phone"
    | "Internet"
    | "Subscriptions"
    | "Transportation"
    | "Grocery"
    | "Medical";
  amount: number;
  dueDate: string; // e.g., "YYYY-MM-DD"
  occurance: "weekly" | "biweekly" | "monthly" | "yearly"; // Frequency options
}

const Bills = () => {
  const [billsData, setBillsData] = useState<Bill[]>([]);
  const [newBill, setNewBill] = useState<Bill>({
    name: "",
    category: "Housing",
    amount: 0,
    dueDate: "",
    occurance: "monthly",
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const userId = import.meta.env.VITE_FIREBASE_TEST_ID;

  if (!userId) {
    console.error("User ID is not defined in the .env file");
  }

  // Fetch bills data on component mount
  useEffect(() => {
    const fetchBills = async () => {
      try {
        setLoading(true);
        const data = await fetchData(`users/${userId}/bills`);
        setBillsData(data as Bill[]);
      } catch (err) {
        setError("Failed to load bills data.");
      } finally {
        setLoading(false);
      }
    };

    fetchBills();
  }, [userId]);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewBill((prev) => ({
      ...prev,
      [name]: name === "amount" ? Number(value) : value,
    }));
  };

  // Add new bill document
  const handleAddBill = async () => {
    if (newBill.name && newBill.amount > 0) {
      try {
        await addData(`users/${userId}/bills`, newBill);
        setBillsData([...billsData, newBill]); // Update local state
        setNewBill({
          name: "",
          category: "Housing",
          amount: 0,
          dueDate: "",
          occurance: "monthly",
        });
      } catch (err) {
        setError("Failed to add bill.");
      }
    }
  };

  // Handle local state update after deletion
  const handleDeleteFromState = (id: string) => {
    setBillsData((prev) => prev.filter((bill) => bill.id !== id));
  };

  // Calculate the next due date
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

    return nextDueDate.toISOString().split("T")[0]; // Format as YYYY-MM-DD
  };

  // Calculate total monthly bills
  const totalMonthlyBills = billsData.reduce((sum, bill) => {
    let normalizedAmount = bill.amount;

    if (bill.occurance === "weekly") {
      normalizedAmount *= 4.33; // Weekly to monthly
    } else if (bill.occurance === "biweekly") {
      normalizedAmount *= 2; // Biweekly to monthly
    } else if (bill.occurance === "yearly") {
      normalizedAmount /= 12; // Yearly to monthly
    } // Monthly bills are already in monthly terms

    return sum + normalizedAmount;
  }, 0);

  // Calculate total yearly bills
  const totalYearlyBills = billsData.reduce((sum, bill) => {
    let normalizedAmount = bill.amount;

    if (bill.occurance === "weekly") {
      normalizedAmount *= 52; // Weekly to yearly
    } else if (bill.occurance === "biweekly") {
      normalizedAmount *= 26; // Biweekly to yearly
    } else if (bill.occurance === "monthly") {
      normalizedAmount *= 12; // Monthly to yearly
    } // Yearly bills are already in yearly terms

    return sum + normalizedAmount;
  }, 0);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Bills Management</h2>

      {/* Input form */}
      <div className="mt-4">
        <legend>
          Bill Name
          <input
            type="text"
            name="name"
            placeholder="Bill Name"
            value={newBill.name}
            onChange={handleChange}
            className="border p-2 mr-2"
          />
        </legend>
        <legend>
          Category
          <select
            name="category"
            value={newBill.category}
            onChange={handleChange}
            className="border p-2 mr-2"
          >
            <option value="Housing">Housing</option>
            <option value="Utilities">Utilities</option>
            <option value="Insurance">Insurance</option>
            <option value="Phone">Phone</option>
            <option value="Internet">Internet</option>
            <option value="Subscriptions">Subscriptions</option>
            <option value="Transportation">Transportation</option>
            <option value="Grocery">Grocery</option>
            <option value="Medical">Medical</option>
          </select>
        </legend>
        <legend>
          Amount
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={newBill.amount}
            onChange={handleChange}
            className="border p-2 mr-2"
          />
        </legend>
        <legend>
          Next Due Date
          <input
            type="date"
            name="dueDate"
            value={newBill.dueDate}
            onChange={handleChange}
            className="border p-2 mr-2"
          />
        </legend>
        <legend>
          Occurrence
          <select
            name="occurance"
            value={newBill.occurance}
            onChange={handleChange}
            className="border p-2"
          >
            <option value="weekly">Weekly</option>
            <option value="biweekly">Biweekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </legend>
        <button onClick={handleAddBill} className="bg-blue-500 text-white p-2 ml-2">
          Add
        </button>
      </div>

      {/* Display total bills */}
      <div className="mt-4">
        <h3 className="font-bold">Total Bills</h3>
        <p className="text-lg">
          <strong>Monthly Bill Total: ${totalMonthlyBills.toLocaleString()}</strong>
        </p>
        <p className="text-lg">
          <strong>Yearly Bill Total: ${totalYearlyBills.toLocaleString()}</strong>
        </p>
      </div>

      {/* Display bills list */}
      <div className="mt-4">
        <h3 className="font-bold">Bills List</h3>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <ul>
            {billsData.map((bill) => (
              <li key={bill.id} className="p-2 border-b">
                {bill.name} - ${bill.amount} ({bill.category}, {bill.occurance})
                <br />
                Next Due Date: {calculateNextDueDate(bill.dueDate, bill.occurance)}
                <DeleteFromFirestoreBtn
                  collectionName={`users/${userId}/bills`}
                  itemId={bill.id!}
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

export default Bills;