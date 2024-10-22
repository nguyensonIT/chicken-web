import React, { useEffect, useState } from "react";
import Login from "../../components/Login";
import { useHandleContext } from "../../contexts/UserProvider";
import { toast } from "react-toastify";

const PrivateRoute = ({ element }) => {
  const { user } = useHandleContext();
  useEffect(() => {
    if (user?.roles[0] !== "admin") {
      toast.warning(
        "Bạn không phải Admin. Vui lòng đăng nhập với tư cách là Admin!"
      );
    } else {
      toast.success("Xin chào admin!");
    }
  }, []);

  return user?.roles[0] === "admin" ? element : <Login />;
};

export default PrivateRoute;
