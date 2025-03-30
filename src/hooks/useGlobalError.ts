import { useEffect } from "react";
import { useError } from "../context/ErrorContext"; 

/**
 * Custom hook to handle global error management
 * @param errors - An array of error messages (or null) from different hooks
 */
const useGlobalError = (errors: (string | null)[]) => {
  const { setError, clearError } = useError();

  useEffect(() => {
    // Find the first non-null error
    const firstError = errors.find((error) => error !== null);

    if (firstError) {
      setError(firstError); // Set the first error in the global context
    } else {
      clearError(); // Clear the global error if no errors exist
    }
  }, [errors, setError, clearError]); // Re-run when errors change
};

export default useGlobalError;