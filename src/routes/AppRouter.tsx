import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import NetWorthDashboard from "../dashboards/NetWorthDashboard";
import BankAccount from "../components/assets/banking/BankAccount";
import Vehicles from "../components/assets/vehicles/Vehicles";
import RealEstate from "../components/assets/real-estate/RealEstate";
import Investments from "../components/assets/investments/Investments";
import Savings from "../components/savings/Savings";
import OtherAssets from "../components/assets/other/OtherAssets";
import Debt from "../components/debt/Debt";
import Bills from "../components/bills/Bills";
import BudgetDashboard from "../dashboards/BudgetDashboard";
import AchievementsDashboard from "../dashboards/AchievementsDashboard";
import SavingsGoalsDashboard from "../dashboards/SavingsGoalsDashboard";

function AppRouter() {
  return (
    <Routes>
      {/* Home */}
      <Route path="/" element={<Dashboard/>} />

      {/* Dashboards */}
      <Route path="/net-worth" element={<NetWorthDashboard/>} />
      <Route path="/budget" element={<BudgetDashboard/>} />
      <Route path="/achievements" element={<AchievementsDashboard/>} />
      <Route path="/savings-goals" element={<SavingsGoalsDashboard/>} />

      {/* Networth links on Dashboard*/}
      <Route path="/savings" element={<Savings/>} />
      <Route path="/bank-account" element={<BankAccount/>} />
      <Route path="/vehicles" element={<Vehicles/>} />
      <Route path="/real-estate" element={<RealEstate/>} />
      <Route path="/investments" element={<Investments/>} />
      <Route path="/other-assets" element={<OtherAssets/>} />

      {/* Debt Link */}
      <Route path="/debt" element={<Debt/>} />

      {/* Bill Link */}
      <Route path="/bills" element={<Bills/>} />
    </Routes>
  );
}

export default AppRouter;