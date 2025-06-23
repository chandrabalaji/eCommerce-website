import { API_ROUTES } from "../../constant";
import { Axios } from "./RESTApi";

export const getCategories = async () => {
  try {
    const { data } = await Axios.get(API_ROUTES.CATEGORIES);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const postCategory = async (params) => {
  try {
    const res = await Axios.post(API_ROUTES.CATEGORIES, params);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const updateCategory = async (params) => {
  try {
    const res = await Axios.put(
      `${API_ROUTES.CATEGORIES}/${params?.id}`,
      params
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const deleteCategory = async (id) => {
  try {
    const res = await Axios.delete(`${API_ROUTES.CATEGORIES}/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

/*  */

export const getProducts = async (params) => {
  try {
    const { data } = await Axios.get(
      `${API_ROUTES.PRODUCTS}?limit=${params.limit}&offset=${params.offset}`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getTodayDeals = async () => {
  try {
    const { data } = await Axios.get(`${API_ROUTES.PRODUCTS}/today_deals`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getProductById = async (id) => {
  try {
    const { data } = await Axios.get(`${API_ROUTES.PRODUCTS}/${id}`);
    console.log(data);

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getProductByCategoryId = async (id) => {
  try {
    const { data } = await Axios.get(`${API_ROUTES.PRODUCTS}/category/${id}`);
    console.log(data);

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const postProduct = async (params) => {
  try {
    const res = await Axios.post(API_ROUTES.PRODUCTS, params, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = async (params, id) => {
  try {
    const res = await Axios.put(`${API_ROUTES.PRODUCTS}/${id}`, params, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = async (id) => {
  try {
    const res = await Axios.delete(`${API_ROUTES.PRODUCTS}/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

/* COMBO PRODUCTS */

export const postCombo = async (params) => {
  try {
    const res = await Axios.post(API_ROUTES.COMBO, params);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const updateCombo = async (params) => {
  try {
    const res = await Axios.put(API_ROUTES.COMBO, params);
    return res;
  } catch (error) {
    console.log(error);
  }
};
