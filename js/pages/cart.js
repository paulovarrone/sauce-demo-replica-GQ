// ===== Página do carrinho =====

requireLogin();
initHeader();

const listEl = document.getElementById("cart-list");
const template = document.getElementById("cart-item-template");
const emptyMsg = document.querySelector('[data-test="cart-empty"]');

function renderCart() {
  const items = Cart.items.map(productById).filter(Boolean);

  emptyMsg.hidden = items.length > 0;
  listEl.replaceChildren();

  items.forEach((p) => {
    const node = template.content.cloneNode(true);

    const nameLink = node.querySelector('[data-test="inventory-item-name"]');
    nameLink.href = "inventory-item.html?id=" + p.id;
    nameLink.textContent = p.name;

    node.querySelector('[data-test="inventory-item-desc"]').textContent = p.desc;
    node.querySelector('[data-test="inventory-item-price"]').textContent = money(p.price);

    // Ao remover, redesenha a lista inteira
    bindCartButton(node.querySelector("button"), p, renderCart);
    listEl.appendChild(node);
  });
}

window.onAppReset = renderCart;
renderCart();
