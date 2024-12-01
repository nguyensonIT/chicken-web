import { faList, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

import * as handleCategoryService from "../../../../services/handleCategoryService";
import { useHandleContext } from "../../../../contexts/UserProvider";
import DialogQuestionYesNo from "../../../../components/DialogQuestionYesNo";

const EditCategory = () => {
  const { handleProductContext } = useHandleContext();

  const [category, setCategory] = useState([]);
  const [nameCategoryNew, setNameCategoryNew] = useState("");
  const [idCategory, setIdCategory] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isDialogDelete, setIsDialogDelete] = useState(false);

  const refDialog = useRef();

  const [reload, setReload] = useState("");

  const handleTurnInput = (id) => {
    setIdCategory(id);
  };

  const hanldeTurnDialogDelete = () => {
    if (isDialogDelete) {
      refDialog.current.classList.add("isClose");
      setTimeout(() => {
        setIsDialogDelete(!isDialogDelete);
      }, 300);
    } else {
      setIsDialogDelete(!isDialogDelete);
    }
  };

  const handleChangeValue = (e) => {
    setNameCategoryNew(e.target.value);
  };

  const hanldeUpdateCategory = (id) => {
    const obj = {
      id,
      body: {
        nameCategory: nameCategoryNew,
      },
    };
    handleCategoryService
      .updateCategory(obj)
      .then((res) => {
        switch (res.status) {
          case 200:
            toast.success(`Cập nhật thành công "${res.data.nameCategory}"`);
            setIdCategory("");
            setReload(nameCategoryNew);
            handleProductContext(res.data);
            break;

          default:
            toast.warn("Xảy ra lỗi không xác định!");
            break;
        }
      })
      .catch((err) => console.log(err));
  };

  const hanldeDeleteCategory = () => {
    handleCategoryService
      .deleteCategory(idCategory)
      .then((res) => {
        switch (res.status) {
          case 200:
            toast.success("Xóa thành công danh mục!");
            setIdCategory("");
            setReload(nameCategoryNew);
            handleProductContext(res.data);
            break;

          default:
            toast.warn("Xảy ra lỗi không xác định!");
            break;
        }
      })
      .catch((err) => console.log(err))
      .finally(() => hanldeTurnDialogDelete());
  };

  useEffect(() => {
    setIsLoading(true);
    handleCategoryService
      .getAllCategory()
      .then((res) => setCategory(res.data))
      .catch((err) => console.log("Lỗi gọi category", err))
      .finally(() => setIsLoading(false));
  }, [reload]);

  useEffect(() => {
    category.forEach((item) => {
      if (item._id === idCategory) {
        setNameCategoryNew(item.nameCategory);
      }
    });
  }, [idCategory]);

  useEffect(() => {
    isDialogDelete && refDialog.current.classList.add("isDetail");
  }, [isDialogDelete]);
  return (
    <div className="h-screen flex flex-col items-center justify-center pt-[60px] pb-[20px] px-[20px] bg-white shadow-lg rounded-lg overflow-hidden">
      <h1 className="text-[24px] font-bold uppercase">Chỉnh sửa danh mục</h1>
      <div className="max-sm:w-[100%] border border-borderColor max-h-[800px] overflow-y-auto py-[40px] w-[70%]">
        {isLoading && (
          <div className="flex justify-center">
            <FontAwesomeIcon icon={faSpinner} className="loading" />
          </div>
        )}
        {category.map((item, index) => {
          return (
            <div onClick={() => handleTurnInput(item._id)} key={index}>
              <div className="flex items-center px-[20px] py-[10px] hover:bg-bgHoverColor hover:cursor-pointer">
                <p className="mr-[10px]">
                  <FontAwesomeIcon icon={faList} className="text-[18px]" />
                </p>
                <p className="uppercase">{item.nameCategory}</p>
              </div>
              {idCategory === item._id && (
                <div>
                  <div className="py-[5px] border border-borderColor rounded-md">
                    <input
                      onChange={(e) => handleChangeValue(e)}
                      value={nameCategoryNew}
                      className="text-[14px] w-full px-[5px] outline-none"
                    />
                  </div>
                  <div className="text-end mt-[5px] mb-[10px]">
                    <span
                      onClick={() => hanldeUpdateCategory(item._id)}
                      className="bg-bgEmphasizeColor text-white rounded-md px-[10px] py-[5px] mr-[5px] hover:opacity-[0.4] hover:cursor-pointer"
                    >
                      Update
                    </span>
                    <span
                      onClick={hanldeTurnDialogDelete}
                      className="bg-[red] text-white rounded-md px-[10px] py-[5px] hover:opacity-[0.4] hover:cursor-pointer"
                    >
                      Xóa
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {isDialogDelete && (
        <DialogQuestionYesNo
          refDialog={refDialog}
          title="Nếu xóa danh mục, sản phẩm trong danh mục này cũng sẽ bị xóa. Bạn có chắc muốn xóa danh mục?"
          textNo="Thoát"
          textYes="Xóa"
          handleYes={hanldeDeleteCategory}
          handleNo={hanldeTurnDialogDelete}
        />
      )}
    </div>
  );
};

export default EditCategory;
