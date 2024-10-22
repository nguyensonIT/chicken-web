import { useEffect, useRef, useState } from "react";

import ProductItemCart from "./component/ProductItemCart";
import { formatCurrency } from "../../components/FormatCurrency";
import cartEmptyImg from "../../assets/img/Empty_Cart.jpg";
import PopupWrapper from "../../components/PopupWrapper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import PopupEnterAddress from "./component/PopupEnterAddress";

const CartProduct = () => {
  const dataProductsInCart = JSON.parse(localStorage.getItem("productsInCart"));

  const refDialog = useRef(null);

  const [reloadCart, setReloadCart] = useState(null);

  const [isPopupCheckOrder, setIsPopupCheckOrder] = useState(false);

  const [dataProductCart, setDataProductCart] = useState(
    dataProductsInCart || []
  );

  const grandTotal = () => {
    const total = dataProductCart.reduce((totalSum, item) => {
      let price = item.currentPriceProduct;

      if (item.sale) {
        price =
          item.currentPriceProduct -
          (item.currentPriceProduct * item.sale) / 100;
      }
      totalSum += price;
      return totalSum;
    }, 0);
    return total;
  };

  const subTotal = () => {
    const total = dataProductCart.reduce((totalSum, item) => {
      let price = item.currentPriceProduct;
      totalSum += price;
      return totalSum;
    }, 0);
    return total;
  };

  const priceSaleProduct = () => {
    const total = dataProductCart.reduce((totalSum, item) => {
      let price = 0;

      if (item.sale) {
        price = (item.currentPriceProduct * item.sale) / 100;
      }
      totalSum += price;
      return totalSum;
    }, 0);
    return total;
  };

  const handleCheckOrder = () => {
    if (isPopupCheckOrder) {
      refDialog.current.classList.add("isClose");
      setTimeout(() => {
        setIsPopupCheckOrder(false);
      }, 300);
    } else {
      setIsPopupCheckOrder(true);
    }
  };

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("productsInCart")) === null) {
      setDataProductCart([]);
    } else {
      setDataProductCart(JSON.parse(localStorage.getItem("productsInCart")));
    }
  }, [reloadCart]);

  useEffect(() => {
    isPopupCheckOrder && refDialog.current.classList.add("isDetail");
  }, [isPopupCheckOrder]);

  return (
    <div className="h-screen pt-[40px]">
      {dataProductCart.length === 0 && (
        <div className="flex justify-center mt-[-40px]">
          <div className="w-1/2 flex justify-center">
            <img
              className="max-w-[350px] max-h-[350px] "
              src={cartEmptyImg}
              alt="empty"
            />
          </div>
        </div>
      )}
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        <div className="h-screen overflow-scroll rounded-lg md:w-2/3">
          {/* item  */}
          {dataProductCart.length > 0 &&
            dataProductCart.map((data, index) => {
              return (
                <ProductItemCart
                  key={index}
                  data={data}
                  setReloadCart={setReloadCart}
                />
              );
            })}
        </div>
        {/* Sub total */}
        {dataProductCart.length > 0 && (
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
            <div className="mb-2 flex justify-between">
              <p className="text-gray-700">Giảm giá</p>
              <p className="text-gray-700 italic">
                {formatCurrency(priceSaleProduct())}
                <span className="mr-[8px] relative top-[-4px] font-normal text-[12px] italic">
                  đ
                </span>
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-700">Phí ship</p>
              <p className="text-gray-700 italic line-through">
                25.000
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
                  {formatCurrency(grandTotal())}
                  <span className="mr-[8px] relative top-[-4px] font-normal text-[12px] italic">
                    đ
                  </span>
                </p>
              </div>
            </div>
            <button
              onClick={handleCheckOrder}
              className="mt-6 w-full rounded-md transition-all bg-btnColor py-1.5 font-medium text-blue-50 hover:bg-btnHoverColor"
            >
              Kiểm tra
            </button>
          </div>
        )}
      </div>
      {isPopupCheckOrder && (
        <PopupWrapper>
          <div ref={refDialog} className="relative my-[40px] mx-[40px]">
            <PopupEnterAddress
              priceSaleProduct={priceSaleProduct()}
              subTotal={subTotal()}
              handleCheckOrder={handleCheckOrder}
            />
            {/* close popup  */}
            <div
              onClick={handleCheckOrder}
              className="close-dialog absolute w-[40px] h-[40px] right-[16px] top-[18px] flex items-center justify-center rounded-[50%] z-10 bg-bgDialogColor hover:bg-bgHoverColor transition-all cursor-pointer"
            >
              <FontAwesomeIcon
                icon={faXmark}
                className="icon-close-dialog text-[22px]"
              />
            </div>
          </div>
        </PopupWrapper>
      )}
    </div>
  );
};
export default CartProduct;
