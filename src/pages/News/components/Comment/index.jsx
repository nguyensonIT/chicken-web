import { useEffect, useState } from "react";

import { timeAgo } from "../../../../components/Function";
import imgErr from "../../../../assets/img/Logo.png";

const Comment = ({ data, handleReplyCmt, dataPost }) => {
  const [isSeeMore, setIsSeeMore] = useState(false);
  const [dataCmtUpdate, setDataCmtUpdate] = useState(data);
  const [idAuthor, setIdAuthor] = useState(dataPost.userId._id);

  const handleSeeMore = () => {
    setIsSeeMore(true);
  };

  useEffect(() => {
    setDataCmtUpdate(data);
  }, [data]);

  return (
    <div className="flex items-start gap-[5px] pt-[10px]">
      <img
        alt="User profile picture"
        className="w-[30px] h-[30px] rounded-full border"
        src={dataCmtUpdate.userId.image || imgErr}
      />
      <div>
        <div className="inline-block bg-gray-100 p-3 rounded-lg">
          <div className="flex items-center space-x-2">
            <p className="font-semibold text-[10px]">
              {dataCmtUpdate.userId.name}
            </p>
            {idAuthor === dataCmtUpdate.userId._id && (
              <span className="bg-blue-600 text-white text-[8px] px-1 rounded">
                Tác giả
              </span>
            )}
          </div>
          <p className="text-[10px]">{dataCmtUpdate.contentCmt}</p>
        </div>
        <div className="flex items-start flex-col gap-[10px] space-x-2 mt-1">
          {dataCmtUpdate.imageCmt && (
            <img
              className="w-[150px] object-cover rounded-lg border"
              src={dataCmtUpdate.imageCmt}
              alt="img"
            />
          )}
          <div className="flex gap-[10px]">
            <p className="text-gray-500 text-[10px] font-semibold">
              {timeAgo(dataCmtUpdate.createdAt)}
            </p>
            <button
              onClick={() => handleReplyCmt(dataCmtUpdate)}
              className="text-gray-500 text-[10px] font-semibold"
            >
              Trả lời
            </button>
          </div>
        </div>
        {/* <!-- Reply to First Comment --> */}
        {isSeeMore &&
          dataCmtUpdate.replies.map((reply, index) => {
            return (
              <div
                key={index}
                className="flex items-start gap-[5px] mt-[5px] ml-8"
              >
                <img
                  alt="Page profile picture"
                  className="w-[20px] h-[20px] rounded-full border"
                  src={reply.userId.image || imgErr}
                />
                <div>
                  <div className="inline-block bg-gray-100 p-3 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <p className="font-semibold text-[10px]">
                        {reply.userId.name}
                      </p>
                      {idAuthor === reply.userId._id && (
                        <span className="bg-blue-600 text-white text-[8px] px-1 rounded">
                          Tác giả
                        </span>
                      )}
                    </div>

                    <span className="block text-[10px]">
                      <p className="inline text-[12px] mr-[5px] font-semibold">
                        {reply.replyToUserId.name}
                      </p>
                      {reply.contentCmt}
                    </span>
                  </div>
                  <div className="flex items-start flex-col gap-[10px] space-x-2 mt-1">
                    {reply.imageCmt && (
                      <img
                        className="w-[150px] object-cover rounded-lg border"
                        src={reply.imageCmt}
                        alt="img"
                      />
                    )}
                    <div className="flex gap-[10px]">
                      <p className="text-gray-500 text-[10px] font-semibold">
                        {timeAgo(reply.createdAt)}
                      </p>
                      <button
                        onClick={() => handleReplyCmt(reply)}
                        className="text-gray-500 text-[10px] font-semibold"
                      >
                        Trả lời
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        {dataCmtUpdate.replies.length >= 1 && !isSeeMore && (
          <button
            onClick={handleSeeMore}
            className="text-blue-600 text-sm font-semibold mt-2"
          >
            Xem {dataCmtUpdate.replies.length} câu trả lời
          </button>
        )}
      </div>
    </div>
  );
};

export default Comment;
