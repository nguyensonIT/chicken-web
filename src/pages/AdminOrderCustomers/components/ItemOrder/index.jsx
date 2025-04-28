import moment from "moment";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

import "./styles.css";
import { formatCurrency } from "../../../../components/FormatCurrency";
import { useHandleContext } from "../../../../contexts/UserProvider";
import { useSearchParams } from "react-router-dom";

const ItemOrder = ({ data, handleDetail, dataOrderUser }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { handleRenderNotifyAdminContext } = useHandleContext();

  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isAddClass, setIsAddClass] = useState(true);

  const [isTimeUp, setIsTimeUp] = useState(false);

  // Parse chuỗi ngày giờ
  const m = moment(data.orderDate);

  // Tách ngày tháng
  const datePart = m.format("DD-MM-YYYY"); // vd "2024-09-14"

  // Tách giờ
  const timePart = m.format("HH:mm"); // vd "07:47:46"

  //Đếm đơn
  const [count] = data.orderNumber.split("-");

  const handleDetailFnc = () => {
    const dataLocal = JSON.parse(localStorage.getItem("notify"));

    dataOrderUser.forEach((item) => {
      if (data._id === item._id) {
        setIsAddClass(false);
      }
    });
    if (dataLocal !== null && dataLocal.length > 0) {
      const dataLocalNew = dataLocal.filter(
        (item) => item.subId !== data.subId
      );
      localStorage.setItem("notify", JSON.stringify(dataLocalNew));
      handleRenderNotifyAdminContext(dataLocalNew);
    }

    handleDetail(data);
  };

  const fncTakeIdEqualDayOrder = () => {
    const parts = datePart.split("-");
    const day = parts[0];
    const month = parts[1];
    const result = day + month;
    return result;
  };

  const fncTakeIdEqualIdOrder = () => {
    const length = data._id.length;
    const lastFiveChars = data._id.substring(length - 5);
    return lastFiveChars;
  };

  useEffect(() => {
    const endTime = new Date(data.orderDate).getTime() + 30 * 60 * 1000;

    const updateTimer = () => {
      const now = Date.now();
      const timeLeft = Math.max(0, Math.floor((endTime - now) / 1000));
      setTimeRemaining(timeLeft);

      if (timeLeft <= 0) {
        setIsTimeUp(true);
      } else {
        setIsTimeUp(false);
      }
    };

    updateTimer(); // Update immediately
    const intervalId = setInterval(updateTimer, 1000);

    return () => clearInterval(intervalId); // Clean up on unmount
  }, [data]);

  return (
    <div
      onClick={() => handleDetailFnc()}
      className={`${
        searchParams.get("order") === "new-order" && isAddClass && "item-order"
      } bg-white relative p-[10px] mb-[10px] flex border border-borderColor hover:bg-gray-50 cursor-pointer`}
    >
      <div className="w-1/2 flex flex-col border-r-[2px] border-r-borderColor">
        {/* STT đơn hàng, id đơn hàng, tên khách hàng  */}
        <div className="max-sm:text-smDesc flex items-center">
          <span className="flex text-white justify-center items-center w-[20px] h-[20px] bg-bgEmphasizeColor">
            {count}
          </span>
          <span className="font-bold ml-[5px]">
            #{`${fncTakeIdEqualDayOrder()}-${fncTakeIdEqualIdOrder()}`}
          </span>
        </div>
        <span className="max-sm:text-smDesc text-[16px]">
          Đã đặt vào <p className="inline-block font-bold">{timePart}</p> (Giao
          trong 30p)
        </span>
        <h1 className="max-sm:w-[150px] max-sm:text-[14px] max-sm:truncate font-bold">
          {data.nameCustomers}
        </h1>
      </div>
      <div className="max-sm:text-[14px] w-1/2 flex justify-around items-end ">
        <p className="font-bold">{data.data.length} món</p>
        <p className="font-bold">
          {formatCurrency(data.totalBill)}{" "}
          <span className="relative underline mr-[8px] text-[14px] top-[-4px] italic">
            đ
          </span>
        </p>
      </div>
      {/* thời gian đếm ngược */}
      {data.statusOrder.isPreparing && (
        <div
          className={`${
            isTimeUp && "time-timeup"
          } max-sm:text-smDesc absolute top-0 right-0 flex px-[20px] py-[5px] border-l-[1px] rounded-md border-b-[1px] border-l-borderColor border-b-borderColor`}
        >
          <p>Chuẩn bị trong: </p>
          <p
            className={`${
              isTimeUp && "text-textEmphasizeColor"
            } font-bold ml-[5px]`}
          >{`${Math.floor(timeRemaining / 60)}:${timeRemaining % 60}`}</p>
        </div>
      )}
      {data.statusOrder.isDelivered && (
        <div className="max-sm:text-smDesc absolute top-0 right-0 flex px-[20px] py-[5px] border-l-[1px] rounded-md border-b-[1px] border-l-borderColor border-b-borderColor">
          <p>
            Đã giao hàng <FontAwesomeIcon icon={faCheck} />
          </p>
        </div>
      )}
      {data.statusOrder.isCanceled && (
        <div className="max-sm:text-smDesc absolute top-0 right-0 flex px-[20px] py-[5px] border-l-[1px] rounded-md border-b-[1px] border-l-borderColor border-b-borderColor">
          <p>Đơn hàng bị hủy</p>
        </div>
      )}
    </div>
  );
};

export default ItemOrder;
