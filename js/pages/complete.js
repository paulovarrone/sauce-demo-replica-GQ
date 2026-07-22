// ===== Checkout, etapa final: pedido concluído =====

requireLogin();
initHeader();

// Exibe o número do pedido registrado no fechamento da compra
const pedido = JSON.parse(sessionStorage.getItem("ultimo-pedido") || "null");
const numeroEl = document.getElementById("numero-pedido");

if (pedido && numeroEl) {
  numeroEl.textContent = "#" + pedido.numero;
}
