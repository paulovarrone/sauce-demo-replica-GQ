// ===== Sessão, carrinho e utilidades compartilhadas =====

const Session = {
  get user() { return sessionStorage.getItem("session-username"); },
  login(u) { sessionStorage.setItem("session-username", u); },
  logout() { sessionStorage.removeItem("session-username"); Cart.clear(); }
};

const Cart = {
  get items() { return JSON.parse(localStorage.getItem("cart-contents") || "[]"); },
  set items(v) { localStorage.setItem("cart-contents", JSON.stringify(v)); },
  add(id) { const c = this.items; if (!c.includes(id)) { c.push(id); this.items = c; } },
  remove(id) { this.items = this.items.filter(i => i !== id); },
  has(id) { return this.items.includes(id); },
  clear() { localStorage.removeItem("cart-contents"); }
};

// Formata valores em reais: R$ 149,90
function money(value) {
  return "R$ " + value.toFixed(2).replace(".", ",");
}

function productById(id) {
  return PRODUCTS.find(p => p.id === id);
}

// Gera slug sem acentos: "Camiseta Caça-Bugs" -> "camiseta-caca-bugs"
function slugify(name) {
  return name
    .normalize("NFD").replace(new RegExp("[\\u0300-\\u036f]", "g"), "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function requireLogin() {
  if (!Session.user) {
    window.location.href = "index.html?error=auth";
  }
}
