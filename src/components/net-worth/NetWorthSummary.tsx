
const NetWorthSummary = ({ netWorth }: { netWorth: number }) => {
  return (
    <div className="p-4 bg-blue-100 rounded shadow">
      <h4 className="text-sm font-medium mb-1">Net Worth</h4>
      <p
        className={`text-lg font-bold ${
          netWorth >= 0 ? "text-green-500" : "text-red-500"
        }`}
      >
        ${netWorth.toLocaleString()}
      </p>
    </div>
  );
};

export default NetWorthSummary;