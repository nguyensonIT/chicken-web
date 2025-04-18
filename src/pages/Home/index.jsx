// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import CardProduct from "../../components/CardProduct";
import { useHandleContext } from "../../contexts/UserProvider";

const Home = () => {
  const { dataAllProductContext, dataIsLoadingContext, dataLogoContext } =
    useHandleContext();

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
    <div className="px-[20px] py-[10px] bg-bgMainColor dark:bg-bgDarkMainColor">
      {/* banner  */}
      <div className="banner h-full w-full">
        {dataLogoContext?.bannerUrls?.length > 0 ? (
          <Swiper
            modules={[Navigation, Autoplay]}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            loop={dataLogoContext.bannerUrls.length > 1} // Chỉ bật loop nếu có hơn 1 slide
            spaceBetween={50}
            slidesPerView={1}
          >
            {dataLogoContext.bannerUrls.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="w-full h-full">
                  <img
                    className="w-full h-full object-fill"
                    src={item}
                    alt={`banner-${index}`}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="text-center py-10 text-gray-500 dark:text-textDarkColor">
            Không có banner để hiển thị
          </div>
        )}
      </div>

      {/* content  */}
      <div className="">
        {/* product sale  */}
        <div className="pt-[10px]">
          <h1 className="max-sm:text-sm p-[5px] uppercase text-center font-bold text-textEmphasizeColor bg-bgEmphasizeColor dark:bg-bgDarkTitleColor dark:text-textDarkTitleColor">
            Sản Phẩm khuyến mại
          </h1>
          {dataIsLoadingContext.isLoadingProduct && (
            <span className="block w-full text-center">
              <FontAwesomeIcon className="loading" icon={faSpinner} />
            </span>
          )}
          {isProductSale === false &&
            !dataIsLoadingContext.isLoadingProduct && (
              <h1 className="max-sm:text-sm text-center dark:text-textDarkColor">
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
          <h1 className="max-sm:text-sm p-[5px] uppercase text-center font-bold text-textEmphasizeColor bg-bgEmphasizeColor dark:bg-bgDarkTitleColor dark:text-textDarkTitleColor">
            Sản Phẩm hot
          </h1>
          {dataIsLoadingContext.isLoadingProduct && (
            <span className="block w-full text-center">
              <FontAwesomeIcon className="loading" icon={faSpinner} />
            </span>
          )}
          {isProductHot === false && !dataIsLoadingContext.isLoadingProduct && (
            <h1 className="max-sm:text-sm text-center dark:text-textDarkColor">
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
          <h1 className="max-sm:text-sm p-[5px] uppercase text-center font-bold text-textEmphasizeColor bg-bgEmphasizeColor dark:bg-bgDarkTitleColor dark:text-textDarkTitleColor">
            Sản phẩm mới
          </h1>
          {dataIsLoadingContext.isLoadingProduct && (
            <span className="block w-full text-center">
              <FontAwesomeIcon className="loading" icon={faSpinner} />
            </span>
          )}
          {isProductNew === false && !dataIsLoadingContext.isLoadingProduct && (
            <h1 className="max-sm:text-sm text-center dark:text-textDarkColor">
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
