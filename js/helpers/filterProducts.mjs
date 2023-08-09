export const filterProducts = (categoryIds) => {
  const products = JSON.parse(localStorage.getItem("products"));
  if (categoryIds.length !== 0) {
    const newProducts = products.filter((product) => {
      let isValid = false;
      categoryIds.forEach((id) => {
        if (id === product.category) {
          isValid = true;
        }
      });

      return isValid;
    });

    return newProducts;
  }

  return products;
};
