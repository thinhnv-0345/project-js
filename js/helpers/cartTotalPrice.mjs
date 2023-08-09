export const cartTotalPrice = () => {
  const cart = JSON.parse(localStorage.getItem("cart"));
  const array = cart.map((val) => {
    return Number(val.product.price) * Number(val.quantity);
  });

  const total = array.reduce((prev, curr) => {
    return prev + curr;
  }, 0);

  return total;
};
