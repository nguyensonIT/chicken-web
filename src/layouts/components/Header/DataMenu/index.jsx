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
];
