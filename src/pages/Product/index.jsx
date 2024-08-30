import { useEffect, useState } from "react";

import { useSearchParams } from "react-router-dom";
import CardProduct from "../../components/CardProduct";
import * as handleProductsService from "../../services/handleProductsService";

const Product = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [dataApiProducts, setDataApiProducts] = useState([]);
  const [dataPageProducts, setDataPageProducts] = useState([]);
  const [nameCategory, setNameCategory] = useState();

  const fncTakeData = (products) => {
    const category = searchParams.get("category");
    let filteredProducts = [];
    let categoryName = "";

    switch (category) {
      case "new":
        filteredProducts = products
          .flatMap((item) => item?.products || [])
          .filter((product) => product?.newProduct);
        categoryName = "Các món mới";
        break;
      case "hot":
        filteredProducts = products
          .flatMap((item) => item?.products || [])
          .filter((product) => product?.hotProduct);
        categoryName = "Món ăn được mua nhiều nhất";
        break;
      case "sale":
        filteredProducts = products
          .flatMap((item) => item?.products || [])
          .filter((product) => product?.sale);
        categoryName = "Món ăn đang được giảm giá";
        break;
      case "alls":
        filteredProducts = products.flatMap((item) => item?.products || []);
        categoryName = "Tất cả các món ăn";
        break;
      default:
        const selectedCategory = products.find(
          (data) => category === String(data.idCategory)
        );
        if (selectedCategory) {
          filteredProducts = selectedCategory.products || [];
          categoryName = selectedCategory.nameCategory;
        }
        break;
    }

    setDataPageProducts(filteredProducts);
    setNameCategory(categoryName);
  };

  useEffect(() => {
    handleProductsService
      .getAllProducts()
      .then((res) => {
        setDataApiProducts(res.data);
        fncTakeData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (dataApiProducts.length > 0) {
      fncTakeData(dataApiProducts);
    }
  }, [searchParams, dataApiProducts]);

  return (
    <div className="px-[20px] py-[10px] bg-bgMainColor">
      <div className="pt-[10px]">
        <h1 className="p-[5px] uppercase text-center font-bold text-textEmphasizeColor bg-bgEmphasizeColor ">
          {nameCategory}
        </h1>
        <div className="grid grid-cols-3 gap-[10px] mt-[20px]">
          {dataPageProducts?.map((data, index) => {
            return <CardProduct key={index} data={data} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Product;
