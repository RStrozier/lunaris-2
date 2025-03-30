import { InvestmentFormProps } from "../../../data/types";

const InvestmentForm = ({
  newInvestment,
  handleChange,
  handleAddInvestment,
}: InvestmentFormProps) => {
  return (
    <div className="mb-4">
      <h3 className="font-bold">Add New Investment</h3>
      <div className="flex flex-col space-y-2">
        <legend>
          Investment Name
        <input
          type="text"
          name="name"
          value={newInvestment.name}
          onChange={handleChange}
          placeholder="Enter investment name"
          className="border p-2 rounded"
        /></legend>
        <legend>
          Investment Type
        <select
          name="type"
          value={newInvestment.type}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="stocks">Stocks</option>
          <option value="CDs">CDs</option>
          <option value="bonds">Bonds</option>
          <option value="mutual funds">Mutual Funds</option>
          <option value="ETFs">ETFs</option>
          <option value="cryptocurrency">Cryptocurrency</option>
        </select></legend>
        <legend>
          Amount Invested
        <input
          type="number"
          name="amountInvested"
          value={newInvestment.amountInvested}
          onChange={handleChange}
          placeholder="Enter amount invested"
          className="border p-2 rounded"
        /></legend>
        <legend>
          Current Value
        <input
          type="number"
          name="currentValue"
          value={newInvestment.currentValue}
          onChange={handleChange}
          placeholder="Enter current value"
          className="border p-2 rounded"
        /></legend>
        <br /> 

        {/* ADD INVESTMENT BUTTONS */}
        <button
          onClick={handleAddInvestment}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Investment
        </button>
      </div>
    </div>
  );
};

export default InvestmentForm;