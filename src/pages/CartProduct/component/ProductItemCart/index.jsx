import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import logo from "../../../../assets/img/Logo.png";
import { formatCurrency } from "../../../../components/FormatCurrency";

const ProductItemCart = ({ image, name, desc, price, sale, altImage }) => {
  const priceParse = parseFloat(price);
  const saleParse = parseFloat(sale);
  const priceProduct = formatCurrency(priceParse);

  const afterSaleProduct = () => {
    const afterPriceSale = formatCurrency(
      priceParse - (priceParse * saleParse) / 100
    );
    return afterPriceSale;
  };

  return (
    <div className="flex justify-between mb-6 rounded-lg bg-white p-6">
      <div className="w-[80px] h-[80px] rounded-lg">
        <img
          src={image || logo}
          alt={altImage || "img"}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
        <div className="mt-5 sm:mt-0">
          <h2 className="text-lg font-bold text-gray-900">{name}</h2>
          <p className="mt-1 text-xs text-gray-700">{desc}</p>
        </div>
        <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
          <div className="flex items-center border-gray-100">
            <span className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50">
              {" "}
              -{" "}
            </span>
            <input
              className="h-8 w-8 border bg-white text-center text-xs outline-none"
              type="number"
              value="2"
              min="1"
            />
            <span className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50">
              {" "}
              +{" "}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            {sale ? (
              <div className="flex items-center">
                <span className="mr-[2px] line-through text-[12px] opacity-30 italic">
                  {priceProduct}
                </span>
                <span className="mr-[8px] relative top-[-4px] line-through font-normal text-[10px] opacity-30 italic">
                  đ
                </span>
                <span className="text-[15px] font-normal">
                  {afterSaleProduct()}
                </span>
                <span className="mr-[8px] relative top-[-4px] font-normal text-[12px] italic">
                  đ
                </span>
              </div>
            ) : (
              <div className="flex items-center">
                <span className="text-[15px] font-normal">{priceProduct}</span>
                <span className="mr-[8px] relative top-[-4px] font-normal text-[12px] italic">
                  đ
                </span>
              </div>
            )}
            <FontAwesomeIcon icon={faXmark} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductItemCart;
