import React from "react";
import Bills from "../components/Bills";
import Debt from "../components/Debt";
import Income from "../components/Income";
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