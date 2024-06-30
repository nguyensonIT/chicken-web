import { dataProductCart } from "./component/DataProduct";
import ProductItemCart from "./component/ProductItemCart";
import { formatCurrency } from "../../components/FormatCurrency";

const CartProduct = () => {
  const subTotal = () => {
    let total = 0;

    dataProductCart.forEach((product) => {
      let price = product.price;
      if (product.sale) {
        let discount = (product.price * product.sale) / 100;
        price -= discount;
      }
      total += price;
    });
    return total;
  };

  return (
    <div className="h-screen bg-gray-100 pt-10">
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        <div className="h-screen overflow-scroll rounded-lg md:w-2/3">
          {/* item  */}
          {dataProductCart.map((data, index) => {
            return (
              <ProductItemCart
                key={index}
                image={data.image}
                name={data.name}
                desc={data.desc}
                price={data.price}
                sale={data.sale}
                altImage={data.altImage}
              />
            );
          })}
        </div>
        {/* Sub total */}
        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
          <div className="mb-2 flex justify-between">
            <p className="text-gray-700">Tổng phụ</p>
            <p className="text-gray-700">
              {formatCurrency(subTotal())}
              <span className="mr-[8px] relative top-[-4px] font-normal text-[12px] italic">
                đ
              </span>
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700">Phí ship</p>
            <p className="text-gray-700">
              0
              <span className="mr-[8px] relative top-[-4px] font-normal text-[12px] italic">
                đ
              </span>
            </p>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between">
            <p className="text-lg font-bold">Tổng</p>
            <div className="">
              <p className="mb-1 text-lg font-bold">
                {formatCurrency(subTotal())}
                <span className="mr-[8px] relative top-[-4px] font-normal text-[12px] italic">
                  đ
                </span>
              </p>
            </div>
          </div>
          <button className="mt-6 w-full rounded-md transition-all bg-btnColor py-1.5 font-medium text-blue-50 hover:bg-btnHoverColor">
            Kiểm tra
          </button>
        </div>
      </div>
    </div>
  );
};
export default CartProduct;
