---
name: site-rever
description: Usar quando as páginas de um site de cliente estão construídas e antes de o propor para publicação. Corre os portões de qualidade, pede a opinião de um crítico de contexto limpo e escreve docs/relatorio-qualidade.md.
---

# Rever o site

Quem construiu o site já não o vê como um visitante: sabe o que cada secção
queria ser. A revisão devolve esse olhar de duas formas. As medições apanham
o que se pode contar. O crítico, que só vê as capturas, o briefing e o
DESIGN.md, apanha o que se sente. No fim decide o dono do projeto, que
aprova na pré-visualização.

## Os portões

`pnpm portao` corre os que se medem e escreve o relatório. Enquanto esse
comando não existir no repositório, corre cada um à mão, pela ordem da
tabela, e regista o resultado.

| | Portão | Como | Passa quando |
|---|---|---|---|
| 1 | Build e testes | `pnpm run ci`, `pnpm build:local`, `pnpm test:e2e` | Não há erros. |
| 2 | Tiques de IA | `impeccable detect` sobre cada página aberta num browser (a página tem de estar renderizada), mais as frases de `frases.txt` procuradas no texto de `dist/` | Não encontra nenhum. |
| 3 | Desenho | `npx @google/design.md lint DESIGN.md` | Sem erros nem avisos de contraste. |
| 4 | Factos | Cada número, preço, nome de cliente, testemunho e certificação das páginas tem origem em `docs/briefing.md` ou `docs/inventario.md` | Todos têm origem. |
| 5 | Remake | Os factos e as ideias do inventário estão todos no site, não há factos novos, e cada endereço antigo responde ou redireciona | O que mudou no texto está nas Propostas, aceite pelo dono do projeto. |
| 6 | Lighthouse | Em telemóvel, todas as páginas | Desempenho 95 ou mais; as outras notas a 100. |
| 7 | Acessibilidade | axe em todas as páginas e teclado nos blocos usados | Zero violações. |
| 8 | Crítico | Ver abaixo | Todas as categorias com 8 ou mais. |
| 9 | Dono do projeto | Pré-visualização e relatório | Aprova. |

Notas:

- As páginas ocultas de propósito (`hidden` em `site.config.ts`) têm nota de
  SEO baixa no Lighthouse por não serem indexadas. Não contam.
- O portão 5 só existe num remake. O portão 4 lê-se página a página: é lento
  e é o que evita publicar um número que ninguém disse.
- Um portão que falha corrige-se na causa. Baixar o limite, esconder a
  página ou desligar o teste deixa o problema no site.
- Perguntas em aberto em `docs/briefing.md` impedem o pedido de publicação,
  mesmo com tudo o resto a passar.

## O crítico

O crítico é uma sessão de contexto limpo: um subagente que não viu a
construção. Recebe só isto:

- as capturas de todas as páginas a 1280 e 390 px (`docs/capturas/`);
- `DESIGN.md` e `docs/briefing.md`;
- as instruções de [critico.md](critico.md), tal como estão.

Não lhe contes o que tentaste fazer nem o que achas que ficou bem. O valor
dele está em não saber.

Recebes uma nota de 1 a 10 em oito categorias, cada uma com o que viu e onde.
Corrige o que estiver abaixo de 8, tira capturas novas e pede nova crítica a
um crítico novo. Ao fim de **três rondas** sem passar, para e mostra ao dono
do projeto o que continua a falhar e porquê: a partir daí é uma decisão de
desenho, e mais voltas só gastam tempo.

O crítico é uma opinião informada. Quando discordares de um reparo, escreve
no relatório porquê, em vez de o ignorar ou de lhe obedecer sem concordar.

## O relatório: `docs/relatorio-qualidade.md`

```markdown
# Relatório de qualidade: <site>, <data>

## Resumo            (passa ou não, e o que falta)
## Portões           (tabela: portão, resultado, medida)
## Lighthouse        (tabela: página, as quatro notas, LCP, CLS, peso)
## Crítico           (ronda a ronda: notas, reparos, o que mudou)
## Diferenças aceites (remake)
## Por decidir       (perguntas em aberto, reparos de que discordas)
```

Escreve o que mediste, com os números. «Passa» sem medida ao lado não ajuda
quem vai aprovar.

## Depois

Com tudo a passar, pede a publicação. A pré-visualização e o relatório ficam
à vista do dono do projeto, e a publicação é um clique dele. Se ele rejeitar
uma frase, junta-a a `frases.txt`, para nenhum site a voltar a usar.
