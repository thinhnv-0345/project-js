export const searchProductsByTitle = (searchQuery) => {
  const products = JSON.parse(localStorage.getItem("products"));
  const newProducts = products.filter((product) => {
    if (product.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return true;
    }
    return false;
  });

  return newProducts;
};
