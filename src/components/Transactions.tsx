import React, { useState, useEffect } from "react";
import { addData, fetchData } from "../firebase/firestoreUtils";
import DeleteFromFirestoreBtn from "./buttons/DeleteFromFirestoreBtn";

// Define the type for transaction data
interface Transaction {
  id?: string; // Optional because Firestore assigns it
  name: string;
  category:
    | "Food"
    | "Tithe"
    | "Entertainment"
    | "Naliyah"
    | "Travel"
    | "Books"
    | "Video Games"
    | "Amazon"
    | "Charity"
    | "Other";
  amount: number;
  date: string; // e.g., "YYYY-MM-DD"
}

const Transactions = () => {
  const [transactionsData, setTransactionsData] = useState<Transaction[]>([]);
  const [newTransaction, setNewTransaction] = useState<Transaction>({
    name: "",
    category: "Other",
    amount: 0,
    date: "",
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const userId = import.meta.env.VITE_FIREBASE_TEST_ID;

  if (!userId) {
    console.error("User ID is not defined in the .env file");
  }

  // Fetch transactions data on component mount
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const data = await fetchData(`users/${userId}/transactions`);
        setTransactionsData(data as Transaction[]);
      } catch (err) {
        setError("Failed to load transactions data.");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [userId]);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewTransaction((prev) => ({
      ...prev,
      [name]: name === "amount" ? Number(value) : value,
    }));
  };

  // Add new transaction document
  const handleAddTransaction = async () => {
    if (newTransaction.name && newTransaction.amount > 0) {
      try {
        await addData(`users/${userId}/transactions`, newTransaction);
        setTransactionsData([...transactionsData, newTransaction]); // Update local state
        setNewTransaction({ name: "", category: "Other", amount: 0, date: "" });
      } catch (err) {
        setError("Failed to add transaction.");
      }
    }
  };

  // Handle local state update after deletion
  const handleDeleteFromState = (id: string) => {
    setTransactionsData((prev) => prev.filter((transaction) => transaction.id !== id));
  };

  // Calculate total for the past 30 days
  const currentDate = new Date();
  const past30DaysDate = new Date();
  past30DaysDate.setDate(currentDate.getDate() - 30);

  const totalPast30DaysTransactions = transactionsData
    .filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      return transactionDate >= past30DaysDate && transactionDate <= currentDate;
    })
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  // Calculate year-to-date (YTD) total
  const startOfYearDate = new Date(currentDate.getFullYear(), 0, 1); // January 1st of the current year

  const totalYTDTransactions = transactionsData
    .filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      return transactionDate >= startOfYearDate && transactionDate <= currentDate;
    })
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Transactions Management</h2>

      {/* Input form */}
      <div className="mt-4">
        <legend>
          Transaction Name
          <input
            type="text"
            name="name"
            placeholder="Transaction Name"
            value={newTransaction.name}
            onChange={handleChange}
            className="border p-2 mr-2"
          />
        </legend>
        <legend>
          Transaction Category
          <select
            name="category"
            value={newTransaction.category}
            onChange={handleChange}
            className="border p-2 mr-2"
          >
            <option value="Food">Food</option>
            <option value="Tithe">Tithe</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Naliyah">Naliyah</option>
            <option value="Travel">Travel</option>
            <option value="Books">Books</option>
            <option value="Video Games">Video Games</option>
            <option value="Amazon">Amazon</option>
            <option value="Charity">Charity</option>
            <option value="Other">Other</option>
          </select>
        </legend>
        <legend>
          Amount
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={newTransaction.amount}
            onChange={handleChange}
            className="border p-2 mr-2"
          />
        </legend>
        <legend>
          Transaction Date
          <input
            type="date"
            name="date"
            value={newTransaction.date}
            onChange={handleChange}
            className="border p-2"
          />
        </legend>
        <button onClick={handleAddTransaction} className="bg-blue-500 text-white p-2 ml-2">
          Add
        </button>
      </div>

      {/* Display totals */}
      <div className="mt-4">
        <h3 className="font-bold">Transaction Totals</h3>
        <p className="text-lg">
          <strong>Past 30 Days Transactions: ${totalPast30DaysTransactions.toLocaleString()}</strong>
        </p>
        <p className="text-lg">
          <strong>Year to Date Transactions (YTD): ${totalYTDTransactions.toLocaleString()}</strong>
        </p>
      </div>

      {/* Display transactions list */}
      <div className="mt-4">
        <h3 className="font-bold">Transactions List</h3>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <ul>
            {transactionsData.map((transaction) => (
              <li key={transaction.id} className="p-2 border-b">
                {transaction.name} - ${transaction.amount} ({transaction.category})
                <br />
                Date: {transaction.date}
                <DeleteFromFirestoreBtn
                  collectionName={`users/${userId}/transactions`}
                  itemId={transaction.id!}
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

export default Transactions;