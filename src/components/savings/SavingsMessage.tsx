const SavingsMessage = () => {
    return (
      <div className="p-6 bg-green-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-200 mb-4">Savings Management</h2>
        <p className="text-sm text-gray-400 leading-relaxed">
          There are four options for savings accounts: <strong className="text-gray-200">"Savings"</strong>, 
          <strong className="text-gray-200">"Investment"</strong>, <strong className="text-gray-200">"HSA"</strong>, and 
          <strong className="text-gray-200">"Retirement"</strong>. After selecting the account type, enter the name of the 
          account and the current account balance. All forms of savings accounts are added to the total 
          <strong className="text-gray-200"> "Cash in Hand"</strong>, which is part of the calculation of your net worth.
        </p>
      </div>
    );
  };
  
  export default SavingsMessage;