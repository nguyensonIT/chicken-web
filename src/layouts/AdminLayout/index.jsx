import { Outlet } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";
import AdminSideBar from "../components/AdminSideBar";
import { faBars, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AdminLayout = () => {
  const refBtn = useRef();
  const refSidebar = useRef();

  const [isSidebar, setIsSidebar] = useState(false);

  const handleClickSidebar = () => {
    setIsSidebar((prev) => !prev);
    if (isSidebar) {
      refSidebar.current.style.width = "0px";
      refBtn.current.style.left = "0px";
    } else {
      refSidebar.current.style.width = "180px";
      refBtn.current.style.left = "180px";
    }
  };
  return (
    <div>
      <div className="fixed top-0 left-0 right-0 z-[20]">
        <AdminHeader />
      </div>
      <div className="fixed w-[180px] top-[60px] left-0 h-full overflow-y-auto z-10">
        <AdminSideBar />
        <div
          ref={refBtn}
          onClick={handleClickSidebar}
          className="sm:hidden max-sm:top-[140px] flex justify-center items-center fixed py-[9px] top-[120px] left-[0px] shadow-lg bg-bgEmphasizeColor border-[1px] border-[white] z-10  transition-all fixedBtn"
        >
          {isSidebar ? (
            <FontAwesomeIcon
              icon={faChevronLeft}
              className="text-[20px] px-[4px] text-textEmphasizeColor"
            />
          ) : (
            <FontAwesomeIcon
              icon={faBars}
              className="text-[20px] px-[4px] text-textEmphasizeColor"
            />
          )}
        </div>
      </div>
      <div className="relative ml-[180px] px-[20px] py-[10px] overflow-y-auto top-[60px]">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
