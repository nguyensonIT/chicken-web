import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import Home from "./Home";
import Product from "./Product";
import News from "./News";
import Introduce from "./Introduce";
import NotFound from "./NotFound";
import HeaderOnly from "../layouts/HeaderOnly";
import CartProduct from "./CartProduct";

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
        path: "/products/all",
        element: <Product />,
      },
      {
        path: "/products/:slug",
        element: <Product />,
      },
      {
        path: "/products/category/:slug",
        element: <Product />,
      },
    ],
  },
  {
    element: <HeaderOnly />,
    children: [
      {
        path: "/news",
        element: <News />,
      },
      {
        path: "/introduce",
        element: <Introduce />,
      },
      {
        path: "/cart",
        element: <CartProduct />,
      },
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
