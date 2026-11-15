---
name: site-remake
description: Usar quando o cliente já tem um site e o quer refeito. Percorre o site antigo e o material entregue, e escreve docs/inventario.md e docs/briefing.md. Os factos do cliente mantêm-se; o desenho, o texto e o SEO saem melhores.
---

# Remake de um site existente

Um remake não é uma cópia com outra roupa. O cliente pede um site novo porque
o antigo já não o representa, e isso costuma valer para o texto tanto como
para o desenho: páginas com meia dúzia de títulos, uma apresentação comercial
bem mais rica do que o site, nada pensado para quem procura no Google.

O teu trabalho tem duas metades. A primeira é recolher tudo o que o cliente
já disse, em todas as fontes, sem perder nada: é o inventário, e é dele que
saem os factos. A segunda é fazer melhor com esse material: escolher a versão
mais rica, organizar, escrever o que falta para ligar as partes, e pôr o site
a responder ao que as pessoas procuram. O que se mantém são os factos e o
sentido. As palavras podem e devem melhorar.

## Percorrer

1. Abre a página inicial e segue todas as ligações internas até não haver
   páginas novas. Se o site tiver `sitemap.xml`, usa-o para confirmar.
2. De cada página guarda: endereço, título, descrição para o Google, títulos
   de secção, texto completo, imagens (endereço e texto alternativo),
   formulários e os seus campos, ligações para fora.
3. Lê também o material que o dono do projeto entregou (apresentações,
   folhetos). Cruza-o com o site, página a página.
4. Descarrega as imagens que forem do cliente para `docs/originais/`. Um site
   que não deixe descarregar fica assinalado; pede os ficheiros.

## Decidir entre fontes

Quando duas fontes dizem a mesma coisa de forma diferente, escolhe uma regra,
escreve-a no topo do inventário e aplica-a sempre. A regra habitual: vale a
fonte mais recente e mais bem escrita, e as exceções ficam assinaladas uma a
uma.

## O que se mantém e o que melhoras

**Mantém-se, sempre:**

- **Os factos.** Nomes, moradas, contactos, serviços, números, certificações.
  O que o cliente não afirma em nenhuma fonte, o site novo não afirma.
- **O sentido e o tom.** A missão reescrita continua a ser a missão deles.
- **Textos formais** (política da qualidade, termos, declarações): ficam
  palavra a palavra, e traduzem-se quando falta uma língua.
- **Os endereços** que têm tráfego ou ligações de fora. Onde a estrutura nova
  obrigar a mudar um, o antigo fica redirecionado em `site.config.ts`.

**Melhoras, e mostras o que fizeste:**

- **Texto.** Segue [escrita.md](../site-construir/escrita.md): títulos que
  dizem o que a empresa faz, frases concretas, botões claros. Onde o cliente
  escreveu bem, fica. Onde uma lista de palavras soltas pode ser uma frase
  que explica o serviço com os factos do inventário, escreve-a.
- **Estrutura.** Juntar páginas que se repetem, dividir uma que mistura
  assuntos, dar uma página própria a um serviço que as pessoas procuram pelo
  nome.
- **SEO.** Para cada página, o que procura quem precisa disto e em que
  palavras («soldadura de tubagem inox», «estruturas metálicas Famalicão»).
  Essas palavras entram no título, na descrição, no título principal e no
  primeiro parágrafo, de forma natural. Cada página tem um assunto, um título
  e uma descrição próprios. Ligações internas entre páginas relacionadas,
  texto alternativo que descreve as fotografias, dados estruturados do
  negócio, e cada língua com as suas pesquisas e não uma tradução das
  palavras-chave portuguesas.
- **Conteúdo novo que os factos permitem.** Perguntas frequentes tiradas do
  que a apresentação responde, uma explicação de como decorre um trabalho,
  uma página por área de serviço. Só com o que as fontes dizem; o que faltar
  é uma pergunta em aberto, e uma boa pergunta ao cliente também é valor.
- **Gralhas e erros** corrigem-se («garantir e longevidade» → «garantir a
  longevidade»).
- **Imagens.** As do cliente reaproveitam-se, com melhor corte e tamanho. As
  de origem desconhecida ficam numa lista para decisão.

O dono do projeto vê o que mudou. Em `docs/inventario.md`, a secção
**Propostas** lista cada melhoria com o antes, o depois e a razão, em três
grupos: texto reescrito, estrutura e SEO, conteúdo novo. Ele aceita, recusa
ou afina, e o cliente final aprova o texto que é seu.

## O que deixar

`docs/inventario.md`, com estas partes:

```markdown
# Inventário: <nome>

Fontes e regra de escolha entre elas.

## A empresa            (tabela: campo, valor, fonte)
## Páginas propostas     (tabela: página nova, endereço em cada língua, de onde vem)
## Endereços antigos     (o que se mantém, o que se redireciona)
## Conteúdo por secção   (o texto, ou onde está, língua a língua)
## O que não existe e não se inventa
## Imagens
## Identidade atual      (logótipo, cores, letra, tipo de fotografia)
## Propostas             (texto reescrito; estrutura e SEO; conteúdo novo)
## Perguntas em aberto
```

E `docs/briefing.md` no formato da skill `site-briefing`, preenchido com o que
o inventário já responde. Os nove temas que o site antigo não esclarecer
perguntam-se ao dono do projeto, de uma vez.

A secção **O que não existe** é tão importante como as outras. Se o site
antigo não tem números, testemunhos nem certificações, o site novo também não
os tem, por muito que o desenho peça uma faixa de números.

## No fim

Compara o site novo com o inventário antes de o propor: todos os factos e
todas as ideias do cliente estão lá, nenhum facto novo apareceu, todos os
endereços respondem ou redirecionam, todas as imagens do cliente têm lugar ou
uma razão para terem saído. O que mudou está nas Propostas, aceite pelo dono
do projeto.
