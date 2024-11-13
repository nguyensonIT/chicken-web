import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import CardProduct from "../../components/CardProduct";
import { useHandleContext } from "../../contexts/UserProvider";

const Product = () => {
  const { dataAllProductContext, dataIsLoadingContext } = useHandleContext();

  const [searchParams, setSearchParams] = useSearchParams();

  const [dataAllsProductsArranged, setDataAllsProductsArranged] = useState([]);
  const [dataPageProducts, setDataPageProducts] = useState([]);
  const [nameCategory, setNameCategory] = useState("");

  const [isProductSale, setIsProductSale] = useState(null);
  const [isProductHot, setIsProductHot] = useState(null);
  const [isProductNew, setIsProductNew] = useState(null);
  const [isAllsProduct, setIsAllsProduct] = useState(false);

  const fncTakeData = (products) => {
    const category = searchParams.get("category");
    let filteredProducts = [];
    let categoryName = "";

    switch (category) {
      case "new":
        filteredProducts = products
          .flatMap((item) => item?.products || [])
          .filter((product) => product?.newProduct);
        categoryName = {
          title: "Các món mới",
          titleNotProduct: "Hiện chưa có sản phẩm mới ",
        };
        break;
      case "hot":
        filteredProducts = products
          .flatMap((item) => item?.products || [])
          .filter((product) => product?.hotProduct);
        categoryName = {
          title: "Món ăn được mua nhiều nhất",
          titleNotProduct: "Đang cập nhật món ăn được mua nhiều nhất",
        };
        break;
      case "sale":
        filteredProducts = products
          .flatMap((item) => item?.products || [])
          .filter((product) => product?.sale);
        categoryName = {
          title: "Món ăn đang được giảm giá",
          titleNotProduct: "Hiện tại chưa có món nào được giảm giá",
        };
        break;
      case "alls":
        filteredProducts = [];
        categoryName = { title: "Tất cả các món ăn" };
        break;
      default:
        const selectedCategory = products.find(
          (data) => category === String(data.idCategory)
        );

        if (selectedCategory) {
          filteredProducts = selectedCategory.products || [];
          categoryName = { title: `${selectedCategory.nameCategory}` };
        }
        if (!selectedCategory) {
          filteredProducts = [];
          categoryName = { title: "Danh mục hiện không có sản phẩm!" };
        }
        break;
    }
    setDataPageProducts(filteredProducts);
    setNameCategory(categoryName);
  };

  const fncCheckTitle = (dataAllProductContext) => {
    const allProducts = dataAllProductContext.flatMap(
      (category) => category.products
    );
    // Kiểm tra sale
    const isSale = allProducts.some((product) => product.sale > 0);
    setIsProductSale(isSale);

    //Kiểm tra hot product
    const isHotProduct = allProducts.some(
      (product) => product.hotProduct === true
    );
    setIsProductHot(isHotProduct);

    //Kiểm tra new product
    const isNewProduct = allProducts.some(
      (product) => product.newProduct === true
    );
    setIsProductNew(isNewProduct);
  };

  useEffect(() => {
    if (searchParams.get("category") === "alls") {
      const newProducts = dataAllProductContext.sort(
        (a, b) => a.order - b.order
      );
      setDataAllsProductsArranged(newProducts);
      setIsAllsProduct(true);
    } else {
      setIsAllsProduct(false);
    }
    fncTakeData(dataAllProductContext);
    fncCheckTitle(dataAllProductContext);
  }, [searchParams, dataAllProductContext]);

  return (
    <div className="px-[20px] py-[10px] bg-bgMainColor">
      <div className="pt-[10px]">
        <h1 className="p-[5px] uppercase text-center font-bold text-textEmphasizeColor bg-bgEmphasizeColor ">
          {nameCategory.title}
        </h1>
        {searchParams.get("category") === "sale" && isProductSale === false && (
          <h1 className="text-center">{nameCategory.titleNotProduct}</h1>
        )}
        {searchParams.get("category") === "hot" && isProductHot === false && (
          <h1 className="text-center">{nameCategory.titleNotProduct}</h1>
        )}
        {searchParams.get("category") === "new" && isProductNew === false && (
          <h1 className="text-center">{nameCategory.titleNotProduct}</h1>
        )}
        {dataIsLoadingContext.isLoadingProduct && (
          <div className="w-full text-center">
            <FontAwesomeIcon className="loading" icon={faSpinner} />
          </div>
        )}
        {!isAllsProduct ? (
          <div className="grid grid-cols-3 gap-[10px] mt-[20px]">
            {dataPageProducts?.map((data, index) => {
              return <CardProduct key={index} data={data} />;
            })}
          </div>
        ) : (
          dataAllsProductsArranged?.map((data, index) => {
            return (
              <div key={index} className="">
                <h1 className="text-[24px] text-textEmphasizeColor py-[15px] font-bold">
                  {data.nameCategory}
                </h1>
                <div className="grid grid-cols-3 gap-[10px] mt-[20px]">
                  {data.products.map((data, index) => {
                    return <CardProduct key={index} data={data} />;
                  })}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Product;
