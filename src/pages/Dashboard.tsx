import Bills from "../components/Bills"
import Debt from "../components/Debt"
import Income from "../components/Income"
import Savings from "../components/Savings"
import Transactions from "../components/Transactions"

// main dashboard to display insights
// TODO: RENDER  ALL DASHBOARDS ON THIS PAGE
const Dashboard = () => {
  return (
    <>
      <Income />
      <Savings />
      <Debt />
      <Bills />
      <Transactions />
    </>
  )
}

export default Dashboard