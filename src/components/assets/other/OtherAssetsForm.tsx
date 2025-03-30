import { OtherAssetsFormProps } from "../../../data/types";

const OtherAssetsForm = ({
  newOtherAsset,
  handleChange,
  handleAddOtherAsset,
}: OtherAssetsFormProps ) => {
  return (
    <div className="mb-4">
      <h3 className="font-bold">Add New Asset</h3>
      <div className="flex flex-col space-y-2">
        <input
          type="text"
          name="name"
          value={newOtherAsset.name}
          onChange={handleChange}
          placeholder="Enter asset name"
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="amountOwed"
          value={newOtherAsset.amountOwed}
          onChange={handleChange}
          placeholder="Enter amount owed"
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="worth"
          value={newOtherAsset.worth}
          onChange={handleChange}
          placeholder="Enter current worth"
          className="border p-2 rounded"
        />
        <button
          onClick={handleAddOtherAsset}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Asset
        </button>
      </div>
    </div>
  );
};

export default OtherAssetsForm;