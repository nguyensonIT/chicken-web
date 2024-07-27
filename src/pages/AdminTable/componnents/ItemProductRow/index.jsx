import BtnTurnOn from "../../../../components/BtnTurnOn";

const ItemProductRow = ({ data, onClick }) => {
  return (
    <>
      <tr
        onClick={() => onClick(data)}
        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer"
      >
        <th></th>
        <th className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
          {data.idProduct}
        </th>
        <td className="px-6 py-4">
          <img className="w-[40px] h-[40px]" src={data.imgProduct} alt="img" />
        </td>
        <td className="px-6 py-4">{data.nameProduct}</td>
        <td className="px-6 py-4">{data.priceProduct}</td>
        <td className="px-6 py-4 text-right">
          {/* btn dark mode  */}
          <BtnTurnOn data={data} />
        </td>
      </tr>
    </>
  );
};
export default ItemProductRow;
