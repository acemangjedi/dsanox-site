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
- **Movimento:** o que se mexe, o que o provoca e porquê, no nível que o
  dono do projeto pediu ou que as referências mostram. Sempre com intenção:
  cada movimento ajuda a ler, a perceber ou a lembrar.
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

Quem indica um site de que gosta raramente sabe dizer porquê. Muitas vezes
gosta do que o site faz, e isso não se vê numa imagem parada: o que entra ao
deslizar, o que reage ao rato, como muda uma página para a outra. Por isso um
site de referência usa-se antes de se fotografar.

Para cada um:

1. **Usa-o.** Abre-o no browser a 1280 px, desliza devagar do topo ao fim,
   passa o rato pelos títulos, imagens, cartões e botões, abre o menu, muda de
   página. Repete a 390 px, a tocar em vez de apontar.
2. **Regista o que se move,** com
   `node .claude/skills/site-direcoes/movimento.mjs <endereço>`: guarda uma
   sequência de imagens da página a entrar, a deslizar e a reagir ao rato, e
   lista as animações, transições e bibliotecas de movimento que encontrou.
   Vê as imagens pela ordem; a lista só diz onde olhar.
3. **Escreve o que observaste,** em quatro partes:
   - **Movimento:** o que se mexe, o que o provoca (carregar a página,
     deslizar, passar o rato, a posição do cursor, o clique), quanto dura e
     para que serve. «Os títulos entram palavra a palavra ao deslizar, em
     cerca de 0,6 s»; «a fotografia do herói segue o cursor com atraso»; «o
     cursor passa a um círculo com "Ver" por cima dos projetos».
   - **Composição:** densidade, ritmo entre secções, grelha, margens.
   - **Letra e cor:** hierarquia, tamanhos, quantas cores e para quê.
   - **Imagem e navegação:** tamanho e tratamento das fotografias, como se
     anda no site.
4. **Diz o que as referências têm em comum.** É isso que o dono do projeto
   está a pedir. Três sites com muito movimento e resposta ao rato são um
   pedido de movimento, mesmo que ele só tenha dito «gosto destes».

Das referências saem os valores de partida de **ousadia**, **movimento** e
**densidade**, e as três direções propõem-se à volta deles. Se as referências
vivem de movimento, as três direções têm movimento a sério, cada uma à sua
maneira, e o dono do projeto vê-as a funcionar na pré-visualização, e não
só em capturas.

O que passa para o DESIGN.md são os princípios e o nível de cada coisa. As
cores, as composições, os textos e os efeitos copiados à letra ficam com o
site de origem: o objetivo é dar ao cliente aquela qualidade num desenho que
é dele.

### Movimento que se pode publicar

Movimento ambicioso cabe nos portões quando é feito com cuidado:

- anima `transform` e `opacity`, que não mexem no resto da página;
- o conteúdo está no HTML e vê-se sem JavaScript; o movimento melhora-o;
- com `prefers-reduced-motion` o site fica parado e completo;
- os efeitos de rato têm um equivalente no telemóvel e no teclado, ou não
  fazem falta lá;
- CSS primeiro (`transition`, `animation`, `animation-timeline: view()`);
  uma biblioteca só quando o efeito a pede, carregada depois do primeiro
  ecrã.

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
   `node .claude/skills/site-construir/capturas.mjs` e, se a direção tiver
   movimento, a sequência de `movimento.mjs`. Olha para elas como o
   cliente olharia. O primeiro ecrã diz o que a empresa faz e oferece uma
   ação? No telemóvel continua a ser a mesma direção, ou ficou uma pilha de
   blocos? Corrige antes de mostrar.

## Mostrar

Um quadro com as três, lado a lado: as capturas (e o endereço da
pré-visualização, havendo movimento), o nome, a ideia, o par de
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
