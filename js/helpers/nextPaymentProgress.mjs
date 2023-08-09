export const nextPaymentProgress = (numOfProgress) => {
  const paymentProgress = document.querySelectorAll(".payment__content-item");
  const paymentTitle = document.querySelectorAll(".payment__item");
  const progressBar = document.querySelector(".payment__progress-bar");

  const oldProgress = [...paymentProgress].find((val) => {
    return Number(val.getAttribute("data-id")) === numOfProgress - 1;
  });
  const oldPaymentTitle = [...paymentTitle].find((val) => {
    return Number(val.getAttribute("data-id")) === numOfProgress - 1;
  });

  const nextProgress = [...paymentProgress].find((val) => {
    return Number(val.getAttribute("data-id")) === numOfProgress;
  });
  const nextPaymentTitle = [...paymentTitle].find((val) => {
    return Number(val.getAttribute("data-id")) === numOfProgress;
  });

  oldPaymentTitle.classList.remove("payment__item--active");
  oldPaymentTitle.classList.add("payment__item--done");
  nextPaymentTitle.classList.add("payment__item--active");

  if (numOfProgress === 2) {
    progressBar.setAttribute("style", "width: 25%");
    progressBar.textContent = "25%";
  } else if (numOfProgress === 3) {
    progressBar.setAttribute("style", "width: 50%");
    progressBar.textContent = "50%";
  } else {
    progressBar.setAttribute("style", "width: 75%");
    progressBar.textContent = "75%";
  }

  oldProgress.classList.add("hidden");
  nextProgress.classList.remove("hidden");
};
