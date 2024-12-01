import { useHandleContext } from "../../../../../../contexts/UserProvider";

const ItemRowProduct = ({ data }) => {
  const { selectedProductsContext, setSelectedProductsContext } =
    useHandleContext();
  const toggleProductSelection = (productId) => {
    setSelectedProductsContext((prevSelected) =>
      prevSelected.includes(productId)
        ? prevSelected.filter((id) => id !== productId)
        : [...prevSelected, productId]
    );
  };

  return (
    <tr className="max-sm:flex max-sm:justify-between max-sm:items-center">
      <th className=""></th>
      <td className="max-sm:px-0 max-sm:py-[10px] px-6 py-3">
        <input
          type="checkbox"
          checked={selectedProductsContext.includes(data._id)}
          onChange={() => toggleProductSelection(data._id)}
        />
      </td>
      <td className="max-sm:px-0 max-sm:py-[10px] px-6 py-3">
        <p className="max-sm:w-[150px] max-sm:truncate">{data.nameProduct}</p>
      </td>
      <td className="max-sm:px-0 max-sm:py-[10px] px-6 py-3">
        <img
          className="max-sm:size-[40px] size-[30px] object-cover"
          src={data.imgProduct}
          alt={data.nameProduct}
        />
      </td>
    </tr>
  );
};

export default ItemRowProduct;
