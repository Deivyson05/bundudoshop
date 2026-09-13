# Bundudo Shop

Vitrine de "achados da internet": o site mostra cards de produtos (nome, imagem
e link de afiliado) lidos direto do banco. O frontend nunca escreve dados —
só existe leitura (`GET /products`).

## Stack

| Camada    | Tecnologias |
|-----------|-------------|
| Frontend  | Next.js (App Router), TypeScript, TailwindCSS, shadcn/ui, GSAP |
| Backend   | NestJS, TypeScript, TypeORM |
| Dados     | PostgreSQL via NeonDB |
| Deploy    | Vercel (frontend e backend) |

## Estrutura do repositório

```
bundudo-shop/
├── apps/
│   ├── web/     # Next.js — site público, só GET
│   │   └── src/
│   │       ├── app/          # rotas (App Router)
│   │       ├── components/   # ProductCard, ProductGrid, ui/ (shadcn)
│   │       ├── lib/          # api.ts (fetch), utils.ts (cn)
│   │       └── types/        # tipo Product
│   └── api/     # NestJS — API que fala com o Postgres/Neon
│       ├── api/index.ts          # handler serverless (entrada na Vercel)
│       └── src/
│           ├── main.ts           # entrada local (npm run start:dev)
│           ├── app.module.ts
│           ├── database/         # data-source.ts + migrations do TypeORM
│           └── products/         # entity, dto, service, controller, module
├── package.json # workspaces npm (raiz do monorepo)
└── README.md
```

É um monorepo com **npm workspaces**: um único `npm install` na raiz
resolve as dependências dos dois apps.

## Pré-requisitos

- Node.js >= 18.18
- Uma conta [NeonDB](https://neon.tech) com um banco Postgres criado (plano free serve)

## Rodando localmente

### 1. Instalar dependências

```bash
git clone <este-repositorio>
cd bundudo-shop
npm install
```

### 2. Configurar variáveis de ambiente

```bash
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env.local
```

Edite `apps/api/.env` e cole a connection string do seu projeto Neon em
`DATABASE_URL` (em Neon: **Dashboard → Connection Details**, formato
`postgresql://usuario:senha@ep-xxxx.neon.tech/banco?sslmode=require`).

O `apps/web/.env.local` já vem apontando para `http://localhost:3001`,
não precisa mudar nada em dev.

### 3. Criar a tabela `products` no banco

```bash
npm run build:api
npm run migration:run
```

### 4. Subir a API (NestJS)

```bash
npm run dev:api
```

A API sobe em `http://localhost:3001`. Endpoint público consumido pelo site:

- `GET /products` — lista todos os produtos (id, name, imageUrl, affiliateLink)

Existem também endpoints de administração (`POST` / `PATCH` / `DELETE` em
`/products`) para cadastrar produtos via Postman/Insomnia/curl — o frontend
nunca os chama. Exemplo para popular o banco:

```bash
curl -X POST http://localhost:3001/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Fone bluetooth achado no AliExpress",
    "imageUrl": "https://exemplo.com/imagem.jpg",
    "affiliateLink": "https://exemplo.com/produto?ref=afiliado"
  }'
```

### 5. Subir o site (Next.js)

Em outro terminal:

```bash
npm run dev:web
```

Acesse `http://localhost:3000` — os cards vêm direto do que estiver
cadastrado no Postgres.

## Deploy na Vercel

O repositório é pensado para virar **dois projetos Vercel** (um por app),
apontando cada um para a pasta correspondente ("Root Directory" nas
configurações do projeto):

- **`apps/web`** — projeto Next.js padrão. Configure a env
  `NEXT_PUBLIC_API_URL` apontando para a URL do projeto da API.
- **`apps/api`** — o Nest roda como Vercel Function via `apps/api/api/index.ts`
  (adaptador Express + [`serverless-http`](https://www.npmjs.com/package/serverless-http),
  já que a Vercel não mantém processos long-running como o `main.ts` local
  espera). Configure `DATABASE_URL` e `WEB_ORIGIN` (URL do site) nas env vars
  do projeto.

> **Nota de arquitetura:** `serverless-http` é uma peça pequena de "cola" de
> deploy (não é uma camada de dados nem substitui nada da stack pedida) —
> é o jeito padrão de rodar um app Express/Nest como função serverless na
> Vercel. Se preferir outra abordagem (ex.: hospedar a API em um serviço com
> processo persistente e manter só o front na Vercel), me avise que eu ajusto.

## Decisões já confirmadas com você

- ORM: **TypeORM** (não Prisma).
- Organização: **monorepo com npm workspaces** (`apps/web` e `apps/api`).

## Próximos passos sugeridos (fora do escopo deste scaffold)

- Autenticação simples para os endpoints de administração (hoje eles ficam
  abertos, protegidos só por não estarem expostos no frontend).
- Paginação em `GET /products` se o catálogo crescer muito.
- Testes automatizados (e2e no Nest, componente no Next).
