import * as request from "../utils/request";

export const register = async ({ username, password, name = "" }) => {
  const obj = {
    path: "auth/register",
    body: {
      name,
      username,
      password,
    },
  };

  const response = await request.POST(obj);
  return response;
};
