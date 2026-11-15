---
name: site-remake
description: Usar quando o cliente já tem um site e o quer refeito. Percorre o site antigo e o material entregue, e escreve docs/inventario.md e docs/briefing.md. O conteúdo fica igual; só muda o desenho.
---

# Remake de um site existente

Num remake o cliente já disse o que quer dizer: está no site que tem. O teu
trabalho é levar esse conteúdo inteiro para um desenho melhor. O inventário é a
prova de que nada se perdeu e a fonte de todos os factos do site novo.

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

## O que não se mexe, e o que se propõe

- **O texto do cliente fica como está.** As regras de escrita da skill
  `site-construir` valem para texto novo, e num remake quase não há texto novo.
- **Gralhas e erros** vão para uma lista de propostas («garantir e
  longevidade» → «garantir a longevidade»). O dono do projeto aceita ou
  recusa cada uma.
- **Texto que falta numa língua** traduz-se e fica marcado «a rever pelo
  cliente».
- **Endereços** mantêm-se. Onde a estrutura nova obrigar a mudar um, o antigo
  fica redirecionado em `site.config.ts`. Juntar ou dividir páginas é uma
  proposta, com a razão ao lado.
- **Imagens** do cliente reaproveitam-se. As de origem desconhecida (bancos de
  imagens, outras marcas) ficam numa lista para decisão.

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
## Propostas de correção
## Perguntas em aberto
```

E `docs/briefing.md` no formato da skill `site-briefing`, preenchido com o que
o inventário já responde. Os nove temas que o site antigo não esclarecer
perguntam-se ao dono do projeto, de uma vez.

A secção **O que não existe** é tão importante como as outras. Se o site
antigo não tem números, testemunhos nem certificações, o site novo também não
os tem, por muito que o desenho peça uma faixa de números.

## No fim

Compara o site novo com o inventário antes de o propor: todo o texto original
está lá, todos os endereços respondem ou redirecionam, todas as imagens do
cliente têm lugar ou uma razão para terem saído. As diferenças que sobrarem
mostram-se ao dono do projeto, que as aceita uma a uma.
