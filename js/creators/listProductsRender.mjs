import { loadingRemove, loadingRender } from "./loadingRender.mjs";

export const listProductsRender = (products) => {
  const listBox = document.querySelector(".product-list__main .row");
  while (listBox.firstChild) {
    console.log(listBox.firstChild);
    if (listBox.firstChild.getAttribute("class") === "loading-box") {
      break;
    }
    listBox.removeChild(listBox.firstChild);
  }
  const loadingElement = listBox.querySelector(".loading-box");
  if (!loadingElement) {
    loadingRender(listBox);
  }
  const productsHtml = products.map((val) => {
    if (val.category === 1) val.category = "MỸ PHẨM";
    if (val.category === 2) val.category = "TRANG SỨC";
    if (val.category === 3) val.category = "PHỤ KIỆN";
    if (val.category === 4) val.category = "NƯỚC HOA";
    return `<div class="proditem-list col-12">
    <img
      class="proditem-list__image"
      src="${val.imageUrl}"
      alt="product"
    />
    <div class="proditem-list__content-box">
      <h4 class="proditem-list__title">${val.title}</h4>
      <div class="proditem-list__sold">
        <div class="sold__heart-icon">
          <i class="fa-solid fa-heart"></i
          ><i class="fa-solid fa-heart"></i
          ><i class="fa-solid fa-heart"></i
          ><i class="fa-solid fa-heart"></i
          ><i class="fa-solid fa-heart"></i>
        </div>
        <p class="sold_quantity">( ${val.numOfSold} lượt mua )</p>
      </div>
      <div class="proditem-list__des">${val.description}</div>
      <div class="proditem-list__price">${val.price}đ</div>
      <div class="product__btn-box">
        <button class="btn btn-outline-dark btn__add">
          MUA HÀNG
        </button>
        <button class="btn btn__like">
          <i class="fa-solid fa-heart"></i>
        </button>
        <button class="btn btn-outline-dark btn__load">
          <i class="fa-solid fa-rotate"></i>
        </button>
      </div>
    </div>
  </div>`;
  });

  setTimeout(() => {
    loadingRemove(listBox);

    if (products.length !== 0) {
      productsHtml.forEach((val) => {
        listBox.insertAdjacentHTML("beforeend", val);
      });
    } else {
      listBox.insertAdjacentHTML(
        "beforeend",
        `<p class="product-filter__not-found">Không tìm thấy sản phẩm nào!</p>`
      );
    }
  }, 500);
};
