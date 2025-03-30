import DeleteFromFirestoreBtn from "../buttons/DeleteFromFirestoreBtn";
import { useLoading } from "../../context/LoadingContext";
import { useError } from "../../context/ErrorContext";
import { SavingsListProps } from "../../data/types";

const SavingsList = ({
  savingsData,
  userId,
  handleDeleteFromState,
}: SavingsListProps) => {
  const { loading } = useLoading(); // Access the global loading state
  const { error } = useError(); // Access the global error state

  if (loading) {
    return null; // Let the global LoadingIndicator handle the loading UI
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="mt-6">
      <h3 className="font-bold text-lg mb-4 text-gray-200">Savings Accounts</h3>
      {savingsData.length > 0 ? (
        <ul className="space-y-4">
          {savingsData.map((savings) => (
            <li
              key={savings.id}
              className="p-4 bg-gray-800 border border-gray-700 rounded-lg shadow-md flex justify-between items-center"
            >
              <div>
                {/* Savings account details */}
                <p className="text-sm text-gray-400">
                  <strong className="text-gray-200">Name:</strong> {savings.name}
                </p>
                <p className="text-sm text-gray-400">
                  <strong className="text-gray-200">Type:</strong> {savings.accountType}
                </p>
                <p className="text-sm text-gray-400">
                  <strong className="text-gray-200">Balance:</strong> ${savings.balance.toLocaleString()}
                </p>
              </div>
              {/* Delete button */}
              <DeleteFromFirestoreBtn
                collectionName={`users/${userId}/savings`}
                itemId={savings.id!}
                onDelete={handleDeleteFromState}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400">No savings accounts found.</p>
      )}
    </div>
  );
};

export default SavingsList;