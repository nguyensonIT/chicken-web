export const menus  = [
    {
        name: "Trang chủ",
        href: "/",
    },
    {
        name: "Sản phẩm",
        href: "/products/all",
        children: [
            {
                name: "Sản phẩm mới",
                href: "/products/new",
            },
            {
                name: "Sản phẩm hot",
                href: "/products/hot",
            },
            {
                name: "Sản phẩm khuyến mãi",
                href: "/products/sale",
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