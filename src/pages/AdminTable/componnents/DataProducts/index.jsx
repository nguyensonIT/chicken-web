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
];
