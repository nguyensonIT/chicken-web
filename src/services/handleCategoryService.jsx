import * as request from "../utils/request";

const token = localStorage.getItem("authToken");

export const getAllCategory = async () => {
  const obj = {
    path: "category",
    token,
  };

  const response = await request.GET(obj);
  return response;
};

export const createCategory = async (token, name) => {
  const obj = {
    path: "category",
    token: token,
    body: {
      nameCategory: name,
    },
  };

  const response = await request.POST(obj);
  return response;
};

export const updateCategory = async ({ id, body }) => {
  const obj = {
    path: `category/${id}`,
    token,
    body,
  };

  const response = await request.PUT(obj);
  return response;
};

export const deleteCategory = async (id) => {
  const obj = {
    path: `category/${id}`,
    token,
  };

  const response = await request.DELETE(obj);
  return response;
};

export const reorderCategories = async ({ body }) => {
  const obj = {
    path: `category/reorder-categories`,
    token,
    body,
  };

  const response = await request.PUT(obj);
  return response;
};
