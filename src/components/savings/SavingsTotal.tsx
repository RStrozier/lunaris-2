import { SavingsTotalProps } from "../../data/types";

const SavingsTotal = ({ savingsData }: SavingsTotalProps) => {
  // Calculate the total savings
  const totalSavings = savingsData.reduce((sum, savings) => sum + savings.balance, 0);

  // Determine the text color based on the total savings
  const textColor = totalSavings >= 0 ? "text-green-500" : "text-red-500";

  return (
    <div>
      <p className={`text-lg font-bold ${textColor}`}>
        ${totalSavings.toLocaleString()}
      </p>
    </div>
  );
};

export default SavingsTotal;