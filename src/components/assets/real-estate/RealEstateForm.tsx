import { RealEstate } from "../../../data/types";

interface RealEstateFormProps {
  newRealEstate: RealEstate;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleAddRealEstate: () => void;
}

const RealEstateForm: React.FC<RealEstateFormProps> = ({
  newRealEstate,
  handleChange,
  handleAddRealEstate,
}) => {
  return (
    <div className="mb-4">
      <h3 className="font-bold">Add New Real Estate</h3>
      <div className="flex flex-col space-y-2">
        <input
          type="text"
          name="address"
          value={newRealEstate.address}
          onChange={handleChange}
          placeholder="Enter property address"
          className="border p-2 rounded"
        />
        <select
          name="type"
          value={newRealEstate.type}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="residential">Residential</option>
          <option value="commercial">Commercial</option>
          <option value="land">Land</option>
          <option value="other">Other</option>
        </select>
        <input
          type="number"
          name="amountOwed"
          value={newRealEstate.amountOwed}
          onChange={handleChange}
          placeholder="Enter amount owed"
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="currentWorth"
          value={newRealEstate.currentWorth}
          onChange={handleChange}
          placeholder="Enter current worth"
          className="border p-2 rounded"
        />
        <button
          onClick={handleAddRealEstate}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Property
        </button>
      </div>
    </div>
  );
};

export default RealEstateForm;