import { useEffect, useRef, useState } from "react";
import ItemOrderTracking from "../../../OrderTracking/components/ItemOrderTracking";
import PopupWrapper from "../../../../components/PopupWrapper";
import DetailOrderTracking from "../../../OrderTracking/components/DetailOrderTracking";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useHandleContext } from "../../../../contexts/UserProvider";

const ProfileOrder = () => {
  const { dataOrderByIdUserContext } = useHandleContext();

  const [isDisplayDetailOrderTracking, setIsDisplayDetailOrderTracking] =
    useState(false);
  const [dataDetailOrderCustomer, setDataDetailOrderCustomer] = useState(null);

  const refDialogDetailOrder = useRef(null);

  const handleClickItemOrderTracking = (data) => {
    if (isDisplayDetailOrderTracking) {
      refDialogDetailOrder.current.classList.add("isClose");
      setTimeout(() => {
        setIsDisplayDetailOrderTracking(false);
      }, 300);
    } else {
      setIsDisplayDetailOrderTracking(true);
      setDataDetailOrderCustomer(data);
    }
  };

  useEffect(() => {
    isDisplayDetailOrderTracking &&
      refDialogDetailOrder.current.classList.add("isDetail");
  }, [isDisplayDetailOrderTracking]);

  return (
    <div>
      {dataOrderByIdUserContext?.map((item, index) => {
        return (
          <ItemOrderTracking
            key={index}
            data={item}
            handleClickItemOrderTracking={handleClickItemOrderTracking}
          />
        );
      })}

      {/* Chi tiết đơn hàng */}
      {isDisplayDetailOrderTracking && (
        <PopupWrapper>
          <div
            ref={refDialogDetailOrder}
            className="relative my-[20px] mx-[40px]"
          >
            <DetailOrderTracking
              handleClickItemOrderTracking={handleClickItemOrderTracking}
              data={dataDetailOrderCustomer}
            />
            {/* close popup  */}
            <div
              onClick={handleClickItemOrderTracking}
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
  );
};

export default ProfileOrder;
