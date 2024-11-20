import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

import ItemProduct from "./component/ItemProduct";
import { formatCurrency } from "../../../../components/FormatCurrency";
import * as handleOrderService from "../../../../services/handleOrderService";
import useSocket from "../../../../hooks/useSocket";
import { useHandleContext } from "../../../../contexts/UserProvider";

const PopupCheckInfoOrder = ({
  handleCloseCheckInfoOrder,
  handleCheckOrder,
  dataUserOrder,
}) => {
  const navigate = useNavigate();

  const {
    user,
    setQuantityProductInCartContext,
    setRenderOrderByIdUserContext,
    dataAllProductContext,
  } = useHandleContext();

  const { sendMessage, connected, statusOpenDoor } = useSocket();

  const [totalBill, setTotalBill] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  const [dataProductInCart, setDataProductInCart] = useState(
    JSON.parse(localStorage.getItem("productsInCart")) || []
  );

  const [dataUpdatedCartStatus, setDataUpdatedCartStatus] = useState([]);

  // Tạo mảng chứa tất cả các sản phẩm từ mọi danh mục
  const allProductsFlattened = dataAllProductContext.flatMap(
    (category) => category.products
  );

  const fncupdatedCartStatus = () => {
    const updatedCartStatus = dataProductInCart.map((cartItem) => {
      const productFromDb = allProductsFlattened.find(
        (dbItem) => dbItem.idProduct === cartItem.idProduct
      );

      return {
        ...cartItem,
        isActive: productFromDb ? productFromDb.isActive : false,
      };
    });
    setDataUpdatedCartStatus(updatedCartStatus);
  };

  const handleOrder = () => {
    setIsLoading(true);
    //Check product isActive
    const productNotActive = dataUpdatedCartStatus.filter(
      (product) => product.isActive === false
    );
    const subId = uuidv4();
    const dataOrder = {
      data: dataProductInCart,
      ...dataUserOrder,
      totalBill,
      subId,
      userOrderId: user?.id,
    };

    if (productNotActive.length > 0) {
      const productNames = productNotActive
        .map((product) => product.nameProduct)
        .join(", ");
      toast.warn(`Sản phẩm ${productNames} đang hết hàng`);
      setIsLoading(false);
    } else {
      if (statusOpenDoor) {
        if (connected) {
          handleOrderService
            .postOrder(dataOrder)
            .then((res) => {
              if (res.status === 201) {
                sendMessage({
                  ...dataUserOrder,
                  isNewNotify: true,
                  isCanceled: false,
                  subId,
                });
                toast.success("Đặt hàng thành công!");
                handleCloseCheckInfoOrder();
                handleCheckOrder();
                setQuantityProductInCartContext(0);
                setRenderOrderByIdUserContext(subId);
                localStorage.removeItem("productsInCart");
                localStorage.setItem("subCodeOrder", subId);
                navigate("/order-tracking");
              }
            })
            .catch((err) => console.log("Lỗi order", err))
            .finally(() => setIsLoading(false));
        } else {
          toast.warn("Mạng kém vui lòng thử lại!");
          handleCheckOrder();
          handleCloseCheckInfoOrder();
          setIsLoading(false);
        }
      } else {
        toast.warn("Nhà hàng đang đóng cửa. Thời gian mở cửa 9h - 22h");
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    fncupdatedCartStatus();
  }, [dataAllProductContext]);

  useEffect(() => {
    const total = dataProductInCart.reduce((totalSum, item) => {
      let price = item.currentPriceProduct;

      if (item.sale) {
        price =
          item.currentPriceProduct -
          (item.currentPriceProduct * item.sale) / 100;
      }
      totalSum += price;
      return totalSum;
    }, 0);
    setTotalBill(total);
  }, []);

  return (
    <div className="flex flex-col w-9/12 mx-auto items-center justify-center pt-[20px] pb-[20px] px-[20px] bg-white shadow-lg rounded-lg overflow-hidden">
      <h1 className="text-[20px] uppercase font-bold">Xem lại đơn hàng</h1>
      {/* Đơn hàng  */}
      <div className="w-full mt-[20px]">
        <div className="max-sm:mb-[10px] flex">
          <h1 className="max-sm:text-smDesc w-[40%] text-left font-bold">
            Tên mặt hàng
          </h1>
          <p className="max-sm:text-smDesc w-[20%] text-right font-bold">
            Số lượng
          </p>
          <p className="max-sm:text-smDesc w-[40%] text-right font-bold">
            Giá tiền
          </p>
        </div>
        <div className="border border-bgEmphasizeColor bg-[#FFF9E3]">
          {/* Item product  */}
          <div className="p-[5px] h-[130px] mt-[10px] overflow-y-auto">
            {dataProductInCart.map((data, index) => {
              return <ItemProduct key={index} data={data} />;
            })}
          </div>
          <div className="text-right">
            <h1 className="max-sm:text-sm text-[15px] uppercase font-bold text-right">
              Tổng hóa đơn:
            </h1>
            <span className="text-[15px]">{formatCurrency(totalBill)}</span>
            <span className="mr-[8px] relative top-[-4px] font-normal text-[10px] italic">
              đ
            </span>
          </div>
        </div>
      </div>
      {/* Địa chỉ  */}
      <div className="max-sm:px-[12px] w-full p-[5px] h-[150px] mt-[10px] overflow-y-auto border border-bgEmphasizeColor ">
        <h1 className="max-sm:text-sm uppercase font-bold">Địa chỉ</h1>
        <div className="ml-[20px]">
          <p className="text-left font-bold">
            Tên:{" "}
            <span className="font-normal italic">
              {dataUserOrder.nameCustomers}
            </span>
          </p>
          <p className="text-left font-bold">
            Số điện thoại:{" "}
            <span className="font-normal italic">
              {dataUserOrder.phoneCustomers}
            </span>
          </p>
          <p className="text-left font-bold">
            Địa chỉ:{" "}
            <span className="font-normal italic">
              {dataUserOrder.addressCustomers}
            </span>
          </p>
        </div>
      </div>
      {/* Button check order  */}
      <div className="max-sm:flex max-sm:justify-between w-full mt-[20px] text-right">
        <span
          onClick={handleCloseCheckInfoOrder}
          className="max-sm:px-[10px] text-white uppercase font-bold px-[20px] py-[8px] rounded-md bg-[red] hover:bg-red-400 cursor-pointer transition-all"
        >
          Trở lại
        </span>
        <span
          onClick={handleOrder}
          className={`${
            isLoading && " bg-btnHoverColor pointer-events-none"
          } max-sm:px-[10px] ml-[15px] text-white uppercase font-bold px-[20px] py-[8px] rounded-md bg-btnColor hover:bg-btnHoverColor cursor-pointer transition-all`}
        >
          {isLoading ? (
            <FontAwesomeIcon className="loading" icon={faSpinner} />
          ) : (
            "Đặt hàng"
          )}
        </span>
      </div>
    </div>
  );
};

export default PopupCheckInfoOrder;
