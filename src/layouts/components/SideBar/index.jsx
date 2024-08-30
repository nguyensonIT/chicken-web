import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";

import Category from "./components/Category";
import { useEffect, useState } from "react";
import * as handleProductsService from "../../../services/handleProductsService";

const SideBar = () => {
  const [dataApiProducts, setDataApiProducts] = useState([]);

  useEffect(() => {
    handleProductsService
      .getAllProducts()
      .then((res) => setDataApiProducts(res.data));
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
      <div className="flex flex-col px-[10px] pt-[10px]">
        {dataApiProducts.map((item, index) => {
          return (
            <Category
              className={"py-[2px]"}
              key={index}
              id={item.idCategory}
              name={item.nameCategory}
            />
          );
        })}
      </div>
    </div>
  );
};
export default SideBar;
