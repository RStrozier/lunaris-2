import React from "react";
import Bills from "../components/bills/Bills";
import Debt from "../components/debt/Debt";
import Income from "../components/income/Income";
import Savings from "../components/savings/Savings";
import Transactions from "../components/Transactions";

// Main dashboard to display insights
const Dashboard = () => {
  return (
    <>
      <h1>Full Dashboard</h1>
      <div>
        <Income />
        <Savings />
        <Debt />
        <Bills />
        <Transactions />
      </div>
    </>

  );
};

export default Dashboard;