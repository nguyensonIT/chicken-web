import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faSpinner } from "@fortawesome/free-solid-svg-icons";

import Category from "./components/Category";
import { useHandleContext } from "../../../contexts/UserProvider";

const SideBar = () => {
  const { dataSideBarContext, dataIsLoadingContext } = useHandleContext();

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
        {/* {isLoading && <FontAwesomeIcon className="loading" icon={faSpinner} />} */}
        {dataIsLoadingContext?.isLoadingSidebar && (
          <span className="w-full text-center">
            <FontAwesomeIcon className="loading" icon={faSpinner} />
          </span>
        )}
        {dataSideBarContext.map((item, index) => {
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
