import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";

import { dataProducts } from "../../../components/FakeDataProducts";
import Category from "./components/Category";

const SideBar = () => {
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
        {dataProducts.map((item, index) => {
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
