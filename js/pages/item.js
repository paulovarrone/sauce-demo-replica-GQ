// ===== Página de detalhe do produto =====

requireLogin();
initHeader();

const id = parseInt(new URLSearchParams(location.search).get("id"), 10);
const product = productById(id);

const notFoundEl = document.querySelector('[data-test="item-not-found"]');
const imgWrap = document.querySelector(".inventory_details_img");
const descWrap = document.querySelector(".inventory_details_desc_container");

if (!product) {
  notFoundEl.hidden = false;
  imgWrap.hidden = true;
  descWrap.hidden = true;
} else {
  const isProblemUser = Session.user === "problem_user";

  const img = document.querySelector('[data-test="item-picture"]');
  img.src = isProblemUser ? "img/broken.svg" : product.img;
  img.alt = product.name;

  document.querySelector('[data-test="inventory-item-name"]').textContent = product.name;
  document.querySelector('[data-test="inventory-item-desc"]').textContent = product.desc;
  document.querySelector('[data-test="inventory-item-price"]').textContent = money(product.price);

  bindCartButton(document.getElementById("cart-btn"), product);
}

window.onAppReset = () => {
  if (product) updateCartButton(document.getElementById("cart-btn"), product);
};
