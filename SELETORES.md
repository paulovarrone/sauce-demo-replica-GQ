# Mapa de Seletores

Referência **completa** dos seletores da aplicação para automação de testes: `id`, `data-test`, tag, classes CSS, atributos, textos visíveis e estados.

**Convenções:**
- Todas as interações principais possuem `id` (acesso via `#id`) e `data-test` (acesso via `[data-test="..."]`).
- Em geral `id` e `data-test` compartilham o mesmo nome. As exceções estão indicadas.
- Seletores marcados como **dinâmico** são gerados por produto ou mudam conforme o estado.
- A coluna **Classes** lista as classes CSS do elemento (utilizáveis como seletor alternativo: `.classe`).

---

## Elementos globais (todas as páginas, exceto Login e Nota Fiscal)

### Cabeçalho

| Elemento | Tag | `id` | `data-test` | Classes | Atributos / Texto |
|---|---|---|---|---|---|
| Barra superior | `div` | — | — | `primary_header` | — |
| Agrupador menu + logo | `div` | — | — | `header_label` | — |
| Botão abrir menu (☰) | `button` | `botao-menu` | `botao-menu` | `bm-burger-button` | `aria-label="Abrir Menu"` |
| Logo | `div` | — | — | `app_logo` | texto: "🧪 LojaQA" |
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
| Todos os Produtos | `a` | `link-todos-itens` | `link-todos-itens` | — | `href="inventory.html"` |
| Sobre | `a` | `link-sobre` | `link-sobre` | — | `href="sobre.html"` — página sobre o projeto/TCC |
| Sair | `a` | `link-sair` | `link-sair` | — | `href="#"` — encerra sessão → `index.html` |
| Resetar Aplicação | `a` | `link-resetar` | `link-resetar` | — | `href="#"` — limpa o carrinho |
| Overlay (fundo escuro) | `div` | `sobreposicao-menu` | — | `bm-overlay` (+ `open` quando visível) | clique fecha o menu |

### Rodapé

| Elemento | Tag | `id` | `data-test` | Classes | Atributos / Texto |
|---|---|---|---|---|---|
| Rodapé | `footer` | `rodape` | `rodape` | `footer` | — |
| Lista de redes sociais | `ul` | — | — | `social` | — |
| Link GitHub | `a` | — | `rede-github` | — | `href="https://github.com/paulovarrone"`, `target="_blank"`, texto: "GitHub" |
| Link LinkedIn | `a` | — | `rede-linkedin` | — | `href="https://www.linkedin.com/in/paulovarrone"`, `target="_blank"`, texto: "LinkedIn" |
| Texto de copyright | `div` | — | `texto-rodape` | `footer_copy` | "© 2026 LojaQA — Projeto educacional..." |

---

## Login — `index.html`

| Elemento | Tag | `id` | `data-test` | Classes | Atributos / Texto |
|---|---|---|---|---|---|
| Container da página | `div` | — | — | `login_container` | — |
| Logo | `div` | — | — | `login_logo` | texto: "🧪 LojaQA" |
| Tagline | `p` | — | — | `login_tagline` | "Sua loja para praticar automação de testes" |
| Wrapper do formulário | `div` | — | — | `login_wrapper` | — |
| Formulário | `form` | `form-login` | `form-login` | `login-box` | `novalidate` |
| Campo de usuário | `input` | `campo-usuario` | `campo-usuario` | `form_input` (+ `input_error` em erro) | `type="text"`, `placeholder="Usuário"`, `autocomplete="username"`, `autofocus` |
| Campo de senha | `input` | `campo-senha` | `campo-senha` | `form_input` (+ `input_error` em erro) | `type="password"`, `placeholder="Senha"`, `autocomplete="current-password"` |
| Botão de login | `input` | `botao-entrar` | `botao-entrar` | `btn`, `btn_action` | `type="submit"`, `value="Entrar"` (vira "Carregando..." no glitch user) |
| Container de erro | `div` | `container-erro` | `container-erro` | `error-message-container` (+ `visible` quando exibido) | — |
| Texto do erro | `span` | `texto-erro` | `texto-erro` | — | ver seção Mensagens de erro |
| Botão fechar erro (×) | `button` | `botao-fechar-erro` | `botao-fechar-erro` | `error-button` | `type="button"`, `aria-label="Fechar"` |
| Bloco de credenciais | `div` | — | — | `login_credentials_wrap` | — |
| Lista de usuários aceitos | `div` | `credenciais-login` | `credenciais-login` | `login_credentials` | contém os 6 usernames (`usuario_padrao`, `usuario_bloqueado`, `usuario_problema`, `usuario_lento`, `usuario_erro`, `usuario_visual`) |
| Senha dos usuários | `div` | `senha-login` | `senha-login` | `login_password` | contém "senha_teste_123" |

---

## Produtos — `inventory.html`

| Elemento | Tag | `id` | `data-test` | Classes | Atributos |
|---|---|---|---|---|---|
| Banner de boas-vindas | `section` | `banner-boas-vindas` | `banner-boas-vindas` | `hero_banner` | contém h1 "Bem-vindo à LojaQA!" |
| Contador de produtos | `strong` | `contador-produtos` | `contador-produtos` | — | texto: "21" (preenchido via JS) |
| Container da página | `main` | `container-inventario` | `container-inventario` | `inventory_container` | — |
| Lista de produtos | `div` | `lista-produtos` | `lista-produtos` | `inventory_list` | preenchida via JS |
| Seletor de ordenação | `select` | `seletor-ordenacao` | `seletor-ordenacao` | `product_sort_container` | 4 `option` (ver abaixo) |

**Opções do seletor de ordenação:**

| `value` | Texto visível |
|---|---|
| `az` | Nome (A a Z) |
| `za` | Nome (Z a A) |
| `lohi` | Preço (menor ao maior) |
| `hilo` | Preço (maior ao menor) |

### Card de produto (dinâmico — um por produto)

| Elemento | Tag | `id` | `data-test` | Classes | Atributos |
|---|---|---|---|---|---|
| Card do produto | `div` | — | `item-inventario` | `inventory_item` | — |
| Link da imagem | `a` | — | — | `inventory_item_img`, `link-item` | `href="inventory-item.html?id=N"` |
| Imagem do produto | `img` | — | — | — | `src="img/<produto>.svg"`, `alt` = nome do produto |
| Nome do produto (link) | `a` | — | `nome-item` | `inventory_item_name`, `link-item` | `href="inventory-item.html?id=N"` |
| Descrição | `div` | — | `descricao-item` | `inventory_item_desc` | — |
| Barra de preço | `div` | — | — | `pricebar` | — |
| Preço | `div` | — | `preco-item` | `inventory_item_price` | formato `R$ X,XX` |
| Botão Adicionar/Remover | `button` | `botao-carrinho-<slug>` estável | `adicionar-carrinho-<slug>` ⇄ `remover-<slug>` dinâmico | `btn`, `btn_small` + `btn_inventory` (fora) ⇄ `btn_secondary` (no carrinho) | texto: "Adicionar ao carrinho" ⇄ "Remover" |

> **Usuário `usuario_problema`:** todas as imagens carregam `img/broken.svg` em vez da imagem real.

---

## Detalhe do produto — `inventory-item.html?id=N`

| Elemento | Tag | `id` | `data-test` | Classes | Atributos / Texto |
|---|---|---|---|---|---|
| Container da página | `main` | `detalhes-produto` | `detalhes-produto` | `inventory_details` | — |
| Voltar aos produtos | `a` | `link-voltar-produtos` | `voltar-produtos` | `btn`, `btn_small`, `btn_back` | `href="inventory.html"`, texto: "← Voltar aos produtos" |
| Wrapper da imagem | `div` | — | — | `inventory_details_img` | `hidden` quando item não existe |
| Imagem do produto | `img` | `imagem-item` | `imagem-item` | — | `alt` = nome do produto |
| Wrapper da descrição | `div` | — | — | `inventory_details_desc_container` | `hidden` quando item não existe |
| Nome do produto | `div` | — | `nome-item` | `inventory_details_name` | — |
| Descrição | `div` | — | `descricao-item` | `inventory_item_desc` | — |
| Preço | `div` | — | `preco-item` | `inventory_details_price` | formato `R$ X,XX` |
| Botão Adicionar/Remover | `button` | `botao-carrinho` estável | `adicionar-carrinho-<slug>` ⇄ `remover-<slug>` | `btn`, `btn_small` + `btn_inventory` ⇄ `btn_secondary` | texto: "Adicionar ao carrinho" ⇄ "Remover" |
| Item não encontrado | `p` | `item-nao-encontrado` | `item-nao-encontrado` | — | `hidden` quando há produto; texto: "ITEM NÃO ENCONTRADO — Este produto não existe." |

---

## Carrinho — `cart.html`

| Elemento | Tag | `id` | `data-test` | Classes | Atributos / Texto |
|---|---|---|---|---|---|
| Container da página | `main` | `container-carrinho` | `container-carrinho` | `cart_contents_container` | — |
| Rótulo "QTD" | `span` | — | `rotulo-quantidade` | `cart_quantity_label` | — |
| Rótulo "Descrição" | `span` | — | `rotulo-descricao` | `cart_desc_label` | — |
| Carrinho vazio | `p` | `carrinho-vazio` | `carrinho-vazio` | `cart_empty` | `hidden` quando há itens; texto: "Seu carrinho está vazio." |
| Lista de itens | `div` | `lista-carrinho` | `lista-carrinho` | `cart_list` | preenchida via JS |
| Rodapé de ações | `div` | — | — | `cart_footer` | — |
| Continuar Comprando | `a` | `botao-continuar-comprando` | `continuar-comprando` | `btn`, `btn_secondary` | `href="inventory.html"` |
| Finalizar Compra | `a` | `botao-finalizar-compra` | `finalizar-compra` | `btn`, `btn_action` | `href="checkout-step-one.html"` |

### Item do carrinho (dinâmico — um por item)

| Elemento | Tag | `id` | `data-test` | Classes | Atributos / Texto |
|---|---|---|---|---|---|
| Linha do item | `div` | — | `item-carrinho` | `cart_item` | — |
| Quantidade | `div` | — | `quantidade-item` | `cart_quantity` | texto: "1" |
| Wrapper do conteúdo | `div` | — | — | `cart_item_label` | — |
| Nome (link) | `a` | — | `nome-item` | `inventory_item_name` | `href="inventory-item.html?id=N"` |
| Descrição | `div` | — | `descricao-item` | `inventory_item_desc` | — |
| Barra de preço | `div` | — | — | `item_pricebar` | — |
| Preço | `div` | — | `preco-item` | `inventory_item_price` | formato `R$ X,XX` |
| Botão Remover | `button` | `botao-carrinho-<slug>` | `remover-<slug>` | `btn`, `btn_small`, `btn_secondary` | texto: "Remover" |

---

## Checkout: dados — `checkout-step-one.html`

| Elemento | Tag | `id` | `data-test` | Classes | Atributos |
|---|---|---|---|---|---|
| Container da página | `main` | `container-checkout-dados` | `container-checkout-dados` | `checkout_container` | — |
| Formulário | `form` | `form-checkout` | `form-checkout` | `checkout_info` | `novalidate` |
| Nome | `input` | `campo-nome` | `campo-nome` | `form_input` (+ `input_error` em erro) | `type="text"`, `placeholder="Nome"`, `autofocus` |
| Sobrenome | `input` | `campo-sobrenome` | `campo-sobrenome` | `form_input` (+ `input_error` em erro) | `type="text"`, `placeholder="Sobrenome"` |
| CEP | `input` | `campo-cep` | `campo-cep` | `form_input` (+ `input_error` em erro) | `type="text"`, `placeholder="CEP"` |
| Container de erro | `div` | `container-erro` | `container-erro` | `error-message-container` (+ `visible`) | — |
| Texto do erro | `span` | `texto-erro` | `texto-erro` | — | ver seção Mensagens de erro |
| Botão fechar erro (×) | `button` | `botao-fechar-erro` | `botao-fechar-erro` | `error-button` | `type="button"`, `aria-label="Fechar"` |
| Cancelar | `a` | `botao-cancelar` | `botao-cancelar` | `btn`, `btn_secondary` | `href="cart.html"` |
| Continuar | `input` | `botao-continuar` | `botao-continuar` | `btn`, `btn_action` | `type="submit"`, `value="Continuar"` |

---

## Checkout: resumo — `checkout-step-two.html`

| Elemento | Tag | `id` | `data-test` | Classes | Texto |
|---|---|---|---|---|---|
| Container da página | `main` | `container-checkout-resumo` | `container-checkout-resumo` | `checkout_container` | — |
| Rótulo "QTD" | `span` | — | `rotulo-quantidade` | `cart_quantity_label` | — |
| Rótulo "Descrição" | `span` | — | `rotulo-descricao` | `cart_desc_label` | — |
| Lista de itens | `div` | `lista-resumo` | `lista-resumo` | `cart_list` | preenchida via JS |
| Bloco de resumo | `div` | `info-resumo` | `info-resumo` | `summary_info` | — |
| Rótulo pagamento | `div` | — | `rotulo-pagamento` | `summary_info_label` | "Forma de Pagamento:" |
| Valor pagamento | `div` | — | `valor-pagamento` | `summary_value_label` | "CartãoQA #31337" |
| Rótulo entrega | `div` | — | `rotulo-entrega` | `summary_info_label` | "Entrega:" |
| Valor entrega | `div` | — | `valor-entrega` | `summary_value_label` | "Entrega Expressa Grátis!" |
| Rótulo total | `div` | — | `rotulo-total` | `summary_info_label` | "Resumo de Valores" |
| Subtotal | `div` | `valor-subtotal` | `valor-subtotal` | `summary_subtotal_label` | "Subtotal: R$ X,XX" |
| Impostos (8%) | `div` | `valor-imposto` | `valor-imposto` | `summary_tax_label` | "Impostos (8%): R$ X,XX" |
| Total | `div` | `valor-total` | `valor-total` | `summary_total_label` | "Total: R$ X,XX" |
| Rodapé de ações | `div` | — | — | `cart_footer` | — |
| Cancelar | `a` | `botao-cancelar` | `botao-cancelar` | `btn`, `btn_secondary` | `href="inventory.html"` |
| Finalizar Pedido | `button` | `botao-finalizar` | `botao-finalizar` | `btn`, `btn_action` | registra o pedido, limpa o carrinho → `checkout-complete.html` |

Os itens da lista usam os mesmos seletores do carrinho (`item-carrinho`, `quantidade-item`, `nome-item`, `descricao-item`, `preco-item`), porém **sem** botão Remover.

---

## Pedido concluído — `checkout-complete.html`

| Elemento | Tag | `id` | `data-test` | Classes | Atributos / Texto |
|---|---|---|---|---|---|
| Container da página | `main` | `container-pedido-concluido` | `container-pedido-concluido` | `checkout_complete_container` | — |
| Imagem de confirmação (✓) | `img` | `imagem-confirmacao` | `imagem-confirmacao` | `pony_express` | `src="img/pony-express.svg"`, `alt="Pedido confirmado"` |
| Título | `h2` | `titulo-conclusao` | `titulo-conclusao` | `complete-header` | "Obrigado pelo seu pedido!" |
| Texto de confirmação | `div` | `texto-conclusao` | `texto-conclusao` | `complete-text` | "Pedido #XXXXXXXX confirmado! Ele foi despachado..." |
| Número do pedido | `strong` | `numero-pedido` | `numero-pedido` | — | "#XXXXXXXX" (8 dígitos, preenchido via JS) |
| Gerar Nota Fiscal (PDF) | `a` | `botao-nota-fiscal` | `nota-fiscal` | `btn`, `btn_action`, `btn_complete` | `href="nota-fiscal.html"` |
| Voltar à Loja | `a` | `botao-voltar-inicio` | `voltar-inicio` | `btn`, `btn_secondary`, `btn_complete` | `href="inventory.html"` |

---

## Sobre — `sobre.html`

Página que explica o propósito do site (ambiente de testes para o TCC). Usa o cabeçalho/menu/rodapé globais.

| Elemento | Tag | `id` | `data-test` | Classes | Texto |
|---|---|---|---|---|---|
| Container da página | `main` | `container-sobre` | `container-sobre` | `sobre_container` | — |
| Card "Por que este site existe?" | `section` | — | `sobre-motivo` | `sobre_card` | explica o propósito (TCC) |
| Card "O que dá para testar aqui" | `section` | — | `sobre-recursos` | `sobre_card` | lista de funcionalidades |
| Card "Tecnologias" | `section` | — | `sobre-tecnologias` | `sobre_card` | stack e autoria |

---

## Nota Fiscal — `nota-fiscal.html`

Página sem cabeçalho/menu (documento isolado). O botão "Baixar PDF" abre o diálogo de impressão do navegador (Salvar como PDF).

| Elemento | Tag | `id` | `data-test` | Classes | Atributos / Texto |
|---|---|---|---|---|---|
| Corpo da página | `body` | — | — | `nf_body` | fundo cinza (branco na impressão) |
| Container da página | `main` | `container-nota-fiscal` | `container-nota-fiscal` | `nf_container` | — |
| Pedido não encontrado | `p` | `pedido-nao-encontrado` | `pedido-nao-encontrado` | — | `hidden` quando há pedido; texto: "Nenhum pedido encontrado..." |
| Documento da nota | `article` | `nota-fiscal` | `nota-fiscal` | `nf_documento` | `hidden` quando não há pedido |
| Marca d'água | `div` | — | — | `nf_marca_dagua` | "SEM VALOR FISCAL" |
| Cabeçalho da nota | `header` | — | — | `nf_cabecalho` | — |
| Logo na nota | `div` | — | — | `nf_logo` | texto: "🧪 LojaQA" |
| Dados do emitente | `div` | — | `dados-emitente` | `nf_empresa` | empresa fictícia + CNPJ 00.000.000/0001-00 |
| Bloco de identificação | `div` | — | — | `nf_identificacao` | número + data de emissão |
| Título "NOTA FISCAL" | `div` | — | — | `nf_titulo` | "NOTA FISCAL" |
| Subtítulo | `div` | — | — | `nf_subtitulo` | "Documento fictício para prática de testes" |
| Número da nota | `strong` | `numero-pedido` | `numero-pedido` | — | 8 dígitos |
| Data de emissão | `span` | `data-emissao` | `data-emissao` | — | "DD/MM/AAAA HH:MM:SS" |
| Bloco do destinatário | `section` | — | `dados-destinatario` | `nf_destinatario` | — |
| Nome do cliente | `div` | `cliente-nome` | `cliente-nome` | — | nome + sobrenome do checkout |
| CEP do cliente | `div` | `cliente-cep` | `cliente-cep` | — | "CEP: XXXXX" |
| Tabela de itens | `table` | `tabela-itens` | `tabela-itens` | `nf_tabela` | colunas: Item, Descrição, Qtd, Valor |
| Corpo da tabela | `tbody` | `itens-nota` | `itens-nota` | — | preenchido via JS |
| Bloco de totais | `section` | — | `totais-nota` | `nf_totais` | — |
| Subtotal | `div` | `nota-subtotal` | `nota-subtotal` | — | "Subtotal: R$ X,XX" |
| Impostos | `div` | `nota-imposto` | `nota-imposto` | — | "Impostos (8%): R$ X,XX" |
| Total | `div` | `nota-total` | `nota-total` | `nf_total` | "Total: R$ X,XX" |
| Aviso legal | `p` | — | `aviso-nota` | `nf_aviso` | "Documento sem valor fiscal..." |
| Ações (ocultas na impressão) | `div` | — | — | `nf_acoes`, `no-print` | — |
| Voltar | `a` | `botao-voltar` | `botao-voltar` | `btn`, `btn_secondary` | `href="checkout-complete.html"` |
| Baixar PDF | `button` | `botao-baixar-pdf` | `baixar-pdf` | `btn`, `btn_action` | chama `window.print()` |

### Linha de item da nota (dinâmica — uma por item)

| Elemento | Tag | `data-test` | Texto |
|---|---|---|---|
| Linha | `tr` | `linha-item` | — |
| Número sequencial | `td` | `linha-numero` | 1, 2, 3... |
| Descrição | `td` | `linha-descricao` | nome do produto |
| Quantidade | `td` | `linha-quantidade` | "1" |
| Valor | `td` | `linha-valor` | "R$ X,XX" |

---

## Classes de estado (dinâmicas)

Classes e atributos que **mudam durante a execução** — úteis para asserções de visibilidade/estado:

| Classe / Atributo | Aplicada em | Significado |
|---|---|---|
| `open` | `#menu-lateral`, `#sobreposicao-menu` | menu lateral aberto |
| `visible` | `#container-erro` | mensagem de erro exibida |
| `input_error` | campos `.form_input` | campo com erro de validação (borda vermelha) |
| `hidden` (atributo) | `#carrinho-vazio`, `#item-nao-encontrado`, `#nota-fiscal`, `#pedido-nao-encontrado`, wrappers do detalhe | elemento oculto condicionalmente |
| `style="display:none"` ⇄ `inline-flex` | `#badge-carrinho` | badge oculto quando o carrinho está vazio |
| `btn_inventory` ⇄ `btn_secondary` | botões Adicionar/Remover | fora do carrinho ⇄ dentro do carrinho |
| `disabled` (atributo) | `#botao-entrar` | durante o delay do `usuario_lento` |

## Classes de botões (estáticas)

| Classe | Estilo |
|---|---|
| `btn` | base de todos os botões (formato pílula) |
| `btn_action` | azul preenchido, destaque (Entrar, Finalizar Compra, Continuar, Finalizar Pedido, Gerar Nota Fiscal, Baixar PDF) |
| `btn_secondary` | borda vermelha (Cancelar, Continuar Comprando, Remover, Voltar à Loja, Voltar) |
| `btn_inventory` | largura total (Adicionar ao carrinho) |
| `btn_small` | padding reduzido |
| `btn_back` | botão de voltar (detalhe do produto) |
| `btn_complete` | largura limitada (botões da página de conclusão) |

---

## Textos visíveis (para seletores por texto)

Úteis com `getByText` / `cy.contains` / XPath `text()`:

| Contexto | Texto |
|---|---|
| Títulos de página (`#titulo-pagina`) | "Produtos", "Seu Carrinho", "Pagamento: Seus Dados", "Pagamento: Resumo", "Pedido Concluído!", "Sobre a LojaQA" |
| Banner de boas-vindas | "Bem-vindo à LojaQA!" |
| Botões de carrinho | "Adicionar ao carrinho" ⇄ "Remover" |
| Ações | "Entrar", "Continuar Comprando", "Finalizar Compra", "Cancelar", "Continuar", "Finalizar Pedido", "Voltar à Loja", "← Voltar aos produtos", "Gerar Nota Fiscal (PDF)", "Baixar PDF", "Voltar" |
| Menu lateral | "Todos os Produtos", "Sobre", "Sair", "Resetar Aplicação" |
| Conclusão | "Obrigado pelo seu pedido!" |
| Nota fiscal | "NOTA FISCAL", "SEM VALOR FISCAL", "Destinatário" |
| Estados vazios | "Seu carrinho está vazio.", "ITEM NÃO ENCONTRADO — Este produto não existe.", "Nenhum pedido encontrado. Finalize uma compra para gerar a nota fiscal." |

## Mensagens de erro (`#texto-erro`)

### Login (prefixo "Ops! ")

| Cenário | Mensagem |
|---|---|
| Usuário vazio | `Ops! O campo usuário é obrigatório` |
| Senha vazia | `Ops! O campo senha é obrigatório` |
| Credenciais inválidas | `Ops! Usuário e senha não conferem com nenhum usuário cadastrado` |
| Usuário bloqueado | `Ops! Desculpe, este usuário foi bloqueado.` |
| Acesso sem sessão | `Ops! Você precisa estar logado para acessar esta página.` |

### Checkout (prefixo "Erro: ")

| Cenário | Mensagem |
|---|---|
| Nome vazio | `Erro: O nome é obrigatório` |
| Sobrenome vazio | `Erro: O sobrenome é obrigatório` |
| CEP vazio | `Erro: O CEP é obrigatório` |

---

## Templates (uso interno — não interagíveis)

Elementos `<template>` clonados pelo JavaScript para gerar o conteúdo dinâmico. **Não são alvos de automação** (conteúdo inerte, invisível ao usuário), listados apenas para referência:

| `id` | Página | Gera |
|---|---|---|
| `modelo-item-produto` | `inventory.html` | cards da lista de produtos |
| `modelo-item-carrinho` | `cart.html` | linhas do carrinho |
| `modelo-item-resumo` | `checkout-step-two.html` | linhas do resumo do pedido |
| `modelo-linha-item` | `nota-fiscal.html` | linhas da tabela da nota fiscal |

---

## Slugs dos produtos

Usados nos seletores dinâmicos dos botões de carrinho (acentos são removidos):

| Produto | `<slug>` | `id` do card (URL) | Preço |
|---|---|---|---|
| Mochila do Testador | `mochila-do-testador` | `?id=4` | R$ 149,90 |
| Lanterna de Bike LED | `lanterna-de-bike-led` | `?id=0` | R$ 49,90 |
| Camiseta Caça-Bugs | `camiseta-caca-bugs` | `?id=1` | R$ 79,90 |
| Jaqueta Fleece QA | `jaqueta-fleece-qa` | `?id=5` | R$ 249,90 |
| Body do Testadorzinho | `body-do-testadorzinho` | `?id=2` | R$ 39,90 |
| Camiseta Teste.Tudo() Salmão | `camiseta-teste-tudo-salmao` | `?id=3` | R$ 79,90 |
| Caneca do Depurador | `caneca-do-depurador` | `?id=6` | R$ 34,90 |
| Teclado Mecânico TesteMaster | `teclado-mecanico-testemaster` | `?id=7` | R$ 349,90 |
| Mouse Sem Fio ClickCerto | `mouse-sem-fio-clickcerto` | `?id=8` | R$ 89,90 |
| Fone Anti-Ruído FocoTotal | `fone-anti-ruido-focototal` | `?id=9` | R$ 199,90 |
| Boné Automatize Tudo | `bone-automatize-tudo` | `?id=10` | R$ 59,90 |
| Moletom Deploy na Sexta | `moletom-deploy-na-sexta` | `?id=11` | R$ 189,90 |
| Garrafa Térmica CaféContínuo | `garrafa-termica-cafecontinuo` | `?id=12` | R$ 69,90 |
| Pacote de Adesivos de Bugs | `pacote-de-adesivos-de-bugs` | `?id=13` | R$ 19,90 |
| Caderno de Casos de Teste | `caderno-de-casos-de-teste` | `?id=14` | R$ 29,90 |
| Luminária PixelPerfect | `luminaria-pixelperfect` | `?id=15` | R$ 119,90 |
| Mousepad Gigante DevOps | `mousepad-gigante-devops` | `?id=16` | R$ 49,90 |
| Webcam Full HD VisãoQA | `webcam-full-hd-visaoqa` | `?id=17` | R$ 159,90 |
| Suporte de Notebook ErgoTeste | `suporte-de-notebook-ergoteste` | `?id=18` | R$ 99,90 |
| Pelúcia do Bug | `pelucia-do-bug` | `?id=19` | R$ 44,90 |
| Quebra-Cabeça 404 Peças | `quebra-cabeca-404-pecas` | `?id=20` | R$ 54,90 |

**Exemplos completos do botão de carrinho:**

| Estado | `id` | `data-test` | Texto | Classe extra |
|---|---|---|---|---|
| Fora do carrinho | `#botao-carrinho-mochila-do-testador` | `[data-test="adicionar-carrinho-mochila-do-testador"]` | "Adicionar ao carrinho" | `btn_inventory` |
| No carrinho | `#botao-carrinho-mochila-do-testador` (não muda) | `[data-test="remover-mochila-do-testador"]` | "Remover" | `btn_secondary` |

---

## Armazenamento (setup/teardown de testes)

Chaves usadas pela aplicação — úteis para preparar estado sem passar pela UI:

| Chave | Onde | Conteúdo |
|---|---|---|
| `session-username` | `sessionStorage` | username logado (ex.: `"usuario_padrao"`) |
| `cart-contents` | `localStorage` | array JSON de ids de produtos (ex.: `[4,0]`) |
| `checkout-info` | `sessionStorage` | JSON `{first, last, postal}` da etapa 1 (removido ao finalizar) |
| `ultimo-pedido` | `sessionStorage` | JSON do pedido finalizado: `{numero, data, hora, cliente, itens, subtotal, imposto, total}` — usado pela conclusão e pela nota fiscal |
