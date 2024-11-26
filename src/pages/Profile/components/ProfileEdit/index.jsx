import {
  faCamera,
  faClock,
  faEnvelope,
  faLocationDot,
  faPhone,
  faSpinner,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { toast } from "react-toastify";

import "./styles.css";
import logo from "../../../../assets/img/Logo.png";
import { showFileImg } from "../../../../components/Function";
import { useHandleContext } from "../../../../contexts/UserProvider";
import moment from "moment";
import { updateProfile } from "../../../../services/handleUpdateProfileService";

const ProfileEdit = () => {
  const { user } = useHandleContext();

  // Parse chuỗi ngày giờ
  const m = moment(user.orderDate);

  // Tách ngày tháng
  const monthJoin = m.format("MM");
  const yearJoin = m.format("YYYY");

  const [srcImg, setSrcImg] = useState(user?.image);

  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [address, setAddress] = useState(user?.address);
  const [phone, setPhone] = useState(user?.phoneNumber);

  const arrInfo = [
    {
      info: name,
      icon: <FontAwesomeIcon icon={faUser} className="opacity-[0.5]" />,
      id: 0,
      important: true,
    },
    {
      info: email,
      icon: <FontAwesomeIcon icon={faEnvelope} className="opacity-[0.5]" />,
      id: 1,
      important: true,
    },
    {
      info: address,
      icon: <FontAwesomeIcon icon={faLocationDot} className="opacity-[0.5]" />,
      id: 2,
      important: false,
    },
    {
      info: phone,
      icon: <FontAwesomeIcon icon={faPhone} className="opacity-[0.5]" />,
      id: 3,
      important: false,
    },
  ];

  const [isLoading, setIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const handleClickEdit = () => {
    setIsEdit((prev) => !prev);
  };

  const handleChangeInfo = (id, e) => {
    if (id === 0) {
      setName(e.target.value);
    } else if (id === 1) {
      setEmail(e.target.value);
    } else if (id === 2) {
      setAddress(e.target.value);
    } else if (id === 3) {
      if (!isNaN(e.target.value)) {
        setPhone(e.target.value);
      }
    }
  };

  const handleChangeFile = (e) => {
    const file = e.target.files[0];

    showFileImg(file, (err, fileUrl) => {
      if (fileUrl) {
        setSrcImg(fileUrl);
      } else {
        setSrcImg("");
        toast.error(err);
      }
    });
  };

  const handleSubmit = async () => {
    const data = {
      name: name.trim(),
      address: address.trim(),
      email: email.trim(),
      phoneNumber: phone.trim(),
      image: srcImg,
    };

    if (name.trim() !== "" && email.trim() !== "") {
      setIsLoading(true);
      await updateProfile(data)
        .then((res) => {
          if (res.status === 200) {
            localStorage.setItem("authToken", res.data.token);
            toast.success("Cập nhật trang cá nhân thành công!");
            setIsEdit(false);
            window.location.reload();
          }
        })
        .catch((err) => console.log(err))
        .finally(() => setIsLoading(false));
    } else if (data.name === "" && data.email === "") {
      toast.warn("Tên hoặc Email đang bị trống!");
    }
  };

  return (
    <div>
      {/* avatar edit  */}
      <div className="">
        <h1 className="text-[14px] font-bold">Ảnh đại diện</h1>
        <div className=" mt-[10px] flex justify-center">
          <label
            htmlFor="avatar"
            className="edit-imgUser relative w-[140px] h-[140px] border rounded-full overflow-hidden cursor-pointer"
          >
            <img
              alt="Profile picture "
              className=" w-full h-full object-cover"
              src={srcImg || logo}
            />
            <div className="box-camera opacity-[0.8] absolute h-[100px] flex items-center justify-center bottom-[-100px] right-0 left-0 bg-slate-100">
              <FontAwesomeIcon
                icon={faCamera}
                className="mb-[40px] text-[24px] text-slate-600"
              />
            </div>
          </label>
          <input
            id="avatar"
            className="hidden"
            type="file"
            onChange={handleChangeFile}
          />
        </div>
      </div>
      {/* form info edit  */}
      <div className="mt-[10px]">
        <h1 className="text-[14px] font-bold">Chỉnh sửa phần giới thiệu</h1>
        <div className="flex flex-col gap-[15px] pt-[20px]">
          <div className="">
            <span
              onClick={handleClickEdit}
              className="inline-block px-[20px] py-[8px] text-[12px] bg-slate-200 hover:bg-slate-300 rounded-md cursor-pointer"
            >
              Nhấn để chỉnh sửa
            </span>
          </div>
          {arrInfo.map((item, index) => {
            return (
              <div key={index} className="flex flex-col">
                <span className="flex gap-[10px]">
                  {item.icon}
                  {item.info === "" && (
                    <p className=" text-[12px] italic text-textEmphasizeColor">
                      Thêm dữ liệu để hiển thị
                    </p>
                  )}

                  <p className="text-[12px]">{item.info}</p>
                  {item.important && (
                    <p className=" text-[12px] italic text-textEmphasizeColor">
                      *
                    </p>
                  )}
                </span>
                {isEdit && (
                  <div className="max-sm:h-smInpHeight mt-[10px] border border-borderColor rounded-sm px-[5px]">
                    <input
                      type="text"
                      className="max-sm:text-inputSize max-sm:h-full w-full text-[12px] outline-none"
                      value={item.info}
                      onChange={(e) => handleChangeInfo(item.id, e)}
                    />
                  </div>
                )}
              </div>
            );
          })}
          <span className="flex gap-[10px]">
            <FontAwesomeIcon icon={faClock} className="opacity-[0.5]" />
            <p className="text-[12px]">
              Tham gia vào Tháng {monthJoin} năm {yearJoin}
            </p>
          </span>
          {/* btn submit  */}
          <div className="text-end mt-[20px]">
            <span
              onClick={handleSubmit}
              className={`${
                isLoading || !isEdit
                  ? "bg-btnHoverColor pointer-events-none"
                  : ""
              } inline-block px-[20px] py-[8px] text-white text-[12px] bg-btnColor hover:bg-btnHoverColor rounded-md cursor-pointer`}
            >
              {isLoading ? (
                <FontAwesomeIcon className="loading" icon={faSpinner} />
              ) : (
                "Lưu thay đổi"
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;
