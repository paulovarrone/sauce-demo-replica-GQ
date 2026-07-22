// ===== Checkout, etapa 1: dados do comprador =====

requireLogin();
initHeader();

const fields = ["first-name", "last-name", "postal-code"].map((id) => document.getElementById(id));
const errorBox = document.querySelector(".error-message-container");
const errorText = document.getElementById("error-text");

function showError(msg) {
  errorText.textContent = "Error: " + msg;
  errorBox.classList.add("visible");
  fields.forEach((f) => f.classList.add("input_error"));
}

function clearError() {
  errorBox.classList.remove("visible");
  fields.forEach((f) => f.classList.remove("input_error"));
}

document.getElementById("error-close").addEventListener("click", clearError);

document.getElementById("checkout-form").addEventListener("submit", (e) => {
  e.preventDefault();
  clearError();
  const [first, last, postal] = fields.map((f) => f.value.trim());

  if (!first)  return showError("First Name is required");
  if (!last)   return showError("Last Name is required");
  if (!postal) return showError("Postal Code is required");

  sessionStorage.setItem("checkout-info", JSON.stringify({ first, last, postal }));
  window.location.href = "checkout-step-two.html";
});
