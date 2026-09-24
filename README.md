# Portfólio — Vinicius Nunes da Silva

Portfólio profissional de **Vinicius Nunes da Silva**, Analista de Tecnologia da Informação
(suporte, infraestrutura, operações e automação).

Site 100% estático — **HTML + CSS + JavaScript puro, sem dependências nem build**.
Hospedável em GitHub Pages, Netlify, Vercel, Cloudflare Pages ou qualquer servidor web.

---

## Estrutura do projeto

```
├── index.html                      ← Página principal (seções montadas via JS)
├── 404.html                        ← Página de erro
├── assets/
│   ├── css/theme.css               ← Sistema de design (tokens, componentes, responsivo)
│   ├── js/
│   │   ├── data.js                 ← ★ FONTE ÚNICA DE CONTEÚDO (edite aqui)
│   │   ├── components.js           ← Renderizadores de cada seção
│   │   └── main.js                 ← Montagem, menu, binder e animações
│   ├── img/
│   │   ├── profile-placeholder.svg ← Substituir pela foto real (320x320 ou maior, quadrada)
│   │   ├── og-image.png            ← Imagem de compartilhamento (LinkedIn)
│   │   ├── og-ativofix.png         ← Imagem de compartilhamento do case
│   │   └── screenshots/            ← ★ Colocar screenshots reais do AtivoFix (800x475)
│   ├── docs/
│   │   ├── curriculo-vinicius-nunes.pdf ← ★ Substituir pelo currículo real
│   │   └── LEIA-ME.txt             ← Instruções do currículo
│   ├── favicon.ico / favicon.svg / favicon-32.png / apple-touch-icon.png
├── projetos/ativofix/index.html    ← Página do case (/projetos/ativofix)
├── tools/
│   ├── serve.py                    ← Servidor local de desenvolvimento
│   └── generate_assets.py          ← Regenera favicon e imagens OG
└── README.md
```

## Como editar o conteúdo

**Tudo** (textos, links, experiências, competências, tecnologias) fica em
`assets/js/data.js`. As páginas consomem esse arquivo automaticamente:

- **Home** — componentes em `components.js` leem `PORTFOLIO_DATA` e montam as seções.
- **Case AtivoFix** — elementos com `data-bind` / `data-list` / `data-pipeline` /
  `data-shots` / `data-tech` são preenchidos pelo binder em `main.js`.

| O que mudar              | Onde                                        |
|--------------------------|---------------------------------------------|
| Textos do hero, contato  | `data.js → profile`, `contacts`             |
| Foto profissional        | substituir `assets/img/profile-placeholder.svg` (ou apontar `profile.photo` para o novo arquivo) |
| Currículo PDF            | substituir `assets/docs/curriculo-vinicius-nunes.pdf` |
| Experiências             | `data.js → experience.items`                |
| Screenshots do AtivoFix  | colocar PNGs em `assets/img/screenshots/` e atualizar `featuredProject.screenshots` e `ativofix.sections.screenshots` |
| Metadados SEO/OG         | `<head>` dos HTMLs + `data.js → meta` (manter sincronizados) |

## Desenvolvimento local

```bash
python tools/serve.py        # http://localhost:8787
```

> Abrir o `index.html` diretamente via `file://` funciona, mas algumas
> fontes podem ser bloqueadas — prefira o servidor local.

## Publicação (GitHub Pages)

1. Suba o repositório (sugestão de nome: `portfolio`).
2. Settings → Pages → Source: branch `main`, pasta `/ (root)`.
3. Atualize `data.js → siteUrl` e as URLs canônicas/OG nos `<head>` com o endereço final.

## Regenerar assets e currículo

```bash
python tools/generate_assets.py    # favicon + imagens Open Graph
python tools/generate_resume.py    # currículo em PDF (1 página A4)
```

> O conteúdo do currículo espelha o `data.js`; ao alterar o portfólio,
> atualize também `tools/generate_resume.py` e regenere o PDF.

## Checklist de qualidade

- [x] Responsivo (desktop → tablet → celular)
- [x] Acessibilidade: skip link, foco visível, `aria-*`, contraste AA, `prefers-reduced-motion`
- [x] SEO: title/description, Open Graph, Twitter Card, JSON-LD, favicon, 404
- [x] Navegação sticky com link ativo por scroll + menu mobile
- [x] Sem dependências externas (exceto fonte Inter via Google Fonts)
