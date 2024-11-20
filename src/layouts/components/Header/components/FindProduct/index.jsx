import { forwardRef, useRef } from "react";

const FindProduct = forwardRef(
  ({ handleFindProduct = () => {}, className = "" }, ref) => {
    const internalRef = useRef();

    const resolvedRef = ref || internalRef;
    return (
      <div
        ref={resolvedRef}
        className={`${className} max-sm:border-0 max-sm:rounded-none find transition-all border focus:border-yellow-500 rounded-md flex items-center overflow-hidden`}
      >
        <input
          type="text"
          placeholder="Tìm kiếm món ăn..."
          className="max-sm:text-sm py-2 px-3 focus:outline-none flex-1  "
        />
        <button
          onClick={handleFindProduct}
          className="max-sm:text-smBtn max-sm:py-[4px] transition-[2s] bg-btnColor hover:bg-btnHoverColor text-white px-4 py-2 "
        >
          Tìm kiếm
        </button>
      </div>
    );
  }
);

export default FindProduct;
