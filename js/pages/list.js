import { listProductsRender } from "../creators/listProductsRender.mjs";
import { loadingRender } from "../creators/loadingRender.mjs";
import { fetchProducts } from "../helpers/fetchProducts.mjs";
import { filterProducts } from "../helpers/filterProducts.mjs";
import { searchProductsByTitle } from "../helpers/searchProductsByTitle.mjs";

window.addEventListener("load", function (e) {
  const $ = this.document.querySelector.bind(this.document);
  const $$ = this.document.querySelectorAll.bind(this.document);

  let products = [];

  const app = {
    initApp: async function () {
      const listBox = document.querySelector(".product-list__main .row");
      loadingRender(listBox);
      try {
        const products = await fetchProducts();
        listProductsRender(products);
      } catch (err) {
        console.log(err);
      }
    },
    eventListener: async function () {
      document.addEventListener("click", function (e) {
        console.log(e.target);
        if (e.target.matches(".category-item__wrapper")) {
          e.target.classList.toggle("category-item--active");
          const activeCategories = $$(".category-item--active");
          const categoryIds = [...activeCategories].map((val) => {
            return Number(val.getAttribute("data-id"));
          });
          listProductsRender(filterProducts(categoryIds));
        }

        if (e.target.matches(".search__btn")) {
          const activeCategory = document.querySelectorAll(
            ".category-item--active"
          );
          [...activeCategory].forEach((val) => {
            val.classList.remove("category-item--active");
          });
          const searchInput = $("#search");

          const products = searchProductsByTitle(searchInput.value);
          listProductsRender(products);

          searchInput.value = "";
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
          listProductsRender(products);
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
