import { VehicleListProps } from "../../../data/types";

const VehicleList = ({ vehicleData, handleDeleteFromState }: VehicleListProps) => {
  return (
    <div>
      <h3 className="font-bold">Your Vehicles</h3>
      {vehicleData.length > 0 ? (
        <ul>
          {vehicleData.map((vehicle) => (
            <li key={vehicle.id} className="mb-2 border-b pb-2">
              <p>
                <strong>Year:</strong> {vehicle.year}
              </p>
              <p>
                <strong>Make:</strong> {vehicle.make}
              </p>
              <p>
                <strong>Model:</strong> {vehicle.model}
              </p>
              <p>
                <strong>Type:</strong> {vehicle.type}
              </p>
              <p>
                <strong>Amount Owed:</strong> ${vehicle.amountOwed.toLocaleString()}
              </p>
              <p>
                <strong>Current Worth:</strong> ${vehicle.currentWorth.toLocaleString()}
              </p>
              <p>
                <strong>Net Worth:</strong>{" "}
                ${(vehicle.currentWorth - vehicle.amountOwed).toLocaleString()}
              </p>
              <button
                onClick={() => handleDeleteFromState(vehicle.id!)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No vehicles found.</p>
      )}
    </div>
  );
};

export default VehicleList;