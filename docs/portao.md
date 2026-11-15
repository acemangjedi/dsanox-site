# Portões medidos: DS Anox

Corrido a 2026-11-15 14:14 UTC com `pnpm portao`.

**Passam todos os portões corridos.**

| Portão         | Resultado | Medida                       |
| -------------- | --------- | ---------------------------- |
| Build e testes | passa     | pnpm run ci e pnpm test:e2e  |
| Desenho        | passa     | DESIGN.md: 0 erros, 1 avisos |
| Tiques de IA   | passa     | 36 páginas a 1280 e 390 px   |
| Acessibilidade | passa     | 36 páginas a 1280 e 390 px   |
| Lighthouse     | passa     | 36 páginas, em telemóvel     |

## Lighthouse

| Página                                        | Desempenho | Acessibilidade | Boas práticas | SEO    | LCP     | CLS   | Peso   |
| --------------------------------------------- | ---------- | -------------- | ------------- | ------ | ------- | ----- | ------ |
| /                                             | 100        | 100            | 100           | 100    | 1503 ms | 0.000 | 529 kB |
| /contactos/                                   | 100        | 100            | 100           | 100    | 1201 ms | 0.000 | 123 kB |
| /en/                                          | 100        | 100            | 100           | 100    | 1501 ms | 0.000 | 528 kB |
| /en/about/                                    | 99         | 100            | 100           | 100    | 2027 ms | 0.000 | 295 kB |
| /en/contact/                                  | 100        | 100            | 100           | 100    | 1353 ms | 0.000 | 122 kB |
| /en/cookie-policy/                            | 100        | 100            | 100           | 100    | 1202 ms | 0.000 | 117 kB |
| /en/privacy-policy/                           | 99         | 100            | 100           | 100    | 1954 ms | 0.000 | 118 kB |
| /en/services/                                 | 99         | 100            | 100           | 100    | 2103 ms | 0.000 | 470 kB |
| /en/services/industrial-construction/         | 98         | 100            | 100           | 100    | 2255 ms | 0.000 | 250 kB |
| /en/services/prefabrication/                  | 98         | 100            | 100           | 100    | 2252 ms | 0.000 | 273 kB |
| /en/services/technical-and-budget-consulting/ | 98         | 100            | 100           | 100    | 2253 ms | 0.000 | 260 kB |
| /en/team/                                     | 98         | 100            | 100           | 100    | 2253 ms | 0.000 | 415 kB |
| /en/terms/                                    | 100        | 100            | 100           | 100    | 1202 ms | 0.000 | 117 kB |
| /en/thank-you/                                | 100        | 100            | 100           | oculta | 1201 ms | 0.000 | 117 kB |
| /equipa/                                      | 98         | 100            | 100           | 100    | 2328 ms | 0.000 | 415 kB |
| /fr/                                          | 95         | 100            | 100           | 100    | 2929 ms | 0.000 | 529 kB |
| /fr/a-propos/                                 | 99         | 100            | 100           | 100    | 2100 ms | 0.000 | 295 kB |
| /fr/conditions-generales/                     | 100        | 100            | 100           | 100    | 1201 ms | 0.000 | 118 kB |
| /fr/contact/                                  | 100        | 100            | 100           | 100    | 1351 ms | 0.000 | 123 kB |
| /fr/equipe/                                   | 99         | 100            | 100           | 100    | 2179 ms | 0.000 | 415 kB |
| /fr/merci/                                    | 100        | 100            | 100           | oculta | 1202 ms | 0.000 | 117 kB |
| /fr/politique-de-confidentialite/             | 99         | 100            | 100           | 100    | 1955 ms | 0.000 | 119 kB |
| /fr/politique-de-cookies/                     | 100        | 100            | 100           | 100    | 1204 ms | 0.000 | 118 kB |
| /fr/services/                                 | 98         | 100            | 100           | 100    | 2251 ms | 0.000 | 471 kB |
| /fr/services/conseil-technique-et-budgetaire/ | 98         | 100            | 100           | 100    | 2253 ms | 0.000 | 261 kB |
| /fr/services/construction-industrielle/       | 98         | 100            | 100           | 100    | 2253 ms | 0.000 | 251 kB |
| /fr/services/prefabrication/                  | 98         | 100            | 100           | 100    | 2253 ms | 0.000 | 273 kB |
| /obrigado/                                    | 99         | 100            | 100           | oculta | 1951 ms | 0.000 | 117 kB |
| /politica-de-cookies/                         | 99         | 100            | 100           | 100    | 1951 ms | 0.000 | 118 kB |
| /politica-de-privacidade/                     | 99         | 100            | 100           | 100    | 1952 ms | 0.000 | 119 kB |
| /servicos/                                    | 99         | 100            | 100           | 100    | 2104 ms | 0.000 | 470 kB |
| /servicos/construcao-industrial/              | 98         | 100            | 100           | 100    | 2252 ms | 0.000 | 250 kB |
| /servicos/consultoria-tecnica-e-orcamental/   | 98         | 100            | 100           | 100    | 2255 ms | 0.000 | 261 kB |
| /servicos/pre-fabricacao/                     | 98         | 100            | 100           | 100    | 2254 ms | 0.000 | 273 kB |
| /sobre-nos/                                   | 99         | 100            | 100           | 100    | 2103 ms | 0.000 | 295 kB |
| /termos-e-condicoes/                          | 100        | 100            | 100           | 100    | 1202 ms | 0.000 | 118 kB |

Os portões dos factos, do remake e do crítico, e a aprovação, fazem-se com a skill site-rever.
