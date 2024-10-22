import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faSpinner } from "@fortawesome/free-solid-svg-icons";

import Category from "./components/Category";
import { useEffect, useState } from "react";
import * as handleCategoryService from "../../../services/handleCategoryService";

const SideBar = () => {
  const [dataApiProducts, setDataApiProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    handleCategoryService
      .getAllCategory()
      .then((res) => {
        const newProducts = res.data.sort((a, b) => a.order - b.order);
        setDataApiProducts(newProducts);
      })
      .catch((err) => console.log("Lỗi api category", err))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="flex flex-col h-[100%] bg-bgSideBarColor">
      {/* Title */}
      <div className="flex items-center py-[8px] pl-[10px] bg-bgEmphasizeColor">
        <FontAwesomeIcon
          icon={faList}
          className="mr-[8px] text-textEmphasizeColor"
        />
        <h1 className="font-bold text-textEmphasizeColor">Danh mục</h1>
      </div>
      {/* list  */}
      <div className="flex h-[70%] flex-col px-[10px] pt-[10px] overflow-y-auto">
        {isLoading && <FontAwesomeIcon className="loading" icon={faSpinner} />}
        {dataApiProducts.map((item, index) => {
          return (
            <Category
              className={"py-[2px]"}
              key={index}
              id={item._id}
              name={item.nameCategory}
            />
          );
        })}
      </div>
    </div>
  );
};
export default SideBar;
