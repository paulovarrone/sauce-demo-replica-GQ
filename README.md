# SauceDemo — Réplica para Prática de Testes

Réplica educacional do site [saucedemo.com](https://www.saucedemo.com/) construída com HTML, CSS e JavaScript puro (sem dependências), pensada para prática de automação de testes (Selenium, Playwright, Cypress etc.).

> Projeto educacional, sem afiliação com a Sauce Labs. Imagens e descrições são originais.

## Como executar

Basta baixar a extensão do `LIVESERVER` no VsCode ou servir a pasta com um servidor local:

```powershell
# Opção 1: Python
python -m http.server 8000

# Opção 2: Node
npx serve .
```

Depois acesse `http://localhost:8000`.

## Usuários de teste

| Usuário | Comportamento |
|---|---|
| `standard_user` | Fluxo normal |
| `locked_out_user` | Bloqueado — exibe erro no login |
| `problem_user` | Todas as imagens de produto aparecem quebradas |
| `performance_glitch_user` | Login com atraso artificial de ~5s |
| `error_user` | Login normal (reservado para cenários de erro) |
| `visual_user` | Login normal (reservado para testes visuais) |

**Senha para todos:** `secret_sauce`

## Arquitetura

Separação estrita entre marcação e lógica:

- **HTML não contém JavaScript** — nenhum `<script>` inline nem `onclick`; cada página apenas importa seus scripts com `<script src ... defer>`.
- **JavaScript não contém HTML** — nenhuma string de markup; o conteúdo dinâmico é gerado clonando elementos `<template>` declarados no próprio HTML e preenchidos via `textContent` / atributos.

```
js/
  data.js                  # Dados: produtos, usuários, taxa de imposto
  store.js                 # Estado: sessão, carrinho, utilidades
  ui.js                    # UI compartilhada: menu lateral, badge, botões de carrinho
  pages/
    login.js               # index.html
    inventory.js           # inventory.html
    item.js                # inventory-item.html
    cart.js                # cart.html
    checkout-info.js       # checkout-step-one.html
    checkout-overview.js   # checkout-step-two.html
    complete.js            # checkout-complete.html
css/style.css              # Estilos globais
img/*.svg                  # Imagens dos produtos
```

Ordem de importação em cada página: `data.js` → `store.js` → `ui.js` → `pages/<página>.js`.

## Páginas

| Página | Arquivo |
|---|---|
| Login | `index.html` |
| Lista de produtos (com ordenação) | `inventory.html` |
| Detalhe do produto | `inventory-item.html?id=N` |
| Carrinho | `cart.html` |
| Checkout — dados | `checkout-step-one.html` |
| Checkout — resumo (subtotal + 8% de imposto) | `checkout-step-two.html` |
| Pedido concluído | `checkout-complete.html` |

## Funcionalidades replicadas

- Validação de login com mensagens "Epic sadface: ..."
- Proteção de rotas (redireciona para o login sem sessão)
- Adicionar/remover itens do carrinho com badge no ícone
- Ordenação por nome (A–Z / Z–A) e preço (menor–maior / maior–menor)
- Validação dos campos do checkout (First Name, Last Name, Postal Code)
- Cálculo de imposto (8%) e total no resumo do pedido
- Menu lateral: All Items, About, Logout, Reset App State
- Atributos `data-test` em todos os elementos relevantes, para seletores estáveis
