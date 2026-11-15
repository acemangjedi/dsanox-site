---
name: site-direcoes
description: Usar depois do briefing (ou do inventário de um remake) e antes de construir páginas. Propõe três direções de desenho para o site, cada uma com um rascunho de DESIGN.md e a página inicial construída, e fixa a direção escolhida em DESIGN.md.
---

# Três direções de desenho

O dono do projeto escolhe melhor a ver do que a ler. Por isso cada direção é a
página inicial construída a sério, com o conteúdo verdadeiro do cliente, e não
uma descrição. Três, porque uma só é uma imposição e duas são uma votação;
com três percebe-se o que cada uma tem de seu.

## Antes de desenhar

Lê, por esta ordem:

1. `docs/briefing.md` e, num remake, `docs/inventario.md`. Repara sobretudo em
   **Objetivo**, **Público**, **Tom**, **Provas** e **Imagens disponíveis**.
2. A identidade que o cliente já tem: logótipo, cores, letra. A direção parte
   dela; não a copia nem a ignora.
3. Os sites de referência, se houver (ver abaixo).
4. O resumo do desenho dos outros sites feitos com este modelo, quando o
   painel o disponibilizar. Dois clientes não devem receber o mesmo site com
   outra cor.

Depois escreve, numa frase, **de onde vem o desenho**. O desenho de um site
sai do assunto dele: da matéria com que o cliente trabalha, dos objetos do
ofício, do sítio onde está, de como fala. Uma metalúrgica de precisão tem
desenho técnico, cotas, cordões de soldadura, aço escovado, a escala de uma
estrutura ao lado de uma pessoa. Um contabilista tem colunas, mapas mensais,
calma. É daqui que saem as três direções, e é por isso que não se parecem com
as de outro cliente.

## O que é uma direção

Cada direção tem:

- **Nome e ideia**, numa frase que o cliente perceba: «Oficina: o site como
  uma folha de obra, exata e sem enfeites».
- **Letras:** um par (títulos e texto), com licença aberta, alojado no site em
  `public/fonts/` só com os pesos usados. A letra faz a maior parte do
  carácter de um site; escolhe-a pelo que diz, não por ser a habitual.
- **Cor:** fundo, superfície, tinta, tinta secundária, linha e um acento, cada
  um com a sua função. Um acento usado em poucos sítios vale mais do que três
  usados em todos.
- **Composição:** o princípio que organiza as páginas (grelha rígida e
  alinhada à esquerda, coluna única de leitura, fotografia a toda a largura,
  assimetria com margens largas). É o que mais distingue duas direções.
- **Imagem:** que fotografias usa, em que tamanho e com que tratamento. Com
  boas fotografias do cliente, a direção pode viver delas. Sem elas, vive de
  letra, cor e desenho em SVG; fotografia de banco a encher não substitui.
- **Movimento:** o que se mexe, quando e porquê. Pouco e com intenção.
- **Um elemento próprio:** aquilo de que alguém se lembra no dia seguinte
  (uma numeração de secções como numa folha de obra, um título enorme cortado
  pela fotografia, uma linha de cota). Um por direção.
- **O risco:** onde esta direção pode falhar para este cliente. Dizê-lo ajuda
  a escolher.

As três têm de diferir na composição, nas letras e no uso de imagem. Se duas
só diferem na cor, são a mesma. Uma boa tríade costuma ter uma direção
próxima do que o cliente já é, uma mais sóbria e uma mais ousada.

## Afinar

O dono do projeto pode pedir mais ou menos de três coisas, de 1 a 10:

- **Ousadia** do layout: 3 é uma grelha clássica bem feita; 8 quebra a grelha
  com intenção.
- **Movimento:** 1 é nenhum; 5 são entradas discretas ao deslizar; 9 é
  movimento como parte da ideia.
- **Densidade:** 2 é muito ar e pouca coisa por ecrã; 8 é informação compacta,
  como um catálogo técnico.

Regista os três valores no DESIGN.md. Um pedido de afinação muda os valores e
a página, sem recomeçar a direção.

## Sites de referência

Abre cada um, tira capturas a 1280 e 390 px e escreve o que lá funciona em
termos de princípios: densidade, ritmo entre secções, hierarquia das letras,
uso de fotografia, navegação. São os princípios que passam para o DESIGN.md.
Cores, composições e textos de outro site ficam com ele: o objetivo é perceber
porque o cliente gosta daquilo, e dar-lhe essa qualidade num desenho que é
dele.

## Construir as três

1. Para cada direção, escreve `docs/direcoes/<a|b|c>/DESIGN.md` no formato da
   Google (`@google/design.md`): os tokens em YAML no topo, as intenções em
   prosa por baixo. Valida com `npx @google/design.md lint`. Um aviso de
   contraste conta como erro: corrige a cor.
2. Constrói a página inicial em `src/pages/direcoes/<a|b|c>.astro`, com o seu
   layout e o seu CSS (Tailwind, com o `@theme` tirado do DESIGN.md), e
   junta `/direcoes/` a `hidden` em `site.config.ts`. Usa o texto e as
   fotografias verdadeiros, na língua principal. Segue a skill
   `site-construir` no que toca a blocos, texto e imagens.
3. Tira capturas de página inteira a 1280 e 390 px com
   `node .claude/skills/site-construir/capturas.mjs`. Olha para elas como o
   cliente olharia. O primeiro ecrã diz o que a empresa faz e oferece uma
   ação? No telemóvel continua a ser a mesma direção, ou ficou uma pilha de
   blocos? Corrige antes de mostrar.

## Mostrar

Um quadro com as três, lado a lado: as capturas, o nome, a ideia, o par de
letras, as cores, o elemento próprio e o risco. Diz qual recomendas e porquê,
numa frase. A escolha é do dono do projeto.

## Depois da escolha

- O DESIGN.md escolhido passa para a raiz do repositório. É contra ele que o
  site é construído e revisto.
- A página escolhida passa a ser a página inicial; as outras duas e a pasta
  `src/pages/direcoes/` saem.
- `docs/direcoes/` fica, com as capturas, como registo do que foi proposto.
- Regista no painel o resumo do desenho (letras, cores, tipo de composição),
  quando essa ferramenta existir, para os próximos sites saírem diferentes.
