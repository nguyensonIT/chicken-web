import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { UploadImage } from "../../../../components/Icon";
import BtnTurnOn from "../../../../components/BtnTurnOn";
import "./styles.css";
import { showFileImg } from "../../../../components/Function";
import SelectCategory from "./component/SelectCategory";
import DialogDeleteProduct from "../../../../components/DialogQuestionYesNo";
import * as handleProductsService from "../../../../services/handleProductsService";
import { useHandleContext } from "../../../../contexts/UserProvider";

const TableCreateDish = ({ data = {}, handleClose }) => {
  const [dataProduct, setDataProduct] = useState(data);

  const [token, setToken] = useState(
    localStorage.getItem("authToken") || undefined
  );

  const { handleProductContext, inFoProductContext } = useHandleContext();

  const [isDialogCreate, setIsDialogCreate] = useState(
    Object.keys(data).length === 0
  );
  const [isDialogDeleteProduct, setDialogDeleteProduct] = useState(false);

  const [idProduct, setIdProduct] = useState(data?._id || "");
  const [nameProduct, setNameProduct] = useState(data?.nameProduct || "");
  const [priceProduct, setPriceProduct] = useState(data?.priceProduct || "");
  const [descProduct, setDescProduct] = useState(data?.descProduct || "");
  const [srcImg, setSrcImg] = useState(data?.imgProduct || "");
  const [categoryID, setCategoryID] = useState(data?.idCategory || "");

  const [errCategory, setErrCategory] = useState(null);
  const [errImage, setErrImage] = useState(null);

  const refDialog = useRef(null);
  const inpRef = useRef(null);

  const isEmpty = Object.keys(data).length === 0 && data.constructor === Object;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nameProduct,
      priceProduct,
      descProduct,
      idProduct,
      srcImg,
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
    setCategoryID(e.target.value);
  };

  const handleCloseDialog = () => {
    refDialog.current.classList.add("isClose");
    setTimeout(() => {
      setDialogDeleteProduct(false);
    }, 300);
  };

  const handleCreateProduct = (dataForm) => {
    const priceValidate = parseInt(dataForm.priceProduct);

    if (categoryID === "") {
      setErrCategory("Chọn danh mục đã!");
      setErrImage(null);
    } else if (srcImg === "") {
      setErrImage("Tải ảnh lên bạn ơi!");
      setErrCategory(null);
    } else {
      setErrCategory(null);
      setErrImage(null);
      const newProduct = {
        imgProduct: srcImg,
        nameProduct: dataForm.nameProduct,
        priceProduct: priceValidate,
        descProduct: dataForm.descProduct,
        category: categoryID,
      };

      const dataPost = {
        token,
        body: newProduct,
      };

      handleProductsService.postProduct(dataPost).then((res) => {
        if (res.status === 201) {
          toast.success("Tạo món thành công!");
          reset();
          setSrcImg("");
          setCategoryID("");
          handleProductContext(newProduct);
        }
        if (res.status === 400) {
          toast.warn("Tạo món thất bại. Vui lòng thử lại!");
        }
      });
    }
  };

  const handleUpdateProduct = (dataUpdate) => {
    const priceValidate = parseInt(dataUpdate.priceProduct);

    if (categoryID === "") {
      setErrCategory("Chọn danh mục đã!");
      setErrImage(null);
    } else if (srcImg === "") {
      setErrImage("Tải ảnh lên bạn ơi!");
      setErrCategory(null);
    } else {
      setErrCategory(null);
      setErrImage(null);

      const newProduct = {
        imgProduct: srcImg,
        nameProduct: dataUpdate.nameProduct,
        priceProduct: priceValidate,
        descProduct: dataUpdate.descProduct,
        category: categoryID,
        isActive: inFoProductContext.isNewActive,
      };

      const dataPost = {
        id: idProduct,
        token,
        body: newProduct,
      };
      handleProductsService.updateProduct(dataPost).then((res) => {
        console.log(res);

        switch (res.status) {
          case 200:
            toast.success("Cập nhật món ăn thành công!");
            handleProductContext(dataPost);
            handleClose();
            break;
          case 404:
            toast.warn("Không có sản phẩm này!");
            break;
          case 400:
            toast.error("Cập nhật thất bại. Vui lòng thử lại!");
            break;
          default:
            toast.error(
              "Đã xảy ra lỗi không xác định. Vui lòng đăng nhập lại!"
            );
            break;
        }
      });
    }
  };

  const handleBtnSubmit = (data) => {
    if (isDialogCreate) {
      handleCreateProduct(data);
    } else {
      handleUpdateProduct(data);
    }
  };

  const handleTurnOnDialogDelete = (e) => {
    e.preventDefault();
    setDialogDeleteProduct(true);
  };

  const handleDeleteProduct = (id) => {
    handleProductsService.deleteProduct(token, id).then((res) => {
      if (res?.response?.status === 401) {
        toast.error("Vui lòng đăng nhập!");
      }
      if (res?.response?.status === 404) {
        toast.warn("Không tìm thấy sản phẩm cần xóa!");
      }
      if (res?.response?.status === 500) {
        toast.error("Server đang bận. Vui lòng thử lại!");
      }
      if (res.status === 200) {
        toast.success("Đã xóa sản phẩm!");
        handleProductContext(id);
        handleCloseDialog();
        handleClose();
      }
    });
  };

  useEffect(() => {
    isDialogDeleteProduct && refDialog.current.classList.add("isDetail");
  }, [isDialogDeleteProduct]);

  return (
    <form
      className="max-sm:w-full max-sm:h-full"
      onSubmit={handleSubmit(handleBtnSubmit)}
    >
      {/* box error */}
      {(errors.nameProduct?.message ||
        errCategory ||
        errImage ||
        errors.descProduct?.message ||
        errors.priceProduct?.message) && (
        <div className="box-err max-sm:w-auto h-[30px] w-[400px] my-[10px] mx-auto border border-dashed border-textEmphasizeColor">
          <p className="text-center">
            {errors.nameProduct?.message ||
              errCategory ||
              errImage ||
              errors.descProduct?.message ||
              errors.priceProduct?.message}
          </p>
        </div>
      )}

      <table className="max-sm:table-auto w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="max-sm:hidden  text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
          <tr className="max-sm:flex max-sm:flex-col gap-[20px]">
            <td className="max-sm:justify-between max-sm:items-center flex justify-center py-[20px]">
              <p className="sm:hidden text-black">Hình ảnh</p>
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
              <td className="max-sm:flex max-sm:justify-between max-sm:items-center pointer-events-none">
                <p className="sm:hidden text-black">Mã</p>
                <div className="py-[5px] border border-borderColor rounded-md">
                  <input
                    className="max-sm:text-inputSize text-[14px] text-center w-full px-[5px] outline-none"
                    {...register("idProduct")}
                  />
                </div>
              </td>
            )}
            <td className="max-sm:flex max-sm:justify-between max-sm:items-center">
              <span className="sm:hidden text-black flex">
                Tên <p className="text-textEmphasizeColor">*</p>
              </span>
              <div className="py-[5px] border border-borderColor rounded-md">
                <input
                  className="max-sm:text-inputSize text-[14px] text-center w-full px-[5px] outline-none"
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
            <td className="max-sm:flex max-sm:justify-between max-sm:items-center">
              <span className="sm:hidden text-black flex">
                Giá <p className="text-textEmphasizeColor">*</p>
              </span>
              <div className="flex pr-[5px] py-[5px] border border-borderColor rounded-md">
                <input
                  className="max-sm:text-inputSize text-[14px] text-center w-full px-[5px] outline-none"
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
            <td className="max-sm:flex max-sm:justify-between max-sm:items-center">
              <span className="sm:hidden text-black">Mô tả</span>
              <textarea
                className="max-sm:text-inputSize max-sm:h-[80px] text-[14px] outline-none px-[5px] border border-borderColor rounded-md"
                placeholder="VD: Gà chiên giòn ngập dầu..."
                {...register("descProduct", {
                  maxLength: {
                    value: 255,
                    message: "Mô tả dài thế!",
                  },
                })}
              ></textarea>
            </td>
            <td className="max-sm:flex max-sm:justify-between max-sm:items-center">
              <span className="sm:hidden text-black flex">
                Danh mục <p className="text-textEmphasizeColor">*</p>
              </span>
              <SelectCategory
                categoryID={categoryID}
                onChange={handleSelectCategory}
              />
            </td>
            {!isEmpty && (
              <td className="max-sm:pt-[30px] max-sm:flex max-sm:justify-between max-sm:items-center max-sm:border-t-[5px]">
                <span className="sm:hidden text-black flex">Còn món</span>
                <BtnTurnOn data={dataProduct} />
              </td>
            )}
          </tr>
          <tr>
            <td colSpan={7} className="max-sm:pt-[50px] text-end">
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
          textNo="Hủy"
          textYes="Đồng ý"
          handleYes={() => handleDeleteProduct(idProduct)}
          handleNo={handleCloseDialog}
          refDialog={refDialog}
        />
      )}
    </form>
  );
};
export default TableCreateDish;
