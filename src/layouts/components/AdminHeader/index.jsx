import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../../../assets/img/Logo.png";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const AdminHeader = () => {
  return (
    <div className="h-[40px] w-full px-[20px] grid grid-cols-4 items-center bg-black">
      <div className="flex">
        <div className="h-[30px] w-[30px] mr-[5px] col-[1/2] text-white">
          <img
            className="h-full w-full object-cover"
            src={logo}
            alt="logo"
            srcset=""
          />
        </div>
        <p className="text-white">VUA GÀ TƯƠI</p>
      </div>
      <div className="col-[2/4] text-white text-center">
        Chào mừng đến với trang quản trị Admin!
      </div>
      <div className="col-[4/5] text-right text-white">
        <button className="transition-all hover:text-textHoverColor">
          Đăng xuất{" "}
          <span>
            <FontAwesomeIcon icon={faRightFromBracket} />
          </span>
        </button>
      </div>
    </div>
  );
};
export default AdminHeader;
