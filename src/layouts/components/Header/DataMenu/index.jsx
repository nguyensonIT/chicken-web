import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLanguage,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import BtnTurnOn from "../../../../components/BtnTurnOn";

export const menus = [
  {
    name: "Trang chủ",
    href: "/",
  },
  {
    name: "Sản phẩm",
    href: "/products?category=alls",
    children: [
      {
        name: "Tất cả sản phẩm",
        href: "/products?category=alls",
      },
      {
        name: "Sản phẩm mới",
        href: "/products?category=new",
      },
      {
        name: "Sản phẩm hot",
        href: "/products?category=hot",
      },
      {
        name: "Sản phẩm khuyến mãi",
        href: "/products?category=sale",
      },
    ],
  },
  {
    name: "Tin tức",
    href: "/news",
  },
  {
    name: "Giới thiệu",
    href: "/introduce",
  },
  {
    name: "Đơn hàng",
    href: "/order-tracking",
  },
];
export const listMenuAvatar = [
  {
    id: 6,
    option: "Trang cá nhân",
    icon: <FontAwesomeIcon icon={faUser} />,
  },
  {
    id: 3,
    option: "Ngôn ngữ",
    icon: <FontAwesomeIcon icon={faLanguage} />,
    children: [
      {
        id: 4,
        option: "Tiếng Anh",
        prev: true,
      },
      {
        id: 5,
        option: "Tiếng Việt",
        prev: true,
      },
    ],
  },
  {
    id: 2,
    option: "Chế độ tối",
    icon: <BtnTurnOn />,
  },
  {
    id: 1,
    option: "Đăng xuất",
    icon: <FontAwesomeIcon icon={faRightFromBracket} />,
  },
];
