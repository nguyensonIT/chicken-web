// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import { useEffect, useState } from "react";

import banner from "../../assets/img/banner.png";
import CardProduct from "../../components/CardProduct";
import * as handleProductsService from "../../services/handleProductsService";

const Home = () => {
  const [dataApiProducts, setDataApiProducts] = useState([]);
  const [isProductSale, setIsProductSale] = useState(false);

  useEffect(() => {
    handleProductsService
      .getAllProducts()
      .then((res) => setDataApiProducts(res.data));
  }, []);

  useEffect(() => {
    // Kiểm tra sale
    const allProducts = dataApiProducts.flatMap(
      (category) => category.products
    );
    const isSale = allProducts.some((product) => product.sale > 0);
    setIsProductSale(isSale);
  }, [dataApiProducts]);
  console.log(dataApiProducts);

  return (
    <div className="px-[20px] py-[10px] bg-bgMainColor">
      {/* banner  */}
      <div className="banner w-full h-auto">
        <Swiper
          modules={[Navigation, Autoplay]}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          loop={true}
          spaceBetween={50}
          slidesPerView={1}
          navigation
        >
          <SwiperSlide>
            <div className="w-full h-[250px]">
              <img
                className="w-full h-full object-cover"
                src={banner}
                alt="banner"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-full h-[250px]">
              <img
                className="w-full h-full object-cover"
                src={banner}
                alt="banner"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-full h-[250px]">
              <img
                className="w-full h-full object-cover"
                src={banner}
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
          <h1 className="p-[5px] uppercase text-center font-bold text-textEmphasizeColor bg-bgEmphasizeColor ">
            Sản Phẩm khuyến mại
          </h1>
          {isProductSale === false && (
            <h1 className="text-center">
              Hiện chưa có sản phẩm nào đang khuyến mại
            </h1>
          )}
          <div className="grid grid-cols-3 gap-[10px] mt-[20px]">
            {dataApiProducts.map((data, index) => {
              return data.products.map((product, index) => {
                if (product.sale) {
                  return <CardProduct key={index} data={product} />;
                }
              });
            })}
          </div>
        </div>
        {/* product new  */}
        <div className="pt-[10px]">
          <h1 className="p-[5px] uppercase text-center font-bold text-textEmphasizeColor bg-bgEmphasizeColor ">
            Sản Phẩm hot
          </h1>
          <div className="grid grid-cols-3 gap-[10px] mt-[20px]">
            {dataApiProducts.map((data, index) => {
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
          <h1 className="p-[5px] uppercase text-center font-bold text-textEmphasizeColor bg-bgEmphasizeColor ">
            Sản phẩm mới
          </h1>
          <div className="grid grid-cols-3 gap-[10px] mt-[20px]">
            {dataApiProducts.map((data, index) => {
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
