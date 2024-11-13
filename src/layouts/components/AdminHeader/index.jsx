import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightFromBracket,
  faBell,
  faRotateForward,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

import logo from "../../../assets/img/Logo.png";
import { useHandleContext } from "../../../contexts/UserProvider";
import "./styles.css";
import useSocket from "../../../hooks/useSocket";
import Notify from "./components/Notify";

const AdminHeader = () => {
  const { messages } = useSocket();
  const { user, renderPopupNotifyAdminContext } = useHandleContext();

  const [notify, setNotify] = useState([]);

  const [isDisplayNotify, setIsDisplayNotify] = useState(false);
  const [isImg, setIsImg] = useState(user?.image);

  const hanldeClickNotify = () => {
    setIsDisplayNotify(!isDisplayNotify);
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleDeleteNotify = () => {
    localStorage.removeItem("notify");
    setNotify([]);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.reload();
  };

  useEffect(() => {
    const notifyData = JSON.parse(localStorage.getItem("notify"));
    if (messages?.length > 0) {
      if (notifyData) {
        const notifyDataNew = [...notifyData, ...messages];
        setNotify(notifyDataNew);
        localStorage.setItem("notify", JSON.stringify(notifyDataNew));
      } else {
        localStorage.setItem("notify", JSON.stringify(messages));
        setNotify(messages);
      }
    } else {
      setNotify(JSON.parse(localStorage.getItem("notify")));
    }
  }, [messages]);

  useEffect(() => {
    setNotify(JSON.parse(localStorage.getItem("notify")));
  }, [renderPopupNotifyAdminContext]);

  return (
    <div className="h-[60px] w-full px-[20px] grid grid-cols-4 items-center bg-bgHeaderAdminColor">
      {/* logo left  */}
      <div className="flex col-[1/2]">
        <div className="h-[30px] w-[30px] mr-[5px] text-black">
          <img className="h-full w-full object-cover" src={logo} alt="logo" />
        </div>
        <p className="text-black">VUA GÀ TƯƠI</p>
      </div>
      {/* middle  */}
      <div className="col-[2/4] text-black text-center">
        Chào mừng đến với trang quản trị Admin!
      </div>
      {/* right  */}
      <div className="col-[4/5] text-black">
        <div className="relative flex justify-end">
          {/* Thông báo  */}
          <div className="relative mr-[20px]">
            {/* popup notify  */}
            {isDisplayNotify && (
              <div className="absolute right-0 top-[40px] shadow-md rounded-sm bg-white">
                <span className="absolute top-[-10px] right-[10px] border-solid border-x-[10px] border-x-[transparent] border-b-[10px] border-b-[white] "></span>
                <div className="pl-[10px] pt-[5px] font-bold">
                  <FontAwesomeIcon
                    className="text-[16px] mr-[10px]"
                    icon={faBell}
                  />
                  Thông báo
                </div>
                {/* Item thông báo  */}
                <Notify notify={notify} />
                {/* button xóa thông báo  */}
                {notify?.length > 0 && (
                  <div className="flex justify-end bg-white px-[10px] py-[5px]">
                    <span
                      onClick={handleRefresh}
                      className="flex ml-[10px] rounded-md text-white bg-bgEmphasizeColor border border-borderColor p-[5px] hover:bg-white hover:text-textHoverColor text-[10px] transition-all cursor-pointer"
                    >
                      <p>Refresh trang</p>
                      <span className="ml-[6px]">
                        <FontAwesomeIcon
                          className="text-[12px]"
                          icon={faRotateForward}
                        />
                      </span>
                    </span>
                    <span
                      onClick={handleDeleteNotify}
                      title="Xóa thông báo"
                      className="ml-[10px] rounded-md text-white bg-bgEmphasizeColor border border-borderColor p-[5px] hover:bg-white hover:text-textHoverColor text-[10px] transition-all cursor-pointer"
                    >
                      Xóa thông báo
                    </span>
                  </div>
                )}
              </div>
            )}
            {/* icon notify  */}
            <span
              onClick={hanldeClickNotify}
              className=" block p-[5px] cursor-pointer"
            >
              <FontAwesomeIcon
                className={`${
                  notify?.length > 0 &&
                  notify.filter((item) => item.isNewNotify)?.length > 0 &&
                  "active-notify"
                }  text-[20px]`}
                icon={faBell}
              />
            </span>
            {/* qnt notify  */}
            {notify?.length > 0 && (
              <span className="absolute select-none text-[10px] text-white flex justify-center items-center top-[-8px] right-[-10px] block bg-[red] w-[20px] h-[20px] rounded-[50%]">
                {notify.filter((item) => item.isNewNotify)?.length}
              </span>
            )}
          </div>
          {/* Ảnh đại diện  */}
          <div className="box-img w-[30px] h-[30px] rounded-[50%] overflow-hidden cursor-pointer">
            {isImg ? (
              <img className="w-full h-full object-cover" src={isImg} alt="" />
            ) : (
              <span className="w-full h-full flex justify-center items-center font-bold text-white text-[12px] bg-[#C0C0C0]">
                Err
              </span>
            )}
            <div className="absolute right-0 p-[10px] transition-all box-option hidden bg-white shadow-md top-[35px] z-10">
              <span className="absolute w-full h-[8px] top-[-6px] left-0 bg-transparent"></span>
              <button
                onClick={handleLogout}
                className="transition-all hover:text-textHoverColor"
              >
                Đăng xuất{" "}
                <span>
                  <FontAwesomeIcon icon={faRightFromBracket} />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminHeader;
