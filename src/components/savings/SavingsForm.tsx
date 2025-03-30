import { SavingsFormProps } from "../../data/types";

const SavingsForm = ({ newSavings, handleChange, handleAddSavings }: SavingsFormProps) => {
  return (
    <div className="mt-6 p-6 bg-green-800 rounded-lg shadow-lg">
      <h3 className="font-bold text-xl text-gray-200 mb-6">Add New Savings Account</h3>

      {/* Account Type */}
      <div className="mb-4">
        <label htmlFor="accountType" className="block text-sm font-medium text-gray-200 mb-2">
          Account Type
        </label>
        <select
          id="accountType"
          name="accountType"
          value={newSavings.accountType}
          onChange={handleChange}
          className="w-full p-2 bg-gray-700 border border-gray-600 text-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Savings">Savings</option>
          <option value="Investment">Investment</option>
          <option value="HSA">HSA</option>
          <option value="Retirement">Retirement</option>
        </select>
      </div>

      {/* Account Name */}
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-200 mb-2">
          Account Name
        </label>
        <input
          id="name"
          type="text"
          name="name"
          placeholder="Enter account name"
          value={newSavings.name}
          onChange={handleChange}
          className="w-full p-2 bg-gray-700 border border-gray-600 text-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Balance */}
      <div className="mb-4">
        <label htmlFor="balance" className="block text-sm font-medium text-gray-200 mb-2">
          Balance
        </label>
        <input
          id="balance"
          type="number"
          name="balance"
          placeholder="Enter balance"
          value={newSavings.balance}
          onChange={handleChange}
          className="w-full p-2 bg-gray-700 border border-gray-600 text-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Add Savings Button */}
      <button
        onClick={handleAddSavings}
        className="w-full bg-gray-200 text-green-700 font-medium py-2 rounded hover:bg-blue-600 transition duration-300"
      >
        Add Savings Account
      </button>
    </div>
  );
};

export default SavingsForm;