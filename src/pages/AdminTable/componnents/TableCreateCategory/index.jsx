import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { toast } from "react-toastify";

import * as handleCategoryService from "../../../../services/handleCategoryService";
import { useHandleContext } from "../../../../contexts/UserProvider";

const TableCreateCategory = () => {
  const [nameCategory, setNameCategory] = useState("");
  const [errNameCategory, setErrNameCategory] = useState("");
  const [token, setToken] = useState(localStorage.getItem("authToken") || null);
  const [isLoading, setIsLoading] = useState(false);

  const { handleProductContext } = useHandleContext();

  const handleChangeCategory = (e) => {
    setNameCategory(e.target.value);
  };

  const hanldeAddCategory = () => {
    setIsLoading(true);
    if (nameCategory === "") {
      setErrNameCategory("Tên danh mục không được để trống!");
      setIsLoading(false);
    } else {
      setErrNameCategory("");
      handleCategoryService
        .createCategory(token, nameCategory)
        .then((res) => {
          switch (res.status) {
            case 201:
              toast.success(
                `Thêm thành công danh mục "${res.data.nameCategory}"`
              );
              handleProductContext(res.data);
              break;
            case 400:
              toast.error("Có lỗi. Vui lòng thử lại!");
            default:
              toast.error("Có lỗi. Vui lòng thử lại!");
              break;
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      {/* box error */}
      {errNameCategory && (
        <div className="box-err max-sm:w-auto px-[10px] h-[30px] w-[400px] mt-[20px] mb-[10px] mx-auto border border-dashed border-textEmphasizeColor">
          <p className="text-center">{errNameCategory}</p>
        </div>
      )}
      <div className="w-[300px] py-[10px] border border-borderColor rounded-md">
        <input
          className="w-full px-[5px] outline-none"
          placeholder="VD: Các món gà..."
          type="input"
          onChange={handleChangeCategory}
          value={nameCategory}
        />
      </div>
      <div className="w-[200px] mt-[10px]">
        <button
          onClick={hanldeAddCategory}
          className={`w-full text-white uppercase font-bold px-[20px] py-[8px] rounded-md bg-btnColor hover:bg-btnHoverColor transition-all ${
            isLoading ? "pointer-events-none opacity-[0.5]" : ""
          }`}
        >
          {isLoading ? (
            <FontAwesomeIcon className="loading" icon={faSpinner} />
          ) : (
            "Thêm"
          )}
        </button>
      </div>
    </div>
  );
};
export default TableCreateCategory;
