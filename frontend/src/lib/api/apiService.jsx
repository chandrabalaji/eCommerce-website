import { API_ROUTES } from "../../constant";
import { Axios } from "./RESTApi";

export const getCategories = async () => {
  try {
    const { data } = await Axios.get(API_ROUTES.CATEGORIES);
    return data;
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
