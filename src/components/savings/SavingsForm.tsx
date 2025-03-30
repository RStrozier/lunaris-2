
interface SavingsFormProps {
  newSavings: {
    name: string;
    accountType: string;
    balance: number;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleAddSavings: () => void;
}

const SavingsForm = ({ newSavings, handleChange, handleAddSavings }: SavingsFormProps) => {
  return (
    <div className="mt-4">
      <legend>
        Name
        <input
          type="text"
          name="name"
          placeholder="Savings Name"
          value={newSavings.name}
          onChange={handleChange}
          className="border p-2 mr-2"
        />
      </legend>
      <legend>
        Account Type
        <select
          name="accountType"
          value={newSavings.accountType}
          onChange={handleChange}
          className="border p-2 mr-2"
        >
          <option value="Savings">Savings</option>
          <option value="Investment">Investment</option>
          <option value="HSA">HSA</option>
          <option value="Retirement">Retirement</option>
        </select>
      </legend>
      <legend>
        Balance
        <input
          type="number"
          name="balance"
          placeholder="Balance"
          value={newSavings.balance}
          onChange={handleChange}
          className="border p-2 mr-2"
        />
      </legend>
      <button onClick={handleAddSavings} className="bg-blue-500 text-white p-2 ml-2">
        Add
      </button>
    </div>
  );
};

export default SavingsForm;