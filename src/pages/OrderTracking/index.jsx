import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faSpinner, faXmark } from "@fortawesome/free-solid-svg-icons";

import bikeShip from "../../assets/img/freeShip.png";
import * as handleOrderService from "../../services/handleOrderService";
import { toast } from "react-toastify";
import ItemOrderTracking from "./components/ItemOrderTracking";
import PopupWrapper from "../../components/PopupWrapper";
import DetailOrderTracking from "./components/DetailOrderTracking";
import { useHandleContext } from "../../contexts/UserProvider";

const OrderTracking = () => {
  const { renderOrderByIdUserContext } = useHandleContext();

  const codeRef = useRef(null);
  const refDialogDetailOrder = useRef(null);

  const [copied, setCopied] = useState(false);
  const [isCode, setIsCode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisplayDetailOrderTracking, setIsDisplayDetailOrderTracking] =
    useState(false);

  const [codeOrderCustomer, setCodeOrderCustomer] = useState(null);
  const [dataOrderCustomer, setDataOrderCustomer] = useState(null);
  const [dataDetailOrderCustomer, setDataDetailOrderCustomer] = useState(null);
  const [valueCode, setValueCode] = useState("");

  const handleCopyCode = () => {
    codeRef.current.select();
    document.execCommand("copy");
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  const handleChangeCode = (e) => {
    setValueCode(e.target.value);
  };

  const handleClickItemOrderTracking = (data) => {
    if (isDisplayDetailOrderTracking) {
      refDialogDetailOrder.current.classList.add("isClose");
      setTimeout(() => {
        setIsDisplayDetailOrderTracking(false);
      }, 300);
    } else {
      setIsDisplayDetailOrderTracking(true);
      setDataDetailOrderCustomer(data);
    }
  };

  const handleTakeCodeOrder = () => {
    if (localStorage.getItem("subCodeOrder")) {
      setCodeOrderCustomer(localStorage.getItem("subCodeOrder"));
      setIsCode(true);
    } else {
      toast.warning("Bạn chưa có đơn hàng nào.");
      setIsCode(false);
    }
  };

  const fncCallApiOrderBySubId = () => {
    handleOrderService
      .getOrderBySubId(valueCode)
      .then((res) => {
        if (res.status === 200) {
          if (res.data.data.length === 0) {
            toast.warning("Mã đơn hàng không khớp. Vui lòng thử lại!");
          } else {
            setDataOrderCustomer(res.data.data[0]);
          }
        } else {
          toast.warning(
            "Lỗi không tìm được đơn hàng. Vui lòng liên hệ nhà hàng nếu bạn đã đặt hàng!"
          );
        }
      })
      .catch((err) => console.log("Lỗi lấy mã đơn hàng", err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleFindOrder = () => {
    setIsLoading(true);
    if (valueCode !== "") {
      fncCallApiOrderBySubId();
    } else {
      toast.warning("Vui lòng nhập mã đơn hàng!");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (valueCode) {
      fncCallApiOrderBySubId();
    }
  }, [renderOrderByIdUserContext]);

  useEffect(() => {
    isDisplayDetailOrderTracking &&
      refDialogDetailOrder.current.classList.add("isDetail");
  }, [isDisplayDetailOrderTracking]);

  return (
    <div className="px-[20px] py-[30px] mb-[-20px] bg-bgMainColor">
      {/* Mã đơn hàng  */}
      <div className="max-sm:flex-col flex gap-[10px]">
        <span className="max-sm:text-[12px]">
          Nhập <p className="inline font-bold">Mã đơn hàng</p> để tìm kiếm đơn
          hàng:
        </span>
        <div className="">
          {isCode ? (
            <div>
              <input
                className="max-sm:text-[12px] max-sm:text-inputSize pr-[10px] outline-none bg-bgMainColor font-bold"
                type="text"
                ref={codeRef}
                value={codeOrderCustomer}
                readOnly
              />
              <span
                onClick={handleCopyCode}
                className="max-sm:text-[12px] select-none px-[10px] py-[5px] rounded-md bg-btnColor hover:bg-btnHoverColor text-white transition-[2s] cursor-pointer"
              >
                {copied ? <FontAwesomeIcon icon={faCheck} /> : "Sao chép"}
              </span>
            </div>
          ) : (
            <span
              onClick={handleTakeCodeOrder}
              className="select-none px-[10px] py-[5px] rounded-md bg-btnColor hover:bg-btnHoverColor text-white transition-[2s] cursor-pointer"
            >
              Lấy mã
            </span>
          )}
        </div>
      </div>
      {/* Tìm kiếm  */}
      <div className="max-sm:w-full w-1/2 mx-auto">
        <div className="mt-[20px] border focus:border-yellow-500 rounded-md flex items-center overflow-hidden">
          <input
            type="text"
            placeholder="Nhập mã đơn hàng..."
            className="max-sm:text-inputSize py-2 px-3 focus:outline-none flex-1 "
            value={valueCode}
            onChange={handleChangeCode}
          />
          <button
            onClick={handleFindOrder}
            className="max-sm:text-sm transition-[2s] bg-btnColor hover:bg-btnHoverColor text-white px-4 py-2 "
          >
            {isLoading ? (
              <FontAwesomeIcon className="loading" icon={faSpinner} />
            ) : (
              "Tìm kiếm"
            )}
          </button>
        </div>
      </div>
      {/* Đơn hàng */}
      <div className="mt-[20px]">
        {dataOrderCustomer ? (
          <ItemOrderTracking
            handleClickItemOrderTracking={handleClickItemOrderTracking}
            data={dataOrderCustomer}
          />
        ) : (
          <div className="flex flex-col justify-center items-center">
            <img className="bike-ship w-[250px]" src={bikeShip} alt="order" />
            <p>Chưa có đơn hàng nào!</p>
          </div>
        )}
      </div>
      {/* Chi tiết đơn hàng */}
      {isDisplayDetailOrderTracking && (
        <PopupWrapper>
          <div
            ref={refDialogDetailOrder}
            className="relative my-[20px] mx-[40px]"
          >
            <DetailOrderTracking
              handleClickItemOrderTracking={handleClickItemOrderTracking}
              data={dataDetailOrderCustomer}
            />
            {/* close popup  */}
            <div
              onClick={handleClickItemOrderTracking}
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

export default OrderTracking;
