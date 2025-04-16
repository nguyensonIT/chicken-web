import { RouterProvider, createBrowserRouter } from "react-router-dom";

import RootLayout from "../layouts/RootLayout";
import Home from "./Home";
import Product from "./Product";
import News from "./News";
import Introduce from "./Introduce";
import NotFound from "./NotFound";
import HeaderOnlyLayout from "../layouts/HeaderOnlyLayout";
import CartProduct from "./CartProduct";
import AdminLayout from "../layouts/AdminLayout";
import AdminDashboard from "./AdminDashboard";
import AdminTable from "./AdminTable";
import AdminOrderCustomers from "./AdminOrderCustomers";
import OrderTracking from "./OrderTracking";
import PrivateRoute from "../routes/PrivateRoute";
import AdminArticle from "./AdminArticle";
import Profile from "./Profile";
import PrivateRouteClient from "../routes/PrivateRouteClient";
import LayoutCart from "../layouts/LayoutCart";
import AdminSetting from "./AdminSetting";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        index: true,
        path: "/",
        element: <Home />,
      },
      {
        path: "/products",
        element: <Product />,
      },
    ],
  },
  {
    element: <LayoutCart />,
    children: [
      {
        path: "/cart",
        element: <CartProduct />,
      },
    ],
  },
  {
    element: <HeaderOnlyLayout />,
    children: [
      // {
      //   path: "/news",
      //   element: <News />,
      // },
      {
        path: "/introduce",
        element: <Introduce />,
      },

      {
        path: "/order-tracking",
        element: <OrderTracking />,
      },
      {
        path: "/profile",
        element: <PrivateRouteClient element={<Profile />} />,
      },
    ],
  },
  {
    element: <AdminLayout />,
    children: [
      {
        path: "/admin",
        element: <PrivateRoute element={<AdminDashboard />} />,
      },
      {
        path: "/admin/table",
        element: <PrivateRoute element={<AdminTable />} />,
      },
      {
        path: "/admin/order",
        element: <PrivateRoute element={<AdminOrderCustomers />} />,
      },
      {
        path: "/admin/setting",
        element: <PrivateRoute element={<AdminSetting />} />,
      },
      // {
      //   path: "/admin/article",
      //   element: <PrivateRoute element={<AdminArticle />} />,
      // },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

const Pages = () => {
  return <RouterProvider router={router} />;
};

export default Pages;
