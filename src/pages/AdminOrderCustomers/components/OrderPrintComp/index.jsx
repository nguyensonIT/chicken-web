import React, { useEffect, useRef } from "react";
import moment from "moment";

import { formatCurrency } from "../../../../components/FormatCurrency";

const OrderPrintComp = React.forwardRef(({ dataDetail = {} }, ref) => {
  const innerRef = React.useRef();

  React.useImperativeHandle(ref, () => innerRef.current);

  // Parse chuỗi ngày giờ
  const m = moment(dataDetail.orderDate);
  // Tách ngày tháng
  const datePart = m.format("DD-MM-YYYY"); // vd "2024-09-14"
  // Tách giờ
  const timePart = m.format("HH:mm"); // vd "07:47:46"

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

  return (
    <div ref={innerRef} className="flex-col h-full w-full">
      {/* Top  */}
      <div className="w-full border border-borderColor">
        <h1 className="max-sm:py-[5px] max-sm:text-[18px] py-[20px] text-[20px] text-center font-bold">
          Thông tin khách hàng
        </h1>
        <div className="max-sm:py-[0px] max-sm:text-[14px] px-[20px] py-[20px] flex flex-col">
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
      {/* Bottom  */}
      <div className="w-full border border-borderColor">
        <h1 className="max-sm:py-[5px] max-sm:text-[18px] py-[20px] text-[20px] text-center font-bold">
          Đơn hàng ({dataDetail.orderNumber})
        </h1>
        <div className="max-sm:py-0 px-[20px] py-[20px] flex flex-col">
          {/* Top  */}
          <span>
            Mã đơn hàng:{" "}
            <p className="max-sm:text-[10px] inline italic font-bold">
              #{`${fncTakeIdEqualDayOrder()}-${fncTakeIdEqualIdOrder()}`}
            </p>
          </span>
          <span>
            Thời gian đặt đơn:{" "}
            <p className="inline italic font-bold">
              {timePart} ({datePart})
            </p>
          </span>
          <br />
          {/* Các mặt hàng  */}
          <div className=" w-full ">
            {dataDetail.data.map((item, index) => {
              return (
                <div key={index} className="w-full flex font-bold">
                  <div className="w-8/12 flex">
                    <span className="max-sm:text-[12px] block w-2/12">
                      x{item.quantity}
                    </span>
                    <div className="max-sm:text-[12px] flex flex-col w-10/12">
                      <span className="block ">{item.nameProduct}</span>
                      {item.note && (
                        <span className="max-sm:text-[10px] font-normal italic text-[12px]">{`"${item.note}"`}</span>
                      )}
                    </div>
                  </div>
                  <div className="w-4/12 flex ">
                    <div className="max-sm:text-[12px]">
                      <span>
                        {formatCurrency(item.currentPriceProduct)}
                        <span className="max-sm:text-[10px]  mr-[8px] relative top-[-4px] font-normal text-[12px] italic">
                          đ
                        </span>
                      </span>
                      {item.sale > 0 && (
                        <span className="max-sm:text-[10px] block font-normal italic text-[14px]">
                          -{" "}
                          {formatCurrency(
                            (item.currentPriceProduct * item.sale) / 100
                          )}
                          <span className="max-sm:text-[10px] mr-[8px] relative top-[-4px] font-normal text-[12px] italic">
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
              <span className="max-sm:text-[12px] block w-8/12">
                Trừ khuyến mại:
              </span>
              <p className="max-sm:text-[10px] w-4/12 italic">
                - {formatCurrency(dataDetail.priceSaleProduct)}
                <span className="max-sm:text-[10px] mr-[8px] relative top-[-4px] font-normal text-[12px] italic">
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
          </div>
        </div>
      </div>
    </div>
  );
});

export default OrderPrintComp;
