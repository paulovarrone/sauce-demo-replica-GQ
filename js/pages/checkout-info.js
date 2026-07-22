// ===== Checkout, etapa 1: dados do comprador =====

requireLogin();
initHeader();

const fields = ["campo-nome", "campo-sobrenome", "campo-cep"].map((id) => document.getElementById(id));
const errorBox = document.getElementById("container-erro");
const errorText = document.getElementById("texto-erro");

function showError(msg) {
  errorText.textContent = "Error: " + msg;
  errorBox.classList.add("visible");
  fields.forEach((f) => f.classList.add("input_error"));
}

function clearError() {
  errorBox.classList.remove("visible");
  fields.forEach((f) => f.classList.remove("input_error"));
}

document.getElementById("botao-fechar-erro").addEventListener("click", clearError);

document.getElementById("form-checkout").addEventListener("submit", (e) => {
  e.preventDefault();
  clearError();
  const [first, last, postal] = fields.map((f) => f.value.trim());

  if (!first)  return showError("First Name is required");
  if (!last)   return showError("Last Name is required");
  if (!postal) return showError("Postal Code is required");

  sessionStorage.setItem("checkout-info", JSON.stringify({ first, last, postal }));
  window.location.href = "checkout-step-two.html";
});
