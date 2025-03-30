import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import NetWorthDashboard from "../dashboards/NetWorthDashboard";


function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard/>} />
      <Route path="/networth" element={<NetWorthDashboard/>} />
    </Routes>
  );
}

export default AppRouter;