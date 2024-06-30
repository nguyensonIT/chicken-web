// Import Swiper React components
import banner from "../../assets/img/banner.png";
import CardProduct from "../../components/CardProduct";
import { dataProducts } from "./components/DataProducts";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import { useState } from "react";
import DetailProductDialog from "../../components/DetailProductDialog";

const Home = () => {
  const [displayDetail, setDisplayDetail] = useState(false);
  const [dataDetailProduct, setDataDetailProduct] = useState({});

  const handleDetail = (item) => {
    setDisplayDetail(true);
    setDataDetailProduct(item);
  };

  return (
    <div className="p-[10px] bg-bgMainColor">
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
        {dataProducts.map((data, index) => {
          return (
            <div className="pt-[10px]" key={index}>
              <h1 className="p-[5px] text-center font-bold text-textEmphasizeColor bg-bgEmphasizeColor ">
                {data.title}
              </h1>
              {/* content product   */}
              <div className="grid grid-cols-3 gap-[10px] mt-[20px]">
                {/* products  item*/}
                {data.data.map((item, index) => {
                  return (
                    <CardProduct
                      key={index}
                      image={item.image}
                      name={item.name}
                      desc={item.desc}
                      price={item.price}
                      sale={item.sale}
                      onClick={() => handleDetail(item)}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      {displayDetail && (
        <DetailProductDialog
          data={dataDetailProduct}
          displayDetail={displayDetail}
          setDisplayDetail={setDisplayDetail}
        />
      )}
    </div>
  );
};

export default Home;
