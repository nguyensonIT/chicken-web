import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

import "./index.css";
import { dataForm } from "../DataForm";

function Login({ setIsDialog = () => {} }) {
  const refDialog = useRef(null);

  const [dataItemSignUp, setDataItemSignUp] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const [dataDialog, setDataDialog] = useState([dataForm[0]]);

  const handleCloseDialog = () => {
    refDialog.current.classList.add("isClose");
    setTimeout(() => {
      setIsDialog(false);
    }, 300);
  };
  const handlePrevDialog = () => {
    setDataDialog((prev) => {
      return prev.slice(0, 1);
    });
  };
  const handleChangeForm = () => {
    setIsLogin((prev) => {
      if (isLogin) {
        setDataDialog([dataForm[0]]);
      } else {
        setDataDialog([dataForm[1]]);
      }
      return !isLogin;
    });
  };

  const handleOption = (detail) => {
    setDataDialog((prev) => {
      return [...prev, detail];
    });
  };
  useEffect(() => {
    setDataItemSignUp(dataDialog[dataDialog.length - 1].data);
  }, [dataDialog]);

  return ReactDOM.createPortal(
    <div className="wrapper fixed flex justify-center items-center top-0 left-0 right-0 bottom-0 z-[999] bg-bgDialogColor">
      <div
        ref={refDialog}
        className="dialog flex absolute flex-col w-[auto] h-[auto] p-[48px] rounded-[8px] bg-white "
      >
        <div className="container w-[100%]">
          <div className="wrapper-content w-[375px] m-auto p-[unset] grow-[1] shrink-[1] basis-[0%]">
            <div className="content">
              <h1 className="title text-center text-black text-[32px] my-[16px] mx-auto font-bold">
                {dataDialog[dataDialog.length - 1].title}
              </h1>
              {Array.isArray(dataItemSignUp)
                ? dataItemSignUp.map((data, index) => (
                    <div key={index} className="container-option ">
                      {/* Thêm class disable  */}
                      <div
                        className={`box-option relative h-[44px] mb-[16px] cursor-pointer flex items-center justify-center border-[1px] border-solid border-borderColor py-0 px-[12px] ${
                          data.disable
                            ? "disable opacity-[0.5] pointer-events-none bg-[#f5f5f5] text-[#999]"
                            : ""
                        }`}
                        onClick={() => {
                          data.handle
                            ? data.handle()
                            : handleOption(data.detail);
                        }}
                      >
                        <p className="icon-option flex items-center absolute left-[12px] w-[25px]">
                          {data.icon}
                        </p>
                        <p>{data.name}</p>
                      </div>
                    </div>
                  ))
                : dataItemSignUp}
            </div>
          </div>
        </div>

        <div className="footer flex items-center justify-center h-[64px] m-[unset] text-black border-t-[0.5px] border-solid border-borderColor text-[15px] leading-[18px]">
          <p>{dataDialog[dataDialog.length - 1].footer_des}</p>
          <span
            className="sign-up text-textEmphasizeColor font-semibold ml-[5px] cursor-pointer hover:underline"
            onClick={handleChangeForm}
          >
            {dataDialog[dataDialog.length - 1].footer_link}
          </span>
        </div>
        {/* onClick={handleCloseDialog} */}
        <div
          onClick={handleCloseDialog}
          className="close-dialog absolute w-[40px] h-[40px] right-[16px] top-[18px] flex items-center justify-center rounded-[50%] z-10 bg-bgDialogColor cursor-pointer"
        >
          <FontAwesomeIcon
            icon={faXmark}
            className="icon-close-dialog text-[22px]"
          />
        </div>
        {dataDialog.length > 1 && (
          <div
            className="prev-dialog w-[40px] h-[40px] absolute top-[18px] left-[16px] flex items-center justify-center z-10 rounded-[50%] cursor-pointer bg-bgDialogColor"
            onClick={handlePrevDialog}
          >
            <FontAwesomeIcon
              icon={faChevronLeft}
              className="icon-prev-dialog text-[22px]"
            />
          </div>
        )}
      </div>
    </div>,
    document.querySelector("body")
  );
}

export default Login;
