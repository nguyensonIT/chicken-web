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

  const handleClickOutside = (event) => {
    if (!refBtn.current.contains(event.target)) {
      if (refSidebar.current && refSidebar.current.contains(event.target)) {
        setIsSidebar(true);
        refSidebar.current.style.width = "180px";
        refBtn.current.style.left = "180px";
      } else {
        setIsSidebar(false);
        refSidebar.current.style.width = "0px";
        refBtn.current.style.left = "0px";
      }
    }
  };

  const handleClickSidebar = () => {
    if (isSidebar) {
      setIsSidebar(false);
      refSidebar.current.style.width = "0px";
      refBtn.current.style.left = "0px";
    } else {
      setIsSidebar(true);
      refSidebar.current.style.width = "180px";
      refBtn.current.style.left = "180px";
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div className="fixed top-0 left-0 right-0 z-[20]">
        <AdminHeader />
      </div>
      <div>
        {/* sidebar mobile  */}
        <div
          ref={refSidebar}
          className="fixed sm:hidden w-[0px] top-[120px] left-0 h-full overflow-y-auto z-[999] shadow-lg transition-all"
        >
          <AdminSideBar />
        </div>
        <div
          ref={refBtn}
          onClick={handleClickSidebar}
          className="sm:hidden max-sm:top-[120px] flex justify-center items-center fixed py-[9px] top-[120px] left-[0px] shadow-lg bg-[#34495e] border-[1px] border-[white] z-[999] transition-all fixedBtn"
        >
          {isSidebar ? (
            <FontAwesomeIcon
              icon={faChevronLeft}
              className="text-[20px] px-[6px] text-textHoverColor"
            />
          ) : (
            <FontAwesomeIcon
              icon={faBars}
              className="text-[20px] px-[6px] text-textHoverColor"
            />
          )}
        </div>
        {/* sidebar pc  */}
        <div className="fixed max-sm:hidden w-[180px] top-[120px] left-0 h-full overflow-y-auto z-10">
          <AdminSideBar />
        </div>
      </div>
      <div className="max-sm:ml-0 relative ml-[180px] px-[20px] py-[10px] overflow-y-auto top-[120px]">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
