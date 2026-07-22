# Mapa de Seletores

Referência **completa** dos seletores da aplicação para automação de testes: `id`, `data-test`, tag, classes CSS, atributos, textos visíveis e estados.

**Convenções:**
- Todas as interações principais possuem `id` (acesso via `#id`) e `data-test` (acesso via `[data-test="..."]`).
- Em geral `id` e `data-test` compartilham o mesmo nome. As exceções estão indicadas.
- Seletores marcados como **dinâmico** são gerados por produto ou mudam conforme o estado.
- A coluna **Classes** lista as classes CSS do elemento (utilizáveis como seletor alternativo: `.classe`).

---

## Elementos globais (todas as páginas, exceto Login)

### Cabeçalho

| Elemento | Tag | `id` | `data-test` | Classes | Atributos / Texto |
|---|---|---|---|---|---|
| Barra superior | `div` | — | — | `primary_header` | — |
| Agrupador menu + logo | `div` | — | — | `header_label` | — |
| Botão abrir menu (☰) | `button` | `botao-menu` | `botao-menu` | `bm-burger-button` | `aria-label="Abrir Menu"` |
| Logo | `div` | — | — | `app_logo` | texto: "Swag Labs" |
| Container do carrinho | `div` | — | — | `shopping_cart_container` | — |
| Link do carrinho (🛒) | `a` | `link-carrinho` | `link-carrinho` | `shopping_cart_link` | `href="cart.html"` |
| Badge de contagem | `span` | `badge-carrinho` | `badge-carrinho` | `shopping_cart_badge` | oculto via `style` quando carrinho vazio; texto = nº de itens |
| Barra secundária | `div` | — | — | `header_secondary_container` | — |
| Título da página | `span` | `titulo-pagina` | `titulo-pagina` | `title` | textos por página (ver seção Textos) |

### Menu lateral

| Elemento | Tag | `id` | `data-test` | Classes | Atributos / Ação |
|---|---|---|---|---|---|
| Container do menu | `nav` | `menu-lateral` | `menu-lateral` | `bm-menu` (+ `open` quando aberto) | — |
| Botão fechar (×) | `button` | `botao-fechar-menu` | `botao-fechar-menu` | `bm-cross-button` | `aria-label="Fechar Menu"` |
| All Items | `a` | `link-todos-itens` | `link-todos-itens` | — | `href="inventory.html"` |
| About | `a` | `link-sobre` | `link-sobre` | — | `href="https://saucelabs.com/"`, `target="_blank"` |
| Logout | `a` | `link-sair` | `link-sair` | — | `href="#"` — encerra sessão → `index.html` |
| Reset App State | `a` | `link-resetar` | `link-resetar` | — | `href="#"` — limpa o carrinho |
| Overlay (fundo escuro) | `div` | `sobreposicao-menu` | — | `bm-overlay` (+ `open` quando visível) | clique fecha o menu |

### Rodapé

| Elemento | Tag | `id` | `data-test` | Classes | Atributos / Texto |
|---|---|---|---|---|---|
| Rodapé | `footer` | `rodape` | `rodape` | `footer` | — |
| Lista de redes sociais | `ul` | — | — | `social` | — |
| Link Twitter | `a` | — | `rede-twitter` | — | `target="_blank"`, texto: "Twitter" |
| Link Facebook | `a` | — | `rede-facebook` | — | `target="_blank"`, texto: "Facebook" |
| Link LinkedIn | `a` | — | `rede-linkedin` | — | `target="_blank"`, texto: "LinkedIn" |
| Texto de copyright | `div` | — | `texto-rodape` | `footer_copy` | — |

---

## Login — `index.html`

| Elemento | Tag | `id` | `data-test` | Classes | Atributos / Texto |
|---|---|---|---|---|---|
| Container da página | `div` | — | — | `login_container` | — |
| Logo | `div` | — | — | `login_logo` | texto: "Swag Labs" |
| Wrapper do formulário | `div` | — | — | `login_wrapper` | — |
| Formulário | `form` | `form-login` | `form-login` | `login-box` | `novalidate` |
| Campo de usuário | `input` | `campo-usuario` | `campo-usuario` | `form_input` (+ `input_error` em erro) | `type="text"`, `placeholder="Username"`, `autocomplete="username"`, `autofocus` |
| Campo de senha | `input` | `campo-senha` | `campo-senha` | `form_input` (+ `input_error` em erro) | `type="password"`, `placeholder="Password"`, `autocomplete="current-password"` |
| Botão de login | `input` | `botao-entrar` | `botao-entrar` | `btn`, `btn_action` | `type="submit"`, `value="Login"` (vira "Loading..." no glitch user) |
| Container de erro | `div` | `container-erro` | `container-erro` | `error-message-container` (+ `visible` quando exibido) | — |
| Texto do erro | `span` | `texto-erro` | `texto-erro` | — | ver seção Mensagens de erro |
| Botão fechar erro (×) | `button` | `botao-fechar-erro` | `botao-fechar-erro` | `error-button` | `type="button"`, `aria-label="Fechar"` |
| Bloco de credenciais | `div` | — | — | `login_credentials_wrap` | — |
| Lista de usuários aceitos | `div` | `credenciais-login` | `credenciais-login` | `login_credentials` | contém os 6 usernames |
| Senha dos usuários | `div` | `senha-login` | `senha-login` | `login_password` | contém "secret_sauce" |

---

## Produtos — `inventory.html`

| Elemento | Tag | `id` | `data-test` | Classes | Atributos |
|---|---|---|---|---|---|
| Container da página | `main` | `container-inventario` | `container-inventario` | `inventory_container` | — |
| Lista de produtos | `div` | `lista-produtos` | `lista-produtos` | `inventory_list` | preenchida via JS |
| Seletor de ordenação | `select` | `seletor-ordenacao` | `seletor-ordenacao` | `product_sort_container` | 4 `option` (ver abaixo) |

**Opções do seletor de ordenação:**

| `value` | Texto visível |
|---|---|
| `az` | Name (A to Z) |
| `za` | Name (Z to A) |
| `lohi` | Price (low to high) |
| `hilo` | Price (high to low) |

### Card de produto (dinâmico — um por produto)

| Elemento | Tag | `id` | `data-test` | Classes | Atributos |
|---|---|---|---|---|---|
| Card do produto | `div` | — | `item-inventario` | `inventory_item` | — |
| Link da imagem | `a` | — | — | `inventory_item_img`, `link-item` | `href="inventory-item.html?id=N"` |
| Imagem do produto | `img` | — | — | — | `src="img/<produto>.svg"`, `alt` = nome do produto |
| Nome do produto (link) | `a` | — | `nome-item` | `inventory_item_name`, `link-item` | `href="inventory-item.html?id=N"` |
| Descrição | `div` | — | `descricao-item` | `inventory_item_desc` | — |
| Barra de preço | `div` | — | — | `pricebar` | — |
| Preço | `div` | — | `preco-item` | `inventory_item_price` | formato `$X.XX` |
| Botão Add/Remove | `button` | `botao-carrinho-<slug>` estável | `adicionar-carrinho-<slug>` ⇄ `remover-<slug>` dinâmico | `btn`, `btn_small` + `btn_inventory` (fora) ⇄ `btn_secondary` (no carrinho) | texto: "Add to cart" ⇄ "Remove" |

> **Usuário `problem_user`:** todas as imagens carregam `img/broken.svg` em vez da imagem real.

---

## Detalhe do produto — `inventory-item.html?id=N`

| Elemento | Tag | `id` | `data-test` | Classes | Atributos / Texto |
|---|---|---|---|---|---|
| Container da página | `main` | `detalhes-produto` | `detalhes-produto` | `inventory_details` | — |
| Voltar para produtos | `a` | `link-voltar-produtos` | `voltar-produtos` | `btn`, `btn_small`, `btn_back` | `href="inventory.html"`, texto: "← Back to products" |
| Wrapper da imagem | `div` | — | — | `inventory_details_img` | `hidden` quando item não existe |
| Imagem do produto | `img` | `imagem-item` | `imagem-item` | — | `alt` = nome do produto |
| Wrapper da descrição | `div` | — | — | `inventory_details_desc_container` | `hidden` quando item não existe |
| Nome do produto | `div` | — | `nome-item` | `inventory_details_name` | — |
| Descrição | `div` | — | `descricao-item` | `inventory_item_desc` | — |
| Preço | `div` | — | `preco-item` | `inventory_details_price` | formato `$X.XX` |
| Botão Add/Remove | `button` | `botao-carrinho` estável | `adicionar-carrinho-<slug>` ⇄ `remover-<slug>` | `btn`, `btn_small` + `btn_inventory` ⇄ `btn_secondary` | texto: "Add to cart" ⇄ "Remove" |
| Item não encontrado | `p` | `item-nao-encontrado` | `item-nao-encontrado` | — | `hidden` quando há produto; texto: "ITEM NOT FOUND — Sorry, this item does not exist." |

---

## Carrinho — `cart.html`

| Elemento | Tag | `id` | `data-test` | Classes | Atributos / Texto |
|---|---|---|---|---|---|
| Container da página | `main` | `container-carrinho` | `container-carrinho` | `cart_contents_container` | — |
| Rótulo "QTY" | `span` | — | `rotulo-quantidade` | `cart_quantity_label` | — |
| Rótulo "Description" | `span` | — | `rotulo-descricao` | `cart_desc_label` | — |
| Carrinho vazio | `p` | `carrinho-vazio` | `carrinho-vazio` | `cart_empty` | `hidden` quando há itens; texto: "Seu carrinho está vazio." |
| Lista de itens | `div` | `lista-carrinho` | `lista-carrinho` | `cart_list` | preenchida via JS |
| Rodapé de ações | `div` | — | — | `cart_footer` | — |
| Continue Shopping | `a` | `botao-continuar-comprando` | `continuar-comprando` | `btn`, `btn_secondary` | `href="inventory.html"` |
| Checkout | `a` | `botao-finalizar-compra` | `finalizar-compra` | `btn`, `btn_action` | `href="checkout-step-one.html"` |

### Item do carrinho (dinâmico — um por item)

| Elemento | Tag | `id` | `data-test` | Classes | Atributos / Texto |
|---|---|---|---|---|---|
| Linha do item | `div` | — | `item-carrinho` | `cart_item` | — |
| Quantidade | `div` | — | `quantidade-item` | `cart_quantity` | texto: "1" |
| Wrapper do conteúdo | `div` | — | — | `cart_item_label` | — |
| Nome (link) | `a` | — | `nome-item` | `inventory_item_name` | `href="inventory-item.html?id=N"` |
| Descrição | `div` | — | `descricao-item` | `inventory_item_desc` | — |
| Barra de preço | `div` | — | — | `item_pricebar` | — |
| Preço | `div` | — | `preco-item` | `inventory_item_price` | formato `$X.XX` |
| Botão Remove | `button` | `botao-carrinho-<slug>` | `remover-<slug>` | `btn`, `btn_small`, `btn_secondary` | texto: "Remove" |

---

## Checkout: dados — `checkout-step-one.html`

| Elemento | Tag | `id` | `data-test` | Classes | Atributos |
|---|---|---|---|---|---|
| Container da página | `main` | `container-checkout-dados` | `container-checkout-dados` | `checkout_container` | — |
| Formulário | `form` | `form-checkout` | `form-checkout` | `checkout_info` | `novalidate` |
| First Name | `input` | `campo-nome` | `campo-nome` | `form_input` (+ `input_error` em erro) | `type="text"`, `placeholder="First Name"`, `autofocus` |
| Last Name | `input` | `campo-sobrenome` | `campo-sobrenome` | `form_input` (+ `input_error` em erro) | `type="text"`, `placeholder="Last Name"` |
| Zip/Postal Code | `input` | `campo-cep` | `campo-cep` | `form_input` (+ `input_error` em erro) | `type="text"`, `placeholder="Zip/Postal Code"` |
| Container de erro | `div` | `container-erro` | `container-erro` | `error-message-container` (+ `visible`) | — |
| Texto do erro | `span` | `texto-erro` | `texto-erro` | — | ver seção Mensagens de erro |
| Botão fechar erro (×) | `button` | `botao-fechar-erro` | `botao-fechar-erro` | `error-button` | `type="button"`, `aria-label="Fechar"` |
| Cancel | `a` | `botao-cancelar` | `botao-cancelar` | `btn`, `btn_secondary` | `href="cart.html"` |
| Continue | `input` | `botao-continuar` | `botao-continuar` | `btn`, `btn_action` | `type="submit"`, `value="Continue"` |

---

## Checkout: resumo — `checkout-step-two.html`

| Elemento | Tag | `id` | `data-test` | Classes | Texto |
|---|---|---|---|---|---|
| Container da página | `main` | `container-checkout-resumo` | `container-checkout-resumo` | `checkout_container` | — |
| Rótulo "QTY" | `span` | — | `rotulo-quantidade` | `cart_quantity_label` | — |
| Rótulo "Description" | `span` | — | `rotulo-descricao` | `cart_desc_label` | — |
| Lista de itens | `div` | `lista-resumo` | `lista-resumo` | `cart_list` | preenchida via JS |
| Bloco de resumo | `div` | `info-resumo` | `info-resumo` | `summary_info` | — |
| Rótulo pagamento | `div` | — | `rotulo-pagamento` | `summary_info_label` | "Payment Information:" |
| Valor pagamento | `div` | — | `valor-pagamento` | `summary_value_label` | "SauceCard #31337" |
| Rótulo entrega | `div` | — | `rotulo-entrega` | `summary_info_label` | "Shipping Information:" |
| Valor entrega | `div` | — | `valor-entrega` | `summary_value_label` | "Free Pony Express Delivery!" |
| Rótulo total | `div` | — | `rotulo-total` | `summary_info_label` | "Price Total" |
| Subtotal | `div` | `valor-subtotal` | `valor-subtotal` | `summary_subtotal_label` | "Item total: $X.XX" |
| Imposto (8%) | `div` | `valor-imposto` | `valor-imposto` | `summary_tax_label` | "Tax: $X.XX" |
| Total | `div` | `valor-total` | `valor-total` | `summary_total_label` | "Total: $X.XX" |
| Rodapé de ações | `div` | — | — | `cart_footer` | — |
| Cancel | `a` | `botao-cancelar` | `botao-cancelar` | `btn`, `btn_secondary` | `href="inventory.html"` |
| Finish | `button` | `botao-finalizar` | `botao-finalizar` | `btn`, `btn_action` | limpa o carrinho → `checkout-complete.html` |

Os itens da lista usam os mesmos seletores do carrinho (`item-carrinho`, `quantidade-item`, `nome-item`, `descricao-item`, `preco-item`), porém **sem** botão Remove.

---

## Pedido concluído — `checkout-complete.html`

| Elemento | Tag | `id` | `data-test` | Classes | Atributos / Texto |
|---|---|---|---|---|---|
| Container da página | `main` | `container-pedido-concluido` | `container-pedido-concluido` | `checkout_complete_container` | — |
| Imagem de confirmação (✓) | `img` | `imagem-confirmacao` | `imagem-confirmacao` | `pony_express` | `src="img/pony-express.svg"`, `alt="Pony Express"` |
| Título | `h2` | `titulo-conclusao` | `titulo-conclusao` | `complete-header` | "Thank you for your order!" |
| Texto de confirmação | `div` | `texto-conclusao` | `texto-conclusao` | `complete-text` | "Your order has been dispatched..." |
| Back Home | `a` | `botao-voltar-inicio` | `voltar-inicio` | `btn`, `btn_action`, `btn_complete` | `href="inventory.html"` |

---

## Classes de estado (dinâmicas)

Classes e atributos que **mudam durante a execução** — úteis para asserções de visibilidade/estado:

| Classe / Atributo | Aplicada em | Significado |
|---|---|---|
| `open` | `#menu-lateral`, `#sobreposicao-menu` | menu lateral aberto |
| `visible` | `#container-erro` | mensagem de erro exibida |
| `input_error` | campos `.form_input` | campo com erro de validação (borda vermelha) |
| `hidden` (atributo) | `#carrinho-vazio`, `#item-nao-encontrado`, wrappers do detalhe | elemento oculto condicionalmente |
| `style="display:none"` ⇄ `inline-flex` | `#badge-carrinho` | badge oculto quando o carrinho está vazio |
| `btn_inventory` ⇄ `btn_secondary` | botões Add/Remove | fora do carrinho ⇄ dentro do carrinho |
| `disabled` (atributo) | `#botao-entrar` | durante o delay do `performance_glitch_user` |

## Classes de botões (estáticas)

| Classe | Estilo |
|---|---|
| `btn` | base de todos os botões |
| `btn_action` | verde, destaque (Login, Checkout, Continue, Finish, Back Home) |
| `btn_secondary` | borda vermelha (Cancel, Continue Shopping, Remove) |
| `btn_inventory` | largura total (Add to cart) |
| `btn_small` | padding reduzido |
| `btn_back` | botão de voltar (detalhe do produto) |
| `btn_complete` | largura limitada (Back Home) |

---

## Textos visíveis (para seletores por texto)

Úteis com `getByText` / `cy.contains` / XPath `text()`:

| Contexto | Texto |
|---|---|
| Títulos de página (`#titulo-pagina`) | "Products", "Your Cart", "Checkout: Your Information", "Checkout: Overview", "Checkout: Complete!" |
| Botões de carrinho | "Add to cart" ⇄ "Remove" |
| Ações | "Login", "Continue Shopping", "Checkout", "Cancel", "Continue", "Finish", "Back Home", "← Back to products" |
| Menu lateral | "All Items", "About", "Logout", "Reset App State" |
| Conclusão | "Thank you for your order!" |
| Estados vazios | "Seu carrinho está vazio.", "ITEM NOT FOUND — Sorry, this item does not exist." |

## Mensagens de erro (`#texto-erro`)

### Login (prefixo "Epic sadface: ")

| Cenário | Mensagem |
|---|---|
| Usuário vazio | `Epic sadface: Username is required` |
| Senha vazia | `Epic sadface: Password is required` |
| Credenciais inválidas | `Epic sadface: Username and password do not match any user in this service` |
| Usuário bloqueado | `Epic sadface: Sorry, this user has been locked out.` |
| Acesso sem sessão | `Epic sadface: You can only access '/inventory.html' when you are logged in.` |

### Checkout (prefixo "Error: ")

| Cenário | Mensagem |
|---|---|
| Nome vazio | `Error: First Name is required` |
| Sobrenome vazio | `Error: Last Name is required` |
| CEP vazio | `Error: Postal Code is required` |

---

## Templates (uso interno — não interagíveis)

Elementos `<template>` clonados pelo JavaScript para gerar o conteúdo dinâmico. **Não são alvos de automação** (conteúdo inerte, invisível ao usuário), listados apenas para referência:

| `id` | Página | Gera |
|---|---|---|
| `modelo-item-produto` | `inventory.html` | cards da lista de produtos |
| `modelo-item-carrinho` | `cart.html` | linhas do carrinho |
| `modelo-item-resumo` | `checkout-step-two.html` | linhas do resumo do pedido |

---

## Slugs dos produtos

Usados nos seletores dinâmicos dos botões de carrinho:

| Produto | `<slug>` | `id` do card (URL) | Preço |
|---|---|---|---|
| Sauce Labs Backpack | `sauce-labs-backpack` | `?id=4` | $29.99 |
| Sauce Labs Bike Light | `sauce-labs-bike-light` | `?id=0` | $9.99 |
| Sauce Labs Bolt T-Shirt | `sauce-labs-bolt-t-shirt` | `?id=1` | $15.99 |
| Sauce Labs Fleece Jacket | `sauce-labs-fleece-jacket` | `?id=5` | $49.99 |
| Sauce Labs Onesie | `sauce-labs-onesie` | `?id=2` | $7.99 |
| Test.allTheThings() T-Shirt (Red) | `test-allthethings-t-shirt-red` | `?id=3` | $15.99 |

**Exemplos completos do botão de carrinho:**

| Estado | `id` | `data-test` | Texto | Classe extra |
|---|---|---|---|---|
| Fora do carrinho | `#botao-carrinho-sauce-labs-backpack` | `[data-test="adicionar-carrinho-sauce-labs-backpack"]` | "Add to cart" | `btn_inventory` |
| No carrinho | `#botao-carrinho-sauce-labs-backpack` (não muda) | `[data-test="remover-sauce-labs-backpack"]` | "Remove" | `btn_secondary` |

---

## Armazenamento (setup/teardown de testes)

Chaves usadas pela aplicação — úteis para preparar estado sem passar pela UI:

| Chave | Onde | Conteúdo |
|---|---|---|
| `session-username` | `sessionStorage` | username logado (ex.: `"standard_user"`) |
| `cart-contents` | `localStorage` | array JSON de ids de produtos (ex.: `[4,0]`) |
| `checkout-info` | `sessionStorage` | JSON `{first, last, postal}` da etapa 1 |

