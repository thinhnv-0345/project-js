export const loadingRender = (parentNode) => {
  const loaderHtml = `<div class="loading-box"><div class="lds-ring"><div></div><div></div><div></div><div></div></div></div>`;
  parentNode.insertAdjacentHTML("beforeend", loaderHtml);
};

export const loadingRemove = (parentNode) => {
  if (parentNode.lastChild) {
    parentNode.removeChild(parentNode.lastChild);
  }
};
