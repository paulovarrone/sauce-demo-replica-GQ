// ===== Gerador de PDF sem dependências =====
// PDF é um formato de texto: este módulo monta o arquivo byte a byte, usando as
// fontes padrão Helvetica e Helvetica-Bold (presentes em qualquer leitor, não
// precisam ser embutidas). Implementa só o necessário para a nota fiscal:
// texto, linhas, retângulos e download.
//
// Sistema de coordenadas: a API usa "y a partir do topo" (como o CSS); a
// conversão para o eixo do PDF (origem embaixo à esquerda) é feita internamente.

const PDF_LARGURA_A4 = 595.28;
const PDF_ALTURA_A4 = 841.89;

// Largura dos glifos (em milésimos do tamanho da fonte) dos caracteres 32 a 126.
// Necessárias para alinhar texto à direita e centralizar.
const PDF_LARGURAS_NORMAL = [
  278, 278, 355, 556, 556, 889, 667, 191, 333, 333, 389, 584, 278, 278, 278, 278,
  556, 556, 556, 556, 556, 556, 556, 556, 556, 556, 278, 278, 584, 584, 584, 556,
  1015, 667, 667, 722, 722, 667, 611, 778, 722, 278, 500, 667, 556, 833, 722, 778,
  667, 778, 722, 667, 611, 722, 667, 944, 667, 667, 611, 278, 278, 278, 469, 556,
  333, 556, 556, 500, 556, 556, 278, 556, 556, 222, 222, 500, 222, 833, 556, 556,
  556, 556, 333, 500, 278, 556, 500, 722, 500, 500, 500, 334, 260, 334, 584
];
const PDF_LARGURAS_NEGRITO = [
  278, 333, 474, 556, 556, 889, 722, 238, 333, 333, 389, 584, 278, 333, 278, 278,
  556, 556, 556, 556, 556, 556, 556, 556, 556, 556, 333, 333, 584, 584, 584, 611,
  975, 722, 722, 722, 722, 667, 611, 778, 722, 278, 556, 722, 611, 833, 722, 778,
  667, 778, 722, 667, 611, 722, 667, 944, 667, 667, 611, 333, 278, 333, 584, 556,
  333, 556, 611, 556, 611, 556, 333, 611, 611, 278, 278, 556, 278, 889, 611, 611,
  611, 611, 389, 556, 333, 611, 556, 778, 556, 556, 500, 389, 280, 389, 584
];

// Em Helvetica um caractere acentuado tem a mesma largura da letra base.
// Esta tabela mapeia os códigos WinAnsi 192-255 para essa letra.
const PDF_LETRA_BASE = "AAAAAAAC" + "EEEEIIII" + "DNOOOOO+" + "OUUUUYPs" +
                       "aaaaaaac" + "eeeeiiii" + "onooooo+" + "ouuuuypy";

// Caracteres fora do Latin-1 que o WinAnsiEncoding posiciona na faixa 0x80-0x9F.
const PDF_WINANSI_ESPECIAIS = {
  "€": 0x80, "‚": 0x82, "ƒ": 0x83, "„": 0x84, "…": 0x85,
  "†": 0x86, "‡": 0x87, "ˆ": 0x88, "‰": 0x89, "Š": 0x8A,
  "‹": 0x8B, "Œ": 0x8C, "Ž": 0x8E, "‘": 0x91, "’": 0x92,
  "“": 0x93, "”": 0x94, "•": 0x95, "–": 0x96, "—": 0x97,
  "˜": 0x98, "™": 0x99, "š": 0x9A, "›": 0x9B, "œ": 0x9C,
  "ž": 0x9E, "Ÿ": 0x9F
};

// Larguras dos poucos glifos usados da faixa 0x80-0x9F (o resto cai no padrão).
const PDF_LARGURAS_ESPECIAIS = {
  0x85: 1000, 0x91: 222, 0x92: 222, 0x93: 333, 0x94: 333,
  0x95: 350, 0x96: 556, 0x97: 1000
};

// Converte um caractere para o seu código no WinAnsiEncoding.
// Devolve -1 para o que não é representável (emoji, por exemplo), que é descartado.
function pdfCodigoWinAnsi(ch) {
  const code = ch.charCodeAt(0);
  if (code >= 32 && code <= 126) return code;
  if (code >= 160 && code <= 255) return code;
  if (PDF_WINANSI_ESPECIAIS[ch] !== undefined) return PDF_WINANSI_ESPECIAIS[ch];
  return -1;
}

// Texto -> string em que todo caractere tem código 0-255, para o comprimento em
// caracteres coincidir com o comprimento em bytes (o xref depende disso).
function pdfParaWinAnsi(texto) {
  let saida = "";
  for (const ch of String(texto)) {
    const code = pdfCodigoWinAnsi(ch);
    if (code >= 0) saida += String.fromCharCode(code);
  }
  return saida;
}

// Dentro de um literal PDF, "(", ")" e "\" precisam de barra invertida.
function pdfEscapar(texto) {
  return texto.replace(/([\\()])/g, "\\$1");
}

// Largura do texto em pontos, já no tamanho de fonte pedido.
function pdfLarguraTexto(texto, tamanho, negrito) {
  const tabela = negrito ? PDF_LARGURAS_NEGRITO : PDF_LARGURAS_NORMAL;
  let total = 0;
  for (const ch of pdfParaWinAnsi(texto)) {
    const code = ch.charCodeAt(0);
    if (code >= 32 && code <= 126) {
      total += tabela[code - 32];
    } else if (code >= 192) {
      total += tabela[PDF_LETRA_BASE.charCodeAt(code - 192) - 32];
    } else {
      total += PDF_LARGURAS_ESPECIAIS[code] || 556;
    }
  }
  return (total * tamanho) / 1000;
}

// Formata número no padrão do PDF (sem notação científica, sem casas demais).
// 4 casas porque o mesmo formatador escreve a matriz de rotação do texto, onde
// arredondar demais deformaria o glifo.
function pdfNumero(valor) {
  return (Math.round(valor * 10000) / 10000).toString();
}

// Cria um documento. Devolve um objeto com os métodos de desenho e `bytes()`.
function criarPdf() {
  const paginas = [[]];
  let atual = 0;

  function ops() {
    return paginas[atual];
  }

  // y do usuário (a partir do topo) -> y do PDF (a partir da base)
  function paraEixoPdf(y) {
    return PDF_ALTURA_A4 - y;
  }

  function corRgb(cor) {
    return cor.map(pdfNumero).join(" ");
  }

  const doc = {
    largura: PDF_LARGURA_A4,
    altura: PDF_ALTURA_A4,

    novaPagina() {
      paginas.push([]);
      atual = paginas.length - 1;
    },

    // Escreve texto. `alinhamento` aceita "esquerda", "direita" ou "centro";
    // nos dois últimos, `x` é a borda direita ou o centro. `rotacao` em graus.
    texto(conteudo, x, y, opcoes = {}) {
      const tamanho = opcoes.tamanho || 10;
      const negrito = !!opcoes.negrito;
      const cor = opcoes.cor || [0, 0, 0];
      const texto = pdfParaWinAnsi(conteudo);
      if (!texto) return;

      let posX = x;
      if (opcoes.alinhamento === "direita") {
        posX = x - pdfLarguraTexto(conteudo, tamanho, negrito);
      } else if (opcoes.alinhamento === "centro") {
        posX = x - pdfLarguraTexto(conteudo, tamanho, negrito) / 2;
      }

      const rad = ((opcoes.rotacao || 0) * Math.PI) / 180;
      const cos = pdfNumero(Math.cos(rad));
      const sen = pdfNumero(Math.sin(rad));
      const matriz = [cos, sen, pdfNumero(-Math.sin(rad)), cos,
                      pdfNumero(posX), pdfNumero(paraEixoPdf(y))].join(" ");

      ops().push(
        "BT /" + (negrito ? "F2" : "F1") + " " + pdfNumero(tamanho) + " Tf " +
        corRgb(cor) + " rg " + matriz + " Tm (" + pdfEscapar(texto) + ") Tj ET"
      );
    },

    linha(x1, y1, x2, y2, opcoes = {}) {
      const cor = opcoes.cor || [0, 0, 0];
      ops().push(
        pdfNumero(opcoes.espessura || 0.5) + " w " + corRgb(cor) + " RG " +
        pdfNumero(x1) + " " + pdfNumero(paraEixoPdf(y1)) + " m " +
        pdfNumero(x2) + " " + pdfNumero(paraEixoPdf(y2)) + " l S"
      );
    },

    retangulo(x, y, largura, altura, opcoes = {}) {
      const cor = opcoes.cor || [0, 0, 0];
      ops().push(
        corRgb(cor) + " rg " + pdfNumero(x) + " " +
        pdfNumero(paraEixoPdf(y + altura)) + " " +
        pdfNumero(largura) + " " + pdfNumero(altura) + " re f"
      );
    },

    larguraTexto: pdfLarguraTexto,

    // Monta o arquivo completo e devolve os bytes.
    bytes() {
      const n = paginas.length;
      const fonteNormal = 3 + 2 * n;
      const fonteNegrito = 4 + 2 * n;
      const objetos = [];

      objetos[1] = "<< /Type /Catalog /Pages 2 0 R >>";
      const filhos = paginas.map((_, i) => (3 + i) + " 0 R").join(" ");
      objetos[2] = "<< /Type /Pages /Kids [" + filhos + "] /Count " + n + " >>";

      paginas.forEach((comandos, i) => {
        objetos[3 + i] =
          "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 " +
          pdfNumero(PDF_LARGURA_A4) + " " + pdfNumero(PDF_ALTURA_A4) + "] " +
          "/Resources << /Font << /F1 " + fonteNormal + " 0 R /F2 " + fonteNegrito +
          " 0 R >> >> /Contents " + (3 + n + i) + " 0 R >>";

        const fluxo = comandos.join("\n");
        objetos[3 + n + i] =
          "<< /Length " + fluxo.length + " >>\nstream\n" + fluxo + "\nendstream";
      });

      objetos[fonteNormal] =
        "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>";
      objetos[fonteNegrito] =
        "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>";

      // O xref guarda o deslocamento em bytes de cada objeto: por isso o arquivo
      // é montado como string de bytes (todo caractere tem código 0-255).
      let arquivo = "%PDF-1.4\n";
      const deslocamentos = [];
      for (let i = 1; i < objetos.length; i++) {
        deslocamentos[i] = arquivo.length;
        arquivo += i + " 0 obj\n" + objetos[i] + "\nendobj\n";
      }

      const inicioXref = arquivo.length;
      arquivo += "xref\n0 " + objetos.length + "\n0000000000 65535 f \n";
      for (let i = 1; i < objetos.length; i++) {
        arquivo += String(deslocamentos[i]).padStart(10, "0") + " 00000 n \n";
      }
      arquivo += "trailer\n<< /Size " + objetos.length + " /Root 1 0 R >>\n" +
                 "startxref\n" + inicioXref + "\n%%EOF\n";

      return Uint8Array.from(arquivo, (ch) => ch.charCodeAt(0) & 0xff);
    }
  };

  return doc;
}

// Dispara o download dos bytes como arquivo PDF.
function baixarPdf(bytes, nomeArquivo) {
  const blob = new Blob([bytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = nomeArquivo;
  link.hidden = true;
  document.body.appendChild(link);
  link.click();
  link.remove();
  // revoga no próximo tick: alguns navegadores ainda leem a URL durante o clique
  setTimeout(() => URL.revokeObjectURL(url), 0);
}
