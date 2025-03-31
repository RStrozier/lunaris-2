
interface IncomeFormProps {
    newIncome: {
      name: string;
      type: string;
      amount: number;
      frequency: string;
      payDate: string;
    };
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleAddIncome: () => void;
  }

const IncomeForm = ({ newIncome, handleChange, handleAddIncome }: IncomeFormProps) => {
  return (
    <div className="mt-4">
      <legend>
        Income Name
        <input
          type="text"
          name="name"
          placeholder="Income Name"
          value={newIncome.name}
          onChange={handleChange}
          className="border p-2 mr-2"
        />
      </legend>
      <legend>
        Amount
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={newIncome.amount}
          onChange={handleChange}
          className="border p-2 mr-2"
        />
      </legend>
      <legend>
        Type
        <select
          name="type"
          value={newIncome.type}
          onChange={handleChange}
          className="border p-2"
        >
          <option value="Salary">Salary</option>
          <option value="Freelance">Freelance</option>
          <option value="Gift">Gift</option>
          <option value="Other">Other</option>
        </select>
      </legend>
      <legend>
        Frequency
        <select
          name="frequency"
          value={newIncome.frequency}
          onChange={handleChange}
          className="border p-2"
        >
          <option value="weekly">Weekly</option>
          <option value="biweekly">Biweekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </legend>
      <legend>
        Pay Date
        <input
          type="date"
          name="payDate"
          value={newIncome.payDate}
          onChange={handleChange}
          className="border p-2"
        />
      </legend>
      <button onClick={handleAddIncome} className="bg-blue-500 text-white p-2 ml-2">
        Add
      </button>
    </div>
  );
};

export default IncomeForm;