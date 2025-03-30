
interface SavingsTotalProps {
  savingsData: { balance: number }[];
}

const SavingsTotal = ({ savingsData }: SavingsTotalProps ) => {
  const totalSavings = savingsData.reduce((sum, savings) => sum + savings.balance, 0);

  return (
    <div className="mt-4">
      <p className="text-lg">
        <div>${totalSavings.toLocaleString()}</div>
      </p>
    </div>
  );
};

export default SavingsTotal;