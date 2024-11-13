import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SideBar from "../components/SideBar";

const RootLayout = () => {
  return (
    <div>
      <div className="fixed top-0 left-0 right-0 z-[20]">
        <Header />
      </div>
      <div className="fixed w-[180px] top-[120px] left-0 h-full overflow-y-auto z-10">
        <SideBar />
      </div>
      <div className="relative ml-[180px] overflow-y-auto top-[120px]">
        <Outlet />
        <div className="w-full">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default RootLayout;
