import { RealEstateListProps } from "../../../data/types";

const RealEstateList = ({ realEstateData, handleDeleteFromState}: RealEstateListProps) => {
  return (
    <div>
      <h3 className="font-bold">Your Properties</h3>
      {realEstateData.length > 0 ? (
        <ul>
          {realEstateData.map((property) => (
            <li key={property.id} className="mb-2 border-b pb-2">
              <p>
                <strong>Address:</strong> {property.address}
              </p>
              <p>
                <strong>Type:</strong> {property.type}
              </p>
              <p>
                <strong>Amount Owed:</strong> ${property.amountOwed.toLocaleString()}
              </p>
              <p>
                <strong>Current Worth:</strong> ${property.currentWorth.toLocaleString()}
              </p>
              <p>
                <strong>Net Worth:</strong>{" "}
                ${(property.currentWorth - property.amountOwed).toLocaleString()}
              </p>
              <button
                onClick={() => handleDeleteFromState(property.id!)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No properties found.</p>
      )}
    </div>
  );
};

export default RealEstateList;