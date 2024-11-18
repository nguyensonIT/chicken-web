import { useRef, useState } from "react";

import { useHandleContext } from "../../contexts/UserProvider";
import * as handleProductsService from "../../services/handleProductsService";
import { toast } from "react-toastify";

const BtnTurnOn = ({ data, isTurnLive }) => {
  const [token, setToken] = useState(localStorage.getItem("authToken") || null);

  const [checkTurnLive, setCheckTurnLive] = useState(isTurnLive || false);

  const [isActive, setIsActive] = useState(data?.isActive);
  const boxBallRef = useRef(null);
  const ballRef = useRef(null);

  const { handleTakeInFoBtnProductContext } = useHandleContext();

  const apiUpdateActive = () => {
    if (isActive) {
      boxBallRef.current.style.backgroundColor = "#1618231f";
      ballRef.current.style.transform = "translate(-200%, -50%)";
      setIsActive(false);

      const body = {
        id: data._id,
        isActive: false,
      };

      const reqData = {
        token,
        body,
      };
      handleProductsService.updateActive(reqData).then((res) => {
        switch (res.status) {
          case 200:
            toast.warn(`"${res.data.data.nameProduct}" không có sẵn`);
            break;
          case 404:
            toast.warn("Sản phẩm không có sẵn hoặc đã bị xóa!");
            break;
          case 500:
            toast.error("Server bị lỗi vui lòng thử lại sau!");
            break;
          default:
            toast.error("Có lỗi xảy ra! Vui lòng thử lại sau!");
            break;
        }
      });
    } else {
      boxBallRef.current.style.backgroundColor = "#0be09b";
      ballRef.current.style.transform = "translate(-100%, -50%)";
      setIsActive(true);

      const body = {
        id: data._id,
        isActive: true,
      };

      const reqData = {
        token,
        body,
      };

      handleProductsService.updateActive(reqData).then((res) => {
        switch (res.status) {
          case 200:
            toast.warn(`"${res.data.data.nameProduct}" có sẵn`);
            break;
          case 404:
            toast.warn("Sản phẩm không có sẵn hoặc đã bị xóa!");
            break;
          case 500:
            toast.error("Server bị lỗi vui lòng thử lại sau!");
            break;
          default:
            toast.error("Có lỗi xảy ra! Vui lòng thử lại sau!");
            break;
        }
      });
    }
  };

  const handleBtnTurnOn = (e) => {
    e.stopPropagation();
    if (checkTurnLive) {
      apiUpdateActive();
    } else {
      if (isActive) {
        boxBallRef.current.style.backgroundColor = "#1618231f";
        ballRef.current.style.transform = "translate(-200%, -50%)";
        setIsActive(false);
        handleTakeInFoBtnProductContext(data, false);
      } else {
        boxBallRef.current.style.backgroundColor = "#0be09b";
        ballRef.current.style.transform = "translate(-100%, -50%)";
        setIsActive(true);
        handleTakeInFoBtnProductContext(data, true);
      }
    }
  };

  return (
    <div
      className={`relative h-[24px] w-[44px] rounded-[100px] transition-all duration-400 ease-in-out cursor-pointer ${
        data?.isActive ? "bg-[#0be09b]" : "bg-[#1618231f]"
      } `}
      onClick={(e) => handleBtnTurnOn(e)}
      ref={boxBallRef}
    >
      <span
        ref={ballRef}
        className={`absolute flex justify-center items-center w-[20px] h-[20px] left-[calc(100%-2px)] top-1/2 rounded-[100px] bg-white shadow-sm transition-all duration-400 ease-in-out ${
          data?.isActive
            ? "translate-x-[-100%] translate-y-[-50%]"
            : "translate-x-[-200%] translate-y-[-50%]"
        } `}
      ></span>
    </div>
  );
};
export default BtnTurnOn;
