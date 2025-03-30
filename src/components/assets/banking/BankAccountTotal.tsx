import { BankAccount } from "../../../data/types";

interface BankAccountTotalProps {
  bankAccountData: BankAccount[];
  savingsData: { name: string; accountType: string; balance: number }[];
}

const BankAccountTotal = ({ bankAccountData, savingsData }: BankAccountTotalProps) => {
  // Ensure all totals are numeric
  const totalBankAccounts = bankAccountData.reduce(
    (total, account) => total + Number(account.total || 0),
    0
  );

  // Calculate totals for HSA, Retirement, and Investment
  const hsaTotal = savingsData
    .filter((savings) => savings.accountType === "HSA")
    .reduce((total, hsa) => total + Number(hsa.balance || 0), 0);

  const retirementTotal = savingsData
    .filter((savings) => savings.accountType === "Retirement")
    .reduce((total, retirement) => total + Number(retirement.balance || 0), 0);

  const investmentTotal = savingsData
    .filter((savings) => savings.accountType === "Investment")
    .reduce((total, investment) => total + Number(investment.balance || 0), 0);

  // Combine totals (bank accounts, HSA, Retirement, and Investment)
  const totalCombined =
    Number(totalBankAccounts) + Number(hsaTotal) + Number(retirementTotal) + Number(investmentTotal);

  // Determine the text color based on the total combined value
  const textColor = totalCombined > 0 ? "text-green-500" : "text-red-500";

  return (
    <div>
      {/* Total Across All Accounts */}
      <p className={`text-lg font-bold ${textColor}`}>
       ${totalCombined.toLocaleString()}
      </p>

 
    </div>
  );
};

export default BankAccountTotal;