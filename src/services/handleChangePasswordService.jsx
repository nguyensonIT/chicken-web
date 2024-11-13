import * as request from "../utils/request";

const token = localStorage.getItem("authToken");

export const changePassword = async (data) => {
  const obj = {
    path: "auth/change-password",
    body: data,
    token,
  };

  const response = await request.PUT(obj);
  return response;
};
