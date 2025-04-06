import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SideBar from "../components/SideBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";

import Category from "../components/SideBar/components/Category";
import { useHandleContext } from "../../contexts/UserProvider";

const RootLayout = () => {
  const refBtn = useRef();
  const refSidebar = useRef();

  const { dataSideBarContext, dataIsLoadingContext } = useHandleContext();

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
        <Header />
      </div>
      <div>
        {/* sidebar mobile */}
        <div
          ref={refSidebar}
          className="fixed sm:hidden max-sm:w-[0px] max-sm:top-[162px] w-[180px] top-[120px] left-0 h-full overflow-y-auto z-10 transition-all"
        >
          <SideBar />
        </div>
        {/* btn sidebar */}
        <div
          ref={refBtn}
          onClick={handleClickSidebar}
          className="sm:hidden max-sm:top-[162px] flex justify-center items-center fixed py-[22px] top-[120px] left-[0px] shadow-lg bg-bgEmphasizeColor border-[1px] border-[white] z-10  transition-all fixedBtn"
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
        <div className="sm:hidden fixed pl-[25px] mt-[-2px] top-[162px] flex w-full overflow-x-auto bg-white z-[9]">
          {dataSideBarContext.map((item, index) => {
            return (
              <Category
                className={"py-[15px] mr-[10px] text-smTitle"}
                key={index}
                id={item._id}
                name={item.nameCategory}
              />
            );
          })}
        </div>
        {/* sidebar pc */}
        <div className="fixed max-sm:hidden w-[180px] top-[120px] left-0 h-full overflow-y-auto z-10 transition-all fixedSidebar">
          <SideBar />
        </div>
      </div>

      <div className="max-sm:ml-0 max-sm:top-[230px] relative ml-[180px] overflow-y-auto top-[120px] transition-all">
        <Outlet />
        <div className="w-full">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default RootLayout;
