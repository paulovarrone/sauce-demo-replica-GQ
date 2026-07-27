// ===== Nota fiscal (documento fictício para prática de testes) =====

requireLogin();

const pedido = JSON.parse(sessionStorage.getItem("ultimo-pedido") || "null");

const notaEl = document.getElementById("nota-fiscal");
const semPedidoEl = document.getElementById("pedido-nao-encontrado");

if (!pedido) {
  notaEl.hidden = true;
  semPedidoEl.hidden = false;
} else {
  document.getElementById("numero-pedido").textContent = pedido.numero;
  document.getElementById("data-emissao").textContent = pedido.data + " " + pedido.hora;

  const cliente = pedido.cliente || {};
  document.getElementById("cliente-nome").textContent =
    [cliente.first, cliente.last].filter(Boolean).join(" ") || "Não informado";
  document.getElementById("cliente-cep").textContent = "CEP: " + (cliente.postal || "—");

  const tbody = document.getElementById("itens-nota");
  const template = document.getElementById("modelo-linha-item");

  pedido.itens.forEach((item, i) => {
    const node = template.content.cloneNode(true);
    node.querySelector('[data-test="linha-numero"]').textContent = i + 1;
    node.querySelector('[data-test="linha-descricao"]').textContent = item.nome;
    node.querySelector('[data-test="linha-valor"]').textContent = money(item.preco);
    tbody.appendChild(node);
  });

  document.getElementById("nota-subtotal").textContent = "Subtotal: " + money(pedido.subtotal);
  document.getElementById("nota-imposto").textContent = "Impostos (8%): " + money(pedido.imposto);
  document.getElementById("nota-total").textContent = "Total: " + money(pedido.total);
}

// ===== Geração do PDF =====
// O arquivo é montado pelo js/pdf.js e baixado direto.

const NF_MARGEM = 40;
const NF_DIREITA = PDF_LARGURA_A4 - NF_MARGEM;
const NF_ALTURA_LINHA = 18;
const NF_LIMITE_RODAPE = PDF_ALTURA_A4 - 90; // abaixo disso, quebra a página

const NF_CINZA = [0.42, 0.42, 0.42];
const NF_AZUL = [0.11, 0.27, 0.42];
const NF_BORDA = [0.78, 0.84, 0.89];

// Cabeçalho do documento: emitente à esquerda, identificação à direita.
function desenharCabecalhoNota(doc, pedido) {
  doc.texto("LojaQA", NF_MARGEM, 58, { tamanho: 21, negrito: true, cor: NF_AZUL });
  doc.texto("LojaQA Comércio Educacional Ltda. (empresa fictícia)", NF_MARGEM, 76,
    { tamanho: 8, cor: NF_CINZA });
  doc.texto("CNPJ: 00.000.000/0001-00", NF_MARGEM, 88, { tamanho: 8, cor: NF_CINZA });
  doc.texto("Av. da Qualidade, 404 — São Paulo/SP", NF_MARGEM, 100, { tamanho: 8, cor: NF_CINZA });

  doc.texto("NOTA FISCAL", NF_DIREITA, 56,
    { tamanho: 15, negrito: true, alinhamento: "direita", cor: NF_AZUL });
  doc.texto("Documento fictício para prática de testes", NF_DIREITA, 70,
    { tamanho: 7.5, alinhamento: "direita", cor: NF_CINZA });
  doc.texto("Nº " + pedido.numero, NF_DIREITA, 88, { tamanho: 10, alinhamento: "direita" });
  doc.texto("Emissão: " + pedido.data + " " + pedido.hora, NF_DIREITA, 101,
    { tamanho: 9, alinhamento: "direita" });

  doc.linha(NF_MARGEM, 115, NF_DIREITA, 115, { cor: NF_BORDA });
}

// Marca d'água diagonal, equivalente ao .nf_marca_dagua da tela.
function desenharMarcaDagua(doc) {
  doc.texto("SEM VALOR FISCAL", 90, 620,
    { tamanho: 42, negrito: true, rotacao: 32, cor: [0.93, 0.93, 0.93] });
}

// Cabeçalho da tabela de itens. Devolve o y da primeira linha de dados.
function desenharCabecalhoTabela(doc, y) {
  doc.retangulo(NF_MARGEM, y - 12, NF_DIREITA - NF_MARGEM, 18, { cor: [0.93, 0.96, 0.98] });
  doc.texto("Item", NF_MARGEM + 6, y, { tamanho: 9, negrito: true });
  doc.texto("Descrição", NF_MARGEM + 44, y, { tamanho: 9, negrito: true });
  doc.texto("Qtd", 430, y, { tamanho: 9, negrito: true, alinhamento: "centro" });
  doc.texto("Valor", NF_DIREITA - 6, y, { tamanho: 9, negrito: true, alinhamento: "direita" });
  return y + 24;
}

// Corta a descrição para não invadir a coluna de quantidade.
function encurtar(texto, larguraMaxima, tamanho) {
  if (pdfLarguraTexto(texto, tamanho, false) <= larguraMaxima) return texto;
  let corte = texto;
  while (corte.length > 1 && pdfLarguraTexto(corte + "…", tamanho, false) > larguraMaxima) {
    corte = corte.slice(0, -1);
  }
  return corte + "…";
}

function desenharItens(doc, pedido, yInicial) {
  let y = yInicial;
  pedido.itens.forEach((item, i) => {
    if (y > NF_LIMITE_RODAPE) {
      doc.novaPagina();
      y = desenharCabecalhoTabela(doc, 60);
    }
    doc.texto(String(i + 1), NF_MARGEM + 6, y, { tamanho: 9.5 });
    doc.texto(encurtar(item.nome, 330, 9.5), NF_MARGEM + 44, y, { tamanho: 9.5 });
    doc.texto("1", 430, y, { tamanho: 9.5, alinhamento: "centro" });
    doc.texto(money(item.preco), NF_DIREITA - 6, y, { tamanho: 9.5, alinhamento: "direita" });
    doc.linha(NF_MARGEM, y + 6, NF_DIREITA, y + 6, { espessura: 0.3, cor: NF_BORDA });
    y += NF_ALTURA_LINHA;
  });
  return y;
}

function desenharTotais(doc, pedido, yInicial) {
  let y = yInicial + 14;
  doc.texto("Subtotal: " + money(pedido.subtotal), NF_DIREITA, y,
    { tamanho: 10, alinhamento: "direita" });
  y += 15;
  doc.texto("Impostos (8%): " + money(pedido.imposto), NF_DIREITA, y,
    { tamanho: 10, alinhamento: "direita" });
  y += 19;
  doc.texto("Total: " + money(pedido.total), NF_DIREITA, y,
    { tamanho: 13, negrito: true, alinhamento: "direita", cor: NF_AZUL });
  return y;
}

function desenharDestinatario(doc, pedido) {
  const cliente = pedido.cliente || {};
  const nome = [cliente.first, cliente.last].filter(Boolean).join(" ") || "Não informado";
  doc.texto("Destinatário", NF_MARGEM, 140, { tamanho: 11, negrito: true, cor: NF_AZUL });
  doc.texto(nome, NF_MARGEM, 157, { tamanho: 10 });
  doc.texto("CEP: " + (cliente.postal || "—"), NF_MARGEM, 171, { tamanho: 10 });
}

function desenharAviso(doc) {
  const y = PDF_ALTURA_A4 - 50;
  doc.linha(NF_MARGEM, y - 14, NF_DIREITA, y - 14, { cor: NF_BORDA });
  doc.texto(
    "Documento sem valor fiscal — gerado por uma aplicação educacional de prática de testes de automação.",
    PDF_LARGURA_A4 / 2, y, { tamanho: 7.5, alinhamento: "centro", cor: NF_CINZA }
  );
}

function gerarPdfNota(pedido) {
  const doc = criarPdf();
  desenharMarcaDagua(doc);
  desenharCabecalhoNota(doc, pedido);
  desenharDestinatario(doc, pedido);
  const yItens = desenharCabecalhoTabela(doc, 205);
  const yFim = desenharItens(doc, pedido, yItens);
  desenharTotais(doc, pedido, yFim);
  desenharAviso(doc);
  return doc.bytes();
}

// "Baixar PDF" gera e baixa o arquivo direto.
document.getElementById("botao-baixar-pdf").addEventListener("click", () => {
  if (!pedido) return;
  baixarPdf(gerarPdfNota(pedido), "nota-fiscal-" + pedido.numero + ".pdf");
});
