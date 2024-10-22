import * as request from "../utils/request";
const token = localStorage.getItem("authToken");

export const getAllOrder = async () => {
  const obj = {
    path: "order",
  };

  const response = await request.GET(obj);
  return response;
};

export const postOrder = async (body) => {
  const obj = {
    path: "order",
    body,
  };

  const response = await request.POST(obj);
  return response;
};

export const updateIsDeliveredOrder = async (body) => {
  const obj = {
    path: "order/delivered",
    body,
    token,
  };

  const response = await request.POST(obj);
  return response;
};

export const updateIsCanceledOrder = async (body) => {
  const obj = {
    path: "order/canceled",
    body,
    token,
  };

  const response = await request.POST(obj);
  return response;
};
