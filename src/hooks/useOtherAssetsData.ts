import { useEffect, useState } from "react";
import { OtherAsset } from "../data/types";
import { fetchData } from "../firebase/firestoreUtils";

const useOtherAssetsData = (userId: string) => {
  const [otherAssetsData, setOtherAssetsData] = useState<OtherAsset[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOtherAssets = async () => {
      try {
        const data = await fetchData(`users/${userId}/otherAssets`);
        setOtherAssetsData(data as OtherAsset[]);
      } catch (err) {
        setError("Failed to fetch other assets.");
      }
    };

    fetchOtherAssets();
  }, [userId]);

  return { otherAssetsData, error, setOtherAssetsData };
};

export default useOtherAssetsData;