import * as request from "../utils/request";

const token = localStorage.getItem("authToken");

export const updateLogo = async (body) => {
  const obj = {
    path: `update-logo`,
    token,
    body,
  };

  const response = await request.PUT(obj);
  return response;
};

export const updateBanner = async (body) => {
  const obj = {
    path: `update-banner`,
    token,
    body,
  };

  const response = await request.PUT(obj);
  return response;
};

export const getLogo = async () => {
  const obj = {
    path: "logo",
  };

  const response = await request.GET(obj);
  return response;
};
