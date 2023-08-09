import { menuCartDropdownRender } from "../creators/menuCartDropdownRender.mjs";

export const initCart = () => {
  const numOfCartItemE = document.querySelector(".cart__quantity");
  if (!localStorage.getItem("cart")) {
    localStorage.setItem("cart", JSON.stringify([]));
    numOfCartItemE.setAttribute("data-num", 0);
    numOfCartItemE.textContent = "0";
  } else {
    const cart = JSON.parse(localStorage.getItem("cart"));
    numOfCartItemE.setAttribute("data-num", cart.length);
    numOfCartItemE.textContent = cart.length;
  }
  menuCartDropdownRender();
};
