import { useState, useEffect } from "react";
import BillsForm from "./BillsForm";
import BillsList from "./BillsList";
import BillsTotal from "./BillsTotal";
import { addData, fetchData } from "../../firebase/firestoreUtils";

interface Bill {
  id?: string;
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
  dueDate: string;
  occurance: "weekly" | "biweekly" | "monthly" | "yearly";
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewBill((prev) => ({
      ...prev,
      [name]: name === "amount" ? Number(value) : value,
    }));
  };

  const handleAddBill = async () => {
    if (newBill.name && newBill.amount > 0) {
      try {
        await addData(`users/${userId}/bills`, newBill);
        setBillsData([...billsData, newBill]);
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

  const handleDeleteFromState = (id: string) => {
    setBillsData((prev) => prev.filter((bill) => bill.id !== id));
  };

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
      <h2 className="text-xl font-bold">Bills Management</h2>
      <BillsForm newBill={newBill} handleChange={handleChange} handleAddBill={handleAddBill} />
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <BillsTotal totalMonthlyBills={totalMonthlyBills} totalYearlyBills={totalYearlyBills} />
          <BillsList
            billsData={billsData}
            userId={userId}
            handleDeleteFromState={handleDeleteFromState}
            calculateNextDueDate={calculateNextDueDate}
          />
        </>
      )}
    </div>
  );
};

export default Bills;