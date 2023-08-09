export const cartTableRender = () => {
  const cart = JSON.parse(localStorage.getItem("cart"));
  const cartTableBody = document.querySelector(".cart-table__body");
  const cartTotalPrice = document.querySelector(".cart-total__price");

  while (cartTableBody.lastChild) {
    cartTableBody.removeChild(cartTableBody.lastChild);
  }

  const tableRowHtml = cart.map((val) => {
    return `<tr class="cart-table__row" data-id="${
      val.product.id
    }" data-itemid="${val.cartItemId}">
    <td class="d-flex justify-content-center">
      <img
        class="cart-item__image"
        src="${val.product.imageUrl}"
        alt="${val.product.title}"
      />
    </td>
    <td>
      <div class="cart-item__box">
        <p class="cart-item__info-title">${val.product.title}</p>
        <p class="cart-item__info">${val.color ? val.color : ""}</p>
        <p class="cart-item__info">${val.size ? val.size : ""}</p>
      </div>
    </td>
    <td>
      <p class="cart-item__box">
        ${val.product.price}đ 
      </p>
    </td>
    <td class="cart-item__quantity">
      <p class="cart-item__box">
        ${val.quantity}
      </p>
    </td>
    <td>
      <p class="cart-item__box">
        ${Number(val.product.price) * Number(val.quantity)}đ
      </p>
    </td>
    <td class="cart-item__delete-box">
      <div class="cart-item__box">
        <i class="fa-solid fa-trash-can"></i>
      </div>
    </td>
  </tr>`;
  });

  const array = cart.map((val) => {
    return Number(val.product.price) * Number(val.quantity);
  });

  const total = array.reduce((prev, curr) => {
    return prev + curr;
  }, 0);

  cartTotalPrice.textContent = `${total}đ`;
  cartTotalPrice.setAttribute("data-num", total);

  tableRowHtml.forEach((val) => {
    cartTableBody.insertAdjacentHTML("beforeend", val);
  });
};
