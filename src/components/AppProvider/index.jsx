import { useEffect } from "react";

import { useHandleContext } from "../../contexts/UserProvider";
import * as handleCategoryService from "../../services/handleCategoryService";
import * as handleProductsService from "../../services/handleProductsService";
import * as handlePostService from "../../services/handlePostService";
import * as handleOrderService from "../../services/handleOrderService";

const AppProvider = ({ children }) => {
  const {
    user,
    setDataAllOrderContext,
    setDataAllProductContext,
    setDataSideBarContext,
    setDataAllPostContext,
    setDataIsLoadingContext,
    setDataOrderByIdUserContext,
    renderOrderByIdUserContext,
  } = useHandleContext();
  //Call API product
  useEffect(() => {
    setDataIsLoadingContext((prev) => ({ ...prev, isLoadingProduct: true }));
    handleProductsService
      .getAllProducts()
      .then((res) => {
        if (res.status === 200) {
          setDataAllProductContext(res.data);
        } else {
          setDataAllProductContext([]);
        }
      })
      .catch((err) => console.log(err))
      .finally(() =>
        setDataIsLoadingContext((prev) => ({
          ...prev,
          isLoadingProduct: false,
        }))
      );
  }, []);

  //API category
  useEffect(() => {
    setDataIsLoadingContext((prev) => ({ ...prev, isLoadingSidebar: true }));
    handleCategoryService
      .getAllCategory()
      .then((res) => {
        if (res.status === 200) {
          const newProducts = res.data.sort((a, b) => a.order - b.order);
          setDataSideBarContext(newProducts);
        } else {
          setDataSideBarContext([]);
        }
      })
      .catch((err) => console.log("Lỗi api category", err))
      .finally(() =>
        setDataIsLoadingContext((prev) => ({
          ...prev,
          isLoadingSidebar: false,
        }))
      );
  }, []);

  //API Bài Post
  useEffect(() => {
    setDataIsLoadingContext((prev) => ({ ...prev, isLoadingPost: true }));
    handlePostService
      .getAllPost()
      .then((res) => {
        if (res.status === 200) {
          setDataAllPostContext(res.data);
        } else {
          setDataAllPostContext([]);
        }
      })
      .catch((err) => console.log("Lỗi gọi API bài viết", err))
      .finally(() =>
        setDataIsLoadingContext((prev) => ({ ...prev, isLoadingPost: false }))
      );
  }, []);

  //API Order by id user
  useEffect(() => {
    if (user) {
      setDataIsLoadingContext((prev) => ({
        ...prev,
        isLoadingOrderByUser: true,
      }));
      handleOrderService
        .getOrderByIdUser(user.id)
        .then((res) => {
          if (res.status === 200) {
            setDataOrderByIdUserContext(res.data.data);
          }
        })
        .catch((err) => console.log("Lỗi gọi API user order", err))
        .finally(() =>
          setDataIsLoadingContext((prev) => ({
            ...prev,
            isLoadingOrderByUser: false,
          }))
        );
    }
  }, [user, renderOrderByIdUserContext]);

  //API All Order
  useEffect(() => {
    if (user && user?.roles.includes("admin")) {
      handleOrderService
        .getAllOrder()
        .then((res) => {
          if (res.status === 200) {
            setDataAllOrderContext(res.data);
          }
        })
        .catch((err) => console.log("Lỗi gọi API user order", err));
    }
  }, []);
  return <>{children}</>;
};

export default AppProvider;
