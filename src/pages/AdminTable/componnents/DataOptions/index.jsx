import SelectorProducts from "../SelectorProducts";
import TableCreateCategory from "../TableCreateCategory";
import TableCreateDish from "../TableCreateDish";

export const dataOption = [
  {
    option: "Thêm món",
    children: [
      { title: "Thêm mới món ăn", option: <TableCreateDish />, isPrev: true },
    ],
  },
  {
    option: "Thêm danh mục",
    children: [
      {
        title: "Thêm mới danh mục",
        option: <TableCreateCategory />,
        isPrev: true,
      },
    ],
  },
  {
    option: "Lựa chọn món bán chạy",
    children: [
      {
        title: "Chọn các món bán chạy nhất của nhà hàng",
        option: <SelectorProducts isHotProduct={true} />,
        isPrev: true,
      },
    ],
  },
  {
    option: "Lựa chọn món mới",
    children: [
      {
        title: "Chọn món mới ra mắt của nhà hàng",
        option: <SelectorProducts isNewProduct={true} />,
        isPrev: true,
      },
    ],
  },
  ,
  {
    option: "Tạo khuyến mại",
    children: [
      {
        title: "Tạo khuyến mại của bạn",
        option: <SelectorProducts isSale={true} />,
        isPrev: true,
      },
    ],
  },
];
