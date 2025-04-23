import { useEffect, useRef, useState } from "react";

import ProductItemCart from "./component/ProductItemCart";
import { formatCurrency } from "../../components/FormatCurrency";
import cartEmptyImg from "../../assets/img/Empty_Cart.png";
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
    <div className="max-sm:h-auto h-screen pt-[40px] mb-[-40px] dark:bg-bgDarkMainColor overflow-hidden">
      <div className="max-sm:pb-[180px] mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        {dataProductCart.length === 0 && (
          <div className="flex justify-center mt-[-40px]">
            <div className="w-1/2 flex justify-center">
              <img
                className="max-w-[350px] max-h-[350px]"
                src={cartEmptyImg}
                alt="empty"
              />
            </div>
          </div>
        )}
        {/* item  */}
        {dataProductCart.length > 0 && (
          <div className="sm:h-screen sm:overflow-scroll rounded-lg md:w-2/3 pb-[20px]">
            {dataProductCart.map((data, index) => (
              <ProductItemCart
                key={index}
                data={data}
                setReloadCart={setReloadCart}
              />
            ))}
          </div>
        )}
        {/* Sub total */}
        {dataProductCart.length > 0 && (
          <div className="max-sm:fixed max-sm:bottom-0 max-sm:left-0 max-sm:right-0 max-sm:h-auto max-sm:z-20 max-sm:mt-0 max-sm:p-[10px] mt-6 h-full rounded-lg border bg-white dark:bg-bgDarkMainColor dark:text-textDarkColor p-6 shadow-md md:mt-0 md:w-1/3">
            <div className="mb-2 flex justify-between">
              <p className="max-sm:text-smTitle text-gray-700 dark:text-textDarkColor">
                Tổng phụ
              </p>
              <p className="text-gray-700 dark:text-textDarkColor">
                {formatCurrency(subTotal())}
                <span className="mr-[8px] relative top-[-4px] font-normal text-[12px] italic">
                  đ
                </span>
              </p>
            </div>
            <div className="mb-2 flex justify-between ">
              <p className="max-sm:text-smTitle text-gray-700 dark:text-textDarkColor">
                Giảm giá
              </p>
              <p className="text-gray-700 dark:text-textDarkColor italic">
                {formatCurrency(priceSaleProduct())}
                <span className="mr-[8px] relative top-[-4px] font-normal text-[12px] italic">
                  đ
                </span>
              </p>
            </div>
            <div className=" flex justify-between">
              <p className="max-sm:text-smTitle text-gray-700 dark:text-textDarkColor">
                Phí ship
              </p>
              <p className="text-gray-700 dark:text-textDarkColor italic line-through">
                25.000
                <span className="mr-[8px] relative top-[-4px] font-normal text-[12px] italic">
                  đ
                </span>
              </p>
            </div>
            <hr className="my-4" />
            <div className="max-sm:flex max-sm:justify-between max-sm:items-center">
              <div className="max-sm:gap-[20px] max-sm:items-center flex justify-between">
                <p className=" max-sm:text-smTitle text-lg font-bold">Tổng</p>
                <div className="">
                  <p className="relative max-sm:mb-0 mb-1 text-lg font-bold">
                    {formatCurrency(grandTotal())}
                    <span className="mr-[8px] absolute top-[-4px] font-normal text-[12px] italic">
                      đ
                    </span>
                  </p>
                </div>
              </div>
              <button
                onClick={handleCheckOrder}
                className="max-sm:mt-0 max-sm:w-auto max-sm:px-[20px] mt-6 w-full rounded-md transition-all bg-btnColor dark:bg-btnDarkColor py-1.5 font-medium text-blue-50 hover:bg-btnHoverColor"
              >
                Kiểm tra
              </button>
            </div>
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
              className="close-dialog absolute w-[40px] h-[40px] right-[16px] top-[18px] flex items-center justify-center rounded-[50%] z-10 bg-bgDialogColor hover:bg-bgHoverColor transition-all cursor-pointer dark:text-textDarkColor"
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
