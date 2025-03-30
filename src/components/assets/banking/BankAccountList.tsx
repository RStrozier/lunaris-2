import { BankAccountListProps } from "../../../data/types";

const BankAccountList= ({ bankAccountData, handleDeleteFromState, error,
}: BankAccountListProps) => {
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h3 className="font-bold mb-2">Individual Accounts</h3>
      {bankAccountData.length > 0 ? (
        <ul>
          {bankAccountData.map((account) => (
            <li key={account.id} className="mb-2 border-b pb-2">
              <p>
                <strong>Name:</strong> {account.name}
              </p>
              <p>
                <strong>Type:</strong> {account.type}
              </p>
              <p>
                <strong>Total:</strong> ${account.total.toLocaleString()}
              </p>
              <button
                onClick={() => handleDeleteFromState(account.id!)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No accounts found.</p>
      )}
    </div>
  );
};

export default BankAccountList;