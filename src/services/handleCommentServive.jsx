import * as request from "../utils/request";
const token = localStorage.getItem("authToken");

export const getCommentIdPost = async (postId) => {
  const obj = {
    path: `comment/${postId}`,
  };

  const response = await request.GET(obj);
  return response;
};

export const postCommentIdPost = async (body) => {
  const obj = {
    path: "comment",
    body,
    token,
  };

  const response = await request.POST(obj);
  return response;
};
