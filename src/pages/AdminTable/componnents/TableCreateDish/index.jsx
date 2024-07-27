import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import { UploadImage } from "../../../../components/Icon";
import BtnTurnOn from "../../../../components/BtnTurnOn";
import "./styles.css";
import { showFileImg } from "../../../../components/Function";
import SelectCategory from "./component/SelectCategory";
import DialogDeleteProduct from "../../../../components/DialogDeleteProduct";

const TableCreateDish = ({ data = {} }) => {
  const [dataProduct, setDataProduct] = useState(data);

  const [isDialogDeleteProduct, setDialogDeleteProduct] = useState(false);

  const [idProduct, setIdProduct] = useState(data?.idProduct || "");
  const [nameProduct, setNameProduct] = useState(data?.nameProduct || "");
  const [priceProduct, setPriceProduct] = useState(data?.priceProduct || "");
  const [descProduct, setDescProduct] = useState(data?.descProduct || "");
  const [srcImg, setSrcImg] = useState(data?.imgProduct || "");
  const [optionCategory, setOptionCategory] = useState(data?.category || "");

  const [errCategory, setErrCategory] = useState(null);
  const [errImage, setErrImage] = useState(null);

  const refDialog = useRef(null);
  const inpRef = useRef(null);

  const isEmpty = Object.keys(data).length === 0 && data.constructor === Object;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nameProduct,
      priceProduct,
      descProduct,
      idProduct,
      srcImg,
      optionCategory,
    },
  });

  const handleUpload = () => {
    inpRef.current.click();
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

  const handleSelectCategory = (e) => {
    setOptionCategory(e.target.value);
  };

  const handleBtnSubmit = (data) => {
    if (optionCategory === "") {
      setErrCategory("Chọn danh mục đã!");
      setErrImage(null);
    } else if (srcImg === "") {
      console.log("lỗi ảnh");
      setErrImage("Tải ảnh lên bạn ơi!");
      setErrCategory(null);
    } else {
      setErrCategory(null);
      setErrImage(null);
      console.log({ ...data, srcImg, optionCategory });
    }
  };

  const handleTurnOnDialogDelete = (e) => {
    e.preventDefault();
    setDialogDeleteProduct(true);
  };

  const handleCloseDialog = () => {
    refDialog.current.classList.add("isClose");
    setTimeout(() => {
      setDialogDeleteProduct(false);
    }, 300);
  };

  const handleDeleteProduct = (id) => {
    console.log(id);
  };

  useEffect(() => {
    isDialogDeleteProduct && refDialog.current.classList.add("isDetail");
  }, [isDialogDeleteProduct]);

  return (
    <form onSubmit={handleSubmit(handleBtnSubmit)}>
      {/* box error */}
      {(errors.nameProduct?.message ||
        errCategory ||
        errImage ||
        errors.descProduct?.message ||
        errors.priceProduct?.message) && (
        <div className="box-err h-[30px] w-[400px] my-[10px] mx-auto border border-dashed border-textEmphasizeColor">
          <p className="text-center">
            {errors.nameProduct?.message ||
              errCategory ||
              errImage ||
              errors.descProduct?.message ||
              errors.priceProduct?.message}
          </p>
        </div>
      )}

      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-6 py-3">Ảnh SP</th>
            {!isEmpty && <th className="px-6 py-3">ID</th>}
            <th className="px-6 py-3">Tên SP</th>
            <th className="px-6 py-3">Giá tiền</th>
            <th className="px-6 py-3">Mô tả</th>
            <th className="px-6 py-3">Danh mục</th>
            {!isEmpty && <th className="px-6 py-3">Còn hàng</th>}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="flex justify-center py-[20px]">
              <input
                ref={inpRef}
                className="hidden rounded-md"
                type="file"
                onChange={(e) => handleChangeFile(e)}
              />
              {!isEmpty ? (
                <div
                  onClick={handleUpload}
                  className="box-img overflow-hidden relative w-[60px] h-[60px] cursor-pointer"
                >
                  <img
                    className="w-full h-full object-cover"
                    src={srcImg}
                    alt="img"
                  />
                  <span className="box-edit absolute font-bold text-white text-center w-full h-1/2 bottom-0 left-0 bg-bgHoverColor bg-opacity-[0.6]">
                    Sửa
                  </span>
                </div>
              ) : srcImg ? (
                <div
                  onClick={handleUpload}
                  className="box-img overflow-hidden relative w-[60px] h-[60px] cursor-pointer"
                >
                  <img
                    className="w-full h-full object-cover"
                    src={srcImg}
                    alt="img"
                  />
                </div>
              ) : (
                <button
                  onClick={handleUpload}
                  className="flex justify-center items-center px-[4px] py-[5px] font-bold uppercase border border-btnColor rounded-md"
                >
                  <UploadImage className="mr-[5px] text-[20px]" />
                  Upload
                </button>
              )}
            </td>
            {!isEmpty && (
              <td className="pointer-events-none">
                <div className="py-[5px] border border-borderColor rounded-md">
                  <input
                    className="text-[14px] text-center w-full px-[5px] outline-none"
                    {...register("idProduct")}
                  />
                </div>
              </td>
            )}
            <td>
              <div className="py-[5px] border border-borderColor rounded-md">
                <input
                  className="text-[14px] text-center w-full px-[5px] outline-none"
                  {...register("nameProduct", {
                    required: "Nhập tên sản phẩm đã!",
                    maxLength: {
                      value: 100,
                      message: "Tên dài quá!",
                    },
                  })}
                  placeholder="VD: Gà rán..."
                />
              </div>
            </td>
            <td>
              <div className="flex pr-[5px] py-[5px] border border-borderColor rounded-md">
                <input
                  className="text-[14px] text-center w-full px-[5px] outline-none"
                  placeholder="VD: 160000..."
                  {...register("priceProduct", {
                    required: "Nhập giá tiền đi!",
                    pattern: {
                      value: /^\d+$/,
                      message: "Giá tiền phải là số!",
                    },
                  })}
                />
                VNĐ
              </div>
            </td>
            <td>
              <textarea
                className="text-[14px] outline-none px-[5px] border border-borderColor rounded-md"
                placeholder="VD: Gà chiên giòn ngập dầu..."
                {...register("descProduct", {
                  maxLength: {
                    value: 255,
                    message: "Mô tả dài thế!",
                  },
                })}
              ></textarea>
            </td>
            <td>
              <SelectCategory
                optionCategory={optionCategory}
                onChange={handleSelectCategory}
              />
            </td>
            {!isEmpty && (
              <td>
                <BtnTurnOn data={dataProduct} />
              </td>
            )}
          </tr>
          <tr>
            <td colSpan={7} className="text-end">
              {!isEmpty && (
                <button
                  onClick={(e) => handleTurnOnDialogDelete(e)}
                  className="mr-[15px] text-white uppercase font-bold px-[20px] py-[8px] rounded-md bg-[red] hover:bg-red-400 cursor-pointer transition-all"
                >
                  Xóa
                </button>
              )}
              <input
                type="submit"
                value={!isEmpty ? "Lưu" : "Thêm"}
                className="text-white uppercase font-bold px-[20px] py-[8px] rounded-md bg-btnColor hover:bg-btnHoverColor cursor-pointer transition-all"
              />
            </td>
          </tr>
        </tbody>
      </table>
      {/* dialog delete  */}
      {isDialogDeleteProduct && (
        <DialogDeleteProduct
          title="Bạn có chắc muốn xóa sản phẩm này?"
          handleDeleteProduct={() => handleDeleteProduct(idProduct)}
          handleCloseDialog={handleCloseDialog}
          refDialog={refDialog}
        />
      )}
    </form>
  );
};
export default TableCreateDish;
