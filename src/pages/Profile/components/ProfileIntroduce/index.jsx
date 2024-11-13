import {
  faClock,
  faEnvelope,
  faLocationDot,
  faPhone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import moment from "moment";

import { useHandleContext } from "../../../../contexts/UserProvider";

const ProfileIntroduce = () => {
  const { user } = useHandleContext();

  // Parse chuỗi ngày giờ
  const m = moment(user.orderDate);

  // Tách ngày tháng
  const monthJoin = m.format("MM");
  const yearJoin = m.format("YYYY");

  return (
    <div className="">
      {/* title */}
      <p className="text-[16px] font-bold">Giới thiệu</p>
      {/* info  */}
      <div className="flex flex-col gap-[15px] pt-[20px]">
        <span className="flex gap-[10px]">
          <FontAwesomeIcon icon={faUser} className="opacity-[0.5]" />
          <p className="text-[12px]">
            {user?.name === "" ? "Bạn chưa đặt tên" : user?.name}
          </p>
        </span>
        <span className="flex gap-[10px]">
          <FontAwesomeIcon icon={faEnvelope} className="opacity-[0.5]" />
          <p className="text-[12px]">
            {user?.email === "" ? user?.username : user?.email}
          </p>
        </span>
        <span className="flex gap-[10px]">
          <FontAwesomeIcon icon={faLocationDot} className="opacity-[0.5]" />
          <span className="text-[12px]">
            {user?.address === "" ? (
              <p className="text-textEmphasizeColor text-[12px] italic">
                Bạn chưa nhập địa chỉ
              </p>
            ) : (
              user?.address
            )}
          </span>
        </span>
        <span className="flex gap-[10px]">
          <FontAwesomeIcon icon={faPhone} className="opacity-[0.5]" />
          <span className="text-[12px]">
            {user?.phoneNumber === "" ? (
              <p className="text-textEmphasizeColor text-[12px] italic">
                Bạn chưa nhập số điện thoại
              </p>
            ) : (
              user?.phoneNumber
            )}
          </span>
        </span>
        <span className="flex gap-[10px]">
          <FontAwesomeIcon icon={faClock} className="opacity-[0.5]" />
          <p className="text-[12px]">
            Tham gia vào Tháng {monthJoin} năm {yearJoin}
          </p>
        </span>
      </div>
      {/* btn link  */}
      <div className="flex flex-col gap-[60px] pt-[20px]">
        <div className="">
          <Link
            to="/profile?tab=edit-profile"
            className="inline-block px-[20px] py-[8px] text-[12px] bg-slate-200 hover:bg-slate-300 rounded-md cursor-pointer"
          >
            Chỉnh sửa thông tin
          </Link>
        </div>
        <div>
          <span className="inline-block px-[20px] py-[8px] text-white text-[12px] bg-red-500 hover:bg-red-300 rounded-md cursor-pointer">
            Đăng xuất
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileIntroduce;
