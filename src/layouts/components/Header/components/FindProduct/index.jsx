import { forwardRef, useEffect, useRef, useState } from "react";
import CardProduct from "../../../../../components/CardProduct";
import { useHandleContext } from "../../../../../contexts/UserProvider";
import useDebounce from "../../../../../hooks/useDebounce";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const FindProduct = forwardRef(
  ({ handleFindProduct = () => {}, className = "" }, ref) => {
    const { dataAllProductContext } = useHandleContext();

    const [products, setProducts] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [searchResult, setSearchResult] = useState([]);

    const internalRef = useRef();
    const resolvedRef = ref || internalRef;

    const productsFlat = dataAllProductContext.flatMap((item) => item.products);

    //useDebounce
    const debounce = useDebounce(searchKeyword, 200);

    // Hàm loại bỏ dấu tiếng Việt
    const removeVietnameseTones = (str) => {
      return str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // Loại bỏ dấu
        .replace(/đ/g, "d") // Thay thế chữ "đ"
        .replace(/Đ/g, "D") // Thay thế chữ "Đ"
        .toLowerCase(); // Chuyển về chữ thường
    };

    const handleChangeSearchKeyword = (e) => {
      setSearchKeyword(e.target.value);
    };

    const handleClearTextInp = () => {
      setSearchKeyword("");
    };

    useEffect(() => {
      if (!debounce.trim()) {
        setSearchResult([]);
        return;
      }
      // Hàm tìm kiếm
      function searchProducts(products, keyword) {
        const normalizedKeyword = removeVietnameseTones(keyword);
        return products.filter((product) =>
          removeVietnameseTones(product.nameProduct).includes(normalizedKeyword)
        );
      }
      const results = searchProducts(products, debounce);
      setSearchResult(results);
    }, [debounce]);

    useEffect(() => {
      setProducts(productsFlat);
    }, [dataAllProductContext]);

    return (
      <div className="relative">
        <div
          ref={resolvedRef}
          className={`${className} max-sm:border-0 max-sm:rounded-none find transition-all border focus:border-yellow-500 bg-white rounded-md flex items-center overflow-hidden`}
        >
          <input
            value={searchKeyword}
            onChange={handleChangeSearchKeyword}
            type="text"
            placeholder="Tìm kiếm món ăn..."
            className="max-sm:text-sm max-sm:py-4 py-2 px-3 focus:outline-none flex-1  "
          />
          {debounce.trim().length > 0 && (
            <FontAwesomeIcon
              onClick={handleClearTextInp}
              className="size-[14px] mr-[5px] opacity-[.3] rounded-[50%] bg-bgDialogColor cursor-pointer"
              icon={faXmark}
            />
          )}
          <button
            onClick={handleFindProduct}
            className="max-sm:text-smBtn max-sm:py-4 transition-[2s] bg-btnColor dark:bg-btnDarkColor hover:bg-btnHoverColor text-white px-4 py-2 "
          >
            Tìm kiếm
          </button>
        </div>
        {/* box item  */}
        {debounce.trim().length > 0 && (
          <div className="absolute max-sm:top-[62px] p-[10px] top-[42px] min-h-[80px] max-h-[300px] left-0 right-0 bg-white dark:bg-bgDarkMainColor shadow-xl overflow-y-auto">
            <div className="">
              {searchResult.length > 0 ? (
                searchResult.map((item, index) => {
                  return (
                    <div key={index} className="my-[5px] border-b-[1px]">
                      <CardProduct data={item} />
                    </div>
                  );
                })
              ) : (
                <h1 className="w-full text-center leading-[80px] h-[80px]">
                  Không tìm thấy sản phẩm nào!
                </h1>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
);

export default FindProduct;
