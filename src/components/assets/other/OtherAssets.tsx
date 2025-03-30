import { useState } from "react";
import { addData } from "../../../firebase/firestoreUtils";
import OtherAssetsForm from "./OtherAssetsForm";
import OtherAssetsList from "./OtherAssetsList";
import OtherAssetsTotal from "./OtherAssetsTotal";
import useOtherAssetsData from "../../../hooks/useOtherAssetsData";
import useGlobalError from "../../../hooks/useGlobalError";

interface OtherAsset {
  id?: string; // Firestore document ID
  name: string; // Name of the asset
  amountOwed: number; // Outstanding debt on the asset
  worth: number; // Current value of the asset
}

const OtherAssets = () => {
  const userId = import.meta.env.VITE_FIREBASE_TEST_ID;

  // Use custom hook to fetch other assets
  const { otherAssetsData, setOtherAssetsData } = useOtherAssetsData(userId);

  // State for new asset form
  const [newOtherAsset, setNewOtherAsset] = useState<OtherAsset>({
    name: "",
    amountOwed: 0,
    worth: 0,
  });

  // Local error state for adding an asset
  const [addError, setAddError] = useState<string | null>(null);

  // Handle input changes in the form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewOtherAsset((prev) => ({
      ...prev,
      [name]: name === "amountOwed" || name === "worth" ? Number(value) : value,
    }));
  };

  // Add a new asset to the database
  const handleAddOtherAsset = async () => {
    if (newOtherAsset.name && newOtherAsset.worth >= 0) {
      try {
        await addData(`users/${userId}/otherAssets`, newOtherAsset);
        setOtherAssetsData((prev) => [...prev, newOtherAsset]);
        setNewOtherAsset({ name: "", amountOwed: 0, worth: 0 });
        setAddError(null); // Clear any previous errors
      } catch (err) {
        console.error("Failed to add other asset:", err);
        setAddError("Failed to add other asset. Please try again.");
      }
    } else {
      setAddError("Please fill in all required fields correctly before adding.");
    }
  };

  // Handle deletion of an asset (placeholder for now)
  const handleDeleteFromState = (id: string) => {
    console.warn("handleDeleteFromState: Add refetch logic if needed.");
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Other Assets Management</h2>

      {/* Other Assets Form */}
      <OtherAssetsForm
        newOtherAsset={newOtherAsset}
        handleChange={handleChange}
        handleAddOtherAsset={handleAddOtherAsset}
      />

      {/* Total Net Worth */}
      <h3 className="font-bold mt-6 mb-4 text-gray-200">Total Net Worth Across All Other Assets</h3>
      <OtherAssetsTotal otherAssetsData={otherAssetsData} />

      {/* Other Assets List */}
      <OtherAssetsList
        otherAssetsData={otherAssetsData}
        handleDeleteFromState={handleDeleteFromState}
      />
    </div>
  );
};

export default OtherAssets;