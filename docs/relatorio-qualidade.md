# Relatório de qualidade: DS Anox, 15 de novembro de 2026

Pré-visualização: https://dsanox-site.acemang-jedi.workers.dev/

## Resumo

O site está construído na direção B ("Estaleiro"): oito páginas por língua (início, Sobre nós, Serviços, três páginas de área, Equipa, Contactos), mais as legais e a de agradecimento, em português, inglês e francês. São 36 endereços.

Os cinco portões medidos passam em todas as páginas. O crítico independente deu 8 em quatro categorias e 7 nas outras quatro ao fim das três rondas previstas, por isso **o portão do crítico não passa** e fica para decisão do dono do projeto (ver "Por decidir"). As três páginas de área foram feitas depois da terceira ronda e o crítico não as viu.

Faltam ainda a chave do site no painel e a ligação do domínio para o formulário enviar.

## Portões

|     | Portão          | Resultado            | Medida                                                                                                                                                                                            |
| --- | --------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Build e testes  | passa                | `pnpm run ci` (22 testes, 5 do sync fora por o blogue estar desligado) e 7 testes no browser                                                                                                      |
| 2   | Tiques de IA    | passa                | detetor do Impeccable e frases proibidas, 36 páginas a 1280 e 390 px, zero ocorrências                                                                                                            |
| 3   | Desenho         | passa                | `DESIGN.md`: 0 erros, 1 aviso que não é de contraste                                                                                                                                              |
| 4   | Factos          | passa                | lido página a página: moradas, telefones, email, serviços e textos vêm do inventário; não há números, clientes, testemunhos nem certificações                                                     |
| 5   | Remake          | passa com diferenças | tudo o que o inventário tem está no site; o que mudou no texto está em "Propostas" do inventário, por aceitar pelo dono do projeto; os endereços antigos (Google Sites) não se podem redirecionar |
| 6   | Lighthouse      | passa                | telemóvel, 36 páginas: desempenho 95 ou mais, acessibilidade, boas práticas e SEO a 100                                                                                                           |
| 7   | Acessibilidade  | passa                | axe, 36 páginas a 1280 e 390 px, zero violações                                                                                                                                                   |
| 8   | Crítico         | não passa            | três rondas; última: 8, 7, 7, 8, 7, 7, 8, 8                                                                                                                                                       |
| 9   | Dono do projeto | por fazer            |                                                                                                                                                                                                   |

A tabela do Lighthouse, página a página, está em `docs/portao.md`.

## Crítico

Três críticos de contexto limpo, um por ronda, só com as capturas, o `DESIGN.md` e o inventário.

| Categoria               | 1.ª | 2.ª | 3.ª |
| ----------------------- | --- | --- | --- |
| Hierarquia              | 7   | 7   | 8   |
| Ritmo                   | 6   | 7   | 7   |
| Letra                   | 7   | 7   | 7   |
| Cor                     | 8   | 8   | 8   |
| Imagem                  | 6   | 7   | 7   |
| Texto                   | 7   | 7   | 7   |
| Fidelidade ao DESIGN.md | 6   | 7   | 8   |
| Identidade              | 7   | 7   | 8   |

**Depois da 1.ª ronda:** as páginas interiores passaram a abrir com fotografia a toda a largura e o arco; as três áreas da página inicial ganharam fotografia grande, também no telemóvel; o fecho das páginas interiores passou a faixa vermelha; as fotografias foram redistribuídas e ficaram com o mesmo tratamento; os textos das três áreas trocaram adjetivos por trabalhos; hífenes que não partem; página de agradecimento com telefone.

**Depois da 2.ª ronda:** o arco das páginas interiores passa de lado a lado por cima do título; as fotografias das áreas vão até à margem; a curva do logótipo abre as faixas vermelhas; o lema ficou mais pequeno do que o título; Sobre nós ganhou uma fotografia larga e um título de secção que não repete os subtítulos; quebras de título corrigidas com espaços que não partem.

**Depois da 3.ª ronda (sem nova crítica):** entrelinha dos títulos de 0,86 para 0,93, para os acentos não tocarem na linha de cima; o arco da página inicial passa por cima do título, sem riscar o texto; o título do formulário numa só linha; a página de Serviços passou a resumo, com o detalhe nas três páginas de área.

O que os três críticos destacaram como melhor: o primeiro ecrã da página inicial, a faixa vermelha de contacto com o formulário e o arco do logótipo usado como sistema.

## Diferenças aceites (remake)

Estão todas em `docs/inventario.md`, secção "Propostas", com o antes e o depois: título e abertura da página inicial, títulos das secções, frases das três áreas, assinatura do rodapé, cinco páginas em vez de seis, uma página por área, "Como decorre um projeto", títulos e descrições para o Google, traduções da Política da Qualidade (com a nota de que o original português prevalece).

Traduções feitas por nós, a rever pelo cliente: Política da Qualidade em inglês e francês, páginas legais nas três línguas, títulos e frases novas em inglês e francês.

## Por decidir

1. **As quatro notas 7 do crítico.** Três delas dependem de coisas que não se resolvem no desenho:
   - **Texto:** Sobre nós e Equipa usam o texto original do cliente, que é feito de adjetivos. Melhora com as respostas às cinco perguntas do inventário (materiais, processos de soldadura, certificações, setores e países, ano de fundação).
   - **Imagem:** há doze fotografias para 36 endereços, por isso algumas repetem-se entre páginas. Melhora com mais fotografias do cliente, de preferência com legenda (tipo de obra e ano).
   - **Ritmo:** a página Equipa é curta porque só há três frases sobre a equipa. O crítico sugere juntá-la à página inicial enquanto não houver mais conteúdo; mantive-a porque o site atual a tem.
   - **Letra:** o crítico quer o título do primeiro ecrã maior (o `DESIGN.md` prevê 112 px). Não o subi porque o detetor de tiques conta um título de três linhas acima de cerca de 90 px como "título de herói exagerado". É uma discordância entre os dois portões; segui o que é medido.
2. **Chave do site** no painel, por preencher em `site.config.ts` (`POR-PREENCHER`). Só é precisa para o blogue, que está desligado.
3. **Formulário:** tem a chave, mas o painel só aceita envios vindos de dsanox.com. Na pré-visualização mostra o aviso de erro com o email e o telefone.
4. **Fotografia do primeiro ecrã:** vê-se, escurecido, um contentor com o nome e o telefone de outra empresa.
5. **Logótipo claro:** derivado do escuro; convém o original do cliente.
6. **Páginas legais:** texto do modelo adaptado (prazo de dois anos para guardar pedidos); o cliente deve confirmar.
7. **Aviso de cookies:** o botão "Aceitar todos" usa o vermelho claro; vem da base e acerta-se no modelo.
