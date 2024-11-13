import * as request from "../utils/request";

const token = localStorage.getItem("authToken");

export const updateProfile = async (body) => {
  const obj = {
    path: "auth/update-profile",
    token,
    body,
  };

  const response = await request.PUT(obj);
  return response;
};
