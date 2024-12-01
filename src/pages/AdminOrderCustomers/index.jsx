import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faXmark } from "@fortawesome/free-solid-svg-icons";

import "./styles.css";
import PopupWrapper from "../../components/PopupWrapper";
import DetailOrder from "./components/DetailOrder";
import ItemOrder from "./components/ItemOrder";
import * as handleOrderService from "../../services/handleOrderService";
import useSocket from "../../hooks/useSocket";
import { useHandleContext } from "../../contexts/UserProvider";

const AdminOrderCustomers = () => {
  const { dataSubIdContext, handTakeDataSubId } = useHandleContext();
  const { messages } = useSocket();
  const [searchParams, setSearchParams] = useSearchParams();

  const [dataOrderUser, setDataOrderUser] = useState([]);
  const [dataDetail, setDataDetail] = useState({});

  const refDialogDetailOrder = useRef(null);

  const [currentPage, setCurrentPage] = useState("");
  const [callbackAPI, setCallbackApi] = useState("");
  const [isDisplayDetailOrder, setIsDisplayDetailOrder] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDetail = (data) => {
    if (isDisplayDetailOrder) {
      refDialogDetailOrder.current.classList.add("isClose");
      setTimeout(() => {
        setIsDisplayDetailOrder(!isDisplayDetailOrder);
      }, 300);
      handTakeDataSubId("");
    } else {
      setDataDetail(data);
      setIsDisplayDetailOrder(!isDisplayDetailOrder);
    }
  };

  useEffect(() => {
    if (searchParams.get("order") === "new-order") {
      setIsLoading(true);
      handleOrderService
        .getAllOrder()
        .then((res) => {
          const dataFilter = res.data.filter(
            (item) => item.statusOrder.isPreparing === true
          );
          setDataOrderUser(dataFilter);
        })
        .catch((err) => console.log("Lỗi order new-order", err))
        .finally(() => {
          setIsLoading(false);
        });
    } else if (searchParams.get("order") === "history-order") {
      setIsLoading(true);
      handleOrderService
        .getAllOrder()
        .then((res) => {
          const dataFilter = res.data.filter(
            (item) => item.statusOrder.isDelivered === true
          );
          setDataOrderUser(dataFilter);
        })
        .catch((err) => console.log("Lỗi order new-order", err))
        .finally(() => {
          setIsLoading(false);
        });
    } else if (searchParams.get("order") === "canceled-order") {
      setIsLoading(true);
      handleOrderService
        .getAllOrder()
        .then((res) => {
          const dataFilter = res.data.filter(
            (item) => item.statusOrder.isCanceled === true
          );
          setDataOrderUser(dataFilter);
        })
        .catch((err) => console.log("Lỗi order new-order", err))
        .finally(() => {
          setIsLoading(false);
        });
    } else if (searchParams.get("order") === "pre-order") {
      setDataOrderUser([]);
    }
  }, [messages, searchParams, callbackAPI]);

  useEffect(() => {
    setCurrentPage(searchParams.get("order"));
    setDataOrderUser([]);
  }, [searchParams]);

  useEffect(() => {
    isDisplayDetailOrder &&
      refDialogDetailOrder.current.classList.add("isDetail");
  }, [isDisplayDetailOrder]);

  useEffect(() => {
    if (dataSubIdContext != "") {
      const dataFillter = dataOrderUser.find(
        (item) => item.subId === dataSubIdContext
      );
      handleDetail(dataFillter);
    }
  }, [dataSubIdContext]);

  return (
    <div className="max-w-full">
      <h1 className="max-sm:left-0 max-sm:z-1 fixed top-[120px] right-0 left-[180px] mx-[20px] py-[10px] text-[32px] bg-white font-bold text-center z-10">
        Quản lý đơn hàng
      </h1>
      <div className="shadow-md sm:rounded-lg ">
        {/* table  */}
        <div className="flex flex-col">
          {/* Router đơn hàng: đặt trước, đơn mới, lịch sử */}
          <div className="max-sm:left-0 max-sm:z-1 text-xs fixed top-[180px] right-0 left-[180px] mb-[20px] mx-[20px] flex text-gray-700 uppercase bg-gray-50 border-b-[2px] border-b-borderColor z-10">
            {/* Đặt trước  */}
            <div className="w-1/4 h-[40px] text-center border-r-[2px] border-r-borderColor">
              <Link
                className={`block font-bold w-full h-full leading-[40px] hover:bg-bgHoverColor ${
                  currentPage === "pre-order" && "bg-bgHoverColor"
                }`}
                to="/admin/order?order=pre-order"
              >
                Đặt trước
              </Link>
            </div>
            {/* Đơn mới  */}
            <div className="w-1/4 text-center border-r-[2px] border-r-borderColor">
              <Link
                className={`block font-bold w-full h-full leading-[40px] hover:bg-bgHoverColor ${
                  currentPage === "new-order" && "bg-bgHoverColor"
                }`}
                to="/admin/order?order=new-order"
              >
                Đơn mới
              </Link>
            </div>
            {/* Lịch sử  */}
            <div className="w-1/4 text-center border-r-[2px] border-r-borderColor">
              <Link
                className={`block font-bold w-full h-full leading-[40px] hover:bg-bgHoverColor ${
                  currentPage === "history-order" && "bg-bgHoverColor"
                }`}
                to="/admin/order?order=history-order"
              >
                Lịch sử
              </Link>
            </div>
            {/* Đơn hủy  */}
            <div className="w-1/4 text-center">
              <Link
                className={`block font-bold w-full h-full leading-[40px] hover:bg-bgHoverColor ${
                  currentPage === "canceled-order" && "bg-bgHoverColor"
                }`}
                to="/admin/order?order=canceled-order"
              >
                Đã hủy
              </Link>
            </div>
          </div>
          {/* Box Item các đơn hàng */}
          <div className="mt-[100px] max-sm:z-0">
            {/* Loading  */}
            {isLoading && (
              <div className="flex justify-center">
                <FontAwesomeIcon className="loading" icon={faSpinner} />
              </div>
            )}
            {/* Item đơn hàng  */}
            {dataOrderUser.length > 0 &&
              dataOrderUser.map((item, index) => {
                return (
                  <ItemOrder
                    key={index}
                    dataOrderUser={dataOrderUser}
                    data={item}
                    handleDetail={handleDetail}
                  />
                );
              })}
            {/* Detail đơn hàng  */}
            {isDisplayDetailOrder && (
              <PopupWrapper>
                <div
                  ref={refDialogDetailOrder}
                  className="relative my-[20px] mx-[40px]"
                >
                  <DetailOrder
                    handleDetail={handleDetail}
                    dataDetail={dataDetail}
                    setCallbackApi={setCallbackApi}
                  />
                  {/* close popup  */}
                  <div
                    onClick={handleDetail}
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
        </div>
      </div>
    </div>
  );
};
export default AdminOrderCustomers;
