import { DebtFormProps } from "../../data/types";

const DebtForm = ({ newDebt, handleChange, handleAddDebt }:
    DebtFormProps
) => {
  return (
    <div className="mt-4">
      {/* Debt Name */}
      <legend>
        Debt Name
        <input
          type="text"
          name="name"
          placeholder="Debt Name"
          value={newDebt.name}
          onChange={handleChange}
          className="border p-2 mr-2"
        />
      </legend>

      {/* Debt Type */}
      <legend>
        Debt Type
        <select
          name="type"
          value={newDebt.type}
          onChange={handleChange}
          className="border p-2 mr-2"
        >
          <option value="Educational">Educational</option>
          <option value="Medical">Medical</option>
          <option value="Credit Card">Credit Card</option>
          <option value="Past Due Account">Past Due Account</option>
          <option value="Other">Other</option>
        </select>
      </legend>

      {/* Total Amount */}
      <legend>
        Total
        <input
          type="number"
          name="totalAmount"
          placeholder="Total Amount"
          value={newDebt.totalAmount}
          onChange={handleChange}
          className="border p-2 mr-2"
        />
      </legend>

      {/* Minimum Payment */}
      <legend>
        Min. Payment
        <input
          type="number"
          name="minPayment"
          placeholder="Minimum Payment"
          value={newDebt.minPayment}
          onChange={handleChange}
          className="border p-2 mr-2"
        />
      </legend>

      {/* Interest Rate */}
      <legend>
        Interest Rate
        <input
          type="number"
          name="interestRate"
          placeholder="Interest Rate (%)"
          value={newDebt.interestRate}
          onChange={handleChange}
          className="border p-2 mr-2"
        />
      </legend>

      {/* Due Date */}
      <legend>
        Due Date
        <input
          type="date"
          name="dueDate"
          value={newDebt.dueDate}
          onChange={handleChange}
          className="border p-2"
        />
      </legend>

      {/* Add Button */}
      <button onClick={handleAddDebt} className="bg-blue-500 text-white p-2 ml-2">
        Add
      </button>
    </div>
  );
};

export default DebtForm;