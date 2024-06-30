import { Outlet } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";

const AdminLayout = () => {
  return (
    <div>
      <div>
        <AdminHeader />
      </div>
      <Outlet />
    </div>
  );
};

export default AdminLayout;
