import { cartTableRender } from "../creators/cartTableRender.mjs";
import { menuCartDropdownRender } from "../creators/menuCartDropdownRender.mjs";
import { getProductWithId } from "../helpers/getProductWithId.mjs";
import { initCart } from "../helpers/initCart.mjs";

window.addEventListener("load", function (e) {
  const $ = this.document.querySelector.bind(this.document);
  const $$ = this.document.querySelectorAll.bind(this.document);

  const app = {
    initApp: async function () {
      initCart();
      cartTableRender();
    },
    eventListener: async function () {
      document.addEventListener("click", function (e) {
        if (e.target.matches(".cart-item__delete-box i")) {
          const cartTotalPrice = document.querySelector(".cart-total__price");
          const tableRow = e.target.parentNode.parentNode.parentNode;
          const cartItemQuantity = tableRow.querySelector(
            ".cart-item__quantity"
          );

          const product = getProductWithId(tableRow.getAttribute("data-id"));
          const quantity = Number(cartItemQuantity.textContent);
          const oldTotalPrice = Number(cartTotalPrice.getAttribute("data-num"));

          if (tableRow.classList.contains("cart-item--delete")) {
            cartTotalPrice.setAttribute(
              "data-num",
              oldTotalPrice + Number(product.price) * quantity
            );
            cartTotalPrice.textContent = `${
              oldTotalPrice + Number(product.price) * quantity
            }đ`;
            tableRow.classList.remove("cart-item--delete");
          } else {
            cartTotalPrice.setAttribute(
              "data-num",
              oldTotalPrice - Number(product.price) * quantity
            );
            cartTotalPrice.textContent = `${
              oldTotalPrice - Number(product.price) * quantity
            }đ`;
            tableRow.classList.add("cart-item--delete");
          }
        }

        if (e.target.matches(".cart-btn__update")) {
          const deleteItems = $$(".cart-item--delete");
          const deleteItemIds = [...deleteItems].map((val) => {
            return Number(val.getAttribute("data-itemid"));
          });

          const cart = JSON.parse(localStorage.getItem("cart"));
          let newCart = cart;
          deleteItemIds.forEach((val) => {
            newCart = newCart.filter((item) => item.cartItemId !== val);
          });

          if (confirm("Bạn muốn xóa các sản phẩm đã chọn ??")) {
            localStorage.setItem("cart", JSON.stringify(newCart));
            cartTableRender();
            menuCartDropdownRender();
          }
        }

        if (e.target.matches(".cart-btn__delete")) {
          if (confirm("Bạn muốn xóa hết tất cả sản phẩm ??")) {
            localStorage.setItem("cart", JSON.stringify([]));
            cartTableRender();
            menuCartDropdownRender();
          }
        }

        if (e.target.matches(".cart-btn__pay")) {
          window.location.href = "http://127.0.0.1:5501/views/payment.html";
        }
      });
    },
    run: function () {
      this.initApp();
      this.eventListener();
    },
  };

  app.run();
});
