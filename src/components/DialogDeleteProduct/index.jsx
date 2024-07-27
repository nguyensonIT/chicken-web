import { useRef } from "react";
import PopupWrapper from "../PopupWrapper";
const DialogDeleteProduct = ({
  refDialog,
  title,
  handleDeleteProduct,
  handleCloseDialog,
}) => {
  return (
    <PopupWrapper>
      <div ref={refDialog} className="relative w-[400px] my-[40px] mx-auto">
        <div className=" pt-[60px] pb-[20px] px-[20px] bg-white shadow-lg rounded-lg overflow-hidden">
          <p className=" mb-[50px] text-center text-[28px]">{title}</p>
          <div className="flex justify-end">
            <button
              onClick={handleCloseDialog}
              className="mr-[15px] text-white uppercase font-bold px-[20px] py-[8px] rounded-md bg-[red] hover:bg-red-400 cursor-pointer transition-all"
            >
              Hủy
            </button>
            <button
              onClick={handleDeleteProduct}
              className=" text-white uppercase font-bold px-[20px] py-[8px] rounded-md bg-btnColor hover:bg-btnHoverColor cursor-pointer transition-all"
            >
              Đồng ý
            </button>
          </div>
        </div>
      </div>
    </PopupWrapper>
  );
};
export default DialogDeleteProduct;
