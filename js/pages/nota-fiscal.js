// ===== Nota fiscal (documento fictício para prática de testes) =====

requireLogin();

const pedido = JSON.parse(sessionStorage.getItem("ultimo-pedido") || "null");

const notaEl = document.getElementById("nota-fiscal");
const semPedidoEl = document.getElementById("pedido-nao-encontrado");

if (!pedido) {
  notaEl.hidden = true;
  semPedidoEl.hidden = false;
} else {
  document.getElementById("numero-pedido").textContent = pedido.numero;
  document.getElementById("data-emissao").textContent = pedido.data + " " + pedido.hora;

  const cliente = pedido.cliente || {};
  document.getElementById("cliente-nome").textContent =
    [cliente.first, cliente.last].filter(Boolean).join(" ") || "Não informado";
  document.getElementById("cliente-cep").textContent = "CEP: " + (cliente.postal || "—");

  const tbody = document.getElementById("itens-nota");
  const template = document.getElementById("modelo-linha-item");

  pedido.itens.forEach((item, i) => {
    const node = template.content.cloneNode(true);
    node.querySelector('[data-test="linha-numero"]').textContent = i + 1;
    node.querySelector('[data-test="linha-descricao"]').textContent = item.nome;
    node.querySelector('[data-test="linha-valor"]').textContent = money(item.preco);
    tbody.appendChild(node);
  });

  document.getElementById("nota-subtotal").textContent = "Subtotal: " + money(pedido.subtotal);
  document.getElementById("nota-imposto").textContent = "Impostos (8%): " + money(pedido.imposto);
  document.getElementById("nota-total").textContent = "Total: " + money(pedido.total);
}

// "Baixar PDF" abre o diálogo de impressão do navegador (Salvar como PDF)
document.getElementById("botao-baixar-pdf").addEventListener("click", () => {
  window.print();
});
