// ===== Checkout, etapa 2: resumo do pedido =====

requireLogin();
initHeader();

const listEl = document.getElementById("lista-resumo");
const template = document.getElementById("modelo-item-resumo");

const items = Cart.items.map(productById).filter(Boolean);

items.forEach((p) => {
  const node = template.content.cloneNode(true);

  const nameLink = node.querySelector('[data-test="nome-item"]');
  nameLink.href = "inventory-item.html?id=" + p.id;
  nameLink.textContent = p.name;

  node.querySelector('[data-test="descricao-item"]').textContent = p.desc;
  node.querySelector('[data-test="preco-item"]').textContent = money(p.price);

  listEl.appendChild(node);
});

const subtotal = items.reduce((sum, p) => sum + p.price, 0);
const tax = Math.round(subtotal * TAX_RATE * 100) / 100;

document.getElementById("valor-subtotal").textContent = "Item total: " + money(subtotal);
document.getElementById("valor-imposto").textContent = "Tax: " + money(tax);
document.getElementById("valor-total").textContent = "Total: " + money(subtotal + tax);

document.getElementById("botao-finalizar").addEventListener("click", () => {
  Cart.clear();
  sessionStorage.removeItem("checkout-info");
  window.location.href = "checkout-complete.html";
});
