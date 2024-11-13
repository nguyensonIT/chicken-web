import moment from "moment";
import { v4 as uuidv4 } from "uuid";

import { formatCurrency } from "../../../../components/FormatCurrency";
import DialogQuestionYesNo from "../../../../components/DialogQuestionYesNo";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import * as handleOrderService from "../../../../services/handleOrderService";
import { useHandleContext } from "../../../../contexts/UserProvider";
import useSocket from "../../../../hooks/useSocket";

const DetailOrderTracking = ({
  data,
  handleClickItemOrderTracking = () => {},
}) => {
  // Parse chuỗi ngày giờ
  const m = moment(data.orderDate);
  // Tách ngày tháng
  const datePart = m.format("DD-MM-YYYY"); // vd "2024-09-14"
  // Tách giờ
  const timePart = m.format("HH:mm"); // vd "07:47:46"

  const { sendMessage, connected } = useSocket();

  const { setRenderOrderByIdUserContext } = useHandleContext();

  const [canCancel, setCanCancel] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState(0);

  const refDialogCancel = useRef(null);
  const [isLogCancel, setIsLogCancel] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [dataSendServer, setDataSendServer] = useState(null);

  const handleLogCancel = () => {
    if (isLogCancel) {
      refDialogCancel.current.classList.add("isClose");
      setTimeout(() => {
        setIsLogCancel(!isLogCancel);
      }, 300);
    } else {
      setIsLogCancel(!isLogCancel);
    }
  };

  const handleCancel = () => {
    setIsLoading(true);
    if (canCancel) {
      if (connected) {
        handleOrderService
          .canceledOderByCustomer({ id: data._id })
          .then((res) => {
            if (res.status && res.status === 200) {
              toast.warn("Đơn hàng đã bị hủy!");
              handleClickItemOrderTracking();
              handleLogCancel();
              setRenderOrderByIdUserContext(uuidv4());
              setDataSendServer({
                ...res.data.data,
                isNewNotify: true,
                isCanceled: true,
              });
            } else if (res.response && res.response.status === 400) {
              toast.warn("Đã quá 3 phút để hủy đơn!");
            }
          })
          .finally(() => setIsLoading(false));
      } else {
        toast.warn("Mạng kém vui lòng thử lại!");
        setIsLoading(false);
      }
    } else {
      toast.warn("Không thể hủy đơn hàng do đã hết thời gian!");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const endTime = new Date(data.orderDate).getTime() + 3 * 60 * 1000;

    const updateTimer = () => {
      const now = Date.now();
      const timeLeft = Math.max(0, Math.floor((endTime - now) / 1000));
      setTimeRemaining(timeLeft);

      if (timeLeft <= 0) {
        setCanCancel(false);
      } else {
        setCanCancel(true);
      }
    };

    updateTimer(); // Update immediately
    const intervalId = setInterval(updateTimer, 1000);

    return () => clearInterval(intervalId); // Clean up on unmount
  }, []);

  useEffect(() => {
    if (dataSendServer) {
      sendMessage(dataSendServer);
    }
  }, [dataSendServer]);

  useEffect(() => {
    isLogCancel && refDialogCancel.current.classList.add("isDetail");
  }, [isLogCancel]);

  return (
    <div className="flex flex-col items-center justify-center pt-[60px] pb-[20px] px-[20px] bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="w-full flex border border-borderColor">
        {/* Left  */}
        <div className="w-1/2 border border-borderColor">
          <h1 className="py-[20px] text-[20px] text-center font-bold">
            Thông tin của bạn
          </h1>
          <div className="px-[20px] py-[20px] flex flex-col">
            <span>
              Tên khách hàng:{" "}
              <p className="inline italic font-bold">{data.nameCustomers}</p>
            </span>
            <span>
              Số điện thoại:{" "}
              <p className="inline italic font-bold">{data.phoneCustomers}</p>
            </span>
            <span>
              Địa chỉ:{" "}
              <p className="inline italic font-bold">{data.addressCustomers}</p>
            </span>
            <br />
            {data.note && (
              <span>
                Ghi chú: <p className="inline italic font-bold">{data.note}</p>
              </span>
            )}
          </div>
        </div>

        {/* Right  */}
        <div className="w-1/2 border border-borderColor">
          <h1 className="py-[20px] text-[20px] text-center font-bold">
            Đơn hàng
          </h1>
          <div className="px-[20px] py-[20px] flex flex-col">
            {/* Top  */}
            <span>
              Mã đơn hàng:{" "}
              <p className="inline italic text-[10px] font-bold">
                # {data.subId}
              </p>
            </span>
            <span>
              Thời gian đặt đơn:{" "}
              <p className="inline underline italic font-bold">{`${timePart} - ( Ngày ${datePart} )`}</p>
            </span>
            <span className="flex">
              Trạng thái: {/* Status  */}
              {data.statusOrder.isPreparing && (
                <p className="font-bold ml-[5px]">
                  Quán đang chuẩn bị đơn hàng
                </p>
              )}
              {data.statusOrder.isDelivered && (
                <p className="font-bold ml-[5px]">Đã giao hàng</p>
              )}
              {data.statusOrder.isCanceled && (
                <p className="font-bold text-textEmphasizeColor ml-[5px]">
                  Đơn hàng đã bị hủy
                </p>
              )}
              {/* end status  */}
            </span>
            <br />
            <hr />
            <br />
            {/* Các mặt hàng  */}
            <div className="w-full h-[100px] overflow-y-auto">
              {data.data.map((item, index) => {
                return (
                  <div key={index} className="w-full flex font-bold">
                    <div className="w-8/12 flex">
                      <span className="block w-2/12">x{item.quantity}</span>
                      <div className="flex flex-col w-10/12">
                        <span className="block ">{item.nameProduct}</span>
                        {item.note && (
                          <span className="font-normal italic text-[12px]">{`"${item.note}"`}</span>
                        )}
                      </div>
                    </div>
                    <div className="w-4/12 flex ">
                      <div className="">
                        <span>
                          {formatCurrency(item.currentPriceProduct)}
                          <span className="mr-[8px] relative top-[-4px] font-normal text-[12px] italic">
                            đ
                          </span>
                        </span>
                        {item.sale > 0 && (
                          <span className="block font-normal italic text-[14px]">
                            -{" "}
                            {formatCurrency(
                              (item.currentPriceProduct * item.sale) / 100
                            )}
                            <span className="mr-[8px] relative top-[-4px] font-normal text-[12px] italic">
                              đ
                            </span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
              <br />
            </div>
            <hr />
            <br />
            {/* Bottom  */}
            <div className="w-full flex flex-col">
              <div className="w-full flex">
                <span className="block w-8/12">Tổng tiền món (giá gốc): </span>
                <p className="block w-4/12 italic font-bold">
                  {formatCurrency(data.subTotal)}
                  <span className="mr-[8px] relative top-[-4px] font-normal text-[12px] italic">
                    đ
                  </span>
                </p>
              </div>
              <div className="w-full flex opacity-[0.5]">
                <span className=" block w-8/12">Trừ khuyến mại:</span>
                <p className="block w-4/12 italic">
                  - {formatCurrency(data.priceSaleProduct)}
                  <span className="mr-[8px] relative top-[-4px] font-normal text-[12px] italic">
                    đ
                  </span>
                </p>
              </div>
              <br />
              <div className="w-full flex mb-[10px]">
                <span className="block w-8/12">Tổng tiền phải thanh toán:</span>
                <p className="block w-4/12 italic font-bold text-textEmphasizeColor">
                  {formatCurrency(data.totalBill)}
                  <span className="mr-[8px] relative top-[-4px] font-normal text-[12px] italic">
                    đ
                  </span>
                </p>
              </div>
            </div>
            {/* Buttun  */}
            {data?.statusOrder?.isPreparing && (
              <div className="flex gap-[10px] justify-end mt-[10px]">
                <span
                  onClick={handleLogCancel}
                  className={`${
                    canCancel ? "" : "pointer-events-none bg-red-200"
                  } block rounded-md font-bold px-[10px] py-[5px] text-white hover:bg-white hover:text-[red] hover:border-[red] bg-[red] border border-borderColor transition-all cursor-pointer`}
                >
                  {canCancel ? "Hủy đơn hàng" : "Không thể hủy đơn hàng"}{" "}
                  {canCancel &&
                    `${Math.floor(timeRemaining / 60)}:${timeRemaining % 60}`}
                </span>
              </div>
            )}
            {isLogCancel && (
              <DialogQuestionYesNo
                refDialog={refDialogCancel}
                title="Bạn có chắc muốn hủy đơn hàng?"
                textNo="Trở lại"
                textYes="Đồng ý"
                handleYes={handleCancel}
                handleNo={handleLogCancel}
                isLoading={isLoading}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailOrderTracking;
