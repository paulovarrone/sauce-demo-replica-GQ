// ===== Página do carrinho =====

requireLogin();
initHeader();

const listEl = document.getElementById("lista-carrinho");
const template = document.getElementById("modelo-item-carrinho");
const emptyMsg = document.getElementById("carrinho-vazio");

function renderCart() {
  const items = Cart.items.map(productById).filter(Boolean);

  emptyMsg.hidden = items.length > 0;
  listEl.replaceChildren();

  items.forEach((p) => {
    const node = template.content.cloneNode(true);

    const nameLink = node.querySelector('[data-test="nome-item"]');
    nameLink.href = "inventory-item.html?id=" + p.id;
    nameLink.textContent = p.name;

    node.querySelector('[data-test="descricao-item"]').textContent = p.desc;
    node.querySelector('[data-test="preco-item"]').textContent = money(p.price);

    // Ao remover, redesenha a lista inteira
    bindCartButton(node.querySelector("button"), p, renderCart);
    listEl.appendChild(node);
  });
}

window.onAppReset = renderCart;
renderCart();
