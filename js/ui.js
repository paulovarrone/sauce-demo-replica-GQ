// ===== Componentes de interface: header, menu lateral, badge e botões de carrinho =====
// Nenhum HTML é gerado aqui — a marcação vive nas páginas; este módulo apenas
// conecta eventos e atualiza texto/classes/atributos.

function initHeader() {
  const burgerBtn = document.getElementById("react-burger-menu-btn");
  const crossBtn = document.getElementById("react-burger-cross-btn");
  const overlay = document.getElementById("bm-overlay");
  const logoutLink = document.getElementById("logout_sidebar_link");
  const resetLink = document.getElementById("reset_sidebar_link");

  if (burgerBtn) burgerBtn.addEventListener("click", () => toggleMenu(true));
  if (crossBtn) crossBtn.addEventListener("click", () => toggleMenu(false));
  if (overlay) overlay.addEventListener("click", () => toggleMenu(false));

  if (logoutLink) {
    logoutLink.addEventListener("click", (e) => {
      e.preventDefault();
      Session.logout();
      window.location.href = "index.html";
    });
  }

  if (resetLink) {
    resetLink.addEventListener("click", (e) => {
      e.preventDefault();
      Cart.clear();
      updateCartBadge();
      if (typeof window.onAppReset === "function") window.onAppReset();
    });
  }

  updateCartBadge();
}

function toggleMenu(open) {
  const menu = document.getElementById("bm-menu");
  const overlay = document.getElementById("bm-overlay");
  if (menu) menu.classList.toggle("open", open);
  if (overlay) overlay.classList.toggle("open", open);
}

function updateCartBadge() {
  const badge = document.querySelector(".shopping_cart_badge");
  if (!badge) return;
  const count = Cart.items.length;
  badge.textContent = count;
  badge.style.display = count > 0 ? "inline-flex" : "none";
}

// Ajusta texto, classes e data-test de um botão Add to cart / Remove
function updateCartButton(btn, product) {
  const inCart = Cart.has(product.id);
  btn.textContent = inCart ? "Remove" : "Add to cart";
  btn.classList.toggle("btn_secondary", inCart);
  btn.classList.toggle("btn_inventory", !inCart);
  const prefix = inCart ? "remove-" : "add-to-cart-";
  btn.setAttribute("data-test", prefix + slugify(product.name));
}

// Conecta o clique de um botão de carrinho a um produto.
// onChange (opcional) é chamado após alternar — útil para redesenhar listas.
function bindCartButton(btn, product, onChange) {
  updateCartButton(btn, product);
  btn.addEventListener("click", () => {
    if (Cart.has(product.id)) Cart.remove(product.id); else Cart.add(product.id);
    updateCartBadge();
    updateCartButton(btn, product);
    if (typeof onChange === "function") onChange();
  });
}
