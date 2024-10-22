import imgChicken from "../../assets/img/imgChicken.jpg";
import imgGaluoc from "../../assets/img/galuoc.jpg";
import imgGaran from "../../assets/img/garan.jpg";
import imgGaransuat from "../../assets/img/garansuat.jpg";
import imgGaPng from "../../assets/img/garight.png";

const Introduce = () => {
  return (
    <>
      <div className="px-[40px] pb-[40px] mb-[-20px] bg-bgMainColor">
        <div className="flex justify-center items-center gap-[20px] py-[20px] bg-bgEmphasizeColor">
          <div className="flex justify-center items-center bg-white w-[80px] h-[80px] rounded-[50%] border-[2px] border-[red]">
            <img
              className="w-[60px] h-[60px] object-cover"
              src={imgGaPng}
              alt="imgGaPng"
            />
          </div>
          <h2 className="block text-[24px] font-bold text-center text-[red]">
            Vua Gà Tươi trân trọng nét ẩm thực Việt
          </h2>
          <div className="flex justify-center items-center bg-white w-[80px] h-[80px] rounded-[50%] border-[2px] border-[red]">
            <img
              className="w-[60px] h-[60px] object-cover scale-x-[-1]"
              src={imgGaPng}
              alt="imgGaPng"
            />
          </div>
        </div>
        <div className="pt-[30px] grid grid-cols-2 gap-[20px] items-center">
          <div className="text-justify">
            <p>
              <b>Vua Gà Tươi</b> tiền thân là một quá gà ven quốc lộ 5 từ năm
              1997 (hiện nay nhà hàng chính hãng này là cơ sở số 1 tại KM48 quốc
              lộ 5 đoạn qua xã Tuấn Việt, huyện Kim Thành, Tỉnh Hải Dương). Nổi
              tiếng gần xa với món gà chạy bộ tươi ngon, trở thành một đặc sẳn
              cho thực khách khi có dịp qua khu vực tỉnh Hải Dương.{" "}
              <b>Vua Gà Tươi</b> đã mở rộng kinh doanh với gần 100 cơ sở trên
              khắp các khu vực tỉnh thành cả nước để quý thực khách có thể
              thưởng thức món gà tươi ngon đậm chất ẩm thực Việt xưa bất kỳ lúc
              nào.
            </p>
          </div>
          <div className="flex justify-start">
            <img className="w-[300px]" src={imgChicken} alt="imgChicken" />
          </div>
          <div className="flex justify-end">
            <img className="w-[300px]" src={imgGaluoc} alt="imgGaluoc" />
          </div>
          <div className="text-justify">
            <p>
              Tự hào phát huy những món ăn truyền thống dân tộc,{" "}
              <b>Vua Gà Tươi</b> luôn biết cách phát huy nét ẩm thực Việt trong
              từng món ăn của mình. Thực đơn <b>Vua Gà Tươi</b> luôn có sự hòa
              trộn những hương vị đậm đà dân dã mang đậm chất Việt. Ẩm thực
              không chỉ chú trọng vào hương vị món ăn mà phần quan trọng nhất
              làm nên sự khác biệt của <b>Vua Gà Tươi</b> đó là trú trọng vào
              nguyên liệu cho từng món ăn.
            </p>
          </div>
          <div className="text-justify">
            <p>
              Để tạo ra được một món gà ngon, nguyên liệu cho món gà tươi 100%
              luôn là gà ta, gà ri...những giống gà đặc sản của mỗi địa phương
              Việt Nam. Vua Gà Tươi nói không với gà công nghiệp với chất thịt
              bở, nhạt và khô.
            </p>
          </div>
          <div className="flex justify-start">
            <img className="w-[300px]" src={imgGaran} alt="imgGaran" />
          </div>
          <div className="flex justify-end">
            <img className="w-[300px]" src={imgGaransuat} alt="imgGaransuat" />
          </div>
          <div className="text-justify">
            <p>
              Tại sao gọi là "Gà Tươi"? Những chú gà sáng chạy bộ chiều ăn ngô
              ăn thóc luôn được đảm bảo còn sống khỏe mạnh trước khi giết thịt.
              Gà được nấu thành món ăn cho thực khách không được làm thịt quá 1
              tiếng, vì lúc đó thịt đã không còn được tươi ngon nhất. Cái tên
              Đối với <b>Vua Gà Tươi</b>, được phục vụ khách hàng với những món
              ăn tươi ngon nhất, sự phục vụ tận tình nhất là sứ mệnh của chúng
              tôi.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Introduce;
