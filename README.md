# LitaldiBet Webapp

Aplicacao web publica em React + Vite, configurada para deploy no GitHub Pages.

## Requisitos

- Node.js 20+
- pnpm

## Variaveis de ambiente

Crie o arquivo .env na raiz deste projeto com:

VITE_SUPABASE_URL=https://SEU-PROJETO.supabase.co
VITE_SUPABASE_ANON_KEY=SUA_ANON_KEY
VITE_POST_IMAGES_BUCKET=post-images

## Desenvolvimento local

1. Instalar dependencias:

pnpm install

2. Rodar em desenvolvimento:

pnpm dev

## Build de producao

pnpm build

A saida fica em dist.

## Deploy no GitHub Pages

A publicacao usa gh-pages e envia a pasta dist para a branch gh-pages.

### Dominio customizado (evitar reset no GitHub Pages)

Defina o dominio no package.json deste projeto, no campo config.pagesCname:

"config": {
	"pagesCname": "seu-dominio.com"
}

Quando voce executar pnpm deploy, o script compartilhado em ../shared/scripts/deploy-pages.mjs vai publicar com o parametro -c e manter o CNAME da branch gh-pages.

Se preferir, voce pode sobrescrever no momento do deploy com variavel de ambiente:

Windows PowerShell:
$env:PAGES_CNAME="seu-dominio.com"; pnpm deploy

### Primeira publicacao

1. Rode:

pnpm deploy

2. No GitHub, configure:

- Settings > Pages
- Source: Deploy from a branch
- Branch: gh-pages
- Folder: /(root)

3. Aguarde a URL do Pages ficar disponivel.

### Atualizacoes futuras

Sempre que alterar o webapp:

1. Commit e push na main.
2. Rode novamente:

pnpm deploy

O script predeploy executa o build automaticamente antes da publicacao.

## Roteamento no GitHub Pages

Este projeto usa BrowserRouter com basename do Vite e fallback de 404 para permitir abrir URLs internas diretamente no Pages (exemplo: /blog/slug) sem erro 404.

## Troubleshooting rapido

1. A branch gh-pages nao aparece no GitHub:
- Rode pnpm deploy pelo menos uma vez.

2. Abriu em branco ou sem assets:
- Confirme se base no vite.config.ts esta /LitaldiBet/.

3. Rotas internas quebram ao atualizar a pagina:
- Confirme se o arquivo public/404.html existe e foi publicado.
