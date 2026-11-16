---
name: site-painel
description: Usar sempre que o site precise de alguma coisa do painel (criar o cliente e o site, ir buscar as chaves, criar um formulário, definir as línguas e os campos extra dos artigos, configurar ou pedir uma publicação, convidar o cliente, guardar artigos). Faz-se com as ferramentas do painel em vez de pedir ao dono do projeto que o faça à mão.
---

# O painel, sem pedir a ninguém

O painel (`panel.url` em `site.config.ts`) guarda os clientes, os sites, os
formulários, os leads e os artigos. Tudo o que o administrador lá faz à mão
para pôr um site a funcionar, podes fazê-lo tu. Pedir ao dono do projeto que
crie o site, copie uma chave ou cole um token é tempo dele gasto em trabalho
teu, e foi por isso que estas ferramentas foram feitas.

## Como lá chegas

O repositório traz o servidor MCP `painel` em `.mcp.json`. Quando está ligado,
as ações abaixo aparecem como ferramentas (`create_client`, `get_site`, …).

Se as ferramentas não estiverem lá, a mesma chave serve por HTTP:

```sh
curl -s -X POST "https://painel.simplelife.uno/api/v1/admin/get_site" \
  -H "Authorization: Bearer $PAINEL_API_KEY" \
  -H "Content-Type: application/json" -d '{"siteId": 3}'
```

Se nem a variável `PAINEL_API_KEY` existir, diz ao dono do projeto, uma vez e
numa frase, o que falta: criar uma chave no painel em Admin, Ligações, «Chaves
da API», e guardá-la no ambiente com o nome `PAINEL_API_KEY`. Não lhe peças
que a cole na conversa.

## Um site novo, do zero

1. `list_clients`: o cliente já existe? Se não, `create_client`.
2. `create_site` com `prepare: true` e, em `notify`, o email do cliente que
   deve receber os leads (vem do briefing). O painel copia este modelo para um
   repositório novo, escreve lá as chaves do site e a do formulário
   «Contactos», cria o projeto na Cloudflare e pede a primeira publicação.
3. `get_site` até `preparation.stepsDone` chegar ao fim. O endereço onde o
   site fica à vista está em `previews`. Se houver `preparation.error`, lê-o:
   diz o que falhou e o que fazer. Depois de resolvido, `prepare_site`
   continua de onde parou.
4. O trabalho no site faz-se a seguir no repositório novo
   (`preparation.repo`), com o briefing e as outras skills.

Se o painel responder que não está ligado ao GitHub e à Cloudflare, isso é do
administrador (Admin, Ligações) e faz-se uma vez. Entretanto segue pelo
caminho abaixo.

## Um repositório que já existe

1. `create_site` sem `prepare`. Devolve `siteKey` e `buildToken`. O token de
   build só aparece esta vez: é a variável `PANEL_BUILD_TOKEN` do alojamento e
   nunca se escreve no repositório.
2. `create_form` devolve a chave do formulário.
3. Escreve em `site.config.ts`: `panel.siteKey` e `forms.contactos`.
4. `set_publishing` com `kind: "commit"` e o repositório, e `update_site` com
   o endereço de pré-visualização em `previews`, para o formulário aceitar
   respostas enviadas de lá.

## Durante a construção

- **Línguas e campos extra dos artigos:** `set_article_setup`. Têm de ser os
  que o site lê: as línguas de `lang` e `locales`, e as chaves dos campos que
  as páginas usam.
- **Artigos:** `save_article` com o Markdown e o cabeçalho habituais;
  `save_translation` para as outras línguas. `draft: true` enquanto o dono do
  projeto não aprovar o texto.
- **Publicar:** `publish_site`, e depois `get_site` para ver em `lastPublish`
  se o site já mostra a versão nova.
- **O que falta:** `get_site` diz em `stillToDo` o que ainda falta para o site
  estar a funcionar.

## Limites

- A chave da API e o token de build são segredos: não vão para ficheiros do
  repositório, nem para mensagens, nem para capturas.
- `invite_user` dá entrada no painel a uma pessoa do cliente. Só quando o dono
  do projeto disser quem e quando.
- Tudo o que fizeres fica escrito no painel, em Admin, Registo, com o nome da
  chave. Faz só o que o trabalho pede.
