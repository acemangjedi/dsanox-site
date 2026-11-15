---
name: site-briefing
description: Usar ao começar um site novo de cliente do zero. Faz as perguntas do briefing ao dono do projeto e regista as respostas em docs/briefing.md, que é a única fonte de factos do site.
---

# Briefing de um site

Um site bom diz coisas que só este cliente pode dizer. Essas coisas não se
inventam: vêm de quem conhece o negócio. O briefing é a conversa em que as
recolhes e o ficheiro onde ficam guardadas. Tudo o que o site afirmar mais
tarde (um número, um preço, um nome, um prazo) tem de estar aqui ou no
inventário de um remake.

## O que perguntar

São nove temas. Pergunta-os por palavras tuas, um ou dois de cada vez, e
aproveita o que a pessoa já disse para não repetir.

1. **Para que serve o site** e o que deve fazer quem lá chega (ligar, pedir
   orçamento, marcar, comprar, visitar).
2. **Quem é o público:** quem decide, o que já sabe, o que o preocupa.
3. **O que se oferece,** e a que preço, se o preço for público.
4. **O que distingue este cliente** dos concorrentes diretos. Pede um exemplo
   concreto: «conta-me um trabalho de que te orgulhas».
5. **Que provas existem mesmo:** clientes que se podem nomear, números,
   testemunhos com autor, prémios, certificações, fotografias.
6. **Que tom usa a marca:** como fala com os clientes ao telefone, se trata por
   tu ou por você, que palavras nunca usaria.
7. **Que páginas tem de haver.**
8. **Contactos:** morada, telefones, email, horário, redes sociais.
9. **O que nunca pode aparecer:** concorrentes, serviços que já não presta,
   fotografias antigas.

Pergunta também pelas línguas do site, pelo domínio e por um a três sites de
que o cliente goste, com o que gosta em cada um. Os sites de referência servem
para a skill `site-direcoes`.

## Como ouvir

- Uma resposta vaga («temos muita experiência») é o início de uma pergunta:
  «há quantos anos? em que tipo de trabalho?». O que o site precisa é do facto
  por trás da frase.
- Quando a pessoa não sabe, regista a pergunta como aberta. Uma lacuna
  assinalada é útil; uma lacuna preenchida por ti é um erro que alguém vai
  publicar.
- Material já entregue (apresentações, folhetos, site antigo) lê-se primeiro.
  Só se pergunta o que lá não está.

## O que deixar: `docs/briefing.md`

```markdown
# Briefing: <nome do cliente>

Feito a <data>, com <quem respondeu>.

## Objetivo
## Público
## Oferta
## O que distingue
## Provas
## Tom
## Páginas
## Contactos
## Línguas e domínio
## Nunca
## Referências
## Imagens disponíveis
## Perguntas em aberto
```

- Escreve as respostas com as palavras de quem respondeu, sem as embelezar.
  O texto do site escreve-se depois.
- Em **Provas**, cada item leva a origem: «312 empresas desde 2015 (dito pelo
  cliente a 3 de março)».
- Em **Imagens disponíveis**, diz que fotografias reais existem, de quê e com
  que qualidade. A skill das direções propõe desenhos diferentes consoante
  haja ou não fotografia boa.
- **Perguntas em aberto** é uma lista numerada. Enquanto tiver itens, o site
  não é proposto para publicação.

No fim, mostra o briefing à pessoa e pede que confirme os factos. Depois
segue-se `site-direcoes`.
