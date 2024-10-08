import logo from "../../assets/img/Logo.png";

export const dataProducts = [
  {
    idCategory: 123,
    nameCategory: "Các món gà",
    products: [
      {
        idProduct: 1,
        imgProduct: logo,
        nameProduct: "Gà rán",
        priceProduct: 160000,
        descProduct:
          "Gà rán ròn, Gà rán ròn, Gà rán ròn, Gà rán ròn, Gà rán ròn, Gà rán ròn, ",
        category: {
          idCategory: 123,
          nameCategory: "Các món gà",
        },
        isActive: true,
        sale: 10,
        newProduct: true,
        hotProduct: false,
      },
      {
        idProduct: 2,
        imgProduct: logo,
        nameProduct: "Gà luộc",
        priceProduct: 160000,
        descProduct: "Gà luộc thơm ngon",
        category: {
          idCategory: 123,
          nameCategory: "Các món gà",
        },
        isActive: false,
        sale: 0,
        newProduct: true,
        hotProduct: true,
      },
      {
        idProduct: 7,
        imgProduct: logo,
        nameProduct: "Gà rang gừng",
        priceProduct: 180000,
        descProduct: "Gà rang gừng thơm ngon",
        category: {
          idCategory: 123,
          nameCategory: "Các món gà",
        },
        isActive: false,
        sale: 0,
        newProduct: true,
        hotProduct: true,
      },
    ],
  },
  {
    idCategory: 124,
    nameCategory: "Các món ếch",
    products: [
      {
        idProduct: 3,
        imgProduct: logo,
        nameProduct: "Ếch rang muối",
        priceProduct: 150000,
        descProduct: "Ếch đồng rang muối",
        category: "Các món ếch",
        isActive: true,
        sale: 10,
        newProduct: false,
        hotProduct: true,
      },
      {
        idProduct: 4,
        imgProduct: logo,
        nameProduct: "Ếch om chuối đậu",
        priceProduct: 280000,
        descProduct: "Ếch om chuối với đậu",
        category: "Các món ếch",
        isActive: true,
        sale: 10,
        newProduct: true,
        hotProduct: true,
      },
    ],
  },
];
