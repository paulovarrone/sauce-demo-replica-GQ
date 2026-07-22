// ===== Página de inventário (lista de produtos) =====

requireLogin();
initHeader();

const listEl = document.getElementById("lista-produtos");
const template = document.getElementById("modelo-item-produto");
const sortSelect = document.getElementById("seletor-ordenacao");

const sorters = {
  az:   (a, b) => a.name.localeCompare(b.name),
  za:   (a, b) => b.name.localeCompare(a.name),
  lohi: (a, b) => a.price - b.price,
  hilo: (a, b) => b.price - a.price
};

function renderList() {
  const isProblemUser = Session.user === "problem_user";
  const products = [...PRODUCTS].sort(sorters[sortSelect.value]);

  listEl.replaceChildren();
  products.forEach((p) => {
    const node = template.content.cloneNode(true);
    const detailUrl = "inventory-item.html?id=" + p.id;

    node.querySelectorAll(".link-item").forEach((a) => { a.href = detailUrl; });

    const img = node.querySelector("img");
    img.src = isProblemUser ? "img/broken.svg" : p.img;
    img.alt = p.name;

    node.querySelector('[data-test="nome-item"]').textContent = p.name;
    node.querySelector('[data-test="descricao-item"]').textContent = p.desc;
    node.querySelector('[data-test="preco-item"]').textContent = money(p.price);

    bindCartButton(node.querySelector("button"), p);
    listEl.appendChild(node);
  });
}

sortSelect.addEventListener("change", renderList);
window.onAppReset = renderList;
renderList();
