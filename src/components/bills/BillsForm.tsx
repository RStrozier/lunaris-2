import { BillsFormProps } from "../../data/types";

const BillsForm = ({ newBill, handleChange, handleAddBill }: BillsFormProps) => {
  return (
    <div className="mt-4 p-6 bg-green-700 shadow-md rounded-lg max-w-lg mx-auto">
      <h3 className="text-xl font-semibold text-gray-200 mb-4 text-center">Add a New Bill</h3>
      <form>
        {/* Bill Name */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-200 font-medium mb-1">
            Bill Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter the bill name"
            value={newBill.name}
            onChange={handleChange}
            className="w-full border-gray-200 rounded-md shadow-sm p-2 bg-gray-100 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
        </div>

        {/* Category */}
        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-200 font-medium mb-1">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={newBill.category}
            onChange={handleChange}
            className="w-full border-gray-200 rounded-md shadow-sm p-2 bg-gray-100 text-gray-800 focus:ring-2 focus:ring-green-500 focus:outline-none"
          >
            <option value="Housing">Housing</option>
            <option value="Utilities">Utilities</option>
            <option value="Insurance">Insurance</option>
            <option value="Phone">Phone</option>
            <option value="Internet">Internet</option>
            <option value="Subscriptions">Subscriptions</option>
            <option value="Transportation">Transportation</option>
            <option value="Grocery">Grocery</option>
            <option value="Medical">Medical</option>
          </select>
        </div>

        {/* Amount */}
        <div className="mb-4">
          <label htmlFor="amount" className="block text-gray-200 font-medium mb-1">
            Amount ($)
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            placeholder="Enter the amount"
            value={newBill.amount}
            onChange={handleChange}
            className="w-full border-gray-200 rounded-md shadow-sm p-2 bg-gray-100 text-gray-800 placeholder-gray-800 focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
        </div>

        {/* Next Due Date and Occurrence (Two Columns in One Row) */}
        <div className="mb-4 grid grid-cols-2 gap-4">
          {/* Next Due Date */}
          <div>
            <label htmlFor="dueDate" className="block text-gray-200 font-medium mb-1">
              Next Due Date
            </label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={newBill.dueDate}
              onChange={handleChange}
              className="w-full border-gray-200 rounded-md shadow-sm p-2 bg-gray-100  text-gray-800 placeholder-gray-800 focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>

          {/* Occurrence */}
          <div>
            <label htmlFor="occurance" className="block text-gray-200 font-medium mb-1">
              Occurrence
            </label>
            <select
              id="occurance"
              name="occurance"
              value={newBill.occurance}
              onChange={handleChange}
              className="w-full border-gray-200 rounded-md shadow-sm p-2 bg-gray-100 text-gray-800 focus:ring-2 focus:ring-green-500 focus:outline-none"
            >
              <option value="weekly">Weekly</option>
              <option value="biweekly">Biweekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
        </div>

        {/* Add Button */}
        <div className="mt-4">
          <button
            type="button"
            onClick={handleAddBill}
            className="w-full bg-green-800 text-gray-100 font-medium py-2 px-4 rounded-md shadow-sm hover:bg-gray-100 hover:text-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Add Bill
          </button>
        </div>
      </form>
    </div>
  );
};

export default BillsForm;