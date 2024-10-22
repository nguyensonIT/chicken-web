import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import ArticleAlls from "./components/ArticleAlls";
import ArticleAddNew from "./components/ArticleAddNew";
import ArticleComments from "./components/ArticleComments";

const AdminArticle = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState();

  useEffect(() => {
    setCurrentPage(searchParams.get("article"));
  }, [searchParams]);

  return (
    <div className="max-w-full">
      <h1 className="fixed top-[60px] right-0 left-[180px] mx-[20px] py-[10px] text-[32px] bg-white font-bold text-center z-10">
        Quản lý bài viết tin tức
      </h1>
      <div className="shadow-md sm:rounded-lg ">
        {/* table  */}
        <div className="flex flex-col">
          {/* Router : Tất cả bài viết, Thêm bài viết, Nhận xét */}
          <div className="text-xs fixed top-[120px] right-0 left-[180px] mb-[20px] mx-[20px] flex text-gray-700 uppercase bg-gray-50 border-b-[2px] border-b-borderColor z-10">
            {/* Tất cả bài viết  */}
            <div className="w-1/3 h-[40px] text-center border-r-[2px] border-r-borderColor">
              <Link
                className={`block font-bold w-full h-full leading-[40px] hover:bg-bgHoverColor ${
                  currentPage === "alls-article" && "bg-bgHoverColor"
                }`}
                to="/admin/article?article=alls-article"
              >
                Tất cả bài viết
              </Link>
            </div>
            {/* Thêm bài viết  */}
            <div className="w-1/3 text-center border-r-[2px] border-r-borderColor">
              <Link
                className={`block font-bold w-full h-full leading-[40px] hover:bg-bgHoverColor ${
                  currentPage === "add-article" && "bg-bgHoverColor"
                }`}
                to="/admin/article?article=add-article"
              >
                Thêm bài viết mới
              </Link>
            </div>
            {/* Thêm bài viết  */}
            <div className="w-1/3 text-center">
              <Link
                className={`block font-bold w-full h-full leading-[40px] hover:bg-bgHoverColor ${
                  currentPage === "comment-article" && "bg-bgHoverColor"
                }`}
                to="/admin/article?article=comment-article"
              >
                Nhận xét
              </Link>
            </div>
          </div>
          {/* Box  */}
          <div className="mt-[100px]">
            {currentPage === "alls-article" && <ArticleAlls />}
            {currentPage === "add-article" && <ArticleAddNew />}
            {currentPage === "comment-article" && <ArticleComments />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminArticle;
