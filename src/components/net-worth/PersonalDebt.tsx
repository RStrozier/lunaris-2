
const PersonalDebt = ({ totalDebt }: { totalDebt: number }) => {
  return (
    <div className="p-4 bg-blue-100 rounded shadow">
      <h4 className="text-sm font-medium mb-1">Personal Debt</h4>
      <p
        className={`text-lg font-bold ${
          totalDebt > 0 ? "text-red-500" : "text-green-500"
        }`}
      >
        $-{totalDebt.toLocaleString()}
      </p>
    </div>
  );
};

export default PersonalDebt;