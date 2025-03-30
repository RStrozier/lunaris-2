import { BankAccountTotalProps } from "../../../data/types";

const BankAccountTotal = ({ bankAccountData }: BankAccountTotalProps) => {
  // Calculate the total
  const total = bankAccountData.reduce((sum, account) => sum + Number(account.total), 0);

  // Determine the text color based on the total value
  const textColor = total > 0 ? "text-green-500" : "text-red-500";

  return (
    <p className={`text-lg font-bold ${textColor}`}>
      ${total.toLocaleString()}
    </p>
  );
};

export default BankAccountTotal;