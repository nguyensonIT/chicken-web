import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faImage,
  faPaperPlane,
  faSpinner,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

import PopupWrapper from "../../../../components/PopupWrapper";
import Story from "../Story";
import { useHandleContext } from "../../../../contexts/UserProvider";
import logo from "../../../../assets/img/Logo.png";
import { showFileImg } from "../../../../components/Function";
import * as handlePostService from "../../../../services/handlePostService";
import * as handleCommentServive from "../../../../services/handleCommentServive";
import Comment from "../Comment";

const WrapperStory = ({ data }) => {
  const { user } = useHandleContext();

  const boxImgRef = useRef();
  const boxCommentRef = useRef();

  const [isLikePost, setIsLikePost] = useState(
    data.likedBy.some((item) => item._id === user?.id)
  );
  const [qntLike, setQntLike] = useState(data.likedBy.length);

  const [dataDetailImg, setDataDetailImg] = useState([]);
  const [positionImg, setPositionImg] = useState(0);
  const [imageCmt, setImageCmt] = useState("");
  const [dataCmtClickReply, setDataCmtClickReply] = useState({});
  const [dataDetailComment, setDataDetailComment] = useState([]);

  const [valueInpCmt, setValueInpCmt] = useState("");

  const [isDetailImg, setIsDetailImg] = useState(false);
  const [isDetailComment, setIsDetailComment] = useState(false);
  const [isLoadingSubmitCmt, setIsLoadingSubmitCmt] = useState(false);
  const [isLoadingDataCmt, setIsLoadingDataCmt] = useState(false);

  // HANDLE IMG
  const handleDetailImg = (data) => {
    setIsDetailImg(!isDetailImg);
    setDataDetailImg(data);
  };

  // prev, next
  const handlePrev = () => {
    setPositionImg((prev) => prev - 1);
  };

  const handleNext = () => {
    setPositionImg((prev) => prev + 1);
  };

  //close box cmt and img
  const handleClose = (e) => {
    if (boxImgRef.current && e.target === boxImgRef.current) {
      setIsDetailImg(false);
      setPositionImg(0);
    }
    if (boxCommentRef.current && e.target === boxCommentRef.current) {
      setIsDetailComment(false);
    }
  };
  // END HANDLE IMG

  const handleExitComment = () => {
    setIsDetailComment(false);
  };

  // handle input imageCmt, image
  const handleOnChangeCmtImage = (e) => {
    const file = e.target.files[0];

    showFileImg(file, (err, fileUrl) => {
      if (fileUrl) {
        setImageCmt(fileUrl);
      } else {
        setImageCmt("");
        toast.error(err);
      }
    });
  };

  const deleteDataImgCmt = () => {
    setImageCmt("");
  };

  const handleOnChangeCmt = (e) => {
    setValueInpCmt(e.target.value);
  };

  //fnc call api cmt
  const fncCallApiCmt = async (id) => {
    await handleCommentServive
      .getCommentIdPost(id)
      .then((res) => {
        if (res.status === 200) {
          setDataDetailComment((prev) => {
            return res.data.sort(
              (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            );
          });
        }
      })
      .catch((err) => console.log("Lỗi gọi API comment", err));
  };

  //submit comment
  const handleSubmitComment = async () => {
    let { dataCommentPost } = new Object();
    if (
      Object.keys(dataCmtClickReply).length !== 0 &&
      dataCmtClickReply.parentId === undefined
    ) {
      dataCommentPost = {
        postId: data._id,
        contentCmt: valueInpCmt.trim(),
        userId: user.id,
        imageCmt: imageCmt,
        parentId: dataCmtClickReply._id,
        replyToUserId: dataCmtClickReply.userId._id,
      };
    } else if (
      Object.keys(dataCmtClickReply).length !== 0 &&
      dataCmtClickReply.parentId !== null
    ) {
      dataCommentPost = {
        postId: data._id,
        contentCmt: valueInpCmt.trim(),
        userId: user.id,
        imageCmt: imageCmt,
        parentId: dataCmtClickReply.parentId,
        replyToUserId: dataCmtClickReply.userId._id,
      };
    } else {
      dataCommentPost = {
        postId: data._id,
        contentCmt: valueInpCmt.trim(),
        userId: user?.id,
        imageCmt: imageCmt,
      };
    }
    if (!user) {
      toast.warning("Bạn phải đăng nhập mới có thể bình luận!");
    } else if (user !== null && valueInpCmt.trim() !== "") {
      setIsLoadingSubmitCmt(true);
      try {
        const res = await handleCommentServive.postCommentIdPost(
          dataCommentPost
        );
        if (res.status === 201) {
          fncCallApiCmt(dataCommentPost.postId);
          handleExitReply();
          setImageCmt("");
          setValueInpCmt("");
        }
      } catch (err) {
        console.log("Lỗi comment", err);
      } finally {
        setIsLoadingSubmitCmt(false);
      }
    }
  };

  //Bật detail post gọi api cmt
  const handleComment = async (id) => {
    setIsLoadingDataCmt(true);
    await handleCommentServive
      .getCommentIdPost(id)
      .then((res) => {
        if (res.status === 200) {
          setDataDetailComment((prev) => {
            return res.data.sort(
              (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            );
          });
        }
      })
      .catch((err) => console.log("Lỗi gọi API comment", err))
      .finally(() => setIsLoadingDataCmt(false));
    setIsDetailComment(true);
  };

  //Fnc call api like post
  const handleLikePost = () => {
    const idPost = data._id;
    const idUserLikePost = { userId: user?.id };
    if (localStorage.getItem("authToken")) {
      handlePostService
        .likePost(idPost, idUserLikePost)
        .then((res) => {
          if (res.status === 200) {
            if (res.data.likedBy.some((item) => item === user.id)) {
              setQntLike((prev) => prev + 1);
            } else {
              setQntLike((prev) => prev - 1);
            }
          }
        })
        .catch((err) => console.log("Lỗi api like post", err));

      if (isLikePost) {
        setIsLikePost(!isLikePost);
      } else {
        setIsLikePost(!isLikePost);
      }
    } else {
      toast.warning("Bạn phải đăng nhập mới có thể like");
    }
  };

  // nút trả lời
  const handleReplyCmt = (data) => {
    setDataCmtClickReply(data);
  };

  //Btn reply
  const handleExitReply = () => {
    setDataCmtClickReply({});
  };

  return (
    <>
      <Story
        handleComment={handleComment}
        handleDetailImg={handleDetailImg}
        data={data}
        isLikePost={isLikePost}
        qntLike={qntLike}
        handleLikePost={handleLikePost}
      />
      {isDetailImg && (
        <PopupWrapper>
          <div
            onClick={(e) => handleClose(e)}
            ref={boxImgRef}
            className="w-full h-full flex justify-center items-center"
          >
            <div className="relative w-[70%] select-none">
              <img
                className="w-full h-full"
                src={dataDetailImg[positionImg]}
                alt="img"
              />
              {positionImg !== 0 && (
                <span
                  onClick={handlePrev}
                  className="max-sm:left-[-50px] max-sm:size-[35px] flex justify-center items-center text-white absolute top-[50%] left-[-60px] max-w-[80px] w-[50px] man-h-[80px] h-[50px] rounded-[50%] bg-slate-400 cursor-pointer"
                >
                  <FontAwesomeIcon
                    className="text-[20px]"
                    icon={faChevronLeft}
                  />
                </span>
              )}
              {positionImg !== dataDetailImg.length - 1 && (
                <span
                  onClick={handleNext}
                  className="max-sm:right-[-50px] max-sm:size-[35px] flex justify-center items-center text-white absolute top-[50%] right-[-60px] max-w-[80px] w-[50px] man-h-[80px] h-[50px] rounded-[50%] bg-slate-400 cursor-pointer"
                >
                  <FontAwesomeIcon
                    className="text-[20px]"
                    icon={faChevronRight}
                  />
                </span>
              )}
            </div>
          </div>
        </PopupWrapper>
      )}
      {isDetailComment && (
        <PopupWrapper>
          <div
            onClick={(e) => handleClose(e)}
            ref={boxCommentRef}
            className="w-full h-full"
          >
            <div className=" max-w-xl mx-auto h-[80%] bg-white rounded-lg ">
              <div className="top-0 left-0 right-0 h-[50px] pr-[20px] flex justify-end items-center bg-white border-b">
                <span
                  onClick={handleExitComment}
                  className=" flex justify-center items-center text-white w-[40px] h-[40px] rounded-[50%] bg-gray-300 cursor-pointer"
                >
                  <FontAwesomeIcon className="text-[15px]" icon={faXmark} />
                </span>
              </div>
              <div className="relative h-full shadow-md bg-white  overflow-y-auto">
                <Story
                  isDetailComment={true}
                  handleComment={handleComment}
                  handleDetailImg={handleDetailImg}
                  data={data}
                  isLikePost={isLikePost}
                  qntLike={qntLike}
                  handleLikePost={handleLikePost}
                />
                <div className="p-4 bg-white">
                  <span className="block text-[12px] ">
                    Tất cả bình luận
                    <FontAwesomeIcon
                      className="ml-[10px]"
                      icon={faChevronDown}
                    />
                  </span>
                  {isLoadingDataCmt && (
                    <span className="block w-full text-center">
                      <FontAwesomeIcon className="loading" icon={faSpinner} />
                    </span>
                  )}
                  {dataDetailComment?.map((item, index) => {
                    return (
                      <Comment
                        handleReplyCmt={handleReplyCmt}
                        key={index}
                        data={item}
                        dataPost={data}
                      />
                    );
                  })}
                </div>
              </div>
              <div className="max-sm:h-full max-sm:pt-[20px] bottom-0 left-0 right-0 p-4 bg-white border-t">
                <div className="flex items-center gap-[10px]">
                  {user?.image ? (
                    <img
                      alt="user-cmt"
                      className="w-10 h-10 rounded-full border"
                      src={user.image}
                    />
                  ) : (
                    <img
                      alt="user-cmt"
                      className="w-10 h-10 rounded-full"
                      src={logo}
                    />
                  )}
                  <div className="text-gray-500 ">
                    <input
                      className="hidden"
                      onChange={handleOnChangeCmtImage}
                      type="file"
                      id="imgCmt"
                    />
                    <div className="flex justify-center items-center gap-[10px]">
                      <label
                        className="hover:text-gray-700 cursor-pointer"
                        htmlFor="imgCmt"
                      >
                        <FontAwesomeIcon icon={faImage} />
                      </label>
                      {imageCmt && (
                        <div className="relative w-[30px]">
                          <img
                            className="w-full border object-cover"
                            src={imageCmt}
                            alt="imgCmt"
                          />
                          <span
                            onClick={deleteDataImgCmt}
                            className="absolute top-[-15px] right-[-10px] hover:text-gray-700 cursor-pointer"
                          >
                            {" "}
                            <FontAwesomeIcon icon={faXmark} />
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className=" flex items-center w-full rounded-full border bg-white overflow-hidden">
                    {Object.keys(dataCmtClickReply).length !== 0 && (
                      <span className="relative">
                        <p className="leading-[20px] ml-[10px] pl-[5px] w-[80px] h-[20px] font-bold text-[8px] bg-blue-100 truncate">
                          {dataCmtClickReply.userId.name}
                        </p>
                        <FontAwesomeIcon
                          onClick={handleExitReply}
                          className="absolute text-[12px] top-[-5px] right-[-5px] hover:text-gray-700 cursor-pointer"
                          icon={faXmark}
                        />
                      </span>
                    )}
                    <input
                      className="w-full p-2 text-[10px] outline-none"
                      placeholder={`${
                        user?.name
                          ? `Bình luận dưới tên ${user.name}`
                          : "Hãy đăng nhập để bình luận"
                      } `}
                      type="text"
                      value={valueInpCmt}
                      onChange={handleOnChangeCmt}
                    />
                    <button
                      onClick={handleSubmitComment}
                      className={`${
                        isLoadingSubmitCmt && "pointer-events-none"
                      } bg-white px-[10px] text-gray-500 hover:text-gray-700`}
                    >
                      {isLoadingSubmitCmt ? (
                        <FontAwesomeIcon className="loading" icon={faSpinner} />
                      ) : (
                        <FontAwesomeIcon icon={faPaperPlane} />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PopupWrapper>
      )}
    </>
  );
};

export default WrapperStory;
