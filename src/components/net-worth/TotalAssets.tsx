
const TotalAssets = ({ totalAssets }: { totalAssets: number }) => {
  return (
    <div className="p-4 bg-blue-100 rounded shadow">
      <h4 className="text-sm font-medium mb-1">Total Assets</h4>
      <p className="text-lg font-bold text-green-500">
        ${totalAssets.toLocaleString()}
      </p>
    </div>
  );
};

export default TotalAssets;