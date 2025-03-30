import{ useState } from "react";
import { addData } from "../../../firebase/firestoreUtils";
import RealEstateForm from "./RealEstateForm";
import RealEstateList from "./RealEstateList";
import RealEstateTotal from "./RealEstateTotal";
import useRealEstateData from "../../../hooks/useRealEstateData";

export interface RealEstate {
    id?: string; // Firestore document ID
    address: string; // Property address
    type: "residential" | "commercial" | "land" | "other"; // Type of property
    amountOwed: number; // Outstanding mortgage or loan
    currentWorth: number; // Current market value
  }

const RealEstate = () => {
  const userId = import.meta.env.VITE_FIREBASE_TEST_ID;
  const { realEstateData, error, setRealEstateData } = useRealEstateData(userId);

  const [newRealEstate, setNewRealEstate] = useState<RealEstate>({
    address: "",
    type: "residential", // Default to "residential"
    amountOwed: 0,
    currentWorth: 0,
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewRealEstate((prev) => ({
      ...prev,
      [name]: name === "amountOwed" || name === "currentWorth" ? Number(value) : value,
    }));
  };

  const handleAddRealEstate = async () => {
    if (newRealEstate.address && newRealEstate.currentWorth >= 0) {
      try {
        await addData(`users/${userId}/realEstate`, newRealEstate);
        setRealEstateData((prev) => [...prev, newRealEstate]);
        setNewRealEstate({ address: "", type: "residential", amountOwed: 0, currentWorth: 0 });
      } catch (err) {
        console.error("Failed to add real estate:", err);
      }
    }
  };

  const handleDeleteFromState = (id: string) => {
    console.warn("handleDeleteFromState: Add refetch logic if needed.");
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Real Estate Management</h2>

      {/* Real Estate Form */}
      <RealEstateForm
        newRealEstate={newRealEstate}
        handleChange={handleChange}
        handleAddRealEstate={handleAddRealEstate}
      />

      {/* Total Net Worth */}
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <h3 className="font-bold">Total Net Worth Across All Properties</h3>
          <RealEstateTotal realEstateData={realEstateData} />
        </>
      )}

      {/* Real Estate List */}
      <RealEstateList
        realEstateData={realEstateData}
        handleDeleteFromState={handleDeleteFromState}
      />
    </div>
  );
};

export default RealEstate;