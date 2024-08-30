import * as request from "../utils/request";

export const login = async ({ username, password }) => {
  const obj = {
    path: "auth/login",
    body: {
      username,
      password,
    },
  };

  const response = await request.POST(obj);
  return response;
};
