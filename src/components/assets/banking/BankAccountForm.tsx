import { BankAccountFormProps } from "../../../data/types";

const BankAccountForm = ({
  newBankAccount,
  handleChange,
  handleAddBankAccount,
}: BankAccountFormProps) => {
  return (
    <div className="mb-4">
      <h3 className="font-bold">Add New Bank Account</h3>
      <div className="flex flex-col space-y-2">
        <input
          type="text"
          name="name"
          value={newBankAccount.name}
          onChange={handleChange}
          placeholder="Enter account name"
          className="border p-2 rounded"
        />
        <select
          name="type"
          value={newBankAccount.type}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="Checking">Checking</option>
          <option value="Savings">Savings</option>
          <option value="Investment">Investment</option>
        </select>
        <input
          type="number"
          name="total"
          value={newBankAccount.total}
          onChange={handleChange}
          placeholder="Enter account total"
          className="border p-2 rounded"
        />
        <button
          onClick={handleAddBankAccount}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Account
        </button>
      </div>
    </div>
  );
};

export default BankAccountForm;