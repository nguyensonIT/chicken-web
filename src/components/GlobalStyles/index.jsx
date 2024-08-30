import { useEffect, useState } from "react";

import "./globalStyles.css";
import { isTokenExpired } from "../Function";
import { toast } from "react-toastify";
function GlobalStyles({ children }) {
  const [token, setToken] = useState(localStorage.getItem("authToken") || null);

  useEffect(() => {
    if (token) {
      if (isTokenExpired(token)) {
        toast.warn("Đã hết phiên đăng nhập. Vui lòng đăng nhập lại!");
        localStorage.removeItem("authToken");
        window.location.href = "/";
      }
    }
  }, []);
  return children;
}
export default GlobalStyles;
