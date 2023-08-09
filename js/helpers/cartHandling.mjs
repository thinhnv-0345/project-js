import { menuCartDropdownRender } from "../creators/menuCartDropdownRender.mjs";

export const addToCart = (product, quantity, color, size) => {
  const newCartItem = {
    cartItemId: Math.random(),
    product: product,
    quantity: quantity,
    color: color,
    size: size,
  };
  if (!localStorage.getItem("cart")) {
    localStorage.setItem("cart", JSON.stringify([newCartItem]));
  } else {
    const cart = JSON.parse(localStorage.getItem("cart"));
    cart.push(newCartItem);
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  menuCartDropdownRender();

  return newCartItem;
};

export const removeToCart = (cartItemId) => {
  const numOfCartItemE = document.querySelector(".cart__quantity");
  const numOfCartItem = Number(numOfCartItemE.getAttribute("data-num"));
  const cart = JSON.parse(localStorage.getItem("cart"));

  if (cart || cart.length !== 0) {
    const newCart = cart.filter((val) => {
      return val.cartItemId !== cartItemId;
    });
    localStorage.setItem("cart", JSON.stringify(newCart));
  }

  numOfCartItemE.setAttribute("data-num", numOfCartItem - 1);
  numOfCartItemE.textContent = `${numOfCartItem - 1}`;
};
