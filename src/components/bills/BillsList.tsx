import { BillsListProps } from "../../data/types";
import DeleteFromFirestoreBtn from "../buttons/DeleteFromFirestoreBtn";

const BillsList = ({
  billsData,
  userId,
  handleDeleteFromState,
  calculateNextDueDate,
}: BillsListProps) => {
  return (
    <div className="mt-2">
      <h3 className="font-bold">Bills List</h3>
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
    </div>
  );
};

export default BillsList;