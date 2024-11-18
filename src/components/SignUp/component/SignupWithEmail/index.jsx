import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSpinner,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import * as registerService from "../../../../services/registerService";
import * as loginService from "../../../../services/loginService";
import "./index.css";
import { EyeIcon, EyeSlashIcon } from "../../../Icon";

function SignupWithEmail() {
  const [isLoading, setIsLoading] = useState(false);
  const [isEyePassword, setIsEyePassword] = useState(false);
  const [isEyeCofirmPassword, setIsEyeCofirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const handleChangeEyePassword = () => {
    setIsEyePassword(!isEyePassword);
  };
  const handleChangeEyeCofirmPassword = () => {
    setIsEyeCofirmPassword(!isEyeCofirmPassword);
  };

  const handleSignup = (data) => {
    const infoSignUp = {
      name: data.nameuser,
      username: data.username,
      password: data.password,
    };
    const infoLogin = {
      username: data.username,
      password: data.password,
    };

    setIsLoading(true);

    registerService
      .register(infoSignUp)
      .then((res) => {
        if (res?.status && res.status === 201) {
          toast.success(
            "Đăng ký thành công tài khoản! Tự động đăng nhập sau 3s"
          );
          setTimeout(() => {
            loginService
              .login(infoLogin)
              .then((loginRes) => {
                localStorage.setItem("authToken", loginRes.data.token);
              })
              .catch((err) => {
                console.log(err);
                toast.error("Đăng nhập thất bại. Vui lòng thử lại!");
              })
              .finally(() => {
                window.location.reload();
              });
          }, 3000);
        } else if (res.response && res.response.status === 400) {
          toast.error("Tài khoản này đã được đăng ký. Vui lòng thử lại!");
        } else {
          toast.error("Đã xảy ra lỗi không xác định. Vui lòng thử lại!");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Đã xảy ra lỗi trong quá trình đăng ký. Vui lòng thử lại!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="wrapper">
      <form
        className="form-signup flex flex-col"
        onSubmit={handleSubmit(handleSignup)}
      >
        <label className="lable-signup font-semibold text-[14px]">
          Nhập Email của bạn:
          <p className="inline text-[20px] text-[red]">*</p>
        </label>
        <div className="inp-signup relative h-[35px] mt-[9px] bg-transparent border-[1px] border-solid border-borderColor">
          <input
            className="h-[100%] w-[100%] text-[12px] placeholder:italic pl-[12px] border-none outline-none bg-transparent"
            type="text"
            placeholder="Email"
            {...register("username", {
              required: {
                value: true,
                message: "Vui lòng nhập email!",
              },
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Email không hợp lệ!",
              },
            })}
          />
        </div>
        <div className="inp-signup relative h-[35px] mt-[9px] bg-transparent border-[1px] border-solid border-borderColor">
          <input
            className="h-[100%] w-[100%] text-[12px] placeholder:italic pl-[12px] border-none outline-none bg-transparent"
            type={isEyePassword ? "text" : "password"}
            placeholder="Mật khẩu"
            {...register("password", {
              required: {
                value: true,
                message: "Vui lòng nhập mật khẩu!",
              },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message:
                  "Ít nhất 1 ký tự viết hoa, 1 ký tự viết thường, 1 số và 1 ký tự đặc biệt",
              },
            })}
          />
          <div
            className="icon-eye flex absolute right-[15px] top-[50%] translate-y-[-50%] cursor-pointer"
            onClick={handleChangeEyePassword}
          >
            {isEyePassword ? (
              <EyeIcon className="w-[22px]" />
            ) : (
              <EyeSlashIcon className="w-[22px]" />
            )}
          </div>
        </div>
        <div className="inp-signup relative h-[35px] mt-[9px] bg-transparent border-[1px] border-solid border-borderColor">
          <input
            className="h-[100%] w-[100%] text-[12px] placeholder:italic pl-[12px] border-none outline-none bg-transparent"
            type={isEyeCofirmPassword ? "text" : "password"}
            placeholder="Nhập lại mật khẩu"
            {...register("confirmPassword", {
              validate: (value) =>
                value === password || "Mật khẩu không trùng khớp",
            })}
          />
          <div
            className="icon-eye flex absolute right-[15px] top-[50%] translate-y-[-50%] cursor-pointer"
            onClick={handleChangeEyeCofirmPassword}
          >
            {isEyeCofirmPassword ? (
              <EyeIcon className="w-[22px]" />
            ) : (
              <EyeSlashIcon className="w-[22px]" />
            )}
          </div>
        </div>
        <label className="lable-signup mt-[9px] font-semibold text-[14px]">
          Tên bạn muốn hiển thị:
        </label>
        <div className="inp-signup relative h-[35px] mt-[9px] bg-transparent border-[1px] border-solid border-borderColor">
          <input
            className="h-[100%] w-[100%] text-[12px] placeholder:italic pl-[12px] border-none outline-none bg-transparent"
            type="text"
            placeholder="VD: Nguyễn A... ( Mặc định là email của bạn )"
            {...register("nameuser")}
          />
        </div>

        {/* BOX ERROR  */}
        <div className="box-error mt-[8px]">
          {errors.username?.message && (
            <div className="wrapper-error flex items-center">
              <FontAwesomeIcon
                icon={faTriangleExclamation}
                className="icon-error text-[1.2rem] text-textEmphasizeColor ml-[5px]"
              />
              <label className="label-error block text-[12px] text-textEmphasizeColor ml-[5px]">
                {errors.username?.message}
              </label>
            </div>
          )}
          {errors.password?.message && (
            <div className="wrapper-error flex items-center">
              <FontAwesomeIcon
                icon={faTriangleExclamation}
                className="icon-error text-[1.2rem] text-textEmphasizeColor ml-[5px]"
              />
              <label className="label-error block text-[12px] text-textEmphasizeColor ml-[5px]">
                {errors.password?.message}
              </label>
            </div>
          )}
          {errors.confirmPassword?.message !== undefined &&
            errors.username?.message === undefined &&
            errors.password?.message === undefined && (
              <div className="wrapper-error flex items-center">
                <FontAwesomeIcon
                  icon={faTriangleExclamation}
                  className="icon-error text-[1.2rem] text-textEmphasizeColor ml-[5px]"
                />
                <label className="label-error block text-[12px] text-textEmphasizeColor ml-[5px]">
                  {errors.confirmPassword?.message}
                </label>
              </div>
            )}
        </div>
        <button
          className={`${
            isLoading ? "pointer-events-none opacity-[0.3]" : ""
          } max-sm:text-[14px] btn-signup transition-all py-[4px] text-white block w-[100%] my-[9px] mx-0 bg-btnColor hover:bg-btnHoverColor`}
        >
          {isLoading ? (
            <FontAwesomeIcon className="loading" icon={faSpinner} />
          ) : (
            "Đăng ký"
          )}
        </button>
      </form>
    </div>
  );
}

export default SignupWithEmail;
