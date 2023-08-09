export const orderItemRender = () => {
  const orderItemBox = document.querySelector(".payment__products-confirm");
  const cart = JSON.parse(localStorage.getItem("cart"));
  const orderItemHtmls = cart.map((val) => {
    return `<div class="payment__cart-item-box">
    <img
      class="payment__prod-img"
      src="${val.product.imageUrl}"
      alt="${val.product.title}"
    />
    <div class="payment__cart-item-info">
      <div>
        <h2 class="payment__prod-title">${val.product.title}</h2>
        <p class="payment__color">${val.color ? val.color : ""} / ${
      val.size ? val.size : ""
    }</p>
      </div>
      <div>
        <p class="payment__prod-price">${val.product.price}đ</p>
        <p class="payment__quantity">số lượng: ${val.quantity}</p>
      </div>
    </div>
  </div>`;
  });

  orderItemHtmls.forEach((val) => {
    orderItemBox.insertAdjacentHTML("afterbegin", val);
  });
};
