import ReactDOM from "react-dom";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

import logo from "../../assets/img/Logo.png";
import { formatCurrency } from "../FormatCurrency";
import "./style.css";
import BtnQuantity from "../BtnQuantity";
import { handleAddCartWithQuantityFnc } from "../Function";
import { useHandleContext } from "../../contexts/UserProvider";

function DetailProductDialog({ data, setDisplayDetail, displayDetail }) {
  const { setQuantityProductInCartContext } = useHandleContext();
  const cartData = JSON.parse(localStorage.getItem("productsInCart")) || [];

  const dialogRef = useRef(null);
  const imgRef = useRef(null);
  const detailRef = useRef(null);
  const detailImgRef = useRef(null);

  const [isDisplayImg, setIsDisplayImg] = useState(false);
  const priceParse = parseFloat(data.priceProduct);
  const priceProduct = formatCurrency(priceParse);

  const [currentValue, setCurrentValue] = useState(1);
  const [note, setNote] = useState("");

  const handleChangeNote = (e) => {
    setNote(e.target.value);
  };

  const afterSaleProduct = () => {
    const saleParse = parseFloat(data.sale);

    const afterPriceSale = formatCurrency(
      priceParse - (priceParse * saleParse) / 100
    );
    return afterPriceSale;
  };

  const handleClose = (e) => {
    if (dialogRef.current && e.target === dialogRef.current) {
      detailRef.current.classList.add("isClose");
      setTimeout(() => {
        setDisplayDetail(false);
      }, 300);
    }
  };

  const handleCloseImg = (e) => {
    if (imgRef.current && e.target === imgRef.current) {
      detailImgRef.current.classList.add("isClose");
      setTimeout(() => {
        setIsDisplayImg(false);
      }, 300);
    }
  };
  const handleClickImg = () => {
    setIsDisplayImg(true);
  };

  const handleAddCart = (data) => {
    handleAddCartWithQuantityFnc(data, currentValue, note);
    const productIndex = cartData.findIndex(
      (item) => item.idProduct === data.idProduct
    );
    if (productIndex === -1) {
      setQuantityProductInCartContext((prev) => prev + 1);
    }
    toast.success("Đã thêm vào giỏ hàng!");
    detailRef.current.classList.add("isClose");
    setTimeout(() => {
      setDisplayDetail(false);
    }, 300);
  };

  useEffect(() => {
    displayDetail && detailRef.current.classList.add("isDetail");
  }, [displayDetail]);

  useEffect(() => {
    isDisplayImg && detailImgRef.current.classList.add("isDetail");
  }, [isDisplayImg]);

  useEffect(() => {
    if (currentValue === 0) {
      detailRef.current.classList.add("isClose");
      setTimeout(() => {
        setDisplayDetail(false);
      }, 300);
    }
  }, [currentValue]);

  return ReactDOM.createPortal(
    <div
      onClick={(e) => handleClose(e)}
      ref={dialogRef}
      className="fixed z-[999] top-0 bottom-0 right-0 left-0 bg-bgDialogColor    "
    >
      <div
        ref={detailRef}
        className="max-sm:w-[90%] max-sm:my-[50%] my-[40px] w-[400px] mx-auto "
      >
        <div className="p-[8px] bg-white shadow-lg rounded-lg overflow-hidden max-w-md">
          <div className="flex ">
            <div className="w-1/3 flex justify-center items-center">
              <div
                onClick={handleClickImg}
                className="w-[120px] h-[120px] p-[5px] border-solid border-[1px] border-borderColor cursor-pointer"
              >
                <img
                  src={data.imgProduct || logo}
                  alt="img"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="w-2/3 p-4">
              <h1 className="max-sm:text-smTitle text-gray-900 font-bold text-2xl">
                {data.nameProduct}
              </h1>
              <p className="max-sm:text-smDesc mt-2 text-gray-600 text-sm italic">
                {data.descProduct}
              </p>
              <div className="flex item-center justify-between mt-3">
                {data.sale ? (
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
                    <span className="text-[15px] font-normal">
                      {priceProduct}
                    </span>
                    <span className="mr-[8px] relative top-[-4px] font-normal text-[12px] italic">
                      đ
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-end items-end">
            <BtnQuantity
              currentValue={currentValue}
              setCurrentValue={setCurrentValue}
            />
            <div className="w-full my-[20px]">
              <span className="italic underline">Ghi chú:</span>
              <textarea
                value={note}
                onChange={handleChangeNote}
                className="max-sm:text-inputSize w-full px-[10px] py-[10px] mt-[10px] italic text-[12px] outline-none border border-borderColor rounded-md"
                rows="2"
                placeholder="VD: Không cay,..."
              ></textarea>
            </div>
            <button
              onClick={() => handleAddCart(data)}
              className="px-3 py-2 transition-[2s] bg-btnColor hover:bg-btnHoverColor text-white text-xs font-bold uppercase rounded"
            >
              <span className="mr-[4px]">
                <FontAwesomeIcon icon={faCartPlus} />
              </span>
              Thêm
            </button>
          </div>
        </div>
      </div>
      {isDisplayImg && (
        <div
          ref={imgRef}
          onClick={(e) => handleCloseImg(e)}
          className="absolute top-0 bottom-0 right-0 left-0 bg-bgDialogColor"
        >
          <div
            ref={detailImgRef}
            className="max-sm:w-[90%] max-sm:h-auto max-sm:my-[40%] mx-auto mt-[30px] w-[400px] h-[400px] bg-white "
          >
            <img
              className="w-full h-full object-contain"
              src={data.imgProduct || logo}
              alt={data.altImg || "img"}
            />
          </div>
        </div>
      )}
    </div>,
    document.querySelector("body")
  );
}

export default DetailProductDialog;
