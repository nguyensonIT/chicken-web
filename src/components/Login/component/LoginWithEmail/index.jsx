import { useState } from "react";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import "./index.css";
import { EyeIcon, EyeSlashIcon } from "../../../Icon";

function LoginWithEmail() {
  const [isLoading, setIsLoading] = useState(false);
  const [isEyePassword, setIsEyePassword] = useState(false);
  const [errLabel, setErrLabel] = useState("");

  const handleChangeEyePassword = () => {
    setIsEyePassword(!isEyePassword);
  };
  const { register, handleSubmit, watch } = useForm();

  const handleLogin = () => {
    setIsLoading(true);
    console.log("hihihi");
  };
  return (
    <div className="wrapper">
      <form
        className="form-login flex flex-col"
        onSubmit={handleSubmit(handleLogin)}
      >
        <label className="lable-login font-semibold text-[16px]">
          Email hoặc Username
        </label>
        <div className="inp-login relative h-[44px] mt-[9px] bg-transparent border-[1px] border-solid border-borderColor">
          <input
            className="h-[100%] w-[100%] pl-[12px] border-none outline-none bg-transparent"
            type="text"
            placeholder="Email hoặc Username"
            {...register("username")}
          />
        </div>
        <div className="inp-login relative h-[44px] mt-[9px] bg-transparent border-[1px] border-solid border-borderColor">
          <input
            className="h-[100%] w-[100%] pl-[12px] border-none outline-none bg-transparent"
            type={isEyePassword ? "text" : "password"}
            placeholder="Password"
            {...register("password")}
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
        <label className="err-label text-[12px] text-textEmphasizeColor no-underline my-[9px] mx-0 hover:underline">
          {errLabel}
        </label>
        <div>
          <a
            href="#"
            className="forgot-link inline-block text-[12px] no-underline my-[9px] mx-0 hover:underline"
          >
            Quên mật khẩu?
          </a>
        </div>
        <button
          className={`btn-login transition-all text-white block w-[100%] py-[4px] my-[9px] mx-0 bg-btnColor hover:bg-btnHoverColor ${
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
