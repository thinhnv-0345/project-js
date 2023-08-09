import { loadingRemove, loadingRender } from "./loadingRender.mjs";

export const gridProductsRender = (products) => {
  const gridBox = document.querySelector(".product-grid__main .row");
  while (gridBox.firstChild) {
    console.log(gridBox.firstChild);
    if (gridBox.firstChild.getAttribute("class") === "loading-box") {
      break;
    }
    gridBox.removeChild(gridBox.firstChild);
  }
  const loadingElement = gridBox.querySelector(".loading-box");
  if (!loadingElement) {
    loadingRender(gridBox);
  }
  const productsHtml = products.map((val) => {
    if (val.category === 1) val.category = "MỸ PHẨM";
    if (val.category === 2) val.category = "TRANG SỨC";
    if (val.category === 3) val.category = "PHỤ KIỆN";
    if (val.category === 4) val.category = "NƯỚC HOA";
    return `<div class="product col-6 col-md-4" data-id="${val.id}">
    <img
      class="product__image"
      src="${val.imageUrl}"
      alt="product"
    />
    <h5 class="product__tag">${val.category}</h5>
    <h3 class="product__name">${val.title}</h3>
    <img class="product__line" />
    <p class="product__price">
      ${val.price}đ<span class="product__sub-price">450.000đ</span>
    </p>
    <div class="product__btn-box">
      <button class="btn btn-outline-dark btn__add" data-bs-toggle="modal" data-bs-target="#addCartModal">
        MUA HÀNG
      </button>
      <button class="btn btn__like">
        <i class="fa-solid fa-heart"></i>
      </button>
      <button class="btn btn-outline-dark btn__load">
        <i class="fa-solid fa-rotate"></i>
      </button>
    </div>
  </div>`;
  });

  setTimeout(() => {
    loadingRemove(gridBox);

    if (products.length !== 0) {
      productsHtml.forEach((val) => {
        gridBox.insertAdjacentHTML("beforeend", val);
      });
    } else {
      gridBox.insertAdjacentHTML(
        "beforeend",
        `<p class="product-filter__not-found">Không tìm thấy sản phẩm nào!</p>`
      );
    }
  }, 500);
};
