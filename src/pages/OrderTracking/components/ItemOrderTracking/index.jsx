import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

import { formatCurrency } from "../../../../components/FormatCurrency";
import bikeShip from "../../../../assets/img/freeShip.png";

const ItemOrderTracking = ({ data, handleClickItemOrderTracking }) => {
  // Parse chuỗi ngày giờ
  const m = moment(data.orderDate);

  // Tách ngày tháng
  const datePart = m.format("DD-MM-YYYY"); // vd "2024-09-14"

  // Tách giờ
  const timePart = m.format("HH:mm"); // vd "07:47:46"

  return (
    <div
      onClick={() => handleClickItemOrderTracking(data)}
      className="bg-white relative p-[10px] mb-[10px] flex border border-borderColor hover:bg-gray-50 cursor-pointer"
    >
      <div className="w-1/2 flex flex-col border-r-[2px] border-r-borderColor">
        {/* STT đơn hàng, id đơn hàng, tên khách hàng  */}
        <div className="flex items-center">
          <span className="flex text-white justify-center items-center w-[30px] h-[30px] bg-bgEmphasizeColor">
            Mã
          </span>
          <span className="text-[10px] font-bold ml-[5px]">#{data.subId}</span>
        </div>
        <span className="text-[16px]">
          Đã đặt vào{" "}
          <p className="inline-block font-bold">{`${timePart} ( Ngày ${datePart} )`}</p>
        </span>
        <span className="flex">
          Khách hàng:{" "}
          <h1 className="ml-[5px] font-bold">{data.nameCustomers}</h1>
        </span>
      </div>
      <div className="w-1/2 flex justify-around items-end">
        <p className="font-bold">{data.data.length} món</p>
        <p className="font-bold">
          {formatCurrency(data.totalBill)}{" "}
          <span className="relative underline mr-[8px] text-[14px] top-[-4px] italic">
            đ
          </span>
        </p>
      </div>
      {/* thời gian đếm ngược */}
      <div className="absolute top-0 right-0 flex px-[20px] py-[5px] border-l-[1px] rounded-md border-b-[1px] border-l-borderColor border-b-borderColor">
        <p className="font-bold mr-[10px]">Trạng thái: </p>
        {data.statusOrder.isPreparing && (
          <>
            <p>Quán đang chuẩn bị hàng...</p>
            <img className="w-[20px] h-[20px]" src={bikeShip} alt="bikeImg" />
          </>
        )}
        {data.statusOrder.isDelivered && (
          <p>
            Đã giao hàng <FontAwesomeIcon icon={faCheck} />
          </p>
        )}
        {data.statusOrder.isCanceled && <p>Đơn hàng đã bị hủy</p>}
      </div>
    </div>
  );
};

export default ItemOrderTracking;
