import React, { useEffect } from "react";
import Login from "../../components/Login";
import { useHandleContext } from "../../contexts/UserProvider";
import { toast } from "react-toastify";

const PrivateRouteClient = ({ element }) => {
  const { user } = useHandleContext();
  useEffect(() => {
    if (user === null) {
      toast.warning("Vui lòng đăng nhập để xem trang cá nhân!");
    }
  }, []);

  return user !== null ? element : <Login />;
};

export default PrivateRouteClient;
