import { InvestmentListProps } from "../../../data/types";

const InvestmentList = ({
  investmentData,
  handleDeleteFromState,
}: InvestmentListProps) => {
  return (
    <div>
      <h3 className="font-bold">Your Investments</h3>
      {investmentData.length > 0 ? (
        <ul>
          {investmentData.map((investment) => (
            <li key={investment.id} className="mb-2 border-b pb-2">
              <p>
                <strong>Name:</strong> {investment.name}
              </p>
              <p>
                <strong>Type:</strong> {investment.type}
              </p>
              <p>
                <strong>Amount Invested:</strong> ${investment.amountInvested.toLocaleString()}
              </p>
              <p>
                <strong>Current Value:</strong> ${investment.currentValue.toLocaleString()}
              </p>
              <p>
                <strong>Net Worth:</strong>{" "}
                ${(investment.currentValue - investment.amountInvested).toLocaleString()}
              </p>
              <button
                onClick={() => handleDeleteFromState(investment.id!)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No investments found.</p>
      )}
    </div>
  );
};

export default InvestmentList;