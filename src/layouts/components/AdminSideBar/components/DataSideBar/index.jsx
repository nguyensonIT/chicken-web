import {
  faGauge,
  faReceipt,
  faTable,
  faNewspaper,
  faGear,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const dataSideBarAdmin = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: <FontAwesomeIcon icon={faGauge} />,
  },
  {
    name: "Quản lý sản phẩm",
    href: "/admin/table",
    icon: <FontAwesomeIcon icon={faTable} />,
  },
  {
    name: "Đơn hàng",
    href: "/admin/order?order=new-order",
    icon: <FontAwesomeIcon icon={faReceipt} />,
  },
  {
    name: "Cài đặt",
    href: "/admin/setting",
    icon: <FontAwesomeIcon icon={faGear} />,
  },
  {
    name: "Khách hàng",
    href: "/admin/customer",
    icon: <FontAwesomeIcon icon={faUsers} />,
  },
  // {
  //   name: "Bài viết",
  //   href: "/admin/article",
  //   icon: <FontAwesomeIcon icon={faNewspaper} />,
  // },
];
