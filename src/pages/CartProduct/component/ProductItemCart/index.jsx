import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";

import logo from "../../../../assets/img/Logo.png";
import { formatCurrency } from "../../../../components/FormatCurrency";
import BtnQuantity from "../../../../components/BtnQuantity";
import DialogDeleteProduct from "../../../../components/DialogQuestionYesNo";
import { handleRemoveProduct } from "../../../../components/Function";
import { useHandleContext } from "../../../../contexts/UserProvider";

const ProductItemCart = ({ data, setReloadCart }) => {
  const refDialog = useRef(null);

  const { setQuantityProductInCartContext } = useHandleContext();

  const [currentValue, setCurrentValue] = useState(1);
  const [isDialogDelete, setIsDialogDelete] = useState(false);

  const dataLocalStorage = JSON.parse(localStorage.getItem("productsInCart"));

  const priceParse = parseFloat(data?.currentPriceProduct);
  const saleParse = parseFloat(data?.sale);
  const priceProduct = formatCurrency(priceParse);

  const afterSaleProduct = () => {
    const afterPriceSale = formatCurrency(
      priceParse - (priceParse * saleParse) / 100
    );
    return afterPriceSale;
  };

  const handleDelete = () => {
    setIsDialogDelete(true);
  };

  const handleCloseDialog = () => {
    refDialog.current.classList.add("isClose");
    setTimeout(() => {
      if (currentValue === 0) {
        setCurrentValue(1);
      }
      setIsDialogDelete(false);
    }, 300);
  };

  const handleDeleteProduct = (id) => {
    handleCloseDialog();
    handleRemoveProduct(id);
    setReloadCart(id);
    setQuantityProductInCartContext((prev) => prev - 1);
  };

  useEffect(() => {
    dataLocalStorage.forEach((item) => {
      if (data.idProduct === item.idProduct) {
        setCurrentValue(item.quantity);
      }
    });
  }, []);

  useEffect(() => {
    if (currentValue <= 0) {
      setIsDialogDelete(true);
    } else {
      setIsDialogDelete(false);
    }
  }, [currentValue]);

  useEffect(() => {
    isDialogDelete && refDialog.current.classList.add("isDetail");
  }, [isDialogDelete]);

  return (
    <div className="max-sm:p-[8px] max-sm:gap-[5px] grid grid-cols-7 border-[2px] border-dashed border-borderColor dark:border-borderDarkColor items-center mb-6 rounded-lg p-6">
      <div className="max-sm:col-span-2 max-sm:size-[60px] col-span-1 size-[80px] rounded-lg">
        <img
          src={data?.imgProduct || logo}
          alt={data?.altImage || "img"}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="max-sm:col-[3/8] col-[2/8] sm:ml-4 sm:flex sm:w-full sm:justify-between dark:text-textDarkColor">
        <div className="max-sm:mt-0 mt-5 sm:mt-0">
          <h2 className="max-sm:text-sm text-lg font-bold text-gray-900 dark:text-textDarkColor">
            {data?.nameProduct}
          </h2>
          {data?.note && (
            <p className="max-sm:text-[8px] mt-1 italic text-[10px] text-gray-700 dark:text-textDarkColor">
              <span className="max-sm:text-smDesc text-[14px] italic underline">
                Ghi chú:{" "}
              </span>
              {"   "}
              {`" ${data?.note} "`}
            </p>
          )}
        </div>
        <div className="max-sm:mt-[8px] mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
          <BtnQuantity
            data={data}
            currentValue={currentValue}
            setCurrentValue={setCurrentValue}
            setReloadCart={setReloadCart}
          />
          <div className="flex items-center space-x-4">
            {data?.sale ? (
              <div className="max-sm:flex-col flex items-center">
                <div className="flex">
                  <span className="max-sm:text-[8px] mr-[2px] line-through text-[12px] opacity-30 italic">
                    {priceProduct}
                  </span>
                  <span className="max-sm:text-[8px] mr-[8px] relative top-[-4px] line-through font-normal text-[10px] opacity-30 italic">
                    đ
                  </span>
                </div>
                <div className="flex">
                  <span className="max-sm:text-[10px] text-[15px] font-normal">
                    {afterSaleProduct()}
                  </span>
                  <span className="max-sm:text-[8px] mr-[8px] relative top-[-4px] font-normal text-[12px] italic">
                    đ
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex items-center">
                <span className="text-[15px] font-normal">{priceProduct}</span>
                <span className="mr-[8px] relative top-[-4px] font-normal text-[12px] italic">
                  đ
                </span>
              </div>
            )}
            <span
              onClick={handleDelete}
              className="transition-[2s] cursor-pointer hover:text-textEmphasizeColor"
            >
              <FontAwesomeIcon icon={faXmark} />
            </span>
          </div>
        </div>
      </div>
      {isDialogDelete && (
        <DialogDeleteProduct
          title="Bạn có chắc xóa sản phẩm này khỏi giỏ hàng?"
          handleNo={handleCloseDialog}
          handleYes={() => handleDeleteProduct(data.idProduct)}
          refDialog={refDialog}
          textNo="Hủy"
          textYes="Đồng ý"
        />
      )}
    </div>
  );
};
export default ProductItemCart;
