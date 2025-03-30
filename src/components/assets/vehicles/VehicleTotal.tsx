import { Vehicle } from "../../../hooks/useVehicleData";

interface VehicleTotalProps {
  vehicleData: Vehicle[];
}

const VehicleTotal = ({ vehicleData }: VehicleTotalProps) => {
  // Calculate the total net worth
  const totalNetWorth = vehicleData.reduce(
    (sum, vehicle) => sum + (vehicle.currentWorth - vehicle.amountOwed),
    0
  );

  // Determine the text color based on the total net worth
  const textColor = totalNetWorth > 0 ? "text-green-500" : "text-red-500";

  return (
    <p className={`text-lg font-bold ${textColor}`}>
      ${totalNetWorth.toLocaleString()}
    </p>
  );
};

export default VehicleTotal;