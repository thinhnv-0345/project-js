export const addCartModelRender = (product) => {
  const addCartModel = document.querySelector(
    ".add-modal__box .add-modal__body"
  );

  if (product.category === 1 || product.category === 4) {
    addCartModel.querySelector(".select-input__color").classList.add("hidden");
    addCartModel.querySelector(".select-input__size").classList.add("hidden");
  } else {
    addCartModel
      .querySelector(".select-input__color")
      .classList.remove("hidden");
    addCartModel
      .querySelector(".select-input__size")
      .classList.remove("hidden");
  }

  if (product.category === 1) product.category = "MỸ PHẨM";
  if (product.category === 2) product.category = "TRANG SỨC";
  if (product.category === 3) product.category = "PHỤ KIỆN";
  if (product.category === 4) product.category = "NƯỚC HOA";

  const productInfoHtml = `<div class="add-cart__product-into" data-id="${product.id}">
          <img
            class="add-cart__product-image"
            src="${product.imageUrl}"
            alt="product"
          />
          <div class="add-cart__product-info-box">
            <h5 class="add-cart__product-tag">${product.category}</h5>
            <h3 class="add-cart__product-title">${product.title}</h3>
            <p class="add-cart__product-price">
              ${product.price}đ
            </p>
          </div>
          </div>`;

  if (addCartModel.querySelector(".add-cart__product-into")) {
    addCartModel.removeChild(
      addCartModel.querySelector(".add-cart__product-into")
    );
  }
  addCartModel.insertAdjacentHTML("afterbegin", productInfoHtml);
};
