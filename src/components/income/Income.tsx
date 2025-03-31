import { useState, useEffect } from "react";
import { addData, fetchData } from "../../firebase/firestoreUtils";
import IncomeForm from "./IncomeForm";
import IncomeList from "./IncomeList";
import IncomeTotal from "./IncomeTotal";

interface Income {
  id?: string;
  name: string;
  type: "Salary" | "Freelance" | "Gift" | "Other";
  amount: number;
  frequency: "weekly" | "biweekly" | "monthly";
  payDate: string;
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

  const totalMonthlyIncome = incomeData.reduce((sum, income) => {
    if (income.frequency === "weekly") {
      return sum + income.amount * 4.33;
    } else if (income.frequency === "biweekly") {
      return sum + income.amount * 2;
    } else if (income.frequency === "monthly") {
      return sum + income.amount;
    }
    return sum;
  }, 0);

  const totalYearlyIncome = incomeData.reduce((sum, income) => {
    if (income.frequency === "weekly") {
      return sum + income.amount * 52;
    } else if (income.frequency === "biweekly") {
      return sum + income.amount * 26;
    } else if (income.frequency === "monthly") {
      return sum + income.amount * 12;
    }
    return sum;
  }, 0);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Income Management</h2>
      <IncomeForm newIncome={newIncome} handleChange={handleChange} handleAddIncome={handleAddIncome} />
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <IncomeTotal totalMonthlyIncome={totalMonthlyIncome} totalYearlyIncome={totalYearlyIncome} />
          <IncomeList
            incomeData={incomeData}
            userId={userId}
            handleDeleteFromState={handleDeleteFromState}
            calculateNextPayday={calculateNextPayday}
          />
        </>
      )}
    </div>
  );
}

export default Income;