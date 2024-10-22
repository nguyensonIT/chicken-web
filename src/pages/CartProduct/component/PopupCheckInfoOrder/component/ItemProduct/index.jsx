import { formatCurrency } from "../../../../../../components/FormatCurrency";

const ItemProduct = ({ data }) => {
  let price = data.currentPriceProduct;

  if (data.sale) {
    const sale = (price * data.sale) / 100;
    price = data.currentPriceProduct - sale;
  }
  return (
    <div className="w-full flex ">
      <h1 className="w-[40%] text-left">{data.nameProduct}</h1>
      <p className="w-[20%] text-right">{data.quantity}</p>
      <p className="w-[40%] text-right">{formatCurrency(price)}</p>
      <span className="mr-[8px] relative top-[-4px] font-normal text-[10px] italic">
        đ
      </span>
    </div>
  );
};

export default ItemProduct;
