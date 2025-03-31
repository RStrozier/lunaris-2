
interface IncomeTotalProps {
  totalMonthlyIncome: number;
  totalYearlyIncome: number;
}

const IncomeTotal = ({ totalMonthlyIncome, totalYearlyIncome }: IncomeTotalProps) => {
  return (
    <div className="mt-4">
      <h3 className="font-bold">Total Income</h3>
      <p className="text-lg">
        <strong>Monthly: ${totalMonthlyIncome.toLocaleString()}</strong>
      </p>
      <p className="text-lg">
        <strong>Yearly: ${totalYearlyIncome.toLocaleString()}</strong>
      </p>
    </div>
  );
};

export default IncomeTotal;