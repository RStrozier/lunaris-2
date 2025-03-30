import './App.css'
import LoadingIndicator from './components/LoadingIndicator';
import AppRouter from './routes/AppRouter';

function App() {
  return (
    <>
        <LoadingIndicator />
        <AppRouter />
    </>
  );
}

export default App;