import useSocket from "../../../../../hooks/useSocket";

const BtnActiveDoor = () => {
  const { statusOpenDoor } = useSocket();
  return (
    <div className="flex justify-between items-center h-[44px] bg-[white] px-[20px]">
      <marquee className="text-sm w-[200px]">
        Nhà hàng Vua Gà tươi chi nhánh Vĩnh Tuy, Trâu Quỳ.
      </marquee>
      {statusOpenDoor && statusOpenDoor ? (
        <div className="flex gap-[8px] justify-center items-center">
          <p className="size-[12px] rounded-[50%] bg-[#16a34a]"></p>
          <p className="text-smDesc font-bold">Đang mở cửa</p>
        </div>
      ) : (
        <div className="flex gap-[8px] justify-center items-center">
          <p className="size-[8px] rounded-[50%] bg-[#dc2626]"></p>
          <p className="text-smDesc font-bold">Đã đóng cửa</p>
        </div>
      )}
    </div>
  );
};

export default BtnActiveDoor;
