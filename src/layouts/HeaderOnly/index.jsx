import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const HeaderOnly = () => {
  return (
    <div>
      <div>
        <div className="fixed z-[999] h-[120px] w-full" >
          <Header />
        </div>
        <div className="pt-[120px]">
          <Outlet />
        </div>
      </div>
      <div className="">
        <Footer />
      </div>
    </div>
  );
};

export default HeaderOnly;