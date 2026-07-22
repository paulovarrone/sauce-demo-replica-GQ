// ===== Página de login =====

const form = document.getElementById("login-form");
const userInput = document.getElementById("user-name");
const passInput = document.getElementById("password");
const errorBox = document.querySelector(".error-message-container");
const errorText = document.getElementById("error-text");
const errorClose = document.getElementById("error-close");
const loginBtn = document.getElementById("login-button");

function showError(msg) {
  errorText.textContent = "Epic sadface: " + msg;
  errorBox.classList.add("visible");
  userInput.classList.add("input_error");
  passInput.classList.add("input_error");
}

function clearError() {
  errorBox.classList.remove("visible");
  userInput.classList.remove("input_error");
  passInput.classList.remove("input_error");
}

errorClose.addEventListener("click", clearError);

// Mensagem quando o usuário é redirecionado sem sessão ativa
if (new URLSearchParams(location.search).get("error") === "auth") {
  showError("You can only access '/inventory.html' when you are logged in.");
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  clearError();
  const user = userInput.value.trim();
  const pass = passInput.value;

  if (!user) return showError("Username is required");
  if (!pass) return showError("Password is required");

  if (!VALID_USERS.includes(user) || pass !== VALID_PASSWORD) {
    return showError("Username and password do not match any user in this service");
  }
  if (user === "locked_out_user") {
    return showError("Sorry, this user has been locked out.");
  }

  Session.login(user);

  // performance_glitch_user: simula lentidão de ~5s
  const delay = user === "performance_glitch_user" ? 5000 : 0;
  if (delay) {
    loginBtn.value = "Loading...";
    loginBtn.disabled = true;
  }
  setTimeout(() => { window.location.href = "inventory.html"; }, delay);
});
