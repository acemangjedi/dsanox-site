---
name: site-construir
description: Usar para construir ou alterar as páginas de um site de cliente depois de haver DESIGN.md. Constrói uma página de cada vez com os blocos de base e secções próprias, com o texto e as imagens verdadeiros, e confirma cada página em capturas antes de passar à seguinte.
---

# Construir as páginas

O DESIGN.md na raiz diz como é este site. O briefing e o inventário, em
`docs/`, dizem o que ele afirma. Tu juntas os dois, página a página. O que o
visitante deve sentir é que o site foi feito para esta empresa, por alguém que
a conhece.

Lê primeiro `DESIGN.md`, `docs/briefing.md`, `docs/inventario.md` (se
existir) e `context/conventions.md`. Para o texto, lê [escrita.md](escrita.md).

## O que já está feito, e o que é teu

**A base** (`src/core/`) é igual em todos os sites e não se edita aqui:

- Componentes: `Seo`, `LeadForm`, `CookieBanner`, `Analytics`, `Utm`.
- Blocos em `src/core/blocks/`: `Tabs`, `Accordion`, `Modal`, `Slider`,
  `Menu`, `Figure`, `LangSwitch`. Trazem o comportamento, o teclado e o ARIA
  certos, e nenhum aspeto. Dás-lhes o aspeto no CSS do site, pelos papéis e
  atributos (`[role="tab"][aria-selected="true"]`, `details[open]`, `dialog`).
  A página `/blocos/` do modelo mostra todos estilizados.
- As palavras do formulário e do aviso de cookies, nas três línguas.

**O resto é do site e escreves tu:** layouts, cabeçalho, rodapé, secções,
páginas, CSS. Não há secções prontas de propósito. Um herói, uma grelha de
serviços ou uma faixa de contacto são HTML e CSS simples, e é ao escrevê-los
para este cliente que o site deixa de parecer um modelo.

## Preparar

1. `site.config.ts`: nome, endereço, línguas (`lang` e `locales`), morada,
   contactos, chaves do painel e do formulário. As chaves vão-se buscar ao
   painel com a skill `site-painel`, que também lá define as línguas e os
   campos extra dos artigos.
2. O tema: `src/styles/site.css` com `@import "tailwindcss"`, os `@font-face`
   e o `@theme` gerado do DESIGN.md
   (`npx @google/design.md export --format css-tailwind DESIGN.md`). Liga as
   variáveis que a base lê às do tema, como explica `context/conventions.md`.
3. As letras em `public/fonts/`, em woff2, só nos pesos usados, com `preload`
   das que aparecem no primeiro ecrã.
4. As páginas de demonstração do modelo saem. Ficam as legais, com o texto
   adaptado ao cliente.

## Línguas

Num site com mais de uma língua, cada página é um componente que recebe a
língua, e cada endereço é um ficheiro mínimo que o chama:

```
src/paginas/Sobre.astro           o desenho da página, uma vez
src/textos/pt.ts, en.ts, fr.ts    os textos, com as mesmas chaves
src/pages/sobre-nos.astro         <Sobre lang="pt" />
src/pages/en/about.astro          <Sobre lang="en" />
src/pages/fr/a-propos.astro       <Sobre lang="fr" />
```

Os ficheiros de texto partilham um tipo, para o build falhar quando falta uma
frase numa língua. Cada página passa os seus endereços nas outras línguas a
`Seo` e a `LangSwitch` (`alternates`), e o layout põe em `<html lang>` a
língua da página. Uma tradução que escreveste tu fica listada em
`docs/briefing.md`, em «a rever pelo cliente».

## Uma página de cada vez

Para cada página, pela ordem em que o visitante as encontra:

1. **Decide o que a página tem de conseguir** e o que o visitante deve fazer
   no fim. Daí sai a ordem das secções. Uma página não precisa de todas as
   secções habituais; precisa das que o conteúdo deste cliente enche.
2. **Escreve a página** com o texto verdadeiro. Texto de enchimento esconde
   os problemas que o texto real revela: o título que não cabe, a lista com
   dois itens em vez de seis.
3. **Tira capturas** a 1280 e 390 px:
   `node .claude/skills/site-construir/capturas.mjs /sobre-nos/`
   (com `pnpm preview` a correr; ficam em `docs/capturas/`).
4. **Olha para elas** com o DESIGN.md ao lado, e corrige. Só depois passa à
   página seguinte.

O que procurar nas capturas:

- **Hierarquia.** Em cada ecrã há uma coisa que se lê primeiro, e é a certa.
  Se tudo tem o mesmo peso, nada se lê.
- **Ritmo.** As secções não têm todas a mesma altura, o mesmo fundo e a mesma
  estrutura. Uma secção densa a seguir a uma larga dá vontade de continuar.
- **Alinhamento.** As margens repetem-se. Um elemento fora da grelha está
  fora de propósito, e vê-se que é de propósito.
- **Texto.** Linhas de leitura entre 45 e 75 letras. Nenhum título com uma
  palavra sozinha na última linha.
- **Telemóvel.** É a mesma ideia a 390 px, e não uma pilha de blocos
  centrados. Nada sai do ecrã para o lado. Os alvos de toque têm 44 px.
- **Fidelidade.** As letras, as cores e os espaços são os do DESIGN.md. O
  elemento próprio da direção aparece, e não em todo o lado.

## Imagens

A ordem é sempre: fotografias do cliente, depois Unsplash, depois desenho.

- **Do cliente:** em `src/assets/`, mostradas com `Figure`, que trata dos
  tamanhos e do formato. O texto alternativo descreve o que se vê («Soldador
  a unir duas secções de tubagem em aço inoxidável»). A imagem do primeiro
  ecrã leva `priority`.
- **Unsplash:** só para o que o cliente não tem e a página precisa, pedido
  pela ferramenta do painel. O crédito vai para a página de créditos, ligada
  no rodapé, e nunca fica junto da fotografia.
- **Desenho:** ícones, padrões e ilustrações em SVG, feitos para este site.
- Uma fotografia entra se mostrar algo verdadeiro deste negócio. Pessoas
  geradas, ou imagens geradas a passar por fotografias da empresa, enganam o
  visitante e não entram.
- Dá a todas o mesmo tratamento (corte, cor, contraste), o que o DESIGN.md
  definir. É isso que faz doze fotografias parecerem uma série.

## Factos

Cada número, preço, nome de cliente, testemunho, certificação e morada do
site está em `docs/briefing.md` ou `docs/inventario.md`. Quando o desenho
pede um facto que não existe (uma faixa de números, uma fila de logótipos de
clientes), muda-se o desenho. Quando falta um facto que o cliente pode ter,
pergunta-se, e a pergunta fica nas perguntas em aberto do briefing.

## Formulário e páginas da base

- `LeadForm` com a chave de `site.config.ts`. Dás-lhe o aspeto pelas classes
  listadas em `context/conventions.md`.
- Cada língua tem as suas páginas de privacidade, cookies e agradecimento,
  nos endereços que `pathOf` devolve.
- Cada página tem um `Seo` com título até 60 letras e descrição entre 70 e
  160, escritos para quem procura, na língua da página.

## Antes de dizer que está feito

`pnpm run ci` e `pnpm test:e2e` passam, e todas as páginas têm capturas
vistas. Depois corre a skill `site-rever`.
