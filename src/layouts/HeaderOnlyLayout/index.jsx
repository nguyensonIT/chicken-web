import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const HeaderOnlyLayout = () => {
  return (
    <div>
      <div className="fixed z-[999] h-[120px] w-full">
        <Header />
      </div>
      <div className="pt-[120px] pb-[20px]">
        <Outlet />
      </div>
      <div className="">
        <Footer />
      </div>
    </div>
  );
};

export default HeaderOnlyLayout;
