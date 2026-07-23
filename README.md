# 🛍️ LojaQA — Loja para Prática de Testes

Loja virtual educacional construída com HTML, CSS e JavaScript puro (sem dependências), pensada para prática de automação de testes (Selenium, Playwright, Cypress etc.). Inspirada no fluxo do saucedemo.com, mas com identidade própria: interface em português, preços em reais e emissão de nota fiscal fictícia em PDF.

> Projeto educacional. Empresa, produtos, imagens e nota fiscal são fictícios.

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
| `usuario_padrao` | Fluxo normal |
| `usuario_bloqueado` | Bloqueado — exibe erro no login |
| `usuario_problema` | Todas as imagens de produto aparecem quebradas |
| `usuario_lento` | Login com atraso artificial de ~5s |
| `usuario_erro` | Login normal (reservado para cenários de erro) |
| `usuario_visual` | Login normal (reservado para testes visuais) |

**Senha para todos:** `senha_teste_123`

## Produtos

**21 produtos** fictícios com tema de QA/tecnologia, de R$ 19,90 a R$ 349,90 — mochila, camisetas, caneca, teclado, mouse, fone, boné, moletom, garrafa, adesivos, caderno, luminária, mousepad, webcam, suporte de notebook, pelúcia do bug, quebra-cabeça de 404 peças e mais. A lista completa com slugs e preços está em [SELETORES.md](SELETORES.md).

✅ 75 ids presentes como #id
✅ 96 data-test presentes como [data-test="..."]
✅ 89 classes presentes como .classe

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
    nota-fiscal.js         # nota-fiscal.html
    sobre.js               # sobre.html
css/style.css              # Estilos globais (inclui estilos de impressão da nota)
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
| Pagamento — dados | `checkout-step-one.html` |
| Pagamento — resumo (subtotal + 8% de impostos) | `checkout-step-two.html` |
| Pedido concluído | `checkout-complete.html` |
| Nota fiscal (PDF) | `nota-fiscal.html` |
| Sobre (propósito do projeto/TCC) | `sobre.html` |

## Funcionalidades

- Validação de login com mensagens "Ops! ..."
- Proteção de rotas (redireciona para o login sem sessão)
- Adicionar/remover itens do carrinho com badge no ícone
- Ordenação por nome (A–Z / Z–A) e preço (menor–maior / maior–menor)
- Validação dos campos do pagamento (Nome, Sobrenome, CEP)
- Preços em reais (`R$ X,XX`) e cálculo de impostos (8%) no resumo
- Registro do pedido com número, data/hora e itens (`sessionStorage`)
- **Nota fiscal fictícia** com marca d'água "SEM VALOR FISCAL", tabela de itens e totais — botão "Baixar PDF" via diálogo de impressão do navegador
- Catálogo com 21 produtos e banner de boas-vindas com contador
- Página "Sobre" explicando o propósito do projeto (ambiente de testes para TCC)
- Menu lateral: Todos os Produtos, Sobre, Sair, Resetar Aplicação
- Atributos `data-test` e `id` em todos os elementos relevantes, para seletores estáveis

## Seletores

📋 **O mapa completo de seletores, página por página, está em [SELETORES.md](SELETORES.md)** — inclui tags, classes, atributos, textos, mensagens de erro, slugs dos produtos e chaves de armazenamento.
