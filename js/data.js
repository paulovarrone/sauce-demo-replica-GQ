// ===== Dados dos produtos =====
const PRODUCTS = [
  {
    id: 4,
    name: "Sauce Labs Backpack",
    desc: "Mochila resistente com compartimento acolchoado para notebook, perfeita para carregar seu equipamento de testes para qualquer lugar.",
    price: 29.99,
    img: "img/backpack.svg"
  },
  {
    id: 0,
    name: "Sauce Labs Bike Light",
    desc: "Lanterna de bicicleta com LED vermelho de alta visibilidade. Bateria de longa duração incluída (água e molho não inclusos).",
    price: 9.99,
    img: "img/bike-light.svg"
  },
  {
    id: 1,
    name: "Sauce Labs Bolt T-Shirt",
    desc: "Camiseta de algodão super macia com o icônico raio estampado. Conforto garantido para longas sessões de automação.",
    price: 15.99,
    img: "img/bolt-shirt.svg"
  },
  {
    id: 5,
    name: "Sauce Labs Fleece Jacket",
    desc: "Jaqueta de fleece quentinha e estilosa. Ideal para escritórios gelados e datacenters com ar-condicionado no máximo.",
    price: 49.99,
    img: "img/fleece-jacket.svg"
  },
  {
    id: 2,
    name: "Sauce Labs Onesie",
    desc: "Body infantil vermelho para o pequeno futuro QA da família. Macio, prático e cheio de estilo.",
    price: 7.99,
    img: "img/onesie.svg"
  },
  {
    id: 3,
    name: "Test.allTheThings() T-Shirt (Red)",
    desc: "Camiseta vermelha para quem testa tudo, o tempo todo. Porque bug em produção não é opção.",
    price: 15.99,
    img: "img/red-shirt.svg"
  }
];

// ===== Usuários aceitos =====
const VALID_USERS = [
  "standard_user",
  "locked_out_user",
  "problem_user",
  "performance_glitch_user",
  "error_user",
  "visual_user"
];
const VALID_PASSWORD = "secret_sauce";
const TAX_RATE = 0.08;
