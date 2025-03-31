
const TotalLiabilities = ({ totalLiabilities }: { totalLiabilities: number }) => {
  return (
    <div className="p-4 bg-blue-100 rounded shadow">
      <h4 className="text-sm font-medium mb-1">Total Liabilities</h4>
      <p className="text-lg font-bold text-red-500">
        $-{totalLiabilities.toLocaleString()}
      </p>
    </div>
  );
};

export default TotalLiabilities;