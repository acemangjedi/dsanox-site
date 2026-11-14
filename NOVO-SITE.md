# Criar um site novo a partir deste modelo

Cada site é um repositório próprio, copiado deste. A pasta `src/core/` é igual em
todos os sites e vem sempre deste modelo; o resto (cores, textos, páginas,
imagens) é de cada site.

## 1. No painel

1. Em **Admin → Clientes**, crie o cliente (ou abra o que já existe).
2. Na página do cliente, em **Sites**, adicione o site com o domínio sem `https://` nem `www.`
   (por exemplo `exemplo.pt`). Guarde o **token de build**: só é mostrado uma vez.
   Anote a **chave do site** que aparece na tabela.
3. Na área do cliente, em **Formulários**, crie o formulário de contactos e anote
   a **chave**.

## 2. O repositório

```sh
git clone https://github.com/acemangjedi/modelo-site.git exemplo-site
cd exemplo-site
git remote rename origin modelo        # o modelo, para receber atualizações do núcleo
git remote add origin https://github.com/<conta>/exemplo-site.git
pnpm install
```

## 3. O que mudar

- `site.config.ts`: nome, endereço (`https://www.exemplo.pt/`, com `/` no fim),
  morada, contactos, analytics, `panel.siteKey` (chave do site) e
  `forms.contactos` (chave do formulário). Um campo errado faz o build parar
  com uma mensagem que diz qual é.
- O desenho do site: `src/styles/style.css`, `src/layouts/`, `src/components/`,
  `src/pages/` e `public/` (logótipo, favicons, imagem de partilha, fontes).
  O CSS tem de definir as variáveis que o núcleo usa (ver
  `context/conventions.md`).
- `src/preview.astro` e `src/components/Article.astro`: a página do artigo.
  A pré-visualização do painel usa o mesmo componente, por isso fica igual.
- Não mexer em `src/core/`: as alterações perdem-se na próxima atualização.

## 4. Testar e publicar

```sh
pnpm run ci                         # formato, tipos e testes
PANEL_BUILD_TOKEN=<token> pnpm build  # vai buscar os artigos ao painel e gera dist/
```

- **Hostinger**: publica a pasta `dist/` (inclui `.htaccess` com cabeçalhos de
  segurança, cache e redirecionamentos).
- **Cloudflare Pages**: comando de build `pnpm build`, pasta `dist`, variável
  `PANEL_BUILD_TOKEN` (usa `_headers` e `_redirects`).

## 5. Atualizar o núcleo

Quando o modelo tiver correções em `src/core/`:

```sh
pnpm core:update   # traz src/core/ do modelo (ramo main)
pnpm run ci        # confirma que o site continua bem
git commit -am "Atualizar o núcleo"
```

Se o núcleo novo precisar de outra dependência, o `ci` falha a dizer qual;
copie a versão do `package.json` do modelo. Se o modelo mudar de conta no
GitHub, basta `git remote set-url modelo <endereço novo>`.
