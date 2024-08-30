import axios from "axios";

const request = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export const GET = async ({ path, token, params, headers }) => {
  const config = {
    headers: {
      ...headers,
      Authorization: token ? "Bearer " + token : undefined,
    },
    params,
  };
  try {
    const response = await request.get(path, config);
    return response;
  } catch (err) {
    return err;
  }
};

export const POST = async ({ path, token, body, params, headers }) => {
  const config = {
    headers: {
      ...headers,
      Authorization: token ? "Bearer " + token : undefined,
    },
    params,
  };

  try {
    const response = await request.post(path, body, config);
    return response;
  } catch (err) {
    return err;
  }
};

export const DELETE = async ({ path, token, headers }) => {
  const config = {
    headers: {
      ...headers,
      Authorization: token ? "Bearer " + token : undefined,
    },
  };
  try {
    const response = await request.delete(path, config);
    return response;
  } catch (err) {
    return err;
  }
};

export const PUT = async ({ path, token, headers, body }) => {
  const config = {
    headers: {
      ...headers,
      Authorization: token ? "Bearer " + token : undefined,
    },
  };
  try {
    const response = await request.put(path, body, config);
    return response;
  } catch (err) {
    return err;
  }
};

export default request;
