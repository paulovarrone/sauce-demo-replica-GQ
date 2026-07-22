// ===== Checkout, etapa 2: resumo do pedido =====

requireLogin();
initHeader();

const listEl = document.getElementById("cart-list");
const template = document.getElementById("overview-item-template");

const items = Cart.items.map(productById).filter(Boolean);

items.forEach((p) => {
  const node = template.content.cloneNode(true);

  const nameLink = node.querySelector('[data-test="inventory-item-name"]');
  nameLink.href = "inventory-item.html?id=" + p.id;
  nameLink.textContent = p.name;

  node.querySelector('[data-test="inventory-item-desc"]').textContent = p.desc;
  node.querySelector('[data-test="inventory-item-price"]').textContent = money(p.price);

  listEl.appendChild(node);
});

const subtotal = items.reduce((sum, p) => sum + p.price, 0);
const tax = Math.round(subtotal * TAX_RATE * 100) / 100;

document.getElementById("subtotal").textContent = "Item total: " + money(subtotal);
document.getElementById("tax").textContent = "Tax: " + money(tax);
document.getElementById("total").textContent = "Total: " + money(subtotal + tax);

document.getElementById("finish").addEventListener("click", () => {
  Cart.clear();
  sessionStorage.removeItem("checkout-info");
  window.location.href = "checkout-complete.html";
});
