import * as request from "../utils/request";

const token = localStorage.getItem("authToken");

export const getAllUsers = async () => {
  const obj = {
    path: "auth/users",
    token,
  };

  const response = await request.GET(obj);
  return response;
};

export const deleteUser = async (id) => {
  const obj = {
    path: `auth/users/${id}`,
    token,
  };

  const response = await request.DELETE(obj);
  return response;
};
