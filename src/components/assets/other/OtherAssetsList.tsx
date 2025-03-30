import { OtherAssetsListProps } from "../../../data/types";

const OtherAssetsList = ({ otherAssetsData, handleDeleteFromState,
}: OtherAssetsListProps ) => {

  return (
    <div>
      <h3 className="font-bold">Your Other Assets</h3>
      {otherAssetsData.length > 0 ? (
        <ul>
          {otherAssetsData.map((asset) => (
            <li key={asset.id} className="mb-2 border-b pb-2">
              <p>
                <strong>Name:</strong> {asset.name}
              </p>
              <p>
                <strong>Amount Owed:</strong> ${asset.amountOwed.toLocaleString()}
              </p>
              <p>
                <strong>Worth:</strong> ${asset.worth.toLocaleString()}
              </p>
              <p>
                <strong>Net Worth:</strong>{" "}
                ${(asset.worth - asset.amountOwed).toLocaleString()}
              </p>
              <button
                onClick={() => handleDeleteFromState(asset.id!)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No other assets found.</p>
      )}
    </div>
  );
};

export default OtherAssetsList;