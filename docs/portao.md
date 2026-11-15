# Portões medidos: DS Anox

Corrido a 2026-11-15 15:44 UTC com `pnpm portao`.

**Passam todos os portões corridos.**

| Portão         | Resultado | Medida                       |
| -------------- | --------- | ---------------------------- |
| Build e testes | passa     | pnpm run ci e pnpm test:e2e  |
| Desenho        | passa     | DESIGN.md: 0 erros, 1 avisos |
| Tiques de IA   | passa     | 57 páginas a 1280 e 390 px   |
| Acessibilidade | passa     | 57 páginas a 1280 e 390 px   |
| Lighthouse     | passa     | 57 páginas, em telemóvel     |

## Lighthouse

| Página                                             | Desempenho | Acessibilidade | Boas práticas | SEO    | LCP     | CLS   | Peso   |
| -------------------------------------------------- | ---------- | -------------- | ------------- | ------ | ------- | ----- | ------ |
| /                                                  | 100        | 100            | 100           | 100    | 1501 ms | 0.000 | 556 kB |
| /contactos/                                        | 100        | 100            | 100           | 100    | 1351 ms | 0.000 | 129 kB |
| /en/                                               | 100        | 100            | 100           | 100    | 1352 ms | 0.000 | 555 kB |
| /en/about/                                         | 99         | 100            | 100           | 100    | 2181 ms | 0.000 | 301 kB |
| /en/contact/                                       | 100        | 100            | 100           | 100    | 1353 ms | 0.000 | 129 kB |
| /en/cookie-policy/                                 | 100        | 100            | 100           | 100    | 1260 ms | 0.000 | 124 kB |
| /en/privacy-policy/                                | 100        | 100            | 100           | 100    | 1203 ms | 0.000 | 125 kB |
| /en/projects/                                      | 98         | 100            | 100           | 100    | 2402 ms | 0.000 | 388 kB |
| /en/projects/assembly-becancour/                   | 97         | 100            | 100           | 100    | 2476 ms | 0.000 | 411 kB |
| /en/projects/duct-maintenance-fos-sur-mer/         | 97         | 100            | 100           | 100    | 2476 ms | 0.000 | 442 kB |
| /en/projects/piping-aberdeen/                      | 97         | 100            | 100           | 100    | 2479 ms | 0.000 | 422 kB |
| /en/projects/piping-sines/                         | 98         | 100            | 100           | 100    | 2403 ms | 0.000 | 407 kB |
| /en/projects/prefabricated-units-dunkirk/          | 97         | 100            | 100           | 100    | 2477 ms | 0.000 | 379 kB |
| /en/projects/steel-structure-viana-do-castelo/     | 97         | 100            | 100           | 100    | 2565 ms | 0.000 | 416 kB |
| /en/services/                                      | 98         | 100            | 100           | 100    | 2330 ms | 0.000 | 477 kB |
| /en/services/industrial-construction/              | 98         | 100            | 100           | 100    | 2331 ms | 0.000 | 256 kB |
| /en/services/prefabrication/                       | 98         | 100            | 100           | 100    | 2251 ms | 0.000 | 279 kB |
| /en/services/technical-and-budget-consulting/      | 98         | 100            | 100           | 100    | 2326 ms | 0.000 | 267 kB |
| /en/team/                                          | 98         | 100            | 100           | 100    | 2405 ms | 0.000 | 421 kB |
| /en/terms/                                         | 100        | 100            | 100           | 100    | 1204 ms | 0.000 | 124 kB |
| /en/thank-you/                                     | 100        | 100            | 100           | oculta | 1202 ms | 0.000 | 123 kB |
| /equipa/                                           | 98         | 100            | 100           | 100    | 2405 ms | 0.000 | 422 kB |
| /fr/                                               | 100        | 100            | 100           | 100    | 1501 ms | 0.000 | 556 kB |
| /fr/a-propos/                                      | 99         | 100            | 100           | 100    | 2177 ms | 0.000 | 302 kB |
| /fr/conditions-generales/                          | 100        | 100            | 100           | 100    | 1201 ms | 0.000 | 124 kB |
| /fr/contact/                                       | 100        | 100            | 100           | 100    | 1352 ms | 0.000 | 129 kB |
| /fr/equipe/                                        | 98         | 100            | 100           | 100    | 2402 ms | 0.000 | 422 kB |
| /fr/merci/                                         | 100        | 100            | 100           | oculta | 1201 ms | 0.000 | 124 kB |
| /fr/politique-de-confidentialite/                  | 100        | 100            | 100           | 100    | 1201 ms | 0.000 | 126 kB |
| /fr/politique-de-cookies/                          | 100        | 100            | 100           | 100    | 1351 ms | 0.000 | 124 kB |
| /fr/projets/                                       | 98         | 100            | 100           | 100    | 2402 ms | 0.000 | 389 kB |
| /fr/projets/maintenance-conduites-fos-sur-mer/     | 97         | 100            | 100           | 100    | 2478 ms | 0.000 | 443 kB |
| /fr/projets/montage-becancour/                     | 100        | 100            | 100           | 100    | 1351 ms | 0.000 | 412 kB |
| /fr/projets/structure-metallique-viana-do-castelo/ | 97         | 100            | 100           | 100    | 2477 ms | 0.000 | 417 kB |
| /fr/projets/tuyauterie-aberdeen/                   | 97         | 100            | 100           | 100    | 2552 ms | 0.000 | 423 kB |
| /fr/projets/tuyauterie-sines/                      | 97         | 100            | 100           | 100    | 2478 ms | 0.000 | 408 kB |
| /fr/projets/unites-prefabriquees-dunkerque/        | 97         | 100            | 100           | 100    | 2480 ms | 0.000 | 379 kB |
| /fr/services/                                      | 98         | 100            | 100           | 100    | 2326 ms | 0.000 | 477 kB |
| /fr/services/conseil-technique-et-budgetaire/      | 98         | 100            | 100           | 100    | 2327 ms | 0.000 | 267 kB |
| /fr/services/construction-industrielle/            | 98         | 100            | 100           | 100    | 2331 ms | 0.000 | 257 kB |
| /fr/services/prefabrication/                       | 97         | 100            | 100           | 100    | 2403 ms | 0.000 | 280 kB |
| /obrigado/                                         | 100        | 100            | 100           | oculta | 1352 ms | 0.000 | 124 kB |
| /politica-de-cookies/                              | 100        | 100            | 100           | 100    | 1201 ms | 0.000 | 124 kB |
| /politica-de-privacidade/                          | 100        | 100            | 100           | 100    | 1202 ms | 0.000 | 125 kB |
| /projetos/                                         | 98         | 100            | 100           | 100    | 2403 ms | 0.000 | 389 kB |
| /projetos/estrutura-viana-do-castelo/              | 97         | 100            | 100           | 100    | 2476 ms | 0.000 | 417 kB |
| /projetos/manutencao-condutas-fos-sur-mer/         | 97         | 100            | 100           | 100    | 2478 ms | 0.000 | 443 kB |
| /projetos/montagem-becancour/                      | 97         | 100            | 100           | 100    | 2478 ms | 0.000 | 411 kB |
| /projetos/tubagem-aberdeen/                        | 97         | 100            | 100           | 100    | 2553 ms | 0.000 | 423 kB |
| /projetos/tubagem-sines/                           | 98         | 100            | 100           | 100    | 2403 ms | 0.000 | 407 kB |
| /projetos/unidades-pre-fabricadas-dunkerque/       | 97         | 100            | 100           | 100    | 2477 ms | 0.000 | 379 kB |
| /servicos/                                         | 98         | 100            | 100           | 100    | 2328 ms | 0.000 | 477 kB |
| /servicos/construcao-industrial/                   | 98         | 100            | 100           | 100    | 2251 ms | 0.000 | 257 kB |
| /servicos/consultoria-tecnica-e-orcamental/        | 97         | 100            | 100           | 100    | 2401 ms | 0.000 | 267 kB |
| /servicos/pre-fabricacao/                          | 98         | 100            | 100           | 100    | 2403 ms | 0.000 | 280 kB |
| /sobre-nos/                                        | 99         | 100            | 100           | 100    | 2177 ms | 0.000 | 301 kB |
| /termos-e-condicoes/                               | 100        | 100            | 100           | 100    | 1202 ms | 0.000 | 124 kB |

Os portões dos factos, do remake e do crítico, e a aprovação, fazem-se com a skill site-rever.
