import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faXmark } from "@fortawesome/free-solid-svg-icons";

//Thư viện date
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import vi from "date-fns/locale/vi";

import { isEqual, startOfDay } from "date-fns";

import "./styles.css";
import PopupWrapper from "../../components/PopupWrapper";
import DetailOrder from "./components/DetailOrder";
import ItemOrder from "./components/ItemOrder";
import * as handleOrderService from "../../services/handleOrderService";
import useSocket from "../../hooks/useSocket";
import { useHandleContext } from "../../contexts/UserProvider";

const AdminOrderCustomers = () => {
  registerLocale("vi", vi);

  const { dataSubIdContext, handTakeDataSubId } = useHandleContext();
  const { messages } = useSocket();
  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedDate, setSelectedDate] = useState(new Date());
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

  //Hàm lọc sản phẩm theo ngày
  const fncFillterDateOrders = (data, selected) => {
    const fillterDateOrders = data.filter((order) =>
      isEqual(startOfDay(order.orderDate), startOfDay(selected))
    );
    return fillterDateOrders;
  };

  const handleClickToday = () => {
    setSelectedDate(new Date());
  };

  useEffect(() => {
    const orderType = searchParams.get("order");
    const statusMap = {
      "new-order": "isPreparing",
      "history-order": "isDelivered",
      "canceled-order": "isCanceled",
    };

    if (orderType === "pre-order") {
      setDataOrderUser([]);
      return;
    }

    if (statusMap[orderType]) {
      setIsLoading(true);
      handleOrderService
        .getAllOrder()
        .then((res) => {
          const dataFilter = res.data.filter(
            (item) => item.statusOrder[statusMap[orderType]] === true
          );
          const finalData = fncFillterDateOrders(dataFilter, selectedDate);

          setDataOrderUser(finalData);
        })
        .catch((err) => console.log(`Lỗi order ${orderType}`, err))
        .finally(() => setIsLoading(false));
    }
  }, [messages, searchParams, callbackAPI, selectedDate]);

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
          <div className="max-sm:left-0 max-sm:z-1 fixed top-[180px] right-0 left-[180px] mb-[20px] mx-[20px] z-10">
            <div className=" flex text-xs text-gray-700 uppercase bg-gray-50 border-b-[2px] border-b-borderColor ">
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
            {/* Chọn ngày  */}
            <div className="flex items-center justify-end gap-[20px] p-[5px] bg-white shadow-md">
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                locale="vi"
                dateFormat="dd/MM/yyyy"
                className="p-[4px] border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                calendarClassName="bg-white shadow-lg rounded-lg border border-gray-200"
              />
              <span
                onClick={handleClickToday}
                className="max-sm:text-[14px] px-[10px] py-[5px] rounded-md bg-btnColor hover:bg-btnHoverColor text-white transition-all cursor-pointer"
              >
                Hôm nay
              </span>
            </div>
          </div>

          {/* Box Item các đơn hàng */}
          <div className="mt-[140px] max-sm:z-0">
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
