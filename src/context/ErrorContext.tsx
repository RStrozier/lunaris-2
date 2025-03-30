import { createContext, useContext, useState, ReactNode } from "react";

interface ErrorContextProps {
  error: string | null; // Current error message
  setError: (message: string | null) => void; // Function to set an error
  clearError: () => void; // Function to clear the error
}

// Create the context
const ErrorContext = createContext<ErrorContextProps | undefined>(undefined);

// Error Provider Component
export const ErrorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [error, setError] = useState<string | null>(null);

  const clearError = () => setError(null);

  return (
    <ErrorContext.Provider value={{ error, setError, clearError }}>
      {children}
    </ErrorContext.Provider>
  );
};

// Custom hook to use the error context
export const useError = (): ErrorContextProps => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error("useError must be used within an ErrorProvider");
  }
  return context;
};