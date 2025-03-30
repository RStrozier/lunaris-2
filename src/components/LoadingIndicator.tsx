import { useLoading } from "../context/LoadingContext";

const LoadingIndicator = () => {
  const { loading } = useLoading();

  if (!loading) return null;

  return (
    <div className="loading-overlay">
      <div className="spinner"></div>
    </div>
  );
};

export default LoadingIndicator;