import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { formatCurrency } from "../FormatCurrency";
import logo from "../../assets/img/Logo.png";
import "./index.css";
import DetailProductDialog from "../DetailProductDialog";
import { useHandleContext } from "../../contexts/UserProvider";
import { handleAddCartFnc } from "../Function";
import useSocket from "../../hooks/useSocket";

const CardProduct = ({ data }) => {
  const { statusOpenDoor } = useSocket();

  const [dataItemProduct, setDataItemProduct] = useState(data || []);
  const [displayDetail, setDisplayDetail] = useState(false);

  const { setQuantityProductInCartContext } = useHandleContext();
  const cartData = JSON.parse(localStorage.getItem("productsInCart")) || [];

  const priceParse = parseFloat(dataItemProduct?.priceProduct);
  const priceProduct = formatCurrency(priceParse);

  const handleDetail = () => {
    setDisplayDetail(true);
  };

  const afterSaleProduct = () => {
    const saleParse = parseFloat(dataItemProduct?.sale);

    const afterPriceSale = formatCurrency(
      priceParse - (priceParse * saleParse) / 100
    );
    return afterPriceSale;
  };

  const handleAddCart = (e, data) => {
    e.stopPropagation();
    if (statusOpenDoor === false) {
      toast.warn("Cửa hàng đang đóng cửa.");
    } else if (data.isActive) {
      handleAddCartFnc(data);
      const productIndex = cartData.findIndex(
        (item) => item.idProduct === data.idProduct
      );
      if (productIndex === -1) {
        setQuantityProductInCartContext((prev) => prev + 1);
      }
      toast.success("Đã thêm vào giỏ hàng!");
    } else {
      toast.warn("Món này đang tạm hết. Bạn ăn món khác nhé!");
    }
  };

  useEffect(() => {
    setDataItemProduct(data);
  }, [data]);

  return (
    <div
      onClick={handleDetail}
      className={`${
        (data.isActive === false || !statusOpenDoor) &&
        "pointer-events-none opacity-[0.6]"
      } card-wrap relative cursor-pointer border-transparent border-[2px] hover:border-textHoverColor hover:border-solid relative rounded-md grid grid-cols-3 gap-[8px] p-[12px] bg-white`}
    >
      <div className="image-product flex justify-center items-center relative col-span-1 overflow-hidden">
        <img
          className="w-[70px] h-[70px] rounded-md object-cover"
          src={dataItemProduct?.imgProduct || logo}
          alt={dataItemProduct?.nameProduct || "image"}
        />
      </div>
      <div className="content col-span-2 flex flex-col justify-between ">
        <h1 className="text-sm product-name overflow-ellipsis whitespace-nowrap overflow-hidden ">
          {dataItemProduct?.nameProduct}
        </h1>
        <p className="text-smDesc desc italic text-[10px] overflow-ellipsis whitespace-nowrap overflow-hidden">
          {dataItemProduct?.descProduct}
        </p>
        {dataItemProduct?.sale ? (
          <div className="flex items-center">
            <span className="mr-[2px] line-through text-[8px] opacity-30 italic">
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
      </div>
      <button
        onClick={(e) => handleAddCart(e, data)}
        type="button"
        className="absolute hover:bg-btnHoverColor transition-[2s] flex justify-center items-center bg-btnColor text-[16px] text-[white] rounded-[50%] right-[12px] bottom-[12px] w-[22px] h-[22px]"
      >
        <FontAwesomeIcon icon={faPlus} className="text-[12px]" />
      </button>
      {/* detail product  */}
      {displayDetail && (
        <DetailProductDialog
          data={dataItemProduct}
          displayDetail={displayDetail}
          setDisplayDetail={setDisplayDetail}
        />
      )}
      {/* hiện tem hết hàng */}
      {data.isActive === false && (
        <span className="absolute px-[8px] py-[3px] bg-[#E6E6FA] left-[-20px] rotate-[-45deg] text-[12px] font-bold">
          Hết hàng
        </span>
      )}
    </div>
  );
};
export default CardProduct;
