import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "../../../../components/Icon";
import { toast } from "react-toastify";
import { changePassword } from "../../../../services/handleChangePasswordService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const ProfileChangePassword = () => {
  const [isSeeOld, setIsSeeOld] = useState(false);
  const [isSeeNewPass, setIsSeeNewPass] = useState(false);
  const [isSeeReNewPass, setIsSeeReNewPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [reNewPass, setReNewPass] = useState("");

  const [errOldPass, setErrOldPass] = useState("");
  const [errNewPass, setErrNewPass] = useState("");
  const [errReNewPass, setErrReNewPass] = useState("");

  const handleChangeOldPassword = (e) => {
    setOldPass(e.target.value);
  };
  const handleChangeNewPassword = (e) => {
    setNewPass(e.target.value);
  };
  const handleChangeRenenterPassword = (e) => {
    setReNewPass(e.target.value);
  };

  const fncValidateChangePass = (oldPass, newPass, reNewPass) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    let hasError = false;

    if (oldPass.trim() === "") {
      setErrOldPass("Vui lòng nhập mật khẩu cũ!");
      hasError = true;
    } else {
      setErrOldPass("");
    }

    if (newPass.trim() === "") {
      setErrNewPass("Vui lòng nhập mật khẩu mới!");
      hasError = true;
    } else if (!regex.test(newPass)) {
      setErrNewPass(
        "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt!"
      );
      hasError = true;
    } else {
      setErrNewPass("");
    }

    if (reNewPass.trim() === "") {
      setErrReNewPass("Vui lòng nhập lại mật khẩu mới!");
      hasError = true;
    } else if (newPass !== reNewPass) {
      setErrReNewPass("Mật khẩu không trùng khớp!");
      hasError = true;
    } else {
      setErrReNewPass("");
    }

    return hasError;
  };

  const handleSubmit = async () => {
    const hasError = fncValidateChangePass(oldPass, newPass, reNewPass);

    if (!hasError) {
      setIsLoading(true);
      const data = {
        currentPassword: oldPass,
        newPassword: newPass,
      };
      await changePassword(data)
        .then((res) => {
          if (res?.response?.status === 401) {
            toast.warn("Mật khẩu cũ không đúng! Vui lòng thử lại.");
            setErrOldPass("Mật khẩu cũ không đúng!");
          } else if (res?.status === 200) {
            toast.success("Thay đổi mật khẩu thành công!");
            setOldPass("");
            setNewPass("");
            setReNewPass("");
          }
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setErrOldPass("");
          setIsLoading(false);
        });
    }
  };

  const handleSeePass = (id) => {
    if (id === 1) {
      setIsSeeOld((prev) => !prev);
    } else if (id === 2) {
      setIsSeeNewPass((prev) => !prev);
    } else if (id === 3) {
      setIsSeeReNewPass((prev) => !prev);
    }
  };

  return (
    <div className="">
      <h1 className="text-[14px] font-bold">Thay đổi mật khẩu</h1>
      <div className="mt-[20px] pl-[20px] flex flex-col gap-[5px]">
        <div>
          <span className="flex gap-[5px]">
            <p className="text-[14px]">Mật khẩu cũ</p>
            <p className="text-textEmphasizeColor text-[14px]">*</p>
          </span>
          {errOldPass && (
            <p className="text-textEmphasizeColor text-[8px] italic">
              {errOldPass}
            </p>
          )}
          <div className="flex mt-[10px] border border-borderColor rounded-sm px-[5px]">
            <input
              type={`${isSeeOld ? "text" : "password"}`}
              className="w-full text-[12px] outline-none dark:bg-bgDarkMainColor"
              value={oldPass}
              onChange={handleChangeOldPassword}
            />
            <span onClick={() => handleSeePass(1)}>
              {isSeeOld ? (
                <EyeIcon className="w-[24px] cursor-pointer " />
              ) : (
                <EyeSlashIcon className="w-[24px] cursor-pointer" />
              )}
            </span>
          </div>
        </div>
        <div>
          <span className="flex gap-[5px]">
            <p className="text-[14px]">Mật khẩu mới</p>
            <p className="text-textEmphasizeColor text-[14px]">*</p>
          </span>
          {errNewPass && (
            <p className="text-textEmphasizeColor text-[8px] italic">
              {errNewPass}
            </p>
          )}
          <div className="flex mt-[10px] border border-borderColor rounded-sm px-[5px]">
            <input
              type={`${isSeeNewPass ? "text" : "password"}`}
              className="w-full text-[12px] outline-none dark:bg-bgDarkMainColor"
              value={newPass}
              onChange={handleChangeNewPassword}
            />
            <span onClick={() => handleSeePass(2)}>
              {isSeeNewPass ? (
                <EyeIcon className="w-[24px] cursor-pointer" />
              ) : (
                <EyeSlashIcon className="w-[24px] cursor-pointer" />
              )}
            </span>
          </div>
        </div>
        <div>
          <span className="flex gap-[5px]">
            <p className="text-[14px]">Nhập lại mật khẩu</p>
            <p className="text-textEmphasizeColor text-[14px]">*</p>
          </span>
          {errReNewPass && (
            <p className="text-textEmphasizeColor text-[8px] italic">
              {errReNewPass}
            </p>
          )}
          <div className="flex mt-[10px] border border-borderColor rounded-sm px-[5px]">
            <input
              type={`${isSeeReNewPass ? "text" : "password"}`}
              className="w-full text-[12px] outline-none dark:bg-bgDarkMainColor"
              value={reNewPass}
              onChange={handleChangeRenenterPassword}
            />
            <span onClick={() => handleSeePass(3)}>
              {isSeeReNewPass ? (
                <EyeIcon className="w-[24px] cursor-pointer" />
              ) : (
                <EyeSlashIcon className="w-[24px] cursor-pointer" />
              )}
            </span>
          </div>
        </div>
      </div>
      {/* btn submit  */}
      <div className="text-end mt-[20px]">
        <span
          onClick={handleSubmit}
          className={`${
            isLoading ? "bg-btnHoverColor pointer-events-none" : ""
          } inline-block px-[20px] py-[8px] text-white dark:bg-btnDarkColor text-[12px] bg-btnColor hover:bg-btnHoverColor rounded-md cursor-pointer`}
        >
          {isLoading ? (
            <FontAwesomeIcon className="loading" icon={faSpinner} />
          ) : (
            "Đổi mật khẩu"
          )}
        </span>
      </div>
    </div>
  );
};

export default ProfileChangePassword;
