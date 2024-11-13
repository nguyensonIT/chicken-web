import * as request from "../utils/request";
const token = localStorage.getItem("authToken");

export const getAllOrder = async () => {
  const obj = {
    path: "order",
  };

  const response = await request.GET(obj);
  return response;
};

export const getOrderByIdUser = async (userOrderId) => {
  const obj = {
    path: `order/${userOrderId}`,
    token,
  };

  const response = await request.GET(obj);
  return response;
};

export const getOrderBySubId = async (subId) => {
  const obj = {
    path: `order/order-by-subId/${subId}`,
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

export const canceledOderByCustomer = async (id) => {
  const obj = {
    path: "order/canceled-customer",
    body: id,
  };

  const response = await request.POST(obj);
  return response;
};
