1. Chunks autocontidos — o maior problema do formato anterior era a tabela larga: quando o chunker fatia o documento, uma linha solta (| botão | #x | ... |) perde o cabeçalho e não se sabe de que página é. Agora cada elemento é uma frase completa que repete o contexto:

"Botão Entrar (login/submit) na página de Login da LojaQA: seletores #botao-entrar, [data-test="botao-entrar"], classes .btn e .btn_action..."

Retrieve isso isolado e ainda faz sentido total.

2. Palavras-chave repetidas para recall — cada seção começa com "página X da LojaQA (arquivo.html)" e cada elemento nomeia a página. Termos que o usuário busca aparecem juntos: "catálogo / vitrine / lista de produtos / inventário" na mesma frase, para casar com qualquer variação de query.

3. Front-matter YAML — metadados no topo (projeto, idioma, frameworks-alvo, convenção de seletores) que muitos pipelines de RAG indexam.

4. Seção de "Fatos gerais" — credenciais, taxa de imposto, URLs e chaves de storage num bloco denso, que responde diretamente perguntas factuais.

5. Seção FAQ (19 perguntas) — essa é a maior alavanca de recall: perguntas em linguagem natural ("Como fazer login?", "Qual usuário deixa as imagens quebradas?", "Como gerar a nota fiscal?") com a resposta e o seletor exato ao lado. Embeddings de perguntas casam muito melhor com queries reais de usuários.

6. Headings semânticos consistentes (## Página X da LojaQA) — bons pontos de corte para chunkers que dividem por cabeçalho.

7. Denormalização — eliminei referências do tipo "usa os mesmos seletores do carrinho": onde possível, os valores estão repetidos localmente para o chunk não depender de outro.
