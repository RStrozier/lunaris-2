import { InvestmentTotalProps } from "../../../data/types";

const InvestmentTotal = ({ investmentData }: InvestmentTotalProps) => {
  const totalNetWorth = investmentData.reduce(
    (sum, investment) => sum + (investment.currentValue - investment.amountInvested),
    0
  );

  const textColor = totalNetWorth > 0 ? "text-green-500" : "text-red-500";

  return (
    <p className={`text-lg font-bold ${textColor}`}>
      ${totalNetWorth.toLocaleString()}
    </p>
  );
};

export default InvestmentTotal;