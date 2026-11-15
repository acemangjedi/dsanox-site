# Portões medidos: DS Anox

Corrido a 2026-11-15 13:42 UTC com `pnpm portao`.

**Passam todos os portões corridos.**

| Portão         | Resultado | Medida                       |
| -------------- | --------- | ---------------------------- |
| Build e testes | passa     | pnpm run ci e pnpm test:e2e  |
| Desenho        | passa     | DESIGN.md: 0 erros, 1 avisos |
| Tiques de IA   | passa     | 27 páginas a 1280 e 390 px   |
| Acessibilidade | passa     | 27 páginas a 1280 e 390 px   |
| Lighthouse     | passa     | 27 páginas, em telemóvel     |

## Lighthouse

| Página                            | Desempenho | Acessibilidade | Boas práticas | SEO    | LCP     | CLS   | Peso   |
| --------------------------------- | ---------- | -------------- | ------------- | ------ | ------- | ----- | ------ |
| /                                 | 100        | 100            | 100           | 100    | 1352 ms | 0.000 | 527 kB |
| /contactos/                       | 100        | 100            | 100           | 100    | 1201 ms | 0.000 | 121 kB |
| /en/                              | 100        | 100            | 100           | 100    | 1353 ms | 0.000 | 527 kB |
| /en/about/                        | 99         | 100            | 100           | 100    | 2103 ms | 0.000 | 293 kB |
| /en/contact/                      | 100        | 100            | 100           | 100    | 1351 ms | 0.000 | 121 kB |
| /en/cookie-policy/                | 100        | 100            | 100           | 100    | 1203 ms | 0.000 | 116 kB |
| /en/privacy-policy/               | 100        | 100            | 100           | 100    | 1202 ms | 0.000 | 117 kB |
| /en/services/                     | 99         | 100            | 100           | 100    | 2101 ms | 0.000 | 376 kB |
| /en/team/                         | 99         | 100            | 100           | 100    | 2178 ms | 0.000 | 414 kB |
| /en/terms/                        | 100        | 100            | 100           | 100    | 1202 ms | 0.000 | 116 kB |
| /en/thank-you/                    | 100        | 100            | 100           | oculta | 1052 ms | 0.000 | 116 kB |
| /equipa/                          | 99         | 100            | 100           | 100    | 2181 ms | 0.000 | 414 kB |
| /fr/                              | 100        | 100            | 100           | 100    | 1352 ms | 0.000 | 527 kB |
| /fr/a-propos/                     | 99         | 100            | 100           | 100    | 2102 ms | 0.000 | 294 kB |
| /fr/conditions-generales/         | 100        | 100            | 100           | 100    | 1201 ms | 0.000 | 117 kB |
| /fr/contact/                      | 100        | 100            | 100           | 100    | 1201 ms | 0.000 | 122 kB |
| /fr/equipe/                       | 98         | 100            | 100           | 100    | 2328 ms | 0.000 | 414 kB |
| /fr/merci/                        | 100        | 100            | 100           | oculta | 1203 ms | 0.000 | 116 kB |
| /fr/politique-de-confidentialite/ | 100        | 100            | 100           | 100    | 1201 ms | 0.000 | 118 kB |
| /fr/politique-de-cookies/         | 100        | 100            | 100           | 100    | 1201 ms | 0.000 | 117 kB |
| /fr/services/                     | 99         | 100            | 100           | 100    | 2178 ms | 0.000 | 377 kB |
| /obrigado/                        | 100        | 100            | 100           | oculta | 1203 ms | 0.000 | 116 kB |
| /politica-de-cookies/             | 100        | 100            | 100           | 100    | 1202 ms | 0.000 | 116 kB |
| /politica-de-privacidade/         | 100        | 100            | 100           | 100    | 1201 ms | 0.000 | 117 kB |
| /servicos/                        | 98         | 100            | 100           | 100    | 2251 ms | 0.000 | 376 kB |
| /sobre-nos/                       | 99         | 100            | 100           | 100    | 2101 ms | 0.000 | 294 kB |
| /termos-e-condicoes/              | 100        | 100            | 100           | 100    | 1053 ms | 0.000 | 117 kB |

Os portões dos factos, do remake e do crítico, e a aprovação, fazem-se com a skill site-rever.
