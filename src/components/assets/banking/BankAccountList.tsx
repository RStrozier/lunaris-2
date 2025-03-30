import { BankAccountListProps } from "../../../data/types";

const BankAccountList = ({ bankAccountData, handleDeleteFromState }: BankAccountListProps) => {
  return (
    <div className="mt-6">
      <h3 className="font-bold text-lg mb-4 text-gray-200">Individual Accounts</h3>
      {bankAccountData.length > 0 ? (
        <ul className="space-y-4">
          {bankAccountData.map((account) => (
            <li
              key={account.id}
              className="p-4 bg-gray-800 rounded-lg shadow-md flex justify-between items-center"
            >
              <div>
                <p className="text-sm text-gray-400">
                  <strong className="text-gray-200">Name:</strong> {account.name}
                </p>
                <p className="text-sm text-gray-400">
                  <strong className="text-gray-200">Type:</strong> {account.type}
                </p>
                <p className="text-sm text-gray-400">
                  <strong className="text-gray-200">Total:</strong> ${account.total.toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => handleDeleteFromState(account.id!)}
                className="text-sm text-red-500 hover:text-red-400 hover:underline"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400">No accounts found.</p>
      )}
    </div>
  );
};

export default BankAccountList;