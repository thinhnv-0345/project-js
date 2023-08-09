import { addCartModelRender } from "../creators/addCartModalRender.mjs";
import { gridProductsRender } from "../creators/gridProductsRender.mjs";
import { loadingRender } from "../creators/loadingRender.mjs";
import { addToCart } from "../helpers/cartHandling.mjs";
import { fetchProducts } from "../helpers/fetchProducts.mjs";
import { filterProducts } from "../helpers/filterProducts.mjs";
import { getProductWithId } from "../helpers/getProductWithId.mjs";
import { initCart } from "../helpers/initCart.mjs";
import { searchProductsByTitle } from "../helpers/searchProductsByTitle.mjs";

window.addEventListener("load", function (e) {
  const $ = this.document.querySelector.bind(this.document);
  const $$ = this.document.querySelectorAll.bind(this.document);

  const app = {
    initApp: async function () {
      const gridBox = document.querySelector(".product-grid__main .row");
      loadingRender(gridBox);
      try {
        const products = await fetchProducts();
        gridProductsRender(products);

        // init cart
        initCart();
      } catch (err) {
        console.log(err);
      }
    },
    eventListener: async function () {
      document.addEventListener("click", function (e) {
        // filter wwith category click event
        if (e.target.matches(".category-item__wrapper")) {
          e.target.classList.toggle("category-item--active");
          const activeCategories = $$(".category-item--active");
          const categoryIds = [...activeCategories].map((val) => {
            return Number(val.getAttribute("data-id"));
          });
          gridProductsRender(filterProducts(categoryIds));
        }

        // search button click event
        if (e.target.matches(".search__btn")) {
          const activeCategory = document.querySelectorAll(
            ".category-item--active"
          );
          [...activeCategory].forEach((val) => {
            val.classList.remove("category-item--active");
          });
          const searchInput = $("#search");

          if (searchInput.value.trim()) {
            const products = searchProductsByTitle(searchInput.value);
            gridProductsRender(products);
          }

          searchInput.value = "";
        }

        // open modal select option add to cart
        if (e.target.matches(".product-grid__main .btn__add")) {
          const productId =
            e.target.parentNode.parentNode.getAttribute("data-id");
          addCartModelRender(getProductWithId(productId));
        }

        // add to cart submit click event
        if (e.target.matches(".add-modal__submit-btn")) {
          const addModelBox = $(".add-modal__box");
          const productId = addModelBox
            .querySelector(".add-cart__product-into")
            .getAttribute("data-id");
          const colorSelectInput = addModelBox.querySelector("#color-select");
          const sizeSelectInput = addModelBox.querySelector("#size-select");
          const quantityInput = addModelBox.querySelector("#number-input");

          const product = getProductWithId(productId);

          let cartItem;

          if (product.category === 1 || product.category === 4) {
            cartItem = addToCart(product, quantityInput.value, null, null);
          } else {
            cartItem = addToCart(
              product,
              quantityInput.value,
              colorSelectInput.value,
              sizeSelectInput.value
            );
          }

          console.log(cartItem);
        }

        if (e.target.matches(".menu-cart__btn")) {
          window.location.href =
            "http://127.0.0.1:5501/views/shopping-cart.html";
        }
      });

      const searchInput = $("#search");
      let typingTimer;
      let typeInterval = 500;

      searchInput.addEventListener("keyup", function () {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(() => {
          const activeCategory = document.querySelectorAll(
            ".category-item--active"
          );
          [...activeCategory].forEach((val) => {
            val.classList.remove("category-item--active");
          });
          const products = searchProductsByTitle(searchInput.value);
          gridProductsRender(products);
        }, typeInterval);
      });
    },
    run: function () {
      this.initApp();
      this.eventListener();
    },
  };

  app.run();
});
