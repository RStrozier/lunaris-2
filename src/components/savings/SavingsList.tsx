import DeleteFromFirestoreBtn from "../buttons/DeleteFromFirestoreBtn";
import { useLoading } from "../../context/LoadingContext";

interface SavingsListProps {
  savingsData: {
    id?: string;
    name: string;
    accountType: string;
    balance: number;
  }[];
  userId: string;
  handleDeleteFromState: (id: string) => void;
  error: string | null;
}

const SavingsList = ({
  savingsData,
  userId,
  handleDeleteFromState,
  error,
}: SavingsListProps) => {
  const { loading } = useLoading(); // Access the global loading state

  if (loading) {
    return null; // Let the global LoadingIndicator handle the loading UI
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="mt-4">
      <h3 className="font-bold">Savings List</h3>
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
    </div>
  );
};

export default SavingsList;