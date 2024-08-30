import * as request from "../utils/request";

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
