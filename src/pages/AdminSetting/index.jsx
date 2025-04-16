import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

import { showFileImg } from "../../components/Function";
import DialogQuestionYesNo from "../../components/DialogQuestionYesNo";
import * as configSevice from "../../services/configSevice";

const AdminSetting = () => {
  const inpRef = useRef(null);
  const refDialog = useRef(null);

  const [srcImg1, setSrcImg1] = useState("");
  const [srcImg2, setSrcImg2] = useState("");
  const [srcImg3, setSrcImg3] = useState("");

  const [srcImgLogo, setSrcImgLogo] = useState("");

  const [isDialog, setIsDialog] = useState(false);
  const [dataDialog, setDataDialog] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeFileLogo = (e) => {
    const file = e.target.files[0];

    showFileImg(file, (err, fileUrl) => {
      if (fileUrl) {
        setSrcImgLogo(fileUrl);
      } else {
        setSrcImgLogo("");
        toast.error(err);
      }
    });
  };

  const handleChangeFile1 = (e) => {
    const file = e.target.files[0];

    showFileImg(file, (err, fileUrl) => {
      if (fileUrl) {
        setSrcImg1(fileUrl);
      } else {
        setSrcImg1("");
        toast.error(err);
      }
    });
  };
  const handleChangeFile2 = (e) => {
    const file = e.target.files[0];

    showFileImg(file, (err, fileUrl) => {
      if (fileUrl) {
        setSrcImg2(fileUrl);
      } else {
        setSrcImg2("");
        toast.error(err);
      }
    });
  };
  const handleChangeFile3 = (e) => {
    const file = e.target.files[0];

    showFileImg(file, (err, fileUrl) => {
      if (fileUrl) {
        setSrcImg3(fileUrl);
      } else {
        setSrcImg3("");
        toast.error(err);
      }
    });
  };

  const handleTurnDialog = () => {
    setIsDialog((prev) => !prev);
  };
  const handleSaveLogo = () => {
    setIsLoading(true);
    configSevice
      .updateLogo({ logoUrl: srcImgLogo })
      .then((data) => {
        if (data.status === 200) {
          toast.success("Thay đổi logo thành công!");
          setSrcImgLogo("");
        } else {
          toast.warn("Xảy ra lỗi gì đó!");
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
        handleTurnDialog();
      });
  };
  const handleSaveBanner = () => {
    setIsLoading(true);
    configSevice
      .updateBanner({ bannerUrls: [srcImg1, srcImg2, srcImg3] })
      .then((data) => {
        if (data.status === 200) {
          toast.success("Cập nhật banner thành công!");
          setSrcImg1("");
          setSrcImg2("");
          setSrcImg3("");
        } else {
          toast.warn("Xảy ra lỗi gì đó!");
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
        handleTurnDialog();
      });
  };

  const handleDialog = (number) => {
    if (number === 1) {
      handleTurnDialog();
      setDataDialog({
        title: "Bạn có chắc muốn dùng logo này?",
        textNo: "Nghĩ lại",
        textYes: "Đồng ý",
        handleYes: handleSaveLogo,
        handleNo: handleTurnDialog,
        isLoading,
      });
    } else if (number === 2) {
      handleTurnDialog();
      setDataDialog({
        title: "Bạn có chắc muốn dùng các banner này?",
        textNo: "Nghĩ lại",
        textYes: "Đồng ý",
        handleYes: handleSaveBanner,
        handleNo: handleTurnDialog,
        isLoading,
      });
    }
  };
  useEffect(() => {
    isDialog && refDialog.current.classList.add("isDetail");
  }, [isDialog]);
  return (
    <div className="max-w-full">
      <h1 className="text-[32px] font-bold text-center">Cài đặt</h1>
      <div className="px-[10px] py-[20px] shadow-md sm:rounded-lg">
        {/* Change logo  */}
        <div className="flex justify-between">
          <span className="text-smTitle whitespace-nowrap">
            Thay đổi logo{" "}
            <span className="text-smDesc">(click + để thay đổi):</span>
          </span>
          <div className="w-[30px] h-[30px]">
            {srcImgLogo === "" && (
              <label
                htmlFor="logo"
                className="p-[5px] border border-dashed border-borderColor"
              >
                <input
                  id="logo"
                  ref={inpRef}
                  className="rounded-md hidden"
                  type="file"
                  onChange={(e) => handleChangeFileLogo(e)}
                />
                <FontAwesomeIcon
                  icon={faPlus}
                  className="text-yellow-400 font-bold"
                />
              </label>
            )}
            {srcImgLogo !== "" && (
              <img
                src={srcImgLogo}
                alt="logo"
                className="w-full h-full object-contain"
              />
            )}
          </div>
        </div>
        {/* btn save Logo  */}
        <div className="py-[10px] text-right">
          <span
            onClick={() => handleDialog(1)}
            className="bg-bgEmphasizeColor text-white rounded-md px-[10px] py-[5px] mr-[5px] hover:opacity-[0.4] hover:cursor-pointer"
          >
            Lưu
          </span>
        </div>

        {/* Change Banner  */}
        <div className="flex flex-col gap-[20px]">
          <span className="text-smTitle whitespace-nowrap">
            Thay đổi banner{" "}
            <span className="text-smDesc">
              (click + để thay đổi (45 x 12cm)):
            </span>
          </span>
          <div className="flex flex-col gap-[20px] items-center">
            {/* plus */}
            {srcImg1 === "" && (
              <label
                htmlFor="banner1"
                className="p-[15px] border border-dashed border-borderColor"
              >
                <input
                  id="banner1"
                  ref={inpRef}
                  className="rounded-md hidden"
                  type="file"
                  onChange={(e) => handleChangeFile1(e)}
                />
                <FontAwesomeIcon
                  icon={faPlus}
                  className="text-yellow-400 font-bold"
                />
              </label>
            )}
            {/* banner add  */}
            {srcImg1 !== "" && (
              <div className="relative">
                <img
                  src={srcImg1}
                  alt="banner1"
                  className="w-full h-full object-contain"
                />
                <span
                  onClick={() => setSrcImg1("")}
                  className="flex justify-center items-center absolute size-[20px] bg-black right-[-5px] top-[-15px] rounded-[50%] overflow-hidden cursor-pointer"
                >
                  <FontAwesomeIcon
                    className="text-textHoverColor p-[2px]"
                    icon={faXmark}
                  />
                </span>
              </div>
            )}
            {/* plus */}
            {srcImg2 === "" && (
              <label
                htmlFor="banner2"
                className="p-[15px] border border-dashed border-borderColor"
              >
                <input
                  id="banner2"
                  ref={inpRef}
                  className="rounded-md hidden"
                  type="file"
                  onChange={(e) => handleChangeFile2(e)}
                />
                <FontAwesomeIcon
                  icon={faPlus}
                  className="text-yellow-400 font-bold"
                />
              </label>
            )}
            {/* banner add  */}
            {srcImg2 !== "" && (
              <div className="relative">
                <img
                  src={srcImg2}
                  alt="logo"
                  className="w-full h-full object-contain"
                />
                <span
                  onClick={() => setSrcImg2("")}
                  className="flex justify-center items-center absolute size-[20px] bg-black right-[-5px] top-[-15px] rounded-[50%] overflow-hidden cursor-pointer"
                >
                  <FontAwesomeIcon
                    className="text-textHoverColor p-[2px]"
                    icon={faXmark}
                  />
                </span>
              </div>
            )}
            {srcImg3 === "" && (
              <label
                htmlFor="banner3"
                className="p-[15px] border border-dashed border-borderColor"
              >
                <input
                  id="banner3"
                  ref={inpRef}
                  className="rounded-md hidden"
                  type="file"
                  onChange={(e) => handleChangeFile3(e)}
                />
                <FontAwesomeIcon
                  icon={faPlus}
                  className="text-yellow-400 font-bold"
                />
              </label>
            )}
            {srcImg3 !== "" && (
              <div className="relative">
                <img
                  src={srcImg3}
                  alt="logo"
                  className="w-full h-full object-contain"
                />
                <span
                  onClick={() => setSrcImg3("")}
                  className="flex justify-center items-center absolute size-[20px] bg-black right-[-5px] top-[-15px] rounded-[50%] overflow-hidden cursor-pointer"
                >
                  <FontAwesomeIcon
                    className="text-textHoverColor p-[2px]"
                    icon={faXmark}
                  />
                </span>
              </div>
            )}
          </div>
        </div>
        {/* btn save banner  */}
        <div className="py-[10px] text-right">
          <span
            onClick={() => handleDialog(2)}
            className="bg-bgEmphasizeColor text-white rounded-md px-[10px] py-[5px] mr-[5px] hover:opacity-[0.4] hover:cursor-pointer"
          >
            Lưu
          </span>
        </div>
      </div>
      {/* Dialog  */}
      {isDialog && (
        <DialogQuestionYesNo
          refDialog={refDialog}
          title={dataDialog.title}
          textNo={dataDialog.textNo}
          textYes={dataDialog.textYes}
          handleYes={dataDialog.handleYes}
          handleNo={dataDialog.handleNo}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default AdminSetting;
