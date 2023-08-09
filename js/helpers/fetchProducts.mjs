import Http from "./http.mjs";

export const fetchProducts = async () => {
  try {
    const products = await Http.get("products");
    if (products) {
      localStorage.setItem("products", JSON.stringify(products));
    }
    return products;
  } catch (error) {
    throw error;
  }
};
