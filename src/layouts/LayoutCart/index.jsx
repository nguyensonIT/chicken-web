import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const LayoutCart = () => {
  return (
    <div>
      <div className="fixed z-[999] h-[120px] w-full">
        <Header />
      </div>
      <div className="pt-[120px] pb-[20px]">
        <Outlet />
      </div>
    </div>
  );
};

export default LayoutCart;
