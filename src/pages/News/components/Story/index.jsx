import { faComment, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";

import { timeAgo } from "../../../../components/Function";
import imgErr from "../../../../assets/img/Logo.png";
import "./styles.css";
import { useHandleContext } from "../../../../contexts/UserProvider";
import * as handlePostService from "../../../../services/handlePostService";
import { toast } from "react-toastify";

const Story = ({
  isStoryDetail = false,
  isDetailComment = false,
  data,
  handleDetailImg,
  handleComment,
}) => {
  const { user } = useHandleContext();

  const textRef = useRef(null);
  const [isClamped, setIsClamped] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const [isLikePost, setIsLikePost] = useState(
    data.likedBy.some((item) => item._id === user?.id)
  );

  const [qntLike, setQntLike] = useState(data.likedBy.length);
  const [qntComment, setQntComment] = useState(
    data.comments.length +
      data.comments.reduce(
        (count, comment) => count + comment.replies.length,
        0
      )
  );

  //Fnc call api like post
  const fncCallApiLikePost = () => {
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

  //Comment Internal
  const handleCommentInternal = (id) => {
    if (!isDetailComment) {
      handleComment(id);
    }
  };

  //handle Like Post
  const handleLikePost = () => {
    fncCallApiLikePost();
  };

  useEffect(() => {
    const lineHeight = parseFloat(getComputedStyle(textRef.current).lineHeight);
    const maxHeight = lineHeight * 3;

    if (textRef.current.scrollHeight > maxHeight) {
      setIsClamped(true);
    }
  }, [data.content]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="max-w-2xl w-full mx-auto bg-white p-4 rounded-lg shadow-md ">
      {/* User Admin  */}
      <div className="flex items-center mb-4">
        <img
          alt="Profile picture"
          className="w-10 h-10 rounded-full"
          src={data.userId.image || imgErr}
        />
        <div className="ml-3">
          <h2 className="text-lg font-semibold">{data.userId.name}</h2>
          <p className="text-gray-500 text-sm">{timeAgo(data.createdAt)}</p>
        </div>
      </div>
      {/* Content  */}
      <div ref={textRef} className={`${!isExpanded && "line-clamp-3"} mb-4 `}>
        {data.content}
      </div>
      {isClamped && !isExpanded && (
        <span
          onClick={toggleExpand}
          className="block my-[10px] text-blue-500 cursor-pointer"
        >
          ... xem thêm
        </span>
      )}
      {isExpanded && (
        <span
          onClick={toggleExpand}
          className="block my-[10px] text-blue-500 cursor-pointer"
        >
          ẩn bớt
        </span>
      )}
      {/* Img box */}
      <div
        onClick={() => handleDetailImg(data.images)}
        className="cursor-pointer"
      >
        {data.images.length === 1 &&
          data.images.map((img, index) => {
            return (
              <div key={index} className="w-full h-auto">
                <img
                  alt="img-product"
                  className="w-full h-full object-cover rounded-lg"
                  src={img}
                />
              </div>
            );
          })}
        {data.images.length === 2 && (
          <div className="grid grid-cols-2 justify-center items-center gap-2">
            {data.images.map((img, index) => {
              return (
                <img
                  key={index}
                  alt="img-product"
                  className="w-full h-full object-cover rounded-lg"
                  src={img}
                />
              );
            })}
          </div>
        )}
        {data.images.length === 3 && (
          <div className="flex flex-col gap-2">
            <div className="grid grid-cols-2 justify-center items-center gap-2">
              {data.images.slice(0, 2).map((img, index) => {
                return (
                  <img
                    key={index}
                    alt="img-product"
                    className="w-full h-full object-cover rounded-lg"
                    src={img}
                  />
                );
              })}
            </div>
            {data.images.slice(2, 3).map((img, index) => {
              return (
                <img
                  key={index}
                  alt="img-product"
                  className="w-full h-full object-cover rounded-lg"
                  src={img}
                />
              );
            })}
          </div>
        )}

        {data.images.length > 3 && (
          <div className="grid grid-cols-2 justify-center items-center gap-2">
            {data.images.slice(0, 3).map((img, index) => {
              return (
                <img
                  key={index}
                  alt="img-product"
                  className="w-full h-full object-cover rounded-lg"
                  src={img}
                />
              );
            })}
            <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-lg">
              <span className=" text-gray-500 text-[24px]">
                +{data.images.length - 3}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Qnt like and comment  */}
      <div className="flex justify-between mt-2 text-gray-500 text-sm">
        <span>{qntLike} lượt thích</span>
        <span
          onClick={() => handleCommentInternal(data._id)}
          className="ml-4 hover:underline cursor-pointer"
        >
          {qntComment} bình luận
        </span>
      </div>
      {/* Btn like, comment  */}
      <div className="flex py-[4px] border-t-[2px] border-t-gray-200 border-b-[2px] border-b-gray-200 items-center mt-4">
        <button
          onClick={handleLikePost}
          className="w-[50%] flex items-center justify-center py-[8px] px-[25px] hover:bg-gray-200"
        >
          {isLikePost ? (
            <>
              <FontAwesomeIcon
                className="liked-icon text-red-600"
                icon={faHeart}
              />
              <span className="text-red-600 ml-1">Thích</span>
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faHeart} />
              <span className="ml-1">Thích</span>
            </>
          )}
        </button>
        <button
          onClick={() => handleCommentInternal(data._id)}
          className="w-[50%] flex items-center justify-center py-[8px] px-[25px] ml-4 hover:bg-gray-200"
        >
          <FontAwesomeIcon icon={faComment} />
          <span className="ml-1">Bình luận</span>
        </button>
      </div>
    </div>
  );
};

export default Story;
