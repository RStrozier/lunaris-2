import { RealEstate } from "../../../data/types";

interface RealEstateTotalProps {
  realEstateData: RealEstate[];
}

const RealEstateTotal = ({ realEstateData }: RealEstateTotalProps ) => {
  const totalNetWorth = realEstateData.reduce(
    (sum, property) => sum + (property.currentWorth - property.amountOwed),
    0
  );

  const textColor = totalNetWorth > 0 ? "text-green-500" : "text-red-500";

  return (
    <p className={`text-lg font-bold ${textColor}`}>
      ${totalNetWorth.toLocaleString()}
    </p>
  );
};

export default RealEstateTotal;