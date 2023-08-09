export const orderDetailItemRender = () => {
  const orderDetailItemBox = document.querySelector(".order-detail__items");
  const cart = JSON.parse(localStorage.getItem("cart"));
  const orderItemHtmls = cart.map((val) => {
    return `<div class="payment__cart-item-box">
    <img
      class="payment__prod-img order-detail__prod-img"
      src="${val.product.imageUrl}"
      alt="${val.product.title}"
    />
    <div class="payment__cart-item-info">
      <div>
        <h2 class="payment__prod-title order-detail__prod-title">${
          val.product.title
        }</h2>
        <p class="payment__color order-detail__prod-color">${
          val.color ? val.color : ""
        } / ${val.size ? val.size : ""}</p>
      </div>
      <div>
        <p class="payment__prod-price order-detail__prod-price">${
          val.product.price
        }đ</p>
        <p class="payment__quantity order-detail__prod-quantity">
          số lượng: ${val.quantity}
        </p>
      </div>
    </div>
  </div>`;
  });

  orderItemHtmls.forEach((val) => {
    orderDetailItemBox.insertAdjacentHTML("afterbegin", val);
  });
};
