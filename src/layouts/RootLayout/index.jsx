import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SideBar from "../components/SideBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faList,
} from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";

const RootLayout = () => {
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
        <Header />
      </div>
      <div
        ref={refSidebar}
        className="fixed max-sm:w-[0px] w-[180px] top-[120px] left-0 h-full overflow-y-auto z-10 transition-all"
      >
        <div
          ref={refBtn}
          onClick={handleClickSidebar}
          className="sm:hidden flex justify-center items-center fixed py-[9px] top-[120px] left-[0px] shadow-lg bg-bgEmphasizeColor border-[1px] border-[white] z-20 transition-all"
        >
          {isSidebar ? (
            <FontAwesomeIcon
              icon={faChevronLeft}
              className="text-[20px] px-[4px] text-textEmphasizeColor"
            />
          ) : (
            <FontAwesomeIcon
              icon={faList}
              className="text-[20px] px-[4px] text-textEmphasizeColor"
            />
          )}
        </div>
        <SideBar />
      </div>

      <div className="max-sm:ml-0 relative ml-[180px] overflow-y-auto top-[120px] transition-all">
        <Outlet />
        <div className="w-full">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default RootLayout;
