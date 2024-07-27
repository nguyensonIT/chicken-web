import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../../../assets/img/Logo.png";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

import "./styles.css";

const AdminHeader = () => {
  const [isImg, setIsImg] = useState(false);

  return (
    <div className="h-[40px] w-full px-[20px] grid grid-cols-4 items-center bg-bgHeaderAdminColor">
      <div className="flex col-[1/2]">
        <div className="h-[30px] w-[30px] mr-[5px] text-black">
          <img className="h-full w-full object-cover" src={logo} alt="logo" />
        </div>
        <p className="text-black">VUA GÀ TƯƠI</p>
      </div>
      <div className="col-[2/4] text-black text-center">
        Chào mừng đến với trang quản trị Admin!
      </div>
      <div className="col-[4/5] text-black">
        <div className="relative flex justify-end">
          <div className="box-img w-[30px] h-[30px] rounded-[50%] overflow-hidden cursor-pointer">
            {isImg ? (
              <img className="w-full h-full object-cover" src="" alt="" />
            ) : (
              <span className="w-full h-full flex justify-center items-center font-bold text-white text-[12px] bg-[#C0C0C0]">
                Err
              </span>
            )}
            <div className="absolute right-0 p-[10px] transition-all box-option hidden bg-white shadow-md top-[35px] z-10">
              <span className="absolute w-full h-[8px] top-[-6px] left-0 bg-transparent"></span>
              <button className="transition-all hover:text-textHoverColor">
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
