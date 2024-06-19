import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SideBar from "../components/SideBar";

const RootLayout = () => {
  return (
    <div>
      <div>
        <div className="fixed z-[999] h-[120px] w-full" >
          <Header />
        </div>
        <div className="flex">
          <div className="w-2/12 pt-[120px] ">
            <SideBar />
          </div>
          <div className="w-10/12 pt-[120px]">
            <Outlet />
          </div>
        </div>
      </div>
      <div className="">
        <Footer />
      </div>
    </div>
  );
};

export default RootLayout;
