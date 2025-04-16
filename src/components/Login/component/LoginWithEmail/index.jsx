import { useState } from "react";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSpinner,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

import "./index.css";
import { EyeIcon, EyeSlashIcon } from "../../../Icon";
import * as loginService from "../../../../services/loginService";

function LoginWithEmail() {
  const [isLoading, setIsLoading] = useState(false);
  const [isEyePassword, setIsEyePassword] = useState(false);

  const handleChangeEyePassword = () => {
    setIsEyePassword(!isEyePassword);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = (data) => {
    const dataLogin = {
      username: data.username.toLowerCase().trim(),
      password: data.password,
    };
    setIsLoading(true);
    loginService
      .login(dataLogin)
      .then((res) => {
        if (res?.data?.status === 201) {
          localStorage.setItem("authToken", res.data.token);
          toast.success("Đăng nhập thành công!");
          setIsLoading(false);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else if (res?.response?.status === 404) {
          toast.warn("Lỗi sever. Vui lòng liên hệ Admin");
        } else if (res?.response?.status === 401) {
          toast.warn(
            "Thông tin tài khoản hoặc mật khẩu không chính xác. Vui lòng thử lại!"
          );
        } else if (res?.response?.status === 500) {
          toast.error("Server bị lỗi. Vui lòng thử lại!");
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <div className="wrapper">
      <form
        className="form-login flex flex-col"
        onSubmit={handleSubmit(handleLogin)}
      >
        <label className="lable-login font-semibold text-[14px]">
          Nhập Email, mật khẩu của bạn
        </label>
        <div className="max-sm:h-smInpHeight inp-login relative h-[35px] mt-[9px] bg-transparent border-[1px] border-solid border-borderColor">
          <input
            className="max-sm:text-inputSize h-[100%] w-[100%] text-[12px] placeholder:italic pl-[12px] border-none outline-none bg-transparent"
            type="text"
            placeholder="Nhập email của bạn"
            {...register("username", {
              required: {
                value: true,
                message: "Vui lòng nhập email!",
              },
            })}
          />
        </div>
        <div className="max-sm:h-smInpHeight inp-login relative h-[35px] mt-[9px] bg-transparent border-[1px] border-solid border-borderColor">
          <input
            className="max-sm:text-inputSize h-[100%] w-[100%] text-[12px] placeholder:italic pl-[12px] border-none outline-none bg-transparent"
            type={isEyePassword ? "text" : "password"}
            placeholder="Mật khẩu"
            {...register("password", {
              required: {
                value: true,
                message: "Vui lòng nhập mật khẩu!",
              },
            })}
          />
          <div
            className="icon-eye flex absolute top-[50%] right-[15px] translate-y-[-50%] cursor-pointer "
            onClick={handleChangeEyePassword}
          >
            {isEyePassword ? (
              <EyeIcon className="w-[20px]" />
            ) : (
              <EyeSlashIcon className="w-[20px]" />
            )}
          </div>
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
        </div>

        <div>
          <a
            href="#"
            className="forgot-link inline-block text-[12px] no-underline my-[9px] mx-0 hover:underline"
          >
            Quên mật khẩu?
          </a>
        </div>
        <button
          className={`max-sm:text-sm max-sm:py-[10px] btn-login transition-all text-white block w-[100%] py-[4px] my-[9px] mx-0 bg-btnColor hover:bg-btnHoverColor ${
            isLoading ? "pointer-events-none opacity-[0.5]" : ""
          }`}
          type="submit"
        >
          {isLoading ? (
            <FontAwesomeIcon className="loading" icon={faSpinner} />
          ) : (
            "Đăng nhập"
          )}
        </button>
      </form>
    </div>
  );
}

export default LoginWithEmail;
