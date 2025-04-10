// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import bannerReal2 from "../../assets/img/BannerReal2.jpg";
import bannerReal from "../../assets/img/bannerReal.jpg";
import CardProduct from "../../components/CardProduct";
import { useHandleContext } from "../../contexts/UserProvider";
import { Link } from "react-router-dom";

const Home = () => {
  const { dataAllProductContext, dataIsLoadingContext } = useHandleContext();

  const [isProductSale, setIsProductSale] = useState(false);
  const [isProductHot, setIsProductHot] = useState(false);
  const [isProductNew, setIsProductNew] = useState(false);

  // Xử lý các món hot, sale, new
  useEffect(() => {
    let allProducts = [];

    if (dataAllProductContext.length > 0) {
      // Kiểm tra sale
      allProducts = dataAllProductContext.flatMap(
        (category) => category.products
      );
    }
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
  }, [dataAllProductContext]);

  return (
    <div className="px-[20px] py-[10px] bg-bgMainColor">
      {/* banner  */}
      <div className="banner h-full w-full">
        <Swiper
          modules={[Navigation, Autoplay]}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          loop={true}
          spaceBetween={50}
          slidesPerView={1}
        >
          <SwiperSlide>
            <div className="w-full h-full">
              <img
                className="w-full h-full object-fill"
                src={bannerReal2}
                alt="banner"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-full ">
              <img
                className="w-full h-full object-fill"
                src={bannerReal}
                alt="banner"
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      {/* content  */}
      <div className="">
        {/* product sale  */}
        <div className="pt-[10px]">
          <h1 className="max-sm:text-sm p-[5px] uppercase text-center font-bold text-textEmphasizeColor bg-bgEmphasizeColor ">
            Sản Phẩm khuyến mại
          </h1>
          {dataIsLoadingContext.isLoadingProduct && (
            <span className="block w-full text-center">
              <FontAwesomeIcon className="loading" icon={faSpinner} />
            </span>
          )}
          {isProductSale === false &&
            !dataIsLoadingContext.isLoadingProduct && (
              <h1 className="max-sm:text-sm text-center">
                Hiện chưa có sản phẩm nào đang khuyến mại
              </h1>
            )}
          <div className="max-sm:grid-cols-1 grid grid-cols-3 gap-[10px] mt-[20px]">
            {dataAllProductContext.length > 0 &&
              dataAllProductContext.map((data, index) => {
                return data.products.map((product, index) => {
                  if (product.sale) {
                    return <CardProduct key={index} data={product} />;
                  }
                });
              })}
          </div>
        </div>
        {/* product hot  */}
        <div className="pt-[10px]">
          <h1 className="max-sm:text-sm p-[5px] uppercase text-center font-bold text-textEmphasizeColor bg-bgEmphasizeColor ">
            Sản Phẩm hot
          </h1>
          {dataIsLoadingContext.isLoadingProduct && (
            <span className="block w-full text-center">
              <FontAwesomeIcon className="loading" icon={faSpinner} />
            </span>
          )}
          {isProductHot === false && !dataIsLoadingContext.isLoadingProduct && (
            <h1 className="max-sm:text-sm text-center">
              Hiện chưa có sản phẩm nào hot
            </h1>
          )}
          <div className="max-sm:grid-cols-1 grid grid-cols-3 gap-[10px] mt-[20px]">
            {dataAllProductContext.length > 0 &&
              dataAllProductContext.map((data, index) => {
                return data.products.map((product, index) => {
                  if (product.hotProduct) {
                    return <CardProduct key={index} data={product} />;
                  }
                });
              })}
          </div>
        </div>
        {/* product new  */}
        <div className="pt-[10px]">
          <h1 className="max-sm:text-sm p-[5px] uppercase text-center font-bold text-textEmphasizeColor bg-bgEmphasizeColor ">
            Sản phẩm mới
          </h1>
          {dataIsLoadingContext.isLoadingProduct && (
            <span className="block w-full text-center">
              <FontAwesomeIcon className="loading" icon={faSpinner} />
            </span>
          )}
          {isProductNew === false && !dataIsLoadingContext.isLoadingProduct && (
            <h1 className="max-sm:text-sm text-center">
              Hiện chưa có sản phẩm nào mới
            </h1>
          )}
          <div className="max-sm:grid-cols-1 grid grid-cols-3 gap-[10px] mt-[20px]">
            {dataAllProductContext.length > 0 &&
              dataAllProductContext.map((data, index) => {
                return data.products.map((product, index) => {
                  if (product.newProduct) {
                    return <CardProduct key={index} data={product} />;
                  }
                });
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
