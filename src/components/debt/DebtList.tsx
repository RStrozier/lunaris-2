import { Debt } from "../../data/types";
import DeleteFromFirestoreBtn from "../buttons/DeleteFromFirestoreBtn";

interface DebtListProps {
  debtData: Debt[];
  userId: string;
  handleDeleteFromState: (id: string) => void;
}

const DebtList: React.FC<DebtListProps> = ({ debtData, userId, handleDeleteFromState }) => {
  return (
    <div className="mt-4">
      <h3 className="font-bold">Debt List</h3>
      {debtData.length > 0 ? (
        <ul>
          {debtData.map((debt) => (
            <li key={debt.id} className="p-2 border-b">
              <div>
                <strong>{debt.name}</strong> - <span>${debt.totalAmount.toLocaleString()}</span>
              </div>
              <div>Type: {debt.type}</div>
              <div>Min Payment: ${debt.minPayment.toLocaleString()}</div>
              <div>Interest Rate: {debt.interestRate}%</div>
              <div>Due Date: {debt.dueDate}</div>
              <DeleteFromFirestoreBtn
                collectionName={`users/${userId}/debt`}
                itemId={debt.id!}
                onDelete={handleDeleteFromState}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p>No debts found.</p>
      )}
    </div>
  );
};

export default DebtList;