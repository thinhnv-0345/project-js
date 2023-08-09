import { orderDetailItemRender } from "../creators/orderDetailItemRender.mjs";
import { orderItemRender } from "../creators/orderItemRender.mjs";
import { cartTotalPrice } from "../helpers/cartTotalPrice.mjs";
import { nextPaymentProgress } from "../helpers/nextPaymentProgress.mjs";
import Http from "../helpers/http.mjs";

window.addEventListener("load", function (e) {
  const $ = this.document.querySelector.bind(this.document);
  const $$ = this.document.querySelectorAll.bind(this.document);

  let customer;
  let paymentInfo;

  const app = {
    initApp: async function () {
      orderItemRender();
      orderDetailItemRender();
    },
    eventListener: async function () {
      const orderInfoForm = $(".order-info__form");
      const paymentMethodForm = $(".payment__method-form");

      // click event
      document.addEventListener("click", function (e) {
        if (e.target.matches(".products-confirm__btn")) {
          nextPaymentProgress(3);
        }
        if (e.target.matches(".order-detail__confirm-btn")) {
          const progressBar = document.querySelector(".payment__progress-bar");
          progressBar.setAttribute("style", "width: 100%");
          progressBar.textContent = "100%";

          const cart = JSON.parse(localStorage.getItem("cart"));

          Http.post("customers", {
            name: customer.name,
            email: customer.email,
            address: customer.address,
            phoneNumber: customer.phone,
          })
            .then((customer) => {
              console.log(customer);
              return Http.post("orders", {
                customerId: customer.id,
                paymentMethod: paymentInfo.method,
                paymentDes: paymentInfo.description
                  ? paymentInfo.description
                  : "no des",
              });
            })
            .then((order) => {
              console.log(order);
              if (order) {
                console.log(order);
                alert(`Bạn đã đặt hàng thành công, mã đơn hàng: ${order.id}`);
                localStorage.setItem("cart", JSON.stringify([]));
                window.location.href = "http://127.0.0.1:5501/views/grid.html";
              }
            })
            .catch((err) => console.log(err));
        }
      });

      //order info form submit event
      orderInfoForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const customerInfo = {
          name: e.target.elements["customer-name"].value,
          email: e.target.elements["customer-email"].value,
          address: e.target.elements["customer-address"].value,
          phone: e.target.elements["customer-phone"].value,
        };
        customer = customerInfo;
        e.target.reset();
        nextPaymentProgress(2);
      });

      // payment method form submit event
      paymentMethodForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const method = e.target.elements["method-select"].value;
        const bankName = e.target.elements["payment-bank-name"].value;
        const bankNumber = e.target.elements["payment-bank-num"].value;
        const orderCustomerInfo = $(".order-detail__customer-info");
        const orderPaymentInfo = $(".order-detail__payment");

        if (method === "BANKING") {
          paymentInfo = {
            method: method,
            description: `${bankName} / ${bankNumber}`,
            bankName: bankName,
            bankNum: bankNumber,
          };
        } else {
          paymentInfo = {
            method: method,
          };
        }

        const customerInfoHtml = `<p class="customer-info__name"><strong>Name:</strong> ${customer.name}</p>
        <p class="customer-info__phone">
          <strong>Phone nuber:</strong> ${customer.phone}
        </p>
        <p class="customer-info__email">
          <strong>Email:</strong> ${customer.email}
        </p>
        <p class="customer-info__address">
          <strong>Address:</strong> ${customer.address}
        </p>`;
        orderCustomerInfo.insertAdjacentHTML("afterbegin", customerInfoHtml);

        const orderPaymentInfoHtml = `<div class="paymentt__info">
        <p class="paymentt__method">
          <strong>Phương thức thanh toán:</strong> ${
            method === "COD"
              ? "Thanh toán trực tiếp khi nhận hàng"
              : "Thanh toán bằng tài khoản ngân hàng"
          }
        </p>
        <p class="paymentt__bank-name">
          <strong>Ngân hàng:</strong> ${bankName ? bankName : ""}
        </p>
        <p class="paymentt__bank-num">
          <strong>Số tài khoản:</strong> ${bankNumber ? bankNumber : ""}
        </p>
      </div>
      <div class="paymentt__total">
        <p class="paymentt__total-title">Total:</p>
        <p class="paymentt__total-price">${cartTotalPrice()}đ</p>
      </div>`;
        orderPaymentInfo.insertAdjacentHTML("afterbegin", orderPaymentInfoHtml);

        nextPaymentProgress(4);
      });
    },
    run: function () {
      this.initApp();
      this.eventListener();
    },
  };

  app.run();
});
