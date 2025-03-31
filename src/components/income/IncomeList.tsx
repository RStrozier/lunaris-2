import React from "react";
import DeleteFromFirestoreBtn from "../buttons/DeleteFromFirestoreBtn";

interface Income {
  id?: string;
  name: string;
  type: string;
  amount: number;
  frequency: string;
  payDate?: string;
}

interface IncomeListProps {
  incomeData: Income[];
  userId: string;
  handleDeleteFromState: (id: string) => void;
  calculateNextPayday: (frequency: string, payDate: string) => string;
}

const IncomeList = ({
  incomeData,
  userId,
  handleDeleteFromState,
  calculateNextPayday,
}: IncomeListProps) => {
  return (
    <div className="mt-4">
      <h3 className="font-bold">Income List</h3>
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
    </div>
  );
};

export default IncomeList;