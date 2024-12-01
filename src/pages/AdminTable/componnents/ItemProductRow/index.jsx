import { useState } from "react";
import BtnTurnOn from "../../../../components/BtnTurnOn";
import { formatCurrency } from "../../../../components/FormatCurrency";

const ItemProductRow = ({ data, onClick }) => {
  const [isTurnLive, setIsTurnLive] = useState(true);
  return (
    <>
      <tr
        onClick={() => onClick(data)}
        className=" bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer"
      >
        <th></th>
        <td className="max-sm:px-[5px] max-sm:py-[12px] px-6 py-4">
          <img
            className=" size-[40px] object-cover"
            src={data.imgProduct}
            alt="img"
          />
        </td>
        <td className="max-sm:px-[5px] max-sm:py-[12px] px-6 py-4">
          <p className="max-sm:w-[120px] truncate">{data.nameProduct}</p>
        </td>
        <td className="max-sm:px-[5px] max-sm:py-[12px] px-6 py-4">
          {formatCurrency(data.priceProduct)}
        </td>
        <td className="max-sm:px-[5px] max-sm:py-[12px] px-6 py-4 text-right">
          {/* btn dark mode  */}
          <BtnTurnOn data={data} isTurnLive={isTurnLive} />
        </td>
      </tr>
    </>
  );
};
export default ItemProductRow;
