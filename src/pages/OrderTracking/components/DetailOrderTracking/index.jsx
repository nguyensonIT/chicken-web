import moment from "moment";
import { formatCurrency } from "../../../../components/FormatCurrency";

const DetailOrderTracking = ({ data }) => {
  // Parse chuỗi ngày giờ
  const m = moment(data.orderDate);
  // Tách ngày tháng
  const datePart = m.format("DD-MM-YYYY"); // vd "2024-09-14"
  // Tách giờ
  const timePart = m.format("HH:mm"); // vd "07:47:46"
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
                <p className="font-bold ml-[5px]">Đơn hàng đã bị hủy</p>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailOrderTracking;
