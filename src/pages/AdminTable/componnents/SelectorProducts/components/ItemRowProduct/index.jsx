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
    <tr>
      <th></th>
      <td className="px-6 py-3">
        <input
          type="checkbox"
          checked={selectedProductsContext.includes(data._id)}
          onChange={() => toggleProductSelection(data._id)}
        />
      </td>
      <td className="px-6 py-3">{data.nameProduct}</td>
      <td className="px-6 py-3">
        <img
          className="w-[30px] h-[30px] object-cover"
          src={data.imgProduct}
          alt={data.nameProduct}
        />
      </td>
    </tr>
  );
};

export default ItemRowProduct;
