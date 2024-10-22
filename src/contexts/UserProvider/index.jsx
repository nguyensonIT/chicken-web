import React, { createContext, useState, useContext } from "react";
import { jwtDecode } from "jwt-decode";

// Tạo Context
const UserContext = createContext();

const UserProvider = ({ children }) => {
  const token = localStorage.getItem("authToken");
  const decoded = token ? jwtDecode(token) : "";
  const [user, setUser] = useState(decoded || null);

  //Lấy data id gửi lên server cập nhật món new,hot
  const [selectedProductsContext, setSelectedProductsContext] = useState([]);
  const [renderPopupNotifyAdminContext, setRenderPopupNotifyAdminContext] =
    useState("");
  const [dataSubIdContext, setDataSubIdContext] = useState("");
  const [productContext, setProductContext] = useState(null);
  const [inFoProductContext, setInFoProductContext] = useState("");
  const [quantityProductInCartContext, setQuantityProductInCartContext] =
    useState(
      (JSON.parse(localStorage.getItem("productsInCart")) &&
        JSON.parse(localStorage.getItem("productsInCart")).length) ||
        0
    );
  const [takeIdLikePostContext, setTakeIdLikePostContext] = useState("");
  //Context Like Post
  const [isLikedPostContext, setIsLikedPostContext] = useState(null);
  const [qntLikePostContext, setQntLikePostContext] = useState(null);

  //có thể render lại trang order admin
  const handTakeDataSubId = (id) => {
    setDataSubIdContext(id);
  };

  //có thể render lại api table
  const handleProductContext = (data) => {
    setProductContext(data);
  };

  //ko render lại api
  const handleTakeInFoBtnProductContext = (data, isActive) => {
    setInFoProductContext({ ...data, isNewActive: isActive });
  };

  //Có thể render lại Notify Admin
  const handleRenderNotifyAdminContext = (data) => {
    setRenderPopupNotifyAdminContext(data);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        productContext,
        inFoProductContext,
        quantityProductInCartContext,
        dataSubIdContext,
        renderPopupNotifyAdminContext,
        selectedProductsContext,
        takeIdLikePostContext,
        isLikedPostContext,
        qntLikePostContext,
        setQntLikePostContext,
        setIsLikedPostContext,
        setTakeIdLikePostContext,
        setSelectedProductsContext,
        handleRenderNotifyAdminContext,
        handTakeDataSubId,
        setQuantityProductInCartContext,
        handleProductContext,
        handleTakeInFoBtnProductContext,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Tạo hook tùy chỉnh để sử dụng context
const useHandleContext = () => useContext(UserContext);

export { UserProvider, useHandleContext };
