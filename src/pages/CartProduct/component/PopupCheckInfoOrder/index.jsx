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
  } = useHandleContext();
  const { sendMessage, connected } = useSocket();
  const [totalBill, setTotalBill] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  const [dataProductInCart, setDataProductInCart] = useState(
    JSON.parse(localStorage.getItem("productsInCart")) || []
  );

  const handleOrder = () => {
    const subId = uuidv4();
    const dataOrder = {
      data: dataProductInCart,
      ...dataUserOrder,
      totalBill,
      subId,
      userOrderId: user?.id,
    };
    setIsLoading(true);
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
  };

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
        <div className="flex">
          <h1 className="w-[40%] text-left font-bold">Tên mặt hàng</h1>
          <p className="w-[20%] text-right font-bold">Số lượng</p>
          <p className="w-[40%] text-right font-bold">Giá tiền</p>
        </div>
        <div className="border border-bgEmphasizeColor bg-[#FFF9E3]">
          {/* Item product  */}
          <div className="p-[5px] h-[130px] mt-[10px] overflow-y-auto">
            {dataProductInCart.map((data, index) => {
              return <ItemProduct key={index} data={data} />;
            })}
          </div>
          <div className="text-right">
            <h1 className="text-[15px] uppercase font-bold text-right">
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
      <div className="w-full p-[5px] h-[150px] mt-[10px] overflow-y-auto border border-bgEmphasizeColor ">
        <h1 className="uppercase font-bold">Địa chỉ</h1>
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
      <div className="w-full mt-[20px] text-right">
        <span
          onClick={handleCloseCheckInfoOrder}
          className="text-white uppercase font-bold px-[20px] py-[8px] rounded-md bg-[red] hover:bg-red-400 cursor-pointer transition-all"
        >
          Trở lại
        </span>
        <span
          onClick={handleOrder}
          className={`${
            isLoading && "bg-btnHoverColor pointer-events-none"
          } ml-[15px] text-white uppercase font-bold px-[20px] py-[8px] rounded-md bg-btnColor hover:bg-btnHoverColor cursor-pointer transition-all`}
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
