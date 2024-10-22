import {
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faPenToSquare,
  faPlus,
  faSearch,
  faSpinner,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

import { dataOption } from "./componnents/DataOptions";
import ItemProductRow from "./componnents/ItemProductRow";
import React, { Fragment, useEffect, useRef, useState } from "react";
import PopupWrapper from "../../components/PopupWrapper";
import EditProduct from "./componnents/EditProduct";
import * as handleCategoryService from "../../services/handleCategoryService";
import { useHandleContext } from "../../contexts/UserProvider";
import EditCategory from "./componnents/EditCategory";
import { toast } from "react-toastify";

const AdminTable = () => {
  const {
    productContext,
    handleTakeInFoBtnProductContext,
    setSelectedProductsContext,
  } = useHandleContext();

  const [isLoading, setIsLoading] = useState(false);
  const [isPopup, setIsPopup] = useState(false);
  const [isPopupEdit, setIsPopupEdit] = useState(false);
  const [isPopupEditCategory, setIsPopupEditCategory] = useState(false);
  const [option, setOption] = useState(dataOption);
  const [dataEdit, setDataEdit] = useState([]);

  const [dataProductsAPI, setDataProductsAPI] = useState([]);
  const [idCollapse, setIdCollapse] = useState([]);

  const refDialog = useRef(null);
  const refDialogEdit = useRef(null);

  //Drag and Drop
  const onDragEnd = (result) => {
    if (!result.destination) return;

    const updatedItems = Array.from(dataProductsAPI);
    const [removed] = updatedItems.splice(result.source.index, 1);
    updatedItems.splice(result.destination.index, 0, removed);

    setDataProductsAPI(updatedItems);
    const body = { orderList: updatedItems.map((item) => item._id) };

    handleCategoryService
      .reorderCategories({ body })
      .then((res) => {
        if (res.status === 200) {
          toast.success("Sắp xếp thành công");
        } else if (res.response.status === 400) {
          toast.error("Sắp xếp lỗi");
        }
      })
      .catch((err) => console.log((err) => console.log("Lỗi sắp xếp", err)));
  };
  //End Drag and Drop

  const handleOpenCollapse = (id) => {
    setIdCollapse((prev) => [...prev, id]);
  };
  const handleCloseCollapse = (id) => {
    const newIds = idCollapse.filter((item) => item !== id);
    setIdCollapse(newIds);
  };

  const handleEditProduct = (data) => {
    setDataEdit(data);
    setIsPopupEdit(true);
    handleTakeInFoBtnProductContext(data, data.isActive);
  };

  const handleCreateNew = () => {
    setIsPopup(true);
  };

  const handleTurnOnOffEditCategory = () => {
    setIsPopupEditCategory(true);
  };

  const handleCloseDialog = () => {
    refDialog.current.classList.add("isClose");
    setTimeout(() => {
      setOption(dataOption);
      setIsPopup(false);
    }, 300);
    setSelectedProductsContext([]);
  };

  const handleCloseDialogEdit = () => {
    refDialogEdit.current.classList.add("isClose");
    setTimeout(() => {
      setIsPopupEdit(false);
    }, 300);
  };

  const handleCloseDialogEditCategory = () => {
    refDialogEdit.current.classList.add("isClose");
    setTimeout(() => {
      setIsPopupEditCategory(false);
    }, 300);
  };

  const handlePrev = () => {
    setOption(dataOption);
    setSelectedProductsContext([]);
  };

  const handleOption = (data) => {
    setOption(data.children);
  };

  useEffect(() => {
    if (isPopup) {
      handleCloseDialog();
    }
    setIsLoading(true);
    handleCategoryService
      .getAllCategory()
      .then((data) => {
        const newDataSory = data.data.sort((a, b) => a.order - b.order);
        setDataProductsAPI(newDataSory);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, [productContext]);

  useEffect(() => {
    isPopup && refDialog.current.classList.add("isDetail");
  }, [isPopup]);
  useEffect(() => {
    isPopupEdit && refDialogEdit.current.classList.add("isDetail");
  }, [isPopupEdit]);
  useEffect(() => {
    isPopupEditCategory && refDialogEdit.current.classList.add("isDetail");
  }, [isPopupEditCategory]);

  return (
    <div className="max-w-full">
      <h1 className="text-[32px] font-bold text-center">Quản lý sản phẩm</h1>
      <div className="shadow-md sm:rounded-lg">
        <div className="flex justify-between p-4">
          {/* Search  */}
          <div className="relative mt-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FontAwesomeIcon icon={faSearch} className="text-gray-500" />
            </div>
            <input
              type="text"
              id="table-search"
              className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-80 pl-10 p-2.5"
              placeholder="Search for items"
            />
          </div>
          {/* Create new  */}

          <div className="relative mt-1">
            {/* Button Create new  */}
            <button
              onClick={handleCreateNew}
              type="button"
              className="inline-block rounded bg-btnColor px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-sm transition duration-150 ease-in-out hover:bg-btnHoverColor hover:shadow-md focus:outline-none focus:ring-0 motion-reduce:transition-none "
            >
              <FontAwesomeIcon icon={faPlus} className="text-[12px]" /> Tạo mới
            </button>
            {/* Button Edit  */}
            <button
              onClick={handleTurnOnOffEditCategory}
              type="button"
              className="inline-block ml-[20px] rounded bg-btnColor px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-sm transition duration-150 ease-in-out hover:bg-btnHoverColor hover:shadow-md focus:outline-none focus:ring-0 motion-reduce:transition-none "
            >
              <FontAwesomeIcon icon={faPenToSquare} className="text-[12px]" />{" "}
              Chỉnh sửa danh mục
            </button>
          </div>
        </div>
        {/* Form Create  */}
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="list-container">
            {(provided) => (
              <table
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="w-full text-sm text-left text-gray-500 dark:text-gray-400"
              >
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th className="px-6 py-3">Danh mục</th>
                    <th className="px-6 py-3">ID SP</th>
                    <th className="px-6 py-3">Ảnh SP</th>
                    <th className="px-6 py-3">Tên SP</th>
                    <th className="px-6 py-3">Giá tiền</th>
                    <th className="px-6 py-3">Còn hàng</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading && (
                    <tr className="">
                      <td colSpan={6} className="text-center">
                        <FontAwesomeIcon className="loading" icon={faSpinner} />
                      </td>
                    </tr>
                  )}
                  {dataProductsAPI.map((data, index) => {
                    return (
                      <React.Fragment key={index}>
                        <Draggable
                          key={data._id}
                          draggableId={data._id.toString()}
                          index={index}
                        >
                          {(provided) => (
                            <tr
                              ref={provided.innerRef}
                              {...provided.dragHandleProps}
                              {...provided.draggableProps}
                              className="border border-b-borderColor"
                            >
                              <td
                                colSpan={6}
                                className="py-[15px] pl-[10px] uppercase font-bold text-textEmphasizeColor select-none"
                              >
                                {data.nameCategory}
                                {idCollapse.includes(data._id) ? (
                                  <FontAwesomeIcon
                                    onClick={() =>
                                      handleCloseCollapse(data._id)
                                    }
                                    className="ml-[10px] text-[16px] p-[3px] cursor-pointer"
                                    icon={faChevronDown}
                                  />
                                ) : (
                                  <FontAwesomeIcon
                                    onClick={() => handleOpenCollapse(data._id)}
                                    className="ml-[10px] text-[16px] p-[3px] cursor-pointer"
                                    icon={faChevronRight}
                                  />
                                )}
                              </td>
                            </tr>
                          )}
                        </Draggable>
                        {idCollapse.includes(data._id) &&
                          data.products.map((item, index) => {
                            return (
                              <ItemProductRow
                                onClick={handleEditProduct}
                                key={index}
                                data={item}
                              />
                            );
                          })}
                      </React.Fragment>
                    );
                  })}
                  {provided.placeholder}
                </tbody>
              </table>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      {/* popup create  */}
      {isPopup && (
        <PopupWrapper>
          <div ref={refDialog} className="relative my-[40px] mx-[40px]">
            <div className="flex flex-col items-center justify-center pt-[60px] pb-[20px] px-[20px] bg-white shadow-lg rounded-lg overflow-hidden">
              {option.map((data, index) => {
                return (
                  <div className="relative w-full " key={index}>
                    {data.isPrev ? (
                      <div className=" w-full">
                        <h1 className="text-center text-[20px] uppercase font-bold mb-[40px]">
                          {data.title}
                        </h1>
                        <div className="h-[350px] overflow-y-auto">
                          {data.option}
                        </div>
                      </div>
                    ) : (
                      <span
                        className="block text-center transition-all w-full py-[4px] hover:bg-bgHoverColor cursor-pointer"
                        onClick={() => handleOption(data)}
                      >
                        {data.option}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
            {/* close popup  */}
            <div
              onClick={handleCloseDialog}
              className="close-dialog absolute w-[40px] h-[40px] right-[16px] top-[18px] flex items-center justify-center rounded-[50%] z-10 bg-bgDialogColor hover:bg-bgHoverColor transition-all cursor-pointer"
            >
              <FontAwesomeIcon
                icon={faXmark}
                className="icon-close-dialog text-[22px]"
              />
            </div>
            {/* prev popup  */}
            {option[0].isPrev && (
              <div
                onClick={handlePrev}
                className="close-dialog absolute w-[40px] h-[40px] left-[16px] top-[18px] flex items-center justify-center rounded-[50%] z-10 bg-bgDialogColor hover:bg-bgHoverColor transition-all cursor-pointer"
              >
                <FontAwesomeIcon
                  icon={faChevronLeft}
                  className="icon-close-dialog text-[22px]"
                />
              </div>
            )}
          </div>
        </PopupWrapper>
      )}

      {/* popup edit product  */}

      {isPopupEdit && (
        <PopupWrapper>
          <div ref={refDialogEdit} className="relative my-[40px] mx-[40px]">
            <EditProduct data={dataEdit} handleClose={handleCloseDialogEdit} />
            {/* close popup  */}
            <div
              onClick={handleCloseDialogEdit}
              className="close-dialog absolute w-[40px] h-[40px] right-[16px] top-[18px] flex items-center justify-center rounded-[50%] z-10 bg-bgDialogColor hover:bg-bgHoverColor transition-all cursor-pointer"
            >
              <FontAwesomeIcon
                icon={faXmark}
                className="icon-close-dialog text-[22px]"
              />
            </div>
          </div>
        </PopupWrapper>
      )}

      {/* popup edit category  */}

      {isPopupEditCategory && (
        <PopupWrapper>
          <div ref={refDialogEdit} className="relative mx-[40px]">
            <EditCategory />
            {/* close popup  */}
            <div
              onClick={handleCloseDialogEditCategory}
              className="close-dialog absolute w-[40px] h-[40px] right-[16px] top-[18px] flex items-center justify-center rounded-[50%] z-10 bg-bgDialogColor hover:bg-bgHoverColor transition-all cursor-pointer"
            >
              <FontAwesomeIcon
                icon={faXmark}
                className="icon-close-dialog text-[22px]"
              />
            </div>
          </div>
        </PopupWrapper>
      )}
    </div>
  );
};
export default AdminTable;
