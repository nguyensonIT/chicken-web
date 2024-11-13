import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { Link, useSearchParams } from "react-router-dom";

import { useHandleContext } from "../../contexts/UserProvider";
import logo from "../../assets/img/Logo.png";
import warProfile from "../../assets/img/bannerReal.jpg";
import { useEffect, useState } from "react";
import ProfileIntroduce from "./components/ProfileIntroduce";
import ProfileOrder from "./components/ProfileOrder";
import ProfileEdit from "./components/ProfileEdit";
import ProfileChangePassword from "./components/ProfileChangePassword";

const Profile = () => {
  const [searchParams] = useSearchParams();

  const { user } = useHandleContext();

  const [tab, setTab] = useState(searchParams.get("tab"));
  useEffect(() => {
    setTab(searchParams.get("tab"));
  }, [searchParams]);

  return (
    <div className="w-full mb-[-20px] bg-bgMainColor min-h-screen ">
      <div className="wrapper mx-auto max-w-[600px] h-auto bg-white rounded-md">
        {/* top */}
        <div className="top relative">
          <div className="w-full h-[120px] rounded-md overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={warProfile}
              alt="warImg"
            />
          </div>
          {/* avatar   */}
          <Link
            to="/profile?tab=edit-profile"
            className="absolute flex items-center top-[80px] left-[50%] translate-x-[-50%] cursor-pointer"
          >
            <div className=" img mx-auto w-[100px] h-[100px] border-[3px] border-white rounded-full overflow-hidden">
              <img className="" src={user?.image || logo} alt="img-user" />
              <div className="absolute flex justify-center items-center w-[25px] h-[25px] bottom-[15px] right-[-5px] bg-slate-200 rounded-[50%]">
                <FontAwesomeIcon className="text-[12px]" icon={faCamera} />
              </div>
            </div>
          </Link>
          {/* Info  */}
          <div className="flex flex-col gap-[20px] items-center mt-[80px]">
            <p className="text-[24px] font-bold">{user?.name}</p>
            {/* Tab Link  */}
            <div className="w-full overflow-x-auto">
              <div className="flex items-center justify-between space-x-4 p-4 border-b border-t ">
                <Link
                  to="/profile?tab=introduce"
                  className={`${
                    tab === "introduce" || tab === null
                      ? "text-textHoverColor border-b-[2px] border-borderColor"
                      : ""
                  } text-gray-600 whitespace-nowrap`}
                >
                  Giới thiệu
                </Link>
                <Link
                  to="/profile?tab=order"
                  className={`${
                    tab === "order"
                      ? "text-textHoverColor border-b-[2px] border-borderColor"
                      : ""
                  } text-gray-600 whitespace-nowrap`}
                >
                  Đơn hàng
                </Link>
                <Link
                  to="/profile?tab=edit-profile"
                  className={`${
                    tab === "edit-profile"
                      ? "text-textHoverColor border-b-[2px] border-borderColor"
                      : ""
                  } text-gray-600 whitespace-nowrap`}
                >
                  Chỉnh sửa trang cá nhân
                </Link>
                <Link
                  to="/profile?tab=change-password"
                  className={`${
                    tab === "change-password"
                      ? "text-textHoverColor border-b-[2px] border-borderColor"
                      : ""
                  } text-gray-600 whitespace-nowrap`}
                >
                  Đổi mật khẩu
                </Link>
              </div>
            </div>
            {/* wrapper Tab  */}
            <div className="w-full p-[20px] ">
              {tab === null && <ProfileIntroduce />}
              {tab === "introduce" && <ProfileIntroduce />}
              {tab === "order" && <ProfileOrder />}
              {tab === "edit-profile" && <ProfileEdit />}
              {tab === "change-password" && <ProfileChangePassword />}
            </div>
          </div>
        </div>
        {/* middle */}
        <div className=""></div>
      </div>
    </div>
  );
};

export default Profile;
