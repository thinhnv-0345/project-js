export const menuCartDropdownRender = () => {
  // const cartMenu = document.querySelector(".cart-menu__items");
  const cartMenuBox = document.querySelector(".cart-menu__items-box");
  const cartTotal = document.querySelector(".cart-menu__total-num");
  const cartTotalItem = document.querySelector(".cart__quantity");
  const cart = JSON.parse(localStorage.getItem("cart"));

  while (cartMenuBox.firstChild) {
    cartMenuBox.removeChild(cartMenuBox.firstChild);
  }

  const cartItemShortCutsHtml = cart.map((val) => {
    return `<div class="cart-dropdown">
    <img
      class="cart-dropdown__img"
      src="${val.product.imageUrl}"
      alt="${val.product.title}"
    />
    <div class="item__info cart-dropdown__info">
      <p class="item__title cart-dropdown__title">${val.product.title}</p>
      <div class="cart-dropdown__price-box">
        <p class="item__price cart-dropdown__price">${val.product.price}đ</p>
        <p class="cart-dropdown__quantity">x${val.quantity}</p>
      </div>
    </div>
  </div>`;
  });

  // update total cart item
  cartTotalItem.textContent = cart.length;
  // update total price
  const array = cart.map((val) => {
    return Number(val.product.price) * Number(val.quantity);
  });

  const total = array.reduce((prev, curr) => {
    return prev + curr;
  }, 0);

  cartTotal.textContent = `${total}đ`;

  if (cart.length > 3) {
    const moreHtml = `<a href="http://127.0.0.1:5501/views/shopping-cart.html" class="cart-menu__more">more...</a>`;
    cartMenuBox.insertAdjacentHTML("afterbegin", moreHtml);
  }

  cartItemShortCutsHtml.forEach((val, index) => {
    if (index < 3) {
      cartMenuBox.insertAdjacentHTML("afterbegin", val);
    }
  });
};
