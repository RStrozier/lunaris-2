import { OtherAssetsTotalProps } from "../../../data/types";

const OtherAssetsTotal = ({ otherAssetsData }: OtherAssetsTotalProps) => {
  const totalNetWorth = otherAssetsData.reduce(
    (sum, asset) => sum + (asset.worth - asset.amountOwed),
    0
  );

  const textColor = totalNetWorth > 0 ? "text-green-500" : "text-red-500";

  return (
    <p className={`text-lg font-bold ${textColor}`}>
      ${totalNetWorth.toLocaleString()}
    </p>
  );
};

export default OtherAssetsTotal;