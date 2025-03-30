import { useEffect, useState } from "react";
import { fetchData } from "../firebase/firestoreUtils";
import { RealEstate } from "../data/types";

const useRealEstateData = (userId: string) => {
  const [realEstateData, setRealEstateData] = useState<RealEstate[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRealEstate = async () => {
      try {
        const data = await fetchData(`users/${userId}/realEstate`);
        setRealEstateData(data as RealEstate[]); // Type assertion
      } catch (err) {
        setError("Failed to fetch real estate data.");
      }
    };

    fetchRealEstate();
  }, [userId]);

  return { realEstateData, error, setRealEstateData };
};

export default useRealEstateData;