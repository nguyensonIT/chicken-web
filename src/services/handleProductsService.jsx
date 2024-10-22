import * as request from "../utils/request";

const token = localStorage.getItem("authToken");

export const getAllProducts = async () => {
  const obj = {
    path: "products",
  };

  const response = await request.GET(obj);
  return response;
};

export const postProduct = async ({ token, body }) => {
  const obj = {
    path: "products",
    token,
    body,
  };

  const response = await request.POST(obj);
  return response;
};

export const deleteProduct = async (token, id) => {
  const obj = {
    path: `products/${id}`,
    token,
  };

  const response = await request.DELETE(obj);
  return response;
};

export const updateProduct = async ({ token, id, body }) => {
  const obj = {
    path: `products/${id}`,
    token,
    body,
  };

  const response = await request.PUT(obj);
  return response;
};

export const updateActive = async ({ token, body }) => {
  const obj = {
    path: `products/update-active`,
    token,
    body,
  };

  const response = await request.POST(obj);
  return response;
};

export const updateHotProduct = async (body) => {
  const obj = {
    path: `update-hot-product`,
    token,
    body,
  };

  const response = await request.POST(obj);
  return response;
};

export const updateNewProduct = async (body) => {
  const obj = {
    path: `update-new-product`,
    token,
    body,
  };

  const response = await request.POST(obj);
  return response;
};

export const createSaleProduct = async (body) => {
  const obj = {
    path: `update-sale`,
    token,
    body,
  };

  const response = await request.POST(obj);
  return response;
};
