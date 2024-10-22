import { useEffect, useState } from "react";

import * as handleCategoryService from "../../../../services/handleCategoryService";
import * as handleProductsService from "../../../../services/handleProductsService";
import ItemBodyRowCategory from "./components/ItemBodyRowCategory";
import { useHandleContext } from "../../../../contexts/UserProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

const SelectorProducts = ({
  isHotProduct = false,
  isNewProduct = false,
  isSale = false,
}) => {
  const { selectedProductsContext, setSelectedProductsContext } =
    useHandleContext();

  const [dataProductsAPI, setDataProductsAPI] = useState([]);
  const [percentSale, setPercentSale] = useState(0);

  const [isCheckedAlls, setIsCheckedAlls] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [isLoadingBtnTrue, setIsLoadingBtnTrue] = useState(false);
  const [isLoadingBtnFalse, setIsLoadingBtnFalse] = useState(false);

  //handle select alls
  const handleSelectAlls = () => {
    const productIds = dataProductsAPI.flatMap((item) =>
      item.products.map((product) => product._id)
    );
    setSelectedProductsContext((prevSelected) => {
      if (prevSelected.length === productIds.length) {
        setIsCheckedAlls(false);
        return [];
      } else {
        setIsCheckedAlls(true);
        return productIds;
      }
    });
  };

  //handle create sale
  const handleCreateSale = () => {
    setIsLoadingBtnTrue(true);
    const dataSale = {
      ids: selectedProductsContext,
      sale: parseInt(percentSale),
    };
    handleProductsService
      .createSaleProduct(dataSale)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Tạo khuyến mại thành công");
          setSelectedProductsContext([]);
          setIsCheckedAlls(false);
          setPercentSale(0);
        } else if (res.response.status === 400) {
          toast.error("Có lỗi xảy ra");
        }
      })
      .catch((err) => console.log("Lỗi tạo khuyến mại", err))
      .finally(() => setIsLoadingBtnTrue(false));
  };
  //change PercentSale
  const handleChangePercentSale = (e) => {
    const value = e.target.value;

    if (value === "" || !isNaN(value)) {
      setPercentSale(value);
    }
  };

  //handle isHotProduct
  const handleIsHotProductTrue = (dataIds) => {
    handleProductsService
      .updateHotProduct(dataIds)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Đã thêm món vào danh mục Sản phẩm hot");
          setSelectedProductsContext([]);
        } else if (res.response.status === 400) {
          toast.error("Có lỗi gì đó xảy ra");
        }
      })
      .catch((err) => console.log("Lỗi api update product hot", err))
      .finally(() => setIsLoadingBtnTrue(false));
  };

  const handleIsHotProductFalse = (dataIds) => {
    handleProductsService
      .updateHotProduct(dataIds)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Đã xóa món khỏi danh mục Sản phẩm hot");
          setSelectedProductsContext([]);
        } else if (res.response.status === 400) {
          toast.error("Có lỗi gì đó xảy ra");
        }
      })
      .catch((err) => console.log("Lỗi api update product hot", err))
      .finally(() => setIsLoadingBtnFalse(false));
  };
  //End handle isHotProduct

  //handle isNewProduct
  const handleIsNewProductTrue = (dataIds) => {
    handleProductsService
      .updateNewProduct(dataIds)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Đã thêm món vào danh mục Sản phẩm mới");
          setSelectedProductsContext([]);
        } else if (res.response.status === 400) {
          toast.error("Có lỗi gì đó xảy ra");
        }
      })
      .catch((err) => console.log("Lỗi api update product mới", err))
      .finally(() => setIsLoadingBtnTrue(false));
  };

  const handleIsNewProductFalse = (dataIds) => {
    handleProductsService
      .updateNewProduct(dataIds)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Đã xóa món khỏi danh mục Sản phẩm mới");
          setSelectedProductsContext([]);
        } else if (res.response.status === 400) {
          toast.error("Có lỗi gì đó xảy ra");
        }
      })
      .catch((err) => console.log("Lỗi api update product mới", err))
      .finally(() => setIsLoadingBtnFalse(false));
  };
  //End handle isNewProduct

  const handleSelectIdProductUpdateTrue = () => {
    setIsLoadingBtnTrue(true);
    setIsCheckedAlls(false);

    //data hot
    const dataIdsHot = {
      ids: selectedProductsContext,
      hotProduct: true,
    };
    //data new
    const dataIdsNew = {
      ids: selectedProductsContext,
      newProduct: true,
    };
    if (isHotProduct) {
      handleIsHotProductTrue(dataIdsHot);
    } else if (isNewProduct) {
      handleIsNewProductTrue(dataIdsNew);
    }
  };

  const handleSelectIdProductUpdateFalse = () => {
    setIsLoadingBtnFalse(true);
    setIsCheckedAlls(false);

    //data hot
    const dataIdsHot = {
      ids: selectedProductsContext,
      hotProduct: false,
    };
    //data new
    const dataIdsNew = {
      ids: selectedProductsContext,
      newProduct: false,
    };
    if (isHotProduct) {
      handleIsHotProductFalse(dataIdsHot);
    } else if (isNewProduct) {
      handleIsNewProductFalse(dataIdsNew);
    }
  };

  useEffect(() => {
    setIsLoadingData(true);
    handleCategoryService
      .getAllCategory()
      .then((data) => {
        const newDataSory = data.data.sort((a, b) => a.order - b.order);
        setDataProductsAPI(newDataSory);
      })
      .catch((err) => console.log("Lỗi selectorProduct", err))
      .finally(() => setIsLoadingData(false));
  }, []);

  return (
    <div className="pb-[40px]">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-6 py-3">Danh mục</th>
            <th className="px-6 py-3">Lựa chọn</th>
            <th className="px-6 py-3">Tên sản phẩm</th>
            <th className="px-6 py-3">Ảnh sản phẩm</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-6 py-3">Chọn tất cả</td>
            <td colSpan={3} className="px-6 py-3">
              <input
                type="checkbox"
                checked={isCheckedAlls}
                onChange={handleSelectAlls}
              />
            </td>
          </tr>
          {isLoadingData && (
            <tr>
              <td colSpan={4} className="text-center">
                <FontAwesomeIcon className="loading" icon={faSpinner} />
              </td>
            </tr>
          )}
          {dataProductsAPI?.length > 0 &&
            dataProductsAPI.map((data, index) => {
              return <ItemBodyRowCategory key={index} data={data} />;
            })}
        </tbody>
      </table>
      <div className="absolute bottom-0 right-0 ">
        {!isSale ? (
          <>
            <span
              onClick={handleSelectIdProductUpdateFalse}
              className={`${
                isLoadingBtnFalse && "pointer-events-none bg-btnHoverColor"
              } px-[20px] py-[5px] font-bold rounded-md text-white text-[12px] bg-btnColor hover:bg-btnHoverColor transition-all cursor-pointer select-none`}
            >
              {isLoadingBtnFalse ? (
                <FontAwesomeIcon className="loading" icon={faSpinner} />
              ) : isHotProduct ? (
                "Xóa khỏi mục món hot"
              ) : (
                "Xóa khỏi mục món mới"
              )}
            </span>
            <span
              onClick={handleSelectIdProductUpdateTrue}
              className={`${
                isLoadingBtnTrue && "pointer-events-none bg-btnHoverColor"
              } ml-[10px] px-[20px] py-[5px] font-bold rounded-md text-white text-[12px] bg-btnColor hover:bg-btnHoverColor transition-all cursor-pointer select-none`}
            >
              {isLoadingBtnTrue ? (
                <FontAwesomeIcon className="loading" icon={faSpinner} />
              ) : isHotProduct ? (
                "Thêm vào mục món hot"
              ) : (
                "Thêm vào mục món mới"
              )}
            </span>
          </>
        ) : (
          <div className="flex items-center gap-[5px]">
            <label className="" htmlFor="sale">
              Tạo mã:
            </label>
            <div className="flex w-[60px] border-[2px] border-borderColor rounded-md overflow-hidden">
              <input
                id="sale"
                className="w-full text-center outline-none border-none"
                type="text"
                value={percentSale}
                onChange={handleChangePercentSale}
              />
              <label className="bg-white" htmlFor="sale">
                %
              </label>
            </div>
            <span
              onClick={handleCreateSale}
              className={`${
                isLoadingBtnTrue && "pointer-events-none bg-btnHoverColor"
              } ml-[10px] px-[20px] py-[5px] font-bold rounded-md text-white text-[12px] bg-btnColor hover:bg-btnHoverColor transition-all cursor-pointer select-none`}
            >
              {isLoadingBtnTrue ? (
                <FontAwesomeIcon className="loading" icon={faSpinner} />
              ) : (
                " Tạo khuyến mại"
              )}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectorProducts;
