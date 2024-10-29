import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faSpinner } from "@fortawesome/free-solid-svg-icons";

import Category from "./components/Category";
import { useEffect, useState } from "react";
import { useHandleContext } from "../../../contexts/UserProvider";

const SideBar = () => {
  const { dataSideBarContext } = useHandleContext();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (dataSideBarContext.length > 0) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [dataSideBarContext]);
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
