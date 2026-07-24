---
titulo: Mapa de Seletores da LojaQA
projeto: LojaQA — loja virtual fictícia para prática de automação de testes
idioma: pt-BR
finalidade: Base de conhecimento (RAG) com todos os seletores, textos, comportamentos e dados de teste da aplicação LojaQA
frameworks_alvo: Selenium, Playwright, Cypress, Robot Framework
convencao_seletores: cada elemento tem id (usar como "#id"), data-test (usar como "[data-test=...]") e classes CSS (usar como ".classe")
versao_produtos: 21 produtos
---

# Mapa de Seletores da LojaQA

Este documento é a base de conhecimento completa dos seletores da aplicação web **LojaQA**, uma loja virtual fictícia usada para praticar automação de testes. Cada seção é autocontida e descreve os elementos de uma página, com seus seletores prontos para uso (`#id`, `[data-test="..."]`, `.classe`), textos visíveis, atributos e comportamentos.

Como interpretar os seletores em qualquer seção deste documento:
- Um seletor iniciado por `#` é um seletor de **id** (ex.: `#botao-entrar`).
- Um seletor no formato `[data-test="..."]` é um seletor de **atributo data-test** (ex.: `[data-test="botao-entrar"]`).
- Um seletor iniciado por `.` é um seletor de **classe CSS** (ex.: `.btn_action`).
- Seletores "dinâmicos" contêm um `<slug>` que varia por produto (ver a seção "Slugs e dados dos produtos da LojaQA").

---

## Fatos gerais e configuração da LojaQA

Fatos fundamentais para escrever testes na LojaQA:

- **Nome da aplicação:** LojaQA (logotipo exibido como "🧪 LojaQA").
- **Tipo:** loja virtual fictícia de comércio eletrônico, feita apenas com HTML, CSS e JavaScript puro, sem frameworks. Projeto educacional para um TCC.
- **Senha de login (única para todos os usuários):** `senha_teste_123`.
- **Usuários de login aceitos (6):** `usuario_padrao`, `usuario_bloqueado`, `usuario_problema`, `usuario_lento`, `usuario_erro`, `usuario_visual`. Cada um tem um comportamento diferente descrito na seção "Comportamentos especiais por usuário da LojaQA".
- **Taxa de imposto aplicada no checkout:** 8% sobre o subtotal.
- **Formato de preço:** reais no padrão brasileiro, exemplo `R$ 149,90` (com vírgula decimal).
- **Quantidade de produtos no catálogo:** 21.
- **Persistência:** a sessão do usuário fica em `sessionStorage` (chave `session-username`) e o carrinho em `localStorage` (chave `cart-contents`). Ver a seção "Armazenamento (setup e teardown de testes)".
- **Atributo de teste padrão:** todos os elementos interativos têm o atributo `data-test`; os principais também têm `id`. Em geral o valor de `id` e de `data-test` é o mesmo.

### Arquivos de página (URLs) da LojaQA

- `index.html` — página de Login (página inicial).
- `inventory.html` — página de Produtos (catálogo / vitrine / lista de produtos).
- `inventory-item.html?id=N` — página de Detalhe de um produto (N é o id do produto).
- `cart.html` — página do Carrinho de compras.
- `checkout-step-one.html` — Checkout etapa 1, formulário de dados do comprador ("Pagamento: Seus Dados").
- `checkout-step-two.html` — Checkout etapa 2, resumo do pedido ("Pagamento: Resumo").
- `checkout-complete.html` — página de Pedido Concluído (confirmação da compra).
- `nota-fiscal.html` — página da Nota Fiscal fictícia, com botão para gerar PDF.
- `sobre.html` — página Sobre (explica o propósito do projeto/TCC).

---

## Elementos globais da LojaQA (cabeçalho, menu lateral e rodapé)

Estes elementos aparecem em todas as páginas da LojaQA que têm cabeçalho (todas, exceto a página de Login e a página de Nota Fiscal). Use esta seção para localizar o menu, o carrinho no topo, o título da página e o rodapé em qualquer página logada.

### Cabeçalho da LojaQA

- **Botão de abrir o menu lateral (ícone hambúrguer ☰)** na página LojaQA: seletores `#botao-menu`, `[data-test="botao-menu"]`, classe `.bm-burger-button`. É um `<button>` com `aria-label="Abrir Menu"`. Clicar abre o menu lateral.
- **Logotipo da LojaQA** no topo: classe `.app_logo`, texto "🧪 LojaQA". Não tem id nem data-test.
- **Link/ícone do carrinho de compras (🛒)** no topo: seletores `#link-carrinho`, `[data-test="link-carrinho"]`, classe `.shopping_cart_link`. É um `<a>` que leva para `cart.html`. Clicar vai para o carrinho.
- **Badge de contagem do carrinho** (número de itens sobre o ícone do carrinho): seletores `#badge-carrinho`, `[data-test="badge-carrinho"]`, classe `.shopping_cart_badge`. Fica oculto (via `style="display:none"`) quando o carrinho está vazio e mostra o número de itens quando há produtos. Para verificar a quantidade no carrinho, leia o texto deste elemento.
- **Título da página atual** (barra secundária): seletores `#titulo-pagina`, `[data-test="titulo-pagina"]`, classe `.title`. O texto muda conforme a página: "Produtos", "Seu Carrinho", "Pagamento: Seus Dados", "Pagamento: Resumo", "Pedido Concluído!" ou "Sobre a LojaQA".

### Menu lateral da LojaQA (barra de navegação lateral / hamburger menu)

O menu lateral abre ao clicar em `#botao-menu`. Contém:

- **Container do menu lateral:** seletores `#menu-lateral`, `[data-test="menu-lateral"]`, classe `.bm-menu`. Recebe a classe `.open` quando está aberto.
- **Botão de fechar o menu (×):** seletores `#botao-fechar-menu`, `[data-test="botao-fechar-menu"]`, classe `.bm-cross-button`, com `aria-label="Fechar Menu"`.
- **Item de menu "Todos os Produtos":** seletores `#link-todos-itens`, `[data-test="link-todos-itens"]`. Leva para `inventory.html`.
- **Item de menu "Sobre":** seletores `#link-sobre`, `[data-test="link-sobre"]`. Leva para `sobre.html`.
- **Item de menu "Sair" (logout):** seletores `#link-sair`, `[data-test="link-sair"]`. Encerra a sessão e volta para `index.html`.
- **Item de menu "Resetar Aplicação":** seletores `#link-resetar`, `[data-test="link-resetar"]`. Limpa o carrinho.
- **Overlay (fundo escurecido atrás do menu):** seletor `#sobreposicao-menu`, classe `.bm-overlay`. Clicar nele fecha o menu. Recebe `.open` quando visível.

### Rodapé da LojaQA

- **Rodapé:** seletores `#rodape`, `[data-test="rodape"]`, classe `.footer`.
- **Link do GitHub** no rodapé: seletor `[data-test="rede-github"]`, texto "GitHub", `href="https://github.com/paulovarrone"`, abre em nova aba.
- **Link do LinkedIn** no rodapé: seletor `[data-test="rede-linkedin"]`, texto "LinkedIn", `href="https://www.linkedin.com/in/paulovarrone"`, abre em nova aba.
- **Texto de copyright** no rodapé: seletor `[data-test="texto-rodape"]`, classe `.footer_copy`, texto "© 2026 LojaQA — Projeto educacional para prática de testes de automação.".

---

## Página de Login da LojaQA (index.html)

A página de Login é a página inicial da LojaQA (`index.html`). Nela o usuário digita usuário e senha para entrar. Não possui o cabeçalho global. Para fazer login: preencher o campo de usuário, preencher o campo de senha e clicar no botão Entrar.

Elementos da página de Login da LojaQA:

- **Campo de usuário (username):** seletores `#campo-usuario`, `[data-test="campo-usuario"]`, classe `.form_input`. É um `<input type="text">` com `placeholder="Usuário"`. Recebe a classe `.input_error` quando há erro de validação.
- **Campo de senha (password):** seletores `#campo-senha`, `[data-test="campo-senha"]`, classe `.form_input`. É um `<input type="password">` com `placeholder="Senha"`. Recebe `.input_error` em erro.
- **Botão Entrar (login/submit):** seletores `#botao-entrar`, `[data-test="botao-entrar"]`, classes `.btn` e `.btn_action`. É um `<input type="submit">` com `value="Entrar"`. Para o usuário `usuario_lento`, o texto vira "Carregando..." e o botão fica `disabled` durante ~5 segundos.
- **Formulário de login:** seletores `#form-login`, `[data-test="form-login"]`, classe `.login-box`.
- **Container da mensagem de erro:** seletores `#container-erro`, `[data-test="container-erro"]`, classe `.error-message-container`. Recebe a classe `.visible` quando um erro é exibido.
- **Texto da mensagem de erro:** seletores `#texto-erro`, `[data-test="texto-erro"]`. Contém a mensagem de erro (ver seção "Mensagens de erro da LojaQA").
- **Botão de fechar a mensagem de erro (×):** seletores `#botao-fechar-erro`, `[data-test="botao-fechar-erro"]`, classe `.error-button`.
- **Bloco informativo com a lista de usuários aceitos:** seletores `#credenciais-login`, `[data-test="credenciais-login"]`. Lista os 6 usernames.
- **Bloco informativo com a senha:** seletores `#senha-login`, `[data-test="senha-login"]`. Contém o texto "senha_teste_123".
- **Logotipo da tela de login:** classe `.login_logo`, texto "🧪 LojaQA".
- **Tagline (subtítulo):** classe `.login_tagline`, texto "Sua loja para praticar automação de testes".

Exemplo de login bem-sucedido: digitar `usuario_padrao` no campo `#campo-usuario`, `senha_teste_123` no campo `#campo-senha` e clicar em `#botao-entrar`. Após o sucesso, o usuário vai para `inventory.html`.

---

## Página de Produtos / Catálogo da LojaQA (inventory.html)

A página de Produtos (`inventory.html`), também chamada de catálogo, vitrine ou inventário, lista os 21 produtos da LojaQA em cards. Tem um banner de boas-vindas no topo e um seletor de ordenação. É a página exibida logo após o login.

Elementos gerais da página de Produtos da LojaQA:

- **Banner de boas-vindas:** seletores `#banner-boas-vindas`, `[data-test="banner-boas-vindas"]`, classe `.hero_banner`. Contém o título "Bem-vindo à LojaQA!".
- **Contador de produtos** dentro do banner: seletores `#contador-produtos`, `[data-test="contador-produtos"]`. Mostra o número total de produtos (21).
- **Container da página:** seletores `#container-inventario`, `[data-test="container-inventario"]`, classe `.inventory_container`.
- **Lista/grade de produtos:** seletores `#lista-produtos`, `[data-test="lista-produtos"]`, classe `.inventory_list`. Contém os cards, preenchidos via JavaScript.
- **Seletor de ordenação (dropdown de ordenar produtos):** seletores `#seletor-ordenacao`, `[data-test="seletor-ordenacao"]`, classe `.product_sort_container`. É um `<select>` com 4 opções.

Opções do seletor de ordenação da LojaQA (valor do `<option>` → texto exibido):
- valor `az` → "Nome (A a Z)" (ordena por nome crescente).
- valor `za` → "Nome (Z a A)" (ordena por nome decrescente).
- valor `lohi` → "Preço (menor ao maior)" (ordena por preço crescente).
- valor `hilo` → "Preço (maior ao menor)" (ordena por preço decrescente).

### Card de produto na página de Produtos da LojaQA

Cada produto é exibido em um card (repetido para os 21 produtos). Dentro de cada card:

- **Card do produto (container):** seletor `[data-test="item-inventario"]`, classe `.inventory_item`.
- **Nome do produto (link):** seletor `[data-test="nome-item"]`, classes `.inventory_item_name` e `.link-item`. É um link para a página de detalhe `inventory-item.html?id=N`.
- **Descrição do produto:** seletor `[data-test="descricao-item"]`, classe `.inventory_item_desc`.
- **Preço do produto:** seletor `[data-test="preco-item"]`, classe `.inventory_item_price`. Formato `R$ X,XX`.
- **Imagem do produto:** dentro de um `<a>` com classes `.inventory_item_img` e `.link-item`; o atributo `alt` da imagem é o nome do produto.
- **Botão Adicionar ao carrinho / Remover** (o mesmo botão alterna conforme o estado): id estável `#botao-carrinho-<slug>` (não muda) e data-test dinâmico `[data-test="adicionar-carrinho-<slug>"]` quando fora do carrinho e `[data-test="remover-<slug>"]` quando já está no carrinho. Fora do carrinho: texto "Adicionar ao carrinho", classes `.btn .btn_small .btn_inventory`. No carrinho: texto "Remover", classes `.btn .btn_small .btn_secondary`. Substitua `<slug>` pelo slug do produto (ver seção "Slugs e dados dos produtos da LojaQA"). Exemplo: para a Mochila do Testador, o botão é `#botao-carrinho-mochila-do-testador`, e o data-test é `[data-test="adicionar-carrinho-mochila-do-testador"]` (ou `[data-test="remover-mochila-do-testador"]` quando já no carrinho).

Observação de comportamento: com o usuário `usuario_problema`, todas as imagens dos cards carregam `img/broken.svg` (imagem quebrada) em vez da imagem real.

---

## Página de Detalhe do Produto da LojaQA (inventory-item.html)

A página de Detalhe (`inventory-item.html?id=N`) mostra um único produto em tamanho grande, onde N é o id do produto. Chega-se a ela clicando no nome ou na imagem de um produto no catálogo.

Elementos da página de Detalhe do Produto da LojaQA:

- **Container da página de detalhe:** seletores `#detalhes-produto`, `[data-test="detalhes-produto"]`, classe `.inventory_details`.
- **Botão/link "Voltar aos produtos":** seletores `#link-voltar-produtos`, `[data-test="voltar-produtos"]`, classes `.btn .btn_small .btn_back`. Texto "← Voltar aos produtos", leva para `inventory.html`.
- **Imagem do produto:** seletores `#imagem-item`, `[data-test="imagem-item"]`. O `alt` é o nome do produto.
- **Nome do produto:** seletor `[data-test="nome-item"]`, classe `.inventory_details_name`.
- **Descrição do produto:** seletor `[data-test="descricao-item"]`, classe `.inventory_item_desc`.
- **Preço do produto:** seletor `[data-test="preco-item"]`, classe `.inventory_details_price`. Formato `R$ X,XX`.
- **Botão Adicionar ao carrinho / Remover:** id estável `#botao-carrinho` e data-test dinâmico `[data-test="adicionar-carrinho-<slug>"]` ⇄ `[data-test="remover-<slug>"]`. Texto "Adicionar ao carrinho" ⇄ "Remover".
- **Mensagem "item não encontrado":** seletores `#item-nao-encontrado`, `[data-test="item-nao-encontrado"]`. Fica oculta (atributo `hidden`) quando o produto existe; aparece com o texto "ITEM NÃO ENCONTRADO — Este produto não existe." quando o id da URL é inválido.

---

## Página do Carrinho da LojaQA (cart.html)

A página do Carrinho (`cart.html`) lista os produtos adicionados ao carrinho e permite continuar comprando ou seguir para o checkout.

Elementos da página do Carrinho da LojaQA:

- **Container da página do carrinho:** seletores `#container-carrinho`, `[data-test="container-carrinho"]`, classe `.cart_contents_container`.
- **Rótulo de coluna "QTD" (quantidade):** seletor `[data-test="rotulo-quantidade"]`, classe `.cart_quantity_label`.
- **Rótulo de coluna "Descrição":** seletor `[data-test="rotulo-descricao"]`, classe `.cart_desc_label`.
- **Mensagem de carrinho vazio:** seletores `#carrinho-vazio`, `[data-test="carrinho-vazio"]`, classe `.cart_empty`. Fica oculta (atributo `hidden`) quando há itens; aparece com o texto "Seu carrinho está vazio." quando o carrinho está vazio.
- **Lista de itens do carrinho:** seletores `#lista-carrinho`, `[data-test="lista-carrinho"]`, classe `.cart_list`. Preenchida via JavaScript.
- **Botão "Continuar Comprando":** seletores `#botao-continuar-comprando`, `[data-test="continuar-comprando"]`, classes `.btn .btn_secondary`. Leva para `inventory.html`.
- **Botão "Finalizar Compra" (ir para o checkout):** seletores `#botao-finalizar-compra`, `[data-test="finalizar-compra"]`, classes `.btn .btn_action`. Leva para `checkout-step-one.html`.

### Item dentro do Carrinho da LojaQA

Cada produto no carrinho aparece como uma linha com:
- **Linha do item do carrinho:** seletor `[data-test="item-carrinho"]`, classe `.cart_item`.
- **Quantidade do item:** seletor `[data-test="quantidade-item"]`, classe `.cart_quantity`. Sempre "1".
- **Nome do item (link):** seletor `[data-test="nome-item"]`, leva ao detalhe do produto.
- **Descrição do item:** seletor `[data-test="descricao-item"]`.
- **Preço do item:** seletor `[data-test="preco-item"]`, formato `R$ X,XX`.
- **Botão Remover:** id `#botao-carrinho-<slug>`, data-test `[data-test="remover-<slug>"]`, texto "Remover", classes `.btn .btn_small .btn_secondary`.

---

## Página de Checkout Etapa 1 da LojaQA (checkout-step-one.html) — dados do comprador

A etapa 1 do checkout (`checkout-step-one.html`), com título "Pagamento: Seus Dados", tem um formulário onde o comprador informa nome, sobrenome e CEP. Para avançar: preencher os três campos e clicar em Continuar. Todos os campos são obrigatórios.

Elementos da página de Checkout Etapa 1 da LojaQA:

- **Container da página:** seletores `#container-checkout-dados`, `[data-test="container-checkout-dados"]`, classe `.checkout_container`.
- **Formulário de checkout:** seletores `#form-checkout`, `[data-test="form-checkout"]`, classe `.checkout_info`.
- **Campo Nome (primeiro nome):** seletores `#campo-nome`, `[data-test="campo-nome"]`, classe `.form_input`, `placeholder="Nome"`. Recebe `.input_error` em erro.
- **Campo Sobrenome:** seletores `#campo-sobrenome`, `[data-test="campo-sobrenome"]`, classe `.form_input`, `placeholder="Sobrenome"`.
- **Campo CEP (código postal):** seletores `#campo-cep`, `[data-test="campo-cep"]`, classe `.form_input`, `placeholder="CEP"`.
- **Container da mensagem de erro:** seletores `#container-erro`, `[data-test="container-erro"]`, classe `.error-message-container` (recebe `.visible` quando exibido).
- **Texto da mensagem de erro:** seletores `#texto-erro`, `[data-test="texto-erro"]`.
- **Botão de fechar erro (×):** seletores `#botao-fechar-erro`, `[data-test="botao-fechar-erro"]`, classe `.error-button`.
- **Botão Cancelar:** seletores `#botao-cancelar`, `[data-test="botao-cancelar"]`, classes `.btn .btn_secondary`. Volta para `cart.html`.
- **Botão Continuar (avançar):** seletores `#botao-continuar`, `[data-test="botao-continuar"]`, classes `.btn .btn_action`, `value="Continuar"`. Avança para `checkout-step-two.html`.

---

## Página de Checkout Etapa 2 da LojaQA (checkout-step-two.html) — resumo do pedido

A etapa 2 do checkout (`checkout-step-two.html`), com título "Pagamento: Resumo", mostra o resumo do pedido: itens, forma de pagamento, entrega, subtotal, impostos (8%) e total. Para concluir a compra: clicar em Finalizar Pedido.

Elementos da página de Checkout Etapa 2 (resumo) da LojaQA:

- **Container da página:** seletores `#container-checkout-resumo`, `[data-test="container-checkout-resumo"]`, classe `.checkout_container`.
- **Lista de itens do resumo:** seletores `#lista-resumo`, `[data-test="lista-resumo"]`, classe `.cart_list`. Preenchida via JavaScript. Os itens usam os mesmos seletores dos itens do carrinho (`[data-test="item-carrinho"]`, `[data-test="quantidade-item"]`, `[data-test="nome-item"]`, `[data-test="descricao-item"]`, `[data-test="preco-item"]`), porém sem botão Remover.
- **Bloco de resumo (informações de pagamento):** seletores `#info-resumo`, `[data-test="info-resumo"]`, classe `.summary_info`.
- **Rótulo "Forma de Pagamento:":** seletor `[data-test="rotulo-pagamento"]`.
- **Valor da forma de pagamento:** seletor `[data-test="valor-pagamento"]`, texto "CartãoQA #31337".
- **Rótulo "Entrega:":** seletor `[data-test="rotulo-entrega"]`.
- **Valor da entrega:** seletor `[data-test="valor-entrega"]`, texto "Entrega Expressa Grátis!".
- **Rótulo "Resumo de Valores":** seletor `[data-test="rotulo-total"]`.
- **Subtotal:** seletores `#valor-subtotal`, `[data-test="valor-subtotal"]`. Texto no formato "Subtotal: R$ X,XX".
- **Impostos (8%):** seletores `#valor-imposto`, `[data-test="valor-imposto"]`. Texto no formato "Impostos (8%): R$ X,XX".
- **Total:** seletores `#valor-total`, `[data-test="valor-total"]`. Texto no formato "Total: R$ X,XX". O total é o subtotal mais 8% de impostos.
- **Botão Cancelar:** seletores `#botao-cancelar`, `[data-test="botao-cancelar"]`, classes `.btn .btn_secondary`. Volta para `inventory.html`.
- **Botão Finalizar Pedido:** seletores `#botao-finalizar`, `[data-test="botao-finalizar"]`, classes `.btn .btn_action`. Registra o pedido, limpa o carrinho e vai para `checkout-complete.html`.

---

## Página de Pedido Concluído da LojaQA (checkout-complete.html)

A página de Pedido Concluído (`checkout-complete.html`), com título "Pedido Concluído!", confirma que a compra foi finalizada e oferece gerar a nota fiscal ou voltar à loja.

Elementos da página de Pedido Concluído da LojaQA:

- **Container da página:** seletores `#container-pedido-concluido`, `[data-test="container-pedido-concluido"]`, classe `.checkout_complete_container`.
- **Imagem de confirmação:** seletores `#imagem-confirmacao`, `[data-test="imagem-confirmacao"]`, classe `.pony_express`.
- **Título de conclusão:** seletores `#titulo-conclusao`, `[data-test="titulo-conclusao"]`, classe `.complete-header`, texto "Obrigado pelo seu pedido!".
- **Texto de confirmação:** seletores `#texto-conclusao`, `[data-test="texto-conclusao"]`, classe `.complete-text`. Contém "Pedido #XXXXXXXX confirmado! Ele foi despachado...".
- **Número do pedido:** seletores `#numero-pedido`, `[data-test="numero-pedido"]`. Mostra "#XXXXXXXX" (8 dígitos), preenchido via JavaScript.
- **Botão "Gerar Nota Fiscal (PDF)":** seletores `#botao-nota-fiscal`, `[data-test="nota-fiscal"]`, classes `.btn .btn_action .btn_complete`. Leva para `nota-fiscal.html`.
- **Botão "Voltar à Loja":** seletores `#botao-voltar-inicio`, `[data-test="voltar-inicio"]`, classes `.btn .btn_secondary .btn_complete`. Leva para `inventory.html`.

---

## Página de Nota Fiscal da LojaQA (nota-fiscal.html)

A página de Nota Fiscal (`nota-fiscal.html`) exibe um documento fictício de nota fiscal do último pedido e tem um botão "Baixar PDF" que abre o diálogo de impressão do navegador (para salvar como PDF). Não possui o cabeçalho global. Só mostra dados se houver um pedido finalizado; caso contrário mostra a mensagem de pedido não encontrado.

Elementos da página de Nota Fiscal da LojaQA:

- **Container da página:** seletores `#container-nota-fiscal`, `[data-test="container-nota-fiscal"]`, classe `.nf_container`.
- **Mensagem "pedido não encontrado":** seletores `#pedido-nao-encontrado`, `[data-test="pedido-nao-encontrado"]`. Fica oculta (`hidden`) quando há pedido; aparece com o texto "Nenhum pedido encontrado. Finalize uma compra para gerar a nota fiscal." quando não há pedido.
- **Documento da nota fiscal:** seletores `#nota-fiscal`, `[data-test="nota-fiscal"]`, classe `.nf_documento`. Fica oculto (`hidden`) quando não há pedido.
- **Marca d'água:** classe `.nf_marca_dagua`, texto "SEM VALOR FISCAL".
- **Dados do emitente:** seletor `[data-test="dados-emitente"]`, classe `.nf_empresa`. Empresa fictícia com CNPJ 00.000.000/0001-00.
- **Número da nota:** seletores `#numero-pedido`, `[data-test="numero-pedido"]`. 8 dígitos.
- **Data de emissão:** seletores `#data-emissao`, `[data-test="data-emissao"]`. Formato "DD/MM/AAAA HH:MM:SS".
- **Dados do destinatário:** seletor `[data-test="dados-destinatario"]`, classe `.nf_destinatario`.
- **Nome do cliente:** seletores `#cliente-nome`, `[data-test="cliente-nome"]`. Nome e sobrenome informados no checkout.
- **CEP do cliente:** seletores `#cliente-cep`, `[data-test="cliente-cep"]`. Texto "CEP: XXXXX".
- **Tabela de itens:** seletores `#tabela-itens`, `[data-test="tabela-itens"]`, classe `.nf_tabela`. Colunas: Item, Descrição, Qtd, Valor.
- **Corpo da tabela de itens:** seletores `#itens-nota`, `[data-test="itens-nota"]`. Preenchido via JavaScript.
- **Bloco de totais da nota:** seletor `[data-test="totais-nota"]`, classe `.nf_totais`. Agrupa subtotal, impostos e total.
- **Subtotal da nota:** seletores `#nota-subtotal`, `[data-test="nota-subtotal"]`. Texto "Subtotal: R$ X,XX".
- **Impostos da nota:** seletores `#nota-imposto`, `[data-test="nota-imposto"]`. Texto "Impostos (8%): R$ X,XX".
- **Total da nota:** seletores `#nota-total`, `[data-test="nota-total"]`, classe `.nf_total`. Texto "Total: R$ X,XX".
- **Aviso legal:** seletor `[data-test="aviso-nota"]`, classe `.nf_aviso`. Texto "Documento sem valor fiscal...".
- **Botão Voltar:** seletores `#botao-voltar`, `[data-test="botao-voltar"]`, classes `.btn .btn_secondary`. Volta para `checkout-complete.html`.
- **Botão "Baixar PDF":** seletores `#botao-baixar-pdf`, `[data-test="baixar-pdf"]`, classes `.btn .btn_action`. Chama a impressão do navegador (`window.print()`) para salvar como PDF.

Cada linha de item da tabela da nota fiscal contém: a linha `[data-test="linha-item"]` (`<tr>`); o número sequencial `[data-test="linha-numero"]`; a descrição `[data-test="linha-descricao"]` (nome do produto); a quantidade `[data-test="linha-quantidade"]` (sempre "1"); e o valor `[data-test="linha-valor"]` (formato "R$ X,XX").

---

## Página Sobre da LojaQA (sobre.html)

A página Sobre (`sobre.html`), com título "Sobre a LojaQA", explica o propósito do projeto (ambiente de testes para um TCC). Usa o cabeçalho, o menu lateral e o rodapé globais.

Elementos da página Sobre da LojaQA:
- **Container da página:** seletores `#container-sobre`, `[data-test="container-sobre"]`, classe `.sobre_container`.
- **Card "Por que este site existe?":** seletor `[data-test="sobre-motivo"]`, classe `.sobre_card`. Explica o propósito (TCC).
- **Card "O que dá para testar aqui":** seletor `[data-test="sobre-recursos"]`, classe `.sobre_card`. Lista funcionalidades.
- **Card "Tecnologias":** seletor `[data-test="sobre-tecnologias"]`, classe `.sobre_card`. Descreve a stack e a autoria.

---

## Comportamentos especiais por usuário da LojaQA

A LojaQA tem 6 usuários de login, todos com a senha `senha_teste_123`. Cada usuário provoca um comportamento diferente na aplicação — isto é fundamental para escolher qual usuário usar em cada cenário de teste.

- **usuario_padrao:** fluxo normal, sem defeitos. É o usuário indicado para testar o caminho feliz (comprar do início ao fim com sucesso).

- **usuario_bloqueado:** o login é recusado. Ao tentar entrar, aparece no `#texto-erro` a mensagem "Ops! Desculpe, este usuário foi bloqueado.". Usar para testar login negado / usuário bloqueado.

- **usuario_lento:** o login funciona, mas com atraso artificial de cerca de 5 segundos. Durante a espera, o botão `#botao-entrar` fica com o atributo `disabled` e o texto muda para "Carregando...". Usar para testar espera, loading e performance.

- **usuario_problema:** o login funciona, mas todas as imagens de produto ficam quebradas — a tag `img` aponta para `src="img/broken.svg"` tanto na vitrine quanto no detalhe. Usar para testar imagens quebradas / atributos de imagem.

- **usuario_erro:** o login funciona, mas várias ações falham de propósito. Três defeitos: (1) trocar o valor de `#seletor-ordenacao` dispara um `alert` de erro e a ordenação volta para "az"; (2) clicar em "Adicionar ao carrinho" de produtos com id ÍMPAR não tem efeito (o badge do carrinho não muda e é emitido um `console.error`) — produtos de id par funcionam normalmente; (3) clicar no botão `#botao-finalizar` (Finalizar Pedido) dispara um `alert` e o pedido NÃO é concluído. Usar para testar tratamento de falhas e diálogos `alert`. Textos exatos dos `alert`: na ordenação, "Ops! A ordenação está quebrada para este usuário. Defeito proposital para testes."; ao finalizar, "Ops! Não foi possível finalizar o pedido. Defeito proposital para testes.".

- **usuario_visual:** o login funciona, mas a aplicação recebe defeitos visuais propositais — o elemento `body` ganha a classe `.bugs-visuais`, que provoca: logotipo deslocado, badge do carrinho (`#badge-carrinho`) posicionado no canto errado, imagens de alguns cards (`:nth-child(3n)`) tortas/rotacionadas, botões de alguns cards (`:nth-child(4n)`) desalinhados, preços em vermelho e itálico, e preços ERRADOS na vitrine: os produtos de id múltiplo de 5 (ids 0, 5, 10, 15 e 20) mostram R$ 10,00 a mais na vitrine, mas o carrinho e o checkout mostram o preço correto. Usar para testes de regressão visual e de asserção de preço/inconsistência.

---

## Mensagens de erro da LojaQA

As mensagens de erro aparecem no elemento de texto de erro `#texto-erro` (`[data-test="texto-erro"]`), dentro do container `#container-erro`, que recebe a classe `.visible` quando visível. Use estes textos exatos para asserções.

Mensagens de erro do Login da LojaQA (todas começam com "Ops! "):
- Usuário em branco: "Ops! O campo usuário é obrigatório".
- Senha em branco: "Ops! O campo senha é obrigatório".
- Usuário/senha incorretos: "Ops! Usuário e senha não conferem com nenhum usuário cadastrado".
- Usuário bloqueado (usuario_bloqueado): "Ops! Desculpe, este usuário foi bloqueado.".
- Acesso a página interna sem estar logado: "Ops! Você precisa estar logado para acessar esta página.".

Mensagens de erro do Checkout Etapa 1 da LojaQA (todas começam com "Erro: "):
- Nome em branco: "Erro: O nome é obrigatório".
- Sobrenome em branco: "Erro: O sobrenome é obrigatório".
- CEP em branco: "Erro: O CEP é obrigatório".

Mensagens de `alert` do usuario_erro (ver seção de comportamentos por usuário):
- Ordenação quebrada: "Ops! A ordenação está quebrada para este usuário. Defeito proposital para testes.".
- Falha ao finalizar: "Ops! Não foi possível finalizar o pedido. Defeito proposital para testes.".

---

## Classes CSS de estado (dinâmicas) da LojaQA

Estas classes e atributos mudam durante a execução e são úteis para asserções de estado e visibilidade:
- Classe `.open`: aplicada em `#menu-lateral` e `#sobreposicao-menu` quando o menu lateral está aberto.
- Classe `.visible`: aplicada em `#container-erro` quando a mensagem de erro está sendo exibida.
- Classe `.input_error`: aplicada nos campos `.form_input` quando há erro de validação (borda vermelha).
- Atributo `hidden`: aplicado em `#carrinho-vazio`, `#item-nao-encontrado`, `#nota-fiscal`, `#pedido-nao-encontrado` e nos wrappers do detalhe quando o elemento está oculto condicionalmente.
- Classe `.btn_inventory` (fora do carrinho) que alterna para `.btn_secondary` (dentro do carrinho): nos botões Adicionar/Remover.
- Atributo `disabled`: aplicado em `#botao-entrar` durante o atraso do usuario_lento.
- Classe `.bugs-visuais`: aplicada no `body` quando o usuário logado é `usuario_visual`, ativando os defeitos visuais propositais.

## Classes CSS de botões (estáticas) da LojaQA

- `.btn`: classe base de todos os botões (formato pílula/arredondado).
- `.btn_action`: botão de ação principal, azul preenchido (Entrar, Finalizar Compra, Continuar, Finalizar Pedido, Gerar Nota Fiscal, Baixar PDF).
- `.btn_secondary`: botão secundário com borda vermelha (Cancelar, Continuar Comprando, Remover, Voltar à Loja, Voltar).
- `.btn_inventory`: botão de largura total (Adicionar ao carrinho).
- `.btn_small`: botão com padding reduzido.
- `.btn_back`: botão de voltar na página de detalhe do produto.
- `.btn_complete`: botão de largura limitada, usado na página de pedido concluído.

---

## Textos visíveis da LojaQA (para seletores por texto)

Textos exatos exibidos na LojaQA, úteis para localizar elementos por texto (`getByText`, `cy.contains`, XPath `text()`):
- Títulos de página (no elemento `#titulo-pagina`): "Produtos", "Seu Carrinho", "Pagamento: Seus Dados", "Pagamento: Resumo", "Pedido Concluído!", "Sobre a LojaQA".
- Banner de boas-vindas: "Bem-vindo à LojaQA!".
- Botões de carrinho: "Adicionar ao carrinho" (fora do carrinho) e "Remover" (no carrinho).
- Botões de ação: "Entrar", "Continuar Comprando", "Finalizar Compra", "Cancelar", "Continuar", "Finalizar Pedido", "Voltar à Loja", "← Voltar aos produtos", "Gerar Nota Fiscal (PDF)", "Baixar PDF", "Voltar".
- Itens do menu lateral: "Todos os Produtos", "Sobre", "Sair", "Resetar Aplicação".
- Página de conclusão: "Obrigado pelo seu pedido!".
- Nota fiscal: "NOTA FISCAL", "SEM VALOR FISCAL", "Destinatário".
- Estados vazios: "Seu carrinho está vazio.", "ITEM NÃO ENCONTRADO — Este produto não existe.", "Nenhum pedido encontrado. Finalize uma compra para gerar a nota fiscal.".

---

## Slugs e dados dos produtos da LojaQA

A LojaQA tem 21 produtos. Cada produto tem um `<slug>` (nome normalizado, sem acentos, em minúsculas e com hifens) que é usado nos seletores dinâmicos dos botões de carrinho: o botão é `#botao-carrinho-<slug>`, e o data-test é `[data-test="adicionar-carrinho-<slug>"]` (fora do carrinho) ou `[data-test="remover-<slug>"]` (no carrinho). O `id` na coluna abaixo é o parâmetro usado na URL da página de detalhe (`inventory-item.html?id=N`).

| Produto | slug | id na URL | Preço |
|---|---|---|---|
| Mochila do Testador | `mochila-do-testador` | 4 | R$ 149,90 |
| Lanterna de Bike LED | `lanterna-de-bike-led` | 0 | R$ 49,90 |
| Camiseta Caça-Bugs | `camiseta-caca-bugs` | 1 | R$ 79,90 |
| Jaqueta Fleece QA | `jaqueta-fleece-qa` | 5 | R$ 249,90 |
| Body do Testadorzinho | `body-do-testadorzinho` | 2 | R$ 39,90 |
| Camiseta Teste.Tudo() Salmão | `camiseta-teste-tudo-salmao` | 3 | R$ 79,90 |
| Caneca do Depurador | `caneca-do-depurador` | 6 | R$ 34,90 |
| Teclado Mecânico TesteMaster | `teclado-mecanico-testemaster` | 7 | R$ 349,90 |
| Mouse Sem Fio ClickCerto | `mouse-sem-fio-clickcerto` | 8 | R$ 89,90 |
| Fone Anti-Ruído FocoTotal | `fone-anti-ruido-focototal` | 9 | R$ 199,90 |
| Boné Automatize Tudo | `bone-automatize-tudo` | 10 | R$ 59,90 |
| Moletom Deploy na Sexta | `moletom-deploy-na-sexta` | 11 | R$ 189,90 |
| Garrafa Térmica CaféContínuo | `garrafa-termica-cafecontinuo` | 12 | R$ 69,90 |
| Pacote de Adesivos de Bugs | `pacote-de-adesivos-de-bugs` | 13 | R$ 19,90 |
| Caderno de Casos de Teste | `caderno-de-casos-de-teste` | 14 | R$ 29,90 |
| Luminária PixelPerfect | `luminaria-pixelperfect` | 15 | R$ 119,90 |
| Mousepad Gigante DevOps | `mousepad-gigante-devops` | 16 | R$ 49,90 |
| Webcam Full HD VisãoQA | `webcam-full-hd-visaoqa` | 17 | R$ 159,90 |
| Suporte de Notebook ErgoTeste | `suporte-de-notebook-ergoteste` | 18 | R$ 99,90 |
| Pelúcia do Bug | `pelucia-do-bug` | 19 | R$ 44,90 |
| Quebra-Cabeça 404 Peças | `quebra-cabeca-404-pecas` | 20 | R$ 54,90 |

Exemplo do botão de carrinho para a Mochila do Testador: quando o produto está fora do carrinho, o botão tem id `#botao-carrinho-mochila-do-testador`, data-test `[data-test="adicionar-carrinho-mochila-do-testador"]`, texto "Adicionar ao carrinho" e classe extra `.btn_inventory`. Depois de adicionado ao carrinho, o mesmo botão mantém o id `#botao-carrinho-mochila-do-testador`, mas o data-test passa a ser `[data-test="remover-mochila-do-testador"]`, o texto vira "Remover" e a classe extra vira `.btn_secondary`.

---

## Templates internos da LojaQA (não interagíveis)

A LojaQA usa elementos `<template>` que o JavaScript clona para gerar conteúdo dinâmico. Eles NÃO são alvos de automação (são inertes e invisíveis), listados só para referência:
- `#modelo-item-produto` na página `inventory.html`: gera os cards da lista de produtos.
- `#modelo-item-carrinho` na página `cart.html`: gera as linhas do carrinho.
- `#modelo-item-resumo` na página `checkout-step-two.html`: gera as linhas do resumo do pedido.
- `#modelo-linha-item` na página `nota-fiscal.html`: gera as linhas da tabela da nota fiscal.

---

## Armazenamento (setup e teardown de testes) da LojaQA

A LojaQA guarda estado no navegador. Para preparar ou limpar o estado de um teste sem passar pela interface, manipule estas chaves:
- Chave `session-username` no `sessionStorage`: guarda o username logado, por exemplo "usuario_padrao". Definir esta chave equivale a estar logado.
- Chave `cart-contents` no `localStorage`: guarda um array JSON com os ids dos produtos no carrinho, por exemplo `[4,0]`.
- Chave `checkout-info` no `sessionStorage`: guarda um JSON `{first, last, postal}` preenchido na etapa 1 do checkout; é removido ao finalizar o pedido.
- Chave `ultimo-pedido` no `sessionStorage`: guarda um JSON do pedido finalizado com `{numero, data, hora, cliente, itens, subtotal, imposto, total}`, usado pela página de conclusão e pela nota fiscal.

Exemplo para iniciar um teste já logado e com um item no carrinho: definir `sessionStorage["session-username"] = "usuario_padrao"` e `localStorage["cart-contents"] = "[4]"`, depois navegar para `inventory.html`.

---

## Perguntas frequentes sobre a automação da LojaQA (FAQ)

Perguntas comuns e respostas diretas para localizar seletores e comportamentos na LojaQA:

- **Como fazer login na LojaQA?** Preencher `#campo-usuario` com um usuário válido (ex.: `usuario_padrao`), preencher `#campo-senha` com `senha_teste_123` e clicar em `#botao-entrar`.
- **Qual é a senha dos usuários da LojaQA?** `senha_teste_123`, para todos os 6 usuários.
- **Quais são os usuários da LojaQA?** `usuario_padrao`, `usuario_bloqueado`, `usuario_problema`, `usuario_lento`, `usuario_erro` e `usuario_visual`.
- **Qual usuário usar para o teste de compra bem-sucedida (caminho feliz)?** `usuario_padrao`.
- **Qual o seletor do botão de adicionar um produto ao carrinho?** `#botao-carrinho-<slug>` (id) ou `[data-test="adicionar-carrinho-<slug>"]` (data-test), substituindo `<slug>` pelo slug do produto. Ex.: `[data-test="adicionar-carrinho-caneca-do-depurador"]`.
- **Qual o seletor do botão de remover um produto do carrinho?** `[data-test="remover-<slug>"]` (o id continua `#botao-carrinho-<slug>`).
- **Como ir para o carrinho?** Clicar no ícone do carrinho no topo: `#link-carrinho`.
- **Como verificar quantos itens há no carrinho?** Ler o texto do badge `#badge-carrinho`; ele fica oculto quando o carrinho está vazio.
- **Como finalizar a compra na LojaQA?** No carrinho, clicar em `#botao-finalizar-compra`; preencher `#campo-nome`, `#campo-sobrenome` e `#campo-cep` e clicar em `#botao-continuar`; na etapa de resumo, clicar em `#botao-finalizar`.
- **Como ordenar os produtos?** Usar o `<select>` `#seletor-ordenacao` com os valores `az`, `za`, `lohi` ou `hilo`.
- **Onde aparece a mensagem de erro do login?** No elemento `#texto-erro`, dentro de `#container-erro` (que fica visível com a classe `.visible`).
- **Qual usuário faz o login falhar/ser bloqueado?** `usuario_bloqueado` — mostra "Ops! Desculpe, este usuário foi bloqueado.".
- **Qual usuário deixa as imagens quebradas?** `usuario_problema` (imagens viram `img/broken.svg`).
- **Qual usuário deixa o login lento?** `usuario_lento` (~5s de atraso; `#botao-entrar` fica `disabled` com texto "Carregando...").
- **Qual usuário provoca erros nas ações?** `usuario_erro` (ordenação, adicionar itens de id ímpar e finalizar pedido falham, alguns com `alert`).
- **Qual usuário provoca defeitos visuais?** `usuario_visual` (o `body` recebe `.bugs-visuais`; há preços errados na vitrine para ids 0, 5, 10, 15 e 20).
- **Como gerar/baixar a nota fiscal em PDF?** Após finalizar o pedido, na página de conclusão clicar em `#botao-nota-fiscal`; na página da nota, clicar em `#botao-baixar-pdf` (que abre o diálogo de impressão do navegador).
- **Como preparar o estado do teste sem passar pela UI?** Definir `session-username` no `sessionStorage` e `cart-contents` no `localStorage` (ver a seção "Armazenamento").
- **Qual a taxa de imposto do checkout?** 8% sobre o subtotal.
