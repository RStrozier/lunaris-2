import { BillsTotalProps } from "../../data/types";

const BillsTotal = ({ totalMonthlyBills, totalYearlyBills }: BillsTotalProps) => {
  return (
    <div className="mt-2">
      <h3 className="font-bold text-gray-800">Total Bills</h3>
      <p className="text-lg">
        <strong>Monthly Bill Total: ${totalMonthlyBills.toLocaleString()}</strong>
      </p>
      <p className="text-lg">
        <strong>Yearly Bill Total: ${totalYearlyBills.toLocaleString()}</strong>
      </p>
    </div>
  );
};

export default BillsTotal;