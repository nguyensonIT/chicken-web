import { Outlet } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";
import AdminSideBar from "../components/AdminSideBar";

const AdminLayout = () => {
  return (
    <div>
      <div className="fixed top-0 left-0 right-0 z-[20]">
        <AdminHeader />
      </div>
      <div className="fixed w-[180px] top-[40px] left-0 h-full overflow-y-auto z-10">
        <AdminSideBar />
      </div>
      <div className="relative ml-[180px] px-[20px] py-[10px] overflow-y-auto top-[40px]">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
