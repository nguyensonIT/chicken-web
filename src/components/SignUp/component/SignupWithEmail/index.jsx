import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSpinner,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useForm } from "react-hook-form";

import "./index.css";
import { EyeIcon, EyeSlashIcon } from "../../../Icon";

function SignupWithEmail() {
  const [isLoading, setIsLoading] = useState(false);
  const [isEyePassword, setIsEyePassword] = useState(false);
  const [isEyeCofirmPassword, setIsEyeCofirmPassword] = useState(false);
  const [errorRegistered, setErrorRegistered] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const handleChangeEyePassword = () => {
    setIsEyePassword(!isEyePassword);
  };
  const handleChangeEyeCofirmPassword = () => {
    setIsEyeCofirmPassword(!isEyeCofirmPassword);
  };

  const handleSignup = () => {
    setIsLoading(true);
    console.log("Đăng ký");
  };
  const password = watch("password");
  return (
    <div className="wrapper">
      <form
        className="form-signup flex flex-col"
        onSubmit={handleSubmit(handleSignup)}
      >
        <label className="lable-signup font-semibold text-[16px]">
          Số điện thoại hoặc Email
        </label>
        <div className="inp-signup relative h-[44px] mt-[9px] bg-transparent border-[1px] border-solid border-borderColor">
          <input
            className="h-[100%] w-[100%] pl-[12px] border-none outline-none bg-transparent"
            type="text"
            placeholder="Email hoặc Số điện thoại"
            {...register("email", {
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Email invalid!",
              },
            })}
          />
        </div>
        <div className="inp-signup relative h-[44px] mt-[9px] bg-transparent border-[1px] border-solid border-borderColor">
          <input
            className="h-[100%] w-[100%] pl-[12px] border-none outline-none bg-transparent"
            type={isEyePassword ? "text" : "password"}
            placeholder="Mật khẩu"
            {...register("password", {
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message:
                  "At least 1 uppercase character, 1 lowercase character, 1 number and 1 special character",
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
        <div className="inp-signup relative h-[44px] mt-[9px] bg-transparent border-[1px] border-solid border-borderColor">
          <input
            className="h-[100%] w-[100%] pl-[12px] border-none outline-none bg-transparent"
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
        <div className="box-error mt-[8px]">
          {errorRegistered !== "" && (
            <div className="wrapper-error flex items-center">
              <FontAwesomeIcon
                icon={faTriangleExclamation}
                className="icon-error text-[1.2rem] text-textEmphasizeColor ml-[5px]"
              />
              <label className="label-error block text-[12px] text-textEmphasizeColor ml-[5px]">
                {errorRegistered}
              </label>
            </div>
          )}
          {errors?.email?.message && (
            <div className="wrapper-error flex items-center">
              <FontAwesomeIcon
                icon={faTriangleExclamation}
                className="icon-error text-[1.2rem] text-textEmphasizeColor ml-[5px]"
              />
              <label className="label-error block text-[12px] text-textEmphasizeColor ml-[5px]">
                {errors?.email?.message}
              </label>
            </div>
          )}
          {errors?.password?.message && (
            <div className="wrapper-error flex items-center">
              <FontAwesomeIcon
                icon={faTriangleExclamation}
                className="icon-error text-[1.2rem] text-textEmphasizeColor ml-[5px]"
              />
              <label className="label-error block text-[12px] text-textEmphasizeColor ml-[5px]">
                {errors?.password?.message}
              </label>
            </div>
          )}
          {errors?.confirmpassword?.message && (
            <div className="wrapper-error flex items-center">
              <FontAwesomeIcon
                icon={faTriangleExclamation}
                className="icon-error text-[1.2rem] text-textEmphasizeColor ml-[5px]"
              />
              <label className="label-error block text-[12px] text-textEmphasizeColor ml-[5px]">
                {errors?.confirmpassword?.message}
              </label>
            </div>
          )}
        </div>
        <button className="btn-signup transition-all py-[4px] text-white block w-[100%] my-[9px] mx-0 bg-btnColor hover:bg-btnHoverColor">
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
