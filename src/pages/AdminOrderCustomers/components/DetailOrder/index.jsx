import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { useEffect, useRef, useState } from "react";

import { formatCurrency } from "../../../../components/FormatCurrency";
import * as handleOrderService from "../../../../services/handleOrderService";
import DialogQuestionYesNo from "../../../../components/DialogQuestionYesNo";

const DetailOrder = ({ dataDetail, handleDetail, setCallbackApi }) => {
  const refDialogCancel = useRef(null);

  const [isLogCancel, setIsLogCancel] = useState(false);

  // Parse chuỗi ngày giờ
  const m = moment(dataDetail.orderDate);
  // Tách ngày tháng
  const datePart = m.format("DD-MM-YYYY"); // vd "2024-09-14"
  // Tách giờ
  const timePart = m.format("HH:mm"); // vd "07:47:46"

  const handleDelivered = () => {
    const body = {
      id: dataDetail._id,
      isDelivered: true,
    };

    handleOrderService
      .updateIsDeliveredOrder(body)
      .then((res) => {
        if (res.status === 200) {
          setCallbackApi(res);
          handleDetail();
        } else if (res.response.status === 401) {
          toast.warning(
            "Bạn không phải Admin. Vui lòng đăng nhập với tư cách là Admin!"
          );
        }
      })
      .catch((err) => console.log("Lỗi update đã là xong đơn hàng", err));
  };

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
    const body = {
      id: dataDetail._id,
      isCanceled: true,
    };
    handleOrderService
      .updateIsCanceledOrder(body)
      .then((res) => {
        if (res.status === 200) {
          setCallbackApi(res);
          handleDetail();
        } else if (res.response.status === 401) {
          toast.warning(
            "Bạn không phải Admin. Vui lòng đăng nhập với tư cách là Admin!"
          );
        }
      })
      .catch((err) => console.log("Lỗi update đã là xong đơn hàng", err));
  };

  const fncTakeIdEqualDayOrder = () => {
    const parts = datePart.split("-");
    const day = parts[0];
    const month = parts[1];
    const result = day + month;
    return result;
  };

  const fncTakeIdEqualIdOrder = () => {
    const length = dataDetail._id.length;
    const lastFiveChars = dataDetail._id.substring(length - 5);
    return lastFiveChars;
  };

  useEffect(() => {
    isLogCancel && refDialogCancel.current.classList.add("isDetail");
  }, [isLogCancel]);

  return (
    <div className="flex flex-col items-center justify-center pt-[60px] pb-[20px] px-[20px] bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="w-full flex border border-borderColor">
        {/* Left  */}
        <div className="w-1/2 border border-borderColor">
          <h1 className="py-[20px] text-[20px] text-center font-bold">
            Thông tin khách hàng
          </h1>
          <div className="px-[20px] py-[20px] flex flex-col">
            <span>
              Tên khách hàng:{" "}
              <p className="inline italic font-bold">
                {dataDetail.nameCustomers}
              </p>
            </span>
            <span>
              Số điện thoại:{" "}
              <p className="inline italic font-bold">
                {dataDetail.phoneCustomers}
              </p>
            </span>
            <span>
              Địa chỉ:{" "}
              <p className="inline italic font-bold">
                {dataDetail.addressCustomers}
              </p>
            </span>
            <br />
            {dataDetail.note && (
              <span>
                Ghi chú:{" "}
                <p className="inline italic font-bold">{dataDetail.note}</p>
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
              <p className="inline italic font-bold">
                #{`${fncTakeIdEqualDayOrder()}-${fncTakeIdEqualIdOrder()}`}
              </p>
            </span>
            <span>
              Thời gian đặt đơn:{" "}
              <p className="inline italic font-bold">Hôm nay {timePart}</p>
            </span>
            <br />
            <hr />
            <br />
            {/* Các mặt hàng  */}
            <div className="w-full h-[100px] overflow-y-auto">
              {dataDetail.data.map((item, index) => {
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
                  {formatCurrency(dataDetail.subTotal)}
                  <span className="mr-[8px] relative top-[-4px] font-normal text-[12px] italic">
                    đ
                  </span>
                </p>
              </div>
              <div className="w-full flex opacity-[0.5]">
                <span className=" block w-8/12">Trừ khuyến mại:</span>
                <p className="block w-4/12 italic">
                  - {formatCurrency(dataDetail.priceSaleProduct)}
                  <span className="mr-[8px] relative top-[-4px] font-normal text-[12px] italic">
                    đ
                  </span>
                </p>
              </div>
              <br />
              <div className="w-full flex mb-[10px]">
                <span className="block w-8/12">Tổng tiền quán nhận được:</span>
                <p className="block w-4/12 italic font-bold text-textEmphasizeColor">
                  {formatCurrency(dataDetail.totalBill)}
                  <span className="mr-[8px] relative top-[-4px] font-normal text-[12px] italic">
                    đ
                  </span>
                </p>
              </div>
              <hr />
              {/* Button  */}
              <div className="flex gap-[10px] justify-end mt-[10px]">
                <span className="block rounded-md font-bold px-[10px] py-[5px] text-white hover:bg-white hover:text-textHoverColor bg-bgEmphasizeColor border border-borderColor transition-all cursor-pointer">
                  <FontAwesomeIcon className="mr-[5px]" icon={faPrint} />
                  In
                </span>
                {dataDetail.statusOrder.isPreparing && (
                  <>
                    <span
                      onClick={handleDelivered}
                      className="block rounded-md font-bold px-[10px] py-[5px] text-white hover:bg-white hover:text-textHoverColor bg-bgEmphasizeColor border border-borderColor transition-all cursor-pointer"
                    >
                      Đã giao
                    </span>
                    <span
                      onClick={handleLogCancel}
                      className="block rounded-md font-bold px-[10px] py-[5px] text-white hover:bg-white hover:text-[red] hover:border-[red] bg-[red] border border-borderColor transition-all cursor-pointer"
                    >
                      Hủy đơn hàng
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        {isLogCancel && (
          <DialogQuestionYesNo
            refDialog={refDialogCancel}
            title="Bạn có chắc muốn hủy đơn hàng?"
            textNo="Trở lại"
            textYes="Đồng ý"
            handleYes={handleCancel}
            handleNo={handleLogCancel}
          />
        )}
      </div>
    </div>
  );
};

export default DetailOrder;
