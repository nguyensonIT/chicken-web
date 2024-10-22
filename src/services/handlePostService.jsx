import * as request from "../utils/request";
const token = localStorage.getItem("authToken");

export const getAllPost = async () => {
  const obj = {
    path: "post",
  };

  const response = await request.GET(obj);
  return response;
};

export const likePost = async (idPost, body) => {
  const obj = {
    path: `post/${idPost}/like-post`,
    body,
    token,
  };

  const response = await request.POST(obj);
  return response;
};
