import './App.css'
import Bills from './components/Bills';
import Debt from './components/Debt';
import Income from "./components/Income";
import Savings from './components/Savings';
import Transactions from './components/Transactions';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div className="App">
      <header className="p-4 bg-gray-800 text-white">
        <h1 className="text-2xl">Lunaris 2.0 Budget App</h1>
      </header>
      <main className="p-4">
      <Dashboard />
      </main>
    </div>
  );
}

export default App;