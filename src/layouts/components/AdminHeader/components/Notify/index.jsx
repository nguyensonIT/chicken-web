import { useNavigate, useSearchParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { useHandleContext } from "../../../../../contexts/UserProvider";
import "./styles.css";
import { toast } from "react-toastify";

const Notify = ({ notify }) => {
  const random = uuidv4();
  const [searchParams] = useSearchParams();
  const { handTakeDataSubId, handleRenderNotifyAdminContext } =
    useHandleContext();
  const navigate = useNavigate();

  const handleClickItemNotify = (data) => {
    const params = searchParams.get("order");

    const dataLocal = JSON.parse(localStorage.getItem("notify"));
    const arrSubIdSame = dataLocal.filter((item) => item.subId === data.subId);
    if (arrSubIdSame.length === 2) {
      const result = Object.values(
        dataLocal.reduce((acc, item) => {
          const key = `${item.subId}-${item.name}`;
          if (!acc[key] || (acc[key].isCanceled === false && item.isCanceled)) {
            acc[key] = item;
          }
          return acc;
        }, {})
      );
      localStorage.setItem("notify", JSON.stringify(result));
      toast.warn("Đơn hàng đã bị hủy!");
    } else {
      if (params === "new-order") {
        const dataLocalNew = dataLocal.filter(
          (item) => item.subId !== data.subId
        );
        localStorage.setItem("notify", JSON.stringify(dataLocalNew));
        handTakeDataSubId(data.subId);
      } else {
        (async () => {
          await dataLocal.forEach((item) => {
            if (item.subId === data.subId) {
              return (item.isNewNotify = false);
            }
          });
          localStorage.setItem("notify", JSON.stringify(dataLocal));
        })();
        navigate("/admin/order?order=new-order");
      }
    }
    handleRenderNotifyAdminContext(random);
  };

  const handleClickItemNotifyCanceled = (data) => {
    const params = searchParams.get("order");

    const dataLocal = JSON.parse(localStorage.getItem("notify"));

    if (params === "canceled-order") {
      const dataLocalNew = dataLocal.filter(
        (item) => item.subId !== data.subId
      );
      localStorage.setItem("notify", JSON.stringify(dataLocalNew));
      handTakeDataSubId(data.subId);
    } else {
      (async () => {
        await dataLocal.forEach((item) => {
          if (item.subId === data.subId) {
            return (item.isNewNotify = false);
          }
        });
        localStorage.setItem("notify", JSON.stringify(dataLocal));
      })();
      navigate("/admin/order?order=canceled-order");
    }
    handleRenderNotifyAdminContext(random);
  };

  return (
    <ul className="overflow-y-scroll min-w-[230px] max-h-[200px] ">
      {notify?.length > 0 ? (
        notify.map((item, index) => {
          return item?.statusOrder?.isCanceled ? (
            <li
              onClick={() => handleClickItemNotifyCanceled(item)}
              key={index}
              className={`${
                item.isNewNotify && "new-notify"
              } p-[10px] text-[14px] hover:bg-bgHoverColor border-b-[1px] cursor-pointer`}
            >
              <span className=" font-bold ">
                {`"${item.nameCustomers}" `}{" "}
                <p className="inline font-normal">hủy 1 đơn hàng</p>
              </span>{" "}
            </li>
          ) : (
            <li
              onClick={() => handleClickItemNotify(item)}
              key={index}
              className={`${
                item.isNewNotify && "new-notify"
              } p-[10px] text-[14px] hover:bg-bgHoverColor border-b-[1px] cursor-pointer`}
            >
              <span className=" font-bold ">
                {`"${item.nameCustomers}" `}{" "}
                <p className="inline font-normal">vừa đặt 1 đơn mới</p>
              </span>{" "}
            </li>
          );
        })
      ) : (
        <li className="p-[10px] text-[14px] ">Không có thông báo nào</li>
      )}
    </ul>
  );
};

export default Notify;
