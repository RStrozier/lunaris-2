import { DebtTotalProps } from "../../data/types";

const DebtTotal = ({ debtData }: DebtTotalProps) => {
  const totalDebt = debtData.reduce((sum, debt) => sum + debt.totalAmount, 0);

  return (
    <div className="mt-4">
      <h3 className="font-bold">Total Debt</h3>
      <p className="text-lg">
        <strong>${totalDebt.toLocaleString()}</strong>
      </p>
    </div>
  );
};

export default DebtTotal;