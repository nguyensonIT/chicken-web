import { useEffect, useState } from "react";

import { dataProducts } from "../../components/FakeDataProducts";
import { useSearchParams } from "react-router-dom";
import CardProduct from "../../components/CardProduct";

const Product = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [dataProduct, setDataProduct] = useState(dataProducts);
  const [dataPageProducts, setDataPageProducts] = useState([]);
  const [nameCategory, setNameCategory] = useState();

  useEffect(() => {
    dataProduct.forEach((data) => {
      if (searchParams.get("category") === String(data.idCategory)) {
        setDataPageProducts(data.products);
        setNameCategory(data.nameCategory);
      }
    });
    if (searchParams.get("category") === "new") {
      const productNew = dataProduct
        .flatMap((item) => item?.products)
        .filter((product) => product?.newProduct);
      setDataPageProducts(productNew);
      setNameCategory("Các món mới");
    }
    if (searchParams.get("category") === "hot") {
      const productNew = dataProduct
        .flatMap((item) => item?.products)
        .filter((product) => product?.hotProduct);
      setDataPageProducts(productNew);
      setNameCategory("Món ăn được mua nhiều nhất");
    }
    if (searchParams.get("category") === "sale") {
      const productNew = dataProduct
        .flatMap((item) => item?.products)
        .filter((product) => product?.sale);
      setDataPageProducts(productNew);
      setNameCategory("Món ăn đang được giảm giá");
    }
    if (searchParams.get("category") === "alls") {
      const productNew = dataProduct.flatMap((item) => item?.products);
      setDataPageProducts(productNew);
      setNameCategory("Tất cả các món ăn");
    }
  }, [searchParams.get("category")]);
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
